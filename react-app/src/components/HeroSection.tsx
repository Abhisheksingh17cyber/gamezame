import { motion } from 'framer-motion'
import { Download, Crown, Star, Users, Gamepad2 } from 'lucide-react'
import { useUIStore, useGameStore } from '../store'

export function HeroSection() {
  const { setActiveSection } = useUIStore()
  const { games } = useGameStore()

  const stats = [
    { icon: Gamepad2, value: `${games.length}+`, label: 'Games' },
    { icon: Users, value: '50K+', label: 'Players' },
    { icon: Star, value: '4.9', label: 'Rating' },
    { icon: Crown, value: 'VIP', label: 'Access' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-12">
      {/* Background effects */}
      <div className="absolute inset-0 luxury-grid opacity-20" />
      <div className="absolute top-1/4 left-0 w-1/2 h-96 bg-gradient-to-r from-gold/5 to-transparent blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-1/2 h-96 bg-gradient-to-l from-gold/5 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 border border-gold/30 bg-black/50 backdrop-blur-sm"
          >
            <Crown className="w-4 h-4 text-gold" />
            <span 
              className="text-xs text-gold tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Premium Collection
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] mb-6"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-gradient-gold">DISCOVER</span>
            <br />
            <span className="text-white">LEGENDARY</span>
            <br />
            <span className="text-gradient-gold">GAMES</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Experience the ultimate collection of premium PC games. 
            Download instantly, play forever. Your gateway to gaming excellence.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <motion.button
              onClick={() => setActiveSection('games')}
              className="btn-gold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Browse Collection</span>
            </motion.button>
            
            <motion.button
              onClick={() => setActiveSection('categories')}
              className="btn-outline-gold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Crown className="w-5 h-5" />
              <span>View Categories</span>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 w-full max-w-3xl"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center p-6 bg-black/30 border border-gold/10 hover:border-gold/30 transition-colors"
              >
                <stat.icon className="w-6 h-6 text-gold mb-3" />
                <span 
                  className="text-3xl md:text-4xl font-bold text-gradient-gold mb-1"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-white/50 tracking-[0.15em] uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] text-gold/40 tracking-[0.3em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
