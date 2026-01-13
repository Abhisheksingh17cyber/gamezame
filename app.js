import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// ============================================
// GAMEZAME - PROFESSIONAL GAMING PLATFORM
// ============================================

// Supabase Configuration
const SUPABASE_URL = 'https://ehviqqjhbrcszfkyozqq.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVodmlxcWpoYnJjc3pma3lvenFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3OTM3MTksImV4cCI6MjA4MzM2OTcxOX0.8TlD3ybOwJ5z1ZawfCVACVJzxHNCPr_s_lW1w5S6ANs'

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Global state
let currentUser = null
let isAdmin = false
let allGames = []
let currentView = 'grid'

// ============================================
// INITIALIZATION
// ============================================
async function init() {
    console.log('🎮 GameZame Initializing...')
    
    // Show loading screen
    await simulateLoading()
    
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

// Simulate loading screen
async function simulateLoading() {
    return new Promise(resolve => {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen')
            loadingScreen.classList.add('fade-out')
            setTimeout(() => {
                loadingScreen.style.display = 'none'
                resolve()
            }, 500)
        }, 2000)
    })
}

// ============================================
// AUTHENTICATION
// ============================================
async function checkAdmin() {
    if (!currentUser) return
    
    const { data, error } = await supabase
        .from('admins')
        .select('*')
        .eq('user_id', currentUser.id)
        .single()
    
    isAdmin = !!data
    
    if (isAdmin) {
        document.getElementById('admin-nav-btn').classList.remove('hidden')
        document.getElementById('user-rank').textContent = 'ADMIN'
        document.getElementById('user-rank').style.color = '#ff4444'
        console.log('🔐 Admin access granted')
    } else {
        document.getElementById('admin-nav-btn').classList.add('hidden')
        document.getElementById('user-rank').textContent = 'MEMBER'
        document.getElementById('user-rank').style.color = '#00ff88'
    }
}

window.login = async function() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    if (!email || !password) {
        showToast('Please enter both email and password', 'error')
        return
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    
    if (error) {
        showToast('Login failed: ' + error.message, 'error')
        console.error('Login error:', error)
    } else {
        currentUser = data.user
        await checkAdmin()
        showApp()
        await loadGames()
        showToast('Welcome back, Player!', 'success')
    }
}

window.signup = async function() {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    if (!email || !password) {
        showToast('Please enter both email and password', 'error')
        return
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error')
        return
    }
    
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    
    if (error) {
        showToast('Signup failed: ' + error.message, 'error')
        console.error('Signup error:', error)
    } else {
        showToast('Account created! You can now login.', 'success')
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
    showToast('Logged out successfully', 'success')
}

// ============================================
// UI NAVIGATION
// ============================================
function showAuth() {
    document.getElementById('auth-section').classList.remove('hidden')
    document.getElementById('app').classList.add('hidden')
}

function showApp() {
    document.getElementById('auth-section').classList.add('hidden')
    document.getElementById('app').classList.remove('hidden')
    
    // Update user info
    const emailDisplay = currentUser.email.length > 20 
        ? currentUser.email.substring(0, 17) + '...' 
        : currentUser.email
    document.getElementById('user-email').textContent = emailDisplay
}

window.showSection = function(section) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active')
        if (link.dataset.section === section) {
            link.classList.add('active')
        }
    })
    
    // Hide all sections
    document.getElementById('games-section').classList.add('hidden')
    document.getElementById('categories-section').classList.add('hidden')
    document.getElementById('admin-section').classList.add('hidden')
    
    // Show selected section
    if (section === 'games') {
        document.getElementById('games-section').classList.remove('hidden')
    } else if (section === 'categories') {
        document.getElementById('categories-section').classList.remove('hidden')
    } else if (section === 'admin' && isAdmin) {
        document.getElementById('admin-section').classList.remove('hidden')
        updateAdminPanel()
    }
}

window.setView = function(view) {
    currentView = view
    const container = document.getElementById('games-container')
    const buttons = document.querySelectorAll('.view-btn')
    
    buttons.forEach(btn => btn.classList.remove('active'))
    event.currentTarget.classList.add('active')
    
    if (view === 'list') {
        container.classList.add('list-view')
    } else {
        container.classList.remove('list-view')
    }
}

