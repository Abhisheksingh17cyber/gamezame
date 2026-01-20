import { motion } from 'framer-motion'
import { Download, Sparkles } from 'lucide-react'
import { useUIStore, useGameStore } from '../store'

export function HeroSection() {
  const { setActiveSection } = useUIStore()
  const { games } = useGameStore()

  return (
    <section className="min-h-screen flex items-center justify-center pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Professional gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-blue-dark/10 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-blue/8 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated accent circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Premium Badge with modern design */}
          <motion.div 
            className="inline-flex items-center gap-3 px-8 py-3 bg-linear-to-r from-blue/10 via-blue/20 to-blue/10 backdrop-blur-xl border border-blue/40 rounded-full mb-10 shadow-2xl shadow-blue/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="w-5 h-5 text-blue animate-pulse" />
            <span className="text-sm text-blue-light font-bold uppercase tracking-[0.2em]">Premium Gaming Experience</span>
          </motion.div>

          {/* Main Heading with professional typography */}
          <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-black text-white mb-10 leading-[0.95]">
            <span className="block">Discover The</span>
            <span className="block mt-4 bg-linear-to-r from-blue-light via-blue to-red bg-clip-text text-transparent drop-shadow-2xl [text-shadow:0_0_40px_rgba(65,105,225,0.3)]">
              Ultimate Collection
            </span>
          </h1>

          {/* Enhanced Description with professional spacing */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-14 leading-relaxed font-light">
            Access our <span className="text-blue font-semibold">premium curated library</span> of professional-grade PC games.
            <span className="block mt-3 text-lg md:text-xl lg:text-2xl">
              Download instantly • Play forever • <span className="text-red font-bold bg-red/10 px-3 py-1 rounded-lg">100% Free</span>
            </span>
          </p>

          {/* CTA Buttons with professional design */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
            <motion.button
              onClick={() => setActiveSection('games')}
              className="btn-blue w-full sm:w-auto text-base"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <Download className="w-5 h-5" />
              <span>Browse Games Library</span>
            </motion.button>
            <motion.button
              onClick={() => setActiveSection('categories')}
              className="btn-outline-blue w-full sm:w-auto text-base"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Explore Categories</span>
            </motion.button>
          </div>

          {/* Professional Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { value: `${games.length}+`, label: 'Premium Games', color: 'blue' },
              { value: '50K+', label: 'Active Users', color: 'blue' },
              { value: '4.9★', label: 'User Rating', color: 'blue' },
              { value: '100%', label: 'Free Access', color: 'red' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${stat.color === 'red' ? 'from-red/20' : 'from-blue/20'} to-transparent blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-0 group-hover:opacity-100`} />
                <div className={`relative p-8 bg-linear-to-br from-black-card to-black-light backdrop-blur-xl border ${stat.color === 'red' ? 'border-red/30 hover:border-red/60' : 'border-blue/30 hover:border-blue/60'} rounded-2xl transition-all duration-500 hover:scale-105`}>
                  <p className={`text-4xl md:text-5xl font-black mb-3 ${stat.color === 'red' ? 'text-red' : 'text-blue'} tracking-tight`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-400 uppercase tracking-[0.15em] font-semibold">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
