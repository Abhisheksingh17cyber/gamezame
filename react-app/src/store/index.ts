import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { Game, User } from '../lib/supabase'

export type { Game, User } from '../lib/supabase'

interface AuthState {
  user: User | null
  isAdmin: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setIsAdmin: (isAdmin: boolean) => void
  setIsLoading: (isLoading: boolean) => void
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  checkAdmin: () => Promise<void>
}

interface GameState {
  games: Game[]
  filteredGames: Game[]
  isLoading: boolean
  searchQuery: string
  categoryFilter: string
  viewMode: 'grid' | 'list'
  setGames: (games: Game[]) => void
  setFilteredGames: (games: Game[]) => void
  setSearchQuery: (query: string) => void
  setCategoryFilter: (category: string) => void
  setViewMode: (mode: 'grid' | 'list') => void
  fetchGames: () => Promise<void>
  addGame: (game: Omit<Game, 'id' | 'created_at'>) => Promise<{ success: boolean; error?: string }>
  deleteGame: (id: string) => Promise<{ success: boolean; error?: string }>
  filterGames: () => void
}

interface UIState {
  currentSection: 'games' | 'categories' | 'admin'
  isLoadingScreen: boolean
  setCurrentSection: (section: 'games' | 'categories' | 'admin') => void
  setIsLoadingScreen: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAdmin: false,
  isLoading: true,

  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setIsLoading: (isLoading) => set({ isLoading }),

  login: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      if (data.user) {
        set({ user: { id: data.user.id, email: data.user.email || '' } })
        await get().checkAdmin()
      }

      return { success: true }
    } catch {
      return { success: false, error: 'An unexpected error occurred' }
    }
  },

  signup: async (email, password) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true }
    } catch {
      return { success: false, error: 'An unexpected error occurred' }
    }
  },

  logout: async () => {
    await supabase.auth.signOut()
    set({ user: null, isAdmin: false })
  },

  checkAuth: async () => {
    set({ isLoading: true })
    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        set({ user: { id: session.user.id, email: session.user.email || '' } })
        await get().checkAdmin()
      }
    } finally {
      set({ isLoading: false })
    }
  },

  checkAdmin: async () => {
    const { user } = get()
    if (!user) return

    const { data } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', user.id)
      .single()

    set({ isAdmin: !!data })
  },
}))

export const useGameStore = create<GameState>((set, get) => ({
  games: [],
  filteredGames: [],
  isLoading: false,
  searchQuery: '',
  categoryFilter: '',
  viewMode: 'grid',

  setGames: (games) => set({ games }),
  setFilteredGames: (filteredGames) => set({ filteredGames }),
  setSearchQuery: (searchQuery) => {
    set({ searchQuery })
    get().filterGames()
  },
  setCategoryFilter: (categoryFilter) => {
    set({ categoryFilter })
    get().filterGames()
  },
  setViewMode: (viewMode) => set({ viewMode }),

  fetchGames: async () => {
    set({ isLoading: true })
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching games:', error)
        return
      }

      set({ games: data || [], filteredGames: data || [] })
    } finally {
      set({ isLoading: false })
    }
  },

  addGame: async (game) => {
    try {
      const { error } = await supabase.from('games').insert([game])

      if (error) {
        return { success: false, error: error.message }
      }

      await get().fetchGames()
      return { success: true }
    } catch {
      return { success: false, error: 'An unexpected error occurred' }
    }
  },

  deleteGame: async (id) => {
    try {
      const { error } = await supabase.from('games').delete().eq('id', id)

      if (error) {
        return { success: false, error: error.message }
      }

      await get().fetchGames()
      return { success: true }
    } catch {
      return { success: false, error: 'An unexpected error occurred' }
    }
  },

  filterGames: () => {
    const { games, searchQuery, categoryFilter } = get()
    let filtered = [...games]

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(query) ||
          (game.description && game.description.toLowerCase().includes(query))
      )
    }

    if (categoryFilter) {
      filtered = filtered.filter((game) => game.category === categoryFilter)
    }

    set({ filteredGames: filtered })
  },
}))

export const useUIStore = create<UIState>((set) => ({
  currentSection: 'games',
  isLoadingScreen: true,

  setCurrentSection: (currentSection) => set({ currentSection }),
  setIsLoadingScreen: (isLoadingScreen) => set({ isLoadingScreen }),
}))

// Categories data
export const categories = [
  { id: 'action', name: 'Action', icon: '⚔️', description: 'High-octane combat & battles', color: 'from-red-500 to-orange-500' },
  { id: 'adventure', name: 'Adventure', icon: '🗺️', description: 'Epic journeys await', color: 'from-emerald-500 to-teal-500' },
  { id: 'rpg', name: 'RPG', icon: '🎭', description: 'Build your legend', color: 'from-purple-500 to-pink-500' },
  { id: 'strategy', name: 'Strategy', icon: '♟️', description: 'Outsmart your enemies', color: 'from-amber-500 to-yellow-500' },
  { id: 'puzzle', name: 'Puzzle', icon: '🧩', description: 'Challenge your mind', color: 'from-cyan-500 to-blue-500' },
  { id: 'racing', name: 'Racing', icon: '🏎️', description: 'Speed & adrenaline', color: 'from-orange-500 to-red-500' },
  { id: 'shooter', name: 'Shooter', icon: '🎯', description: 'Lock and load', color: 'from-red-600 to-rose-500' },
  { id: 'simulation', name: 'Simulation', icon: '🎛️', description: 'Build & manage', color: 'from-green-500 to-emerald-500' },
  { id: 'sports', name: 'Sports', icon: '⚽', description: 'Game on!', color: 'from-blue-500 to-indigo-500' },
  { id: 'indie', name: 'Indie', icon: '💎', description: 'Hidden gems', color: 'from-pink-500 to-purple-500' },
]

export const getCategoryIcon = (category: string | null) => {
  const icons: Record<string, string> = {
    Action: '⚔️',
    Adventure: '🗺️',
    RPG: '🎭',
    Strategy: '♟️',
    Puzzle: '🧩',
    Simulation: '🎛️',
    Sports: '⚽',
    Racing: '🏎️',
    Shooter: '🎯',
    Indie: '💎',
    Platformer: '🎮',
    Arcade: '👾',
    Board: '🎲',
    Card: '🃏',
    Sandbox: '🏗️',
  }
  return icons[category || ''] || '🎮'
}

export const getPlaceholderImage = (category: string | null, title: string) => {
  const categoryColors: Record<string, { bg: string; fg: string }> = {
    Action: { bg: '1a1a25', fg: 'ff4444' },
    Adventure: { bg: '1a2520', fg: '00ff88' },
    RPG: { bg: '1a1a28', fg: 'aa77ff' },
    Strategy: { bg: '201a1a', fg: 'ff8c00' },
    Puzzle: { bg: '1a2025', fg: '00d4ff' },
    Simulation: { bg: '1a201a', fg: '77ff77' },
    Sports: { bg: '251a1a', fg: 'ff6644' },
    Racing: { bg: '252020', fg: 'ffcc00' },
    Shooter: { bg: '201a1a', fg: 'ff4444' },
    Indie: { bg: '201a25', fg: 'ff77aa' },
  }

  const colors = categoryColors[category || ''] || { bg: '1a1a25', fg: 'ff4444' }
  const shortTitle = title ? title.substring(0, 15) : 'GAME'
  return `https://placehold.co/400x250/${colors.bg}/${colors.fg}?text=${encodeURIComponent(shortTitle)}&font=montserrat`
}