// ============================================
// GAME MANAGEMENT
// ============================================
async function loadGames() {
    const container = document.getElementById('games-container')
    container.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading games...</p>
        </div>
    `
    
    const { data: games, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false })
    
    if (error) {
        console.error('Error loading games:', error)
        container.innerHTML = `
            <div class="no-games">
                <h3>Error Loading Games</h3>
                <p>Please refresh the page and try again.</p>
            </div>
        `
        return
    }
    
    allGames = games || []
    displayGames(allGames)
    
    // Update stats
    document.getElementById('total-games').textContent = allGames.length
    if (isAdmin) {
        document.getElementById('admin-total-games').textContent = allGames.length
    }
}

function getPlaceholderImage(category, title) {
    // Category-specific placeholder colors
    const categoryColors = {
        'Action': { bg: '1a1a25', fg: 'ff4444' },
        'Adventure': { bg: '1a2520', fg: '00ff88' },
        'RPG': { bg: '1a1a28', fg: 'aa77ff' },
        'Strategy': { bg: '201a1a', fg: 'ff8c00' },
        'Puzzle': { bg: '1a2025', fg: '00d4ff' },
        'Simulation': { bg: '1a201a', fg: '77ff77' },
        'Sports': { bg: '251a1a', fg: 'ff6644' },
        'Racing': { bg: '252020', fg: 'ffcc00' },
        'Shooter': { bg: '201a1a', fg: 'ff4444' },
        'Indie': { bg: '201a25', fg: 'ff77aa' },
        'Platformer': { bg: '1a2020', fg: '44ddff' },
        'Arcade': { bg: '202020', fg: 'ffff44' },
        'Board': { bg: '1a1a1a', fg: 'cccccc' },
        'Card': { bg: '1a1a20', fg: '4488ff' },
        'Sandbox': { bg: '201a15', fg: 'ddaa44' }
    }
    
    const colors = categoryColors[category] || { bg: '1a1a25', fg: 'ff4444' }
    const shortTitle = title ? title.substring(0, 15) : 'GAME'
    return `https://placehold.co/400x250/${colors.bg}/${colors.fg}?text=${encodeURIComponent(shortTitle)}&font=montserrat`
}

