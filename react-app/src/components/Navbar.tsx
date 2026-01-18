import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { 
  Gamepad2, Menu, X, Home, Grid3X3, Trophy, 
  Settings, LogOut, Crown
} from 'lucide-react'
import { useAuthStore, useUIStore } from '../store'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAdmin, logout } = useAuthStore()
  const { activeSection, setActiveSection } = useUIStore()

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'games', label: 'Games', icon: Grid3X3 },
    { id: 'categories', label: 'Categories', icon: Trophy },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Settings }] : []),
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-b border-gold/10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setActiveSection('home')}
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-lg shadow-gold/20">
              <Gamepad2 className="w-6 h-6 text-black" />
            </div>
            <div className="hidden sm:block">
              <h1 
                className="text-xl font-bold tracking-[0.15em] text-gradient-gold"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                GAMEZAME
              </h1>
              <p className="text-[10px] text-gold/50 tracking-[0.2em] uppercase">Premium Gaming</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  relative px-5 py-2.5 text-sm tracking-[0.1em] uppercase transition-all duration-300
                  ${activeSection === item.id 
                    ? 'text-gold' 
                    : 'text-white/60 hover:text-white'}
                `}
                style={{ fontFamily: "'Cinzel', serif" }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {/* User Badge */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-black/50 border border-gold/20">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-light to-gold-dark flex items-center justify-center">
                <Crown className="w-4 h-4 text-black" />
              </div>
              <div className="text-left">
                <p className="text-xs text-gold/70 tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>
                  {isAdmin ? 'Admin' : 'Member'}
                </p>
                <p className="text-xs text-white/60 truncate max-w-[120px]">
                  {user?.email?.split('@')[0]}
                </p>
              </div>
            </div>

            {/* Logout */}
            <motion.button
              onClick={logout}
              className="p-2.5 text-gold/60 hover:text-gold transition-colors border border-gold/20 hover:border-gold/40"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-5 h-5" />
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 text-gold/60 hover:text-gold border border-gold/20"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-gold/10"
          >
            <div className="px-6 py-4 space-y-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setIsMenuOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-sm tracking-[0.1em] uppercase
                    ${activeSection === item.id 
                      ? 'text-gold bg-gold/10 border border-gold/20' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'}
                  `}
                  style={{ fontFamily: "'Cinzel', serif" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
