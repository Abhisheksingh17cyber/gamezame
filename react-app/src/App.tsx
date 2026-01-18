import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import {
  LoadingScreen,
  ParticleBackground,
  AuthSection,
  Navbar,
  HeroSection,
  GamesSection,
  CategoriesSection,
  AdminSection,
  Footer,
} from './components'
import { useAuthStore, useGameStore, useUIStore } from './store'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { user, isLoading: authLoading, checkAuth } = useAuthStore()
  const { fetchGames } = useGameStore()
  const { currentSection, setIsLoadingScreen } = useUIStore()

  useEffect(() => {
    // Initialize auth and fetch games
    const init = async () => {
      await checkAuth()
    }
    init()
  }, [checkAuth])

  useEffect(() => {
    // Fetch games when user is authenticated
    if (user) {
      fetchGames()
    }
  }, [user, fetchGames])

  const handleLoadingComplete = () => {
    setIsLoading(false)
    setIsLoadingScreen(false)
  }

  // Show loading screen
  if (isLoading) {
    return (
      <AnimatePresence>
        <LoadingScreen onComplete={handleLoadingComplete} />
      </AnimatePresence>
    )
  }

  // Show auth section if not logged in
  if (!user) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'glass !bg-dark-card !text-white',
            style: {
              background: '#12121a',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            },
            success: {
              iconTheme: {
                primary: '#00ff88',
                secondary: '#12121a',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4444',
                secondary: '#12121a',
              },
            },
          }}
        />
        <AuthSection />
      </>
    )
  }

  // Main app
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background */}
      <ParticleBackground />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'glass !bg-dark-card !text-white',
          style: {
            background: '#12121a',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            iconTheme: {
              primary: '#00ff88',
              secondary: '#12121a',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4444',
              secondary: '#12121a',
            },
          },
        }}
      />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentSection === 'games' && (
            <div key="games">
              <HeroSection />
              <GamesSection />
            </div>
          )}
          {currentSection === 'categories' && (
            <div key="categories" className="pt-24">
              <CategoriesSection />
            </div>
          )}
          {currentSection === 'admin' && (
            <div key="admin" className="pt-24">
              <AdminSection />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
