import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// ⚠️ IMPORTANT: Replace these with your Supabase credentials
// Get them from: https://supabase.com/dashboard/project/_/settings/api
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE'
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE'

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Global state
let currentUser = null
let isAdmin = false
let allGames = []

// Initialize app
async function init() {
    console.log('Initializing app...')
    
    // Check if user is already logged in
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session) {
        currentUser = session.user
        await checkAdmin()
        showApp()
        await loadGames()
    } else {
        showAuth()
    }
    
    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
            currentUser = session.user
            checkAdmin().then(() => {
                showApp()
                loadGames()
            })
        } else if (event === 'SIGNED_OUT') {
            currentUser = null
            isAdmin = false
            showAuth()
        }
    })
}

// Check if user is admin
async function checkAdmin() {
    if (!currentUser) return
    
    const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', currentUser.id)
        .single()
    
    isAdmin = !!data
    if (isAdmin) {
        document.getElementById('admin-panel').classList.remove('hidden')
        console.log('Admin access granted')
    }
}

// Authentication functions
window.login = async function() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    if (!email || !password) {
        alert('Please enter both email and password')
        return
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    
    if (error) {
        alert('Login failed: ' + error.message)
        console.error('Login error:', error)
    } else {
        currentUser = data.user
        await checkAdmin()
        showApp()
        await loadGames()
    }
}

window.signup = async function() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    if (!email || !password) {
        alert('Please enter both email and password')
        return
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long')
        return
    }
    
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    
    if (error) {
        alert('Signup failed: ' + error.message)
        console.error('Signup error:', error)
    } else {
        alert('✅ Account created! Check your email for confirmation link.')
    }
}

window.logout = async function() {
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Logout error:', error)
    }
    currentUser = null
    isAdmin = false
    allGames = []
    showAuth()
}

// Game management functions
async function loadGames() {
    const container = document.getElementById('games-container')
    container.innerHTML = '<div class="loader">Loading games...</div>'
    
    const { data: games, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error loading games:', error)
        container.innerHTML = '<div class="error">Failed to load games. Please try again.</div>'
        return
    }
    
    allGames = games || []
    displayGames(allGames)
}

function displayGames(games) {
    const container = document.getElementById('games-container')
    
    if (!games || games.length === 0) {
        container.innerHTML = '<div class="no-games">No games available yet. Check back soon!</div>'
        return
    }
    
    container.innerHTML = games.map(game => `
        <div class="game-card">
            <div class="game-image">
                <img src="${game.image_url || 'https://via.placeholder.com/300x200/667eea/ffffff?text=Game'}" 
                     alt="${game.title}"
                     onerror="this.src='https://via.placeholder.com/300x200/667eea/ffffff?text=Game'">
            </div>
            <div class="game-content">
                <h3>${game.title}</h3>
                <p>${game.description || 'No description available'}</p>
                <span class="category">${game.category || 'General'}</span>
                <a href="${game.download_url}" class="download-btn" target="_blank" rel="noopener noreferrer">
                    ⬇️ Download Now
                </a>
                ${isAdmin ? `<button class="delete-btn" onclick="deleteGame('${game.id}')">🗑️ Delete</button>` : ''}
            </div>
        </div>
    `).join('')
}

window.addGame = async function() {
    if (!isAdmin) {
        alert('Admin access required')
        return
    }
    
    const title = document.getElementById('game-title').value
    const description = document.getElementById('game-description').value
    const downloadUrl = document.getElementById('download-url').value
    const imageUrl = document.getElementById('image-url').value
    const category = document.getElementById('category').value
    
    if (!title || !downloadUrl) {
        alert('Please fill in required fields (Title and Download URL)')
        return
    }
    
    const game = {
        title: title.trim(),
        description: description.trim(),
        download_url: downloadUrl.trim(),
        image_url: imageUrl.trim(),
        category: category
    }
    
    const { error } = await supabase
        .from('games')
        .insert([game])
    
    if (error) {
        alert('Error adding game: ' + error.message)
        console.error('Insert error:', error)
    } else {
        alert('✅ Game added successfully!')
        await loadGames()
        
        // Clear form
        document.getElementById('game-title').value = ''
        document.getElementById('game-description').value = ''
        document.getElementById('download-url').value = ''
        document.getElementById('image-url').value = ''
        document.getElementById('category').value = 'Action'
    }
}

window.deleteGame = async function(gameId) {
    if (!isAdmin) return
    
    if (!confirm('Are you sure you want to delete this game?')) {
        return
    }
    
    const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', gameId)
    
    if (error) {
        alert('Error deleting game: ' + error.message)
        console.error('Delete error:', error)
    } else {
        alert('✅ Game deleted successfully!')
        await loadGames()
    }
}

// Search and filter functionality
window.filterGames = function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase()
    const categoryFilter = document.getElementById('category-filter').value
    
    let filteredGames = allGames
    
    // Filter by search term
    if (searchTerm) {
        filteredGames = filteredGames.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            (game.description && game.description.toLowerCase().includes(searchTerm))
        )
    }
    
    // Filter by category
    if (categoryFilter) {
        filteredGames = filteredGames.filter(game => 
            game.category === categoryFilter
        )
    }
    
    displayGames(filteredGames)
}

// UI helpers
function showAuth() {
    document.getElementById('auth-section').classList.remove('hidden')
    document.getElementById('app').classList.add('hidden')
}

function showApp() {
    document.getElementById('auth-section').classList.add('hidden')
    document.getElementById('app').classList.remove('hidden')
    document.getElementById('user-email').textContent = currentUser.email
}

// Initialize the app when DOM is ready
init()
