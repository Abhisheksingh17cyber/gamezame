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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-2xl border-b border-blue/20 shadow-2xl shadow-blue/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo with professional royal blue design */}
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-light to-blue blur-lg group-hover:blur-xl transition-all opacity-60 group-hover:opacity-100" />
              <div 
                className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-2xl shadow-blue/30 border border-blue/30"
                style={{ background: 'linear-gradient(135deg, #4169e1, #0047ab)' }}
              >
                <Gamepad2 className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <span className="font-display text-2xl font-black bg-gradient-to-r from-white via-blue-light to-white bg-clip-text text-transparent tracking-tight">
                GAMEZAME
              </span>
              <p className="text-[10px] text-blue/80 uppercase tracking-[0.25em] font-bold -mt-1">Premium Gaming Hub</p>
            </div>
          </div>

          {/* Desktop Navigation with professional design */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as typeof activeSection)}
                  className={`relative px-6 py-3 flex items-center gap-2.5 font-bold text-sm uppercase tracking-[0.1em] transition-all duration-300 rounded-lg ${
                    isActive 
                      ? 'text-blue bg-blue/10' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-light via-blue to-blue-dark rounded-t-full"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* User Section with professional styling */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right px-5 py-2.5 bg-gradient-to-br from-black-card to-black-light backdrop-blur-xl border border-blue/20 rounded-xl shadow-lg">
              <p className="text-sm text-white font-black uppercase tracking-[0.1em] flex items-center gap-2">
                {isAdmin && <Crown className="w-4 h-4 text-blue animate-pulse" />}
                {isAdmin ? 'Administrator' : 'Player'}
              </p>
              <p className="text-xs text-gray-500 truncate max-w-[140px] font-medium">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="px-5 py-3 bg-red/10 hover:bg-red/20 text-red hover:text-red-light rounded-xl transition-all duration-300 border border-red/30 hover:border-red/50 font-semibold text-sm uppercase tracking-wider shadow-lg hover:shadow-red/20"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Menu Button with blue hover */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 text-gray-400 hover:text-blue transition-colors rounded-lg hover:bg-blue/10"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with professional design */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black-card/95 backdrop-blur-xl border-t border-blue/20"
          >
            <div className="px-6 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSection === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as typeof activeSection)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-semibold transition-all ${
                      isActive 
                        ? 'text-blue bg-blue/10 border border-blue/30' 
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                )
              })}
              <button
                onClick={logout}
                className="w-full flex items-center gap-4 px-5 py-4 text-red rounded-xl hover:bg-red/10 transition-all border border-red/30 font-semibold"
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
