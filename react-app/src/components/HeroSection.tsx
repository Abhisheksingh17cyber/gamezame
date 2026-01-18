import { motion } from 'framer-motion'
import { Download, Sparkles } from 'lucide-react'
import { useUIStore, useGameStore } from '../store'

export function HeroSection() {
  const { setActiveSection } = useUIStore()
  const { games } = useGameStore()

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161616] border border-[#2a2a2a] mb-8">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="text-sm text-gray-400 uppercase tracking-wider">Premium Collection</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover
            <span className="block text-gradient-gold">Legendary Games</span>
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Access our curated collection of premium PC games. Download instantly, play forever.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.button
              onClick={() => setActiveSection('games')}
              className="btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5" />
              <span>Browse Games</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveSection('categories')}
              className="btn-outline-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>View Categories</span>
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {[
              { value: `${games.length}+`, label: 'Games' },
              { value: '50K+', label: 'Downloads' },
              { value: '4.9', label: 'Rating' },
              { value: 'Free', label: 'Access' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center p-4 bg-[#161616] border border-[#2a2a2a]"
              >
                <p className="text-2xl font-bold text-[#d4af37] mb-1">{stat.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
