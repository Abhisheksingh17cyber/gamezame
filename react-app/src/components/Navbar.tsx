import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gamepad2, Home, Grid3X3, Crown, LogOut, Menu, X } from 'lucide-react'
import { useAuthStore, useUIStore } from '../store'

export function Navbar() {
  const { user, isAdmin, logout } = useAuthStore()
  const { activeSection, setActiveSection } = useUIStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'categories', label: 'Categories', icon: Grid3X3 },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Crown }] : []),
  ] as const

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #f5d861, #d4af37, #9a7b2f)' }}
            >
              <Gamepad2 className="w-5 h-5 text-black" />
            </div>
            <span className="font-display text-lg font-bold text-white tracking-wide">
              GAMEZAME
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as typeof activeSection)}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-4 h-4 mr-2 inline" />
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-white font-medium">{isAdmin ? 'Admin' : 'Player'}</p>
              <p className="text-xs text-gray-500 truncate max-w-[120px]">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-gray-400 hover:text-[#d4af37] transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#161616] border-t border-[#2a2a2a]"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as typeof activeSection)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#2a2a2a] transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-[#2a2a2a] transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