function displayGames(games) {
    const container = document.getElementById('games-container')
    
    if (!games || games.length === 0) {
        container.innerHTML = `
            <div class="no-games">
                <h3>NO GAMES FOUND</h3>
                <p>Check back soon for new releases!</p>
                ${isAdmin ? '<p style="color: #ff8c00; margin-top: 10px;">Admin: Use the admin panel to add games or visit /populate-games.html</p>' : ''}
            </div>
        `
        return
    }
    
    container.innerHTML = games.map(game => {
        const placeholderImg = getPlaceholderImage(game.category, game.title)
        const imageUrl = game.image_url || placeholderImg
        
        return `
        <div class="game-card" data-id="${game.id}">
            <div class="game-image">
                <img src="${imageUrl}" 
                     alt="${escapeHtml(game.title)}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='${placeholderImg}'">
                <span class="game-badge">${game.category || 'GAME'}</span>
                <div class="game-overlay">
                    <span class="free-tag">FREE</span>
                </div>
            </div>
            <div class="game-content">
                <h3 class="game-title">${escapeHtml(game.title)}</h3>
                <p class="game-description">${escapeHtml(game.description || 'No description available')}</p>
                <div class="game-meta">
                    <span class="game-category">${getCategoryIcon(game.category)} ${game.category || 'General'}</span>
                </div>
                <div class="game-actions">
                    <a href="${escapeHtml(game.download_url)}" class="download-btn" target="_blank" rel="noopener noreferrer" data-game-id="${game.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        DOWNLOAD FREE
                    </a>
                    ${isAdmin ? `
                        <button class="delete-btn" onclick="deleteGame('${game.id}')" title="Delete game">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `}).join('')
    
    // Add event listeners for download buttons
    setTimeout(() => {
        document.querySelectorAll('.download-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                const gameId = this.getAttribute('data-game-id')
                if (gameId) {
                    trackDownload(gameId)
                }
                // Let the link's default behavior proceed
            })
        })
    }, 0)
}

// Track downloads
window.trackDownload = function(gameId) {
    console.log('Download started for game:', gameId)
    showToast('Opening download page... Follow instructions on the official site.', 'success')
    
    // Log download for analytics
    const game = allGames.find(g => g.id === gameId)
    if (game) {
        console.log(`User downloading: ${game.title} from ${game.download_url}`)
    }
}

// Update admin panel games list
function updateAdminPanel() {
    const list = document.getElementById('admin-games-list')
    
    if (!allGames || allGames.length === 0) {
        list.innerHTML = '<p class="loading-text">No games in database</p>'
        return
    }
    
    list.innerHTML = allGames.slice(0, 20).map(game => `
        <div class="admin-game-item">
            <div class="admin-game-info">
                <img class="admin-game-thumb" 
                     src="${game.image_url || 'https://placehold.co/60x45/1a1a25/ff4444?text=G'}" 
                     alt="${game.title}"
                     onerror="this.src='https://placehold.co/60x45/1a1a25/ff4444?text=G'">
                <div class="admin-game-details">
                    <h4>${escapeHtml(game.title)}</h4>
                    <span>${game.category || 'Uncategorized'}</span>
                </div>
            </div>
            <div class="admin-game-actions">
                <button class="admin-delete-btn" onclick="deleteGame('${game.id}')">DELETE</button>
            </div>
        </div>
    `).join('')
}

window.addGame = async function() {
    if (!isAdmin) {
        showToast('Admin access required', 'error')
        return
    }
    
    const title = document.getElementById('game-title').value.trim()
    const description = document.getElementById('game-description').value.trim()
    const downloadUrl = document.getElementById('download-url').value.trim()
    const imageUrl = document.getElementById('image-url').value.trim()
    const category = document.getElementById('category').value
    
    if (!title || !downloadUrl) {
        showToast('Title and Download URL are required', 'error')
        return
    }
    
    const game = {
        title,
        description,
        download_url: downloadUrl,
        image_url: imageUrl,
        category
    }
    
    const { error } = await supabase
        .from('games')
        .insert([game])
    
    if (error) {
        showToast('Error adding game: ' + error.message, 'error')
        console.error('Insert error:', error)
    } else {
        showToast('Game added successfully!', 'success')
        await loadGames()
        updateAdminPanel()
        
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
        showToast('Error deleting game: ' + error.message, 'error')
        console.error('Delete error:', error)
    } else {
        showToast('Game deleted successfully!', 'success')
        await loadGames()
        updateAdminPanel()
    }
}

// ============================================
// SEARCH & FILTER
// ============================================
window.filterGames = function() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase()
    const categoryFilter = document.getElementById('category-filter').value
    
    let filteredGames = allGames
    
    if (searchTerm) {
        filteredGames = filteredGames.filter(game => 
            game.title.toLowerCase().includes(searchTerm) ||
            (game.description && game.description.toLowerCase().includes(searchTerm))
        )
    }
    
    if (categoryFilter) {
        filteredGames = filteredGames.filter(game => 
            game.category === categoryFilter
        )
    }
    
    displayGames(filteredGames)
}

window.filterByCategory = function(category) {
    document.getElementById('category-filter').value = category
    document.getElementById('search-input').value = ''
    filterGames()
    showSection('games')
}

// ============================================
// UTILITIES
// ============================================
function escapeHtml(text) {
    if (!text) return ''
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

function getCategoryIcon(category) {
    const icons = {
        'Action': '⚔️',
        'Adventure': '🗺️',
        'RPG': '🎭',
        'Strategy': '♟️',
        'Puzzle': '🧩',
        'Simulation': '🎛️',
        'Sports': '⚽',
        'Racing': '🏎️',
        'Shooter': '🎯',
        'Indie': '💎',
        'Platformer': '🎮',
        'Arcade': '👾',
        'Board': '🎲',
        'Card': '🃏',
        'Sandbox': '🏗️'
    }
    return icons[category] || '🎮'
}

// Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container')
    const toast = document.createElement('div')
    toast.className = `toast ${type}`
    
    const icon = type === 'success' 
        ? '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
        : '<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    
    toast.innerHTML = `
        ${icon}
        <span class="toast-message">${message}</span>
    `
    
    container.appendChild(toast)
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse'
        setTimeout(() => toast.remove(), 300)
    }, 3000)
}

// ============================================
// INITIALIZE APP
// ============================================
init()
