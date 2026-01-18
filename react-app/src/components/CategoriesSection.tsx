import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { useGameStore, getCategoryIcon } from '../store'

const categories = [
  { name: 'Action', description: 'Fast-paced combat and adventure' },
  { name: 'Adventure', description: 'Epic journeys and exploration' },
  { name: 'RPG', description: 'Character progression and storytelling' },
  { name: 'Strategy', description: 'Tactical thinking and planning' },
  { name: 'Shooter', description: 'First and third-person action' },
  { name: 'Sports', description: 'Athletic competition and simulation' },
  { name: 'Racing', description: 'High-speed thrills and competition' },
  { name: 'Simulation', description: 'Real-world experiences recreated' },
]

export function CategoriesSection() {
  const { games, filterByCategory } = useGameStore()

  const getCategoryCount = (category: string) => {
    return games.filter(g => g.category === category).length
  }

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 luxury-grid opacity-10" />
      <div className="absolute top-1/3 left-0 w-1/2 h-96 bg-gradient-to-r from-gold/5 to-transparent blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-6 border border-gold/30 bg-black/50"
          >
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-xs text-gold tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Explore
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-[0.1em] mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-gradient-gold">GAME</span>
            <span className="text-white"> CATEGORIES</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Discover games by genre and find your next adventure
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => {
            const Icon = getCategoryIcon(category.name)
            const count = getCategoryCount(category.name)
            
            return (
              <motion.button
                key={category.name}
                onClick={() => filterByCategory(category.name)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group relative p-8 bg-gradient-to-br from-black-light to-black border border-gold/10 hover:border-gold/40 transition-all duration-500 text-left"
                whileHover={{ y: -8 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Top line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-14 h-14 flex items-center justify-center border border-gold/20 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-300">
                    <Icon className="w-7 h-7 text-gold/70 group-hover:text-gold transition-colors" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 
                    className="text-xl font-semibold text-white group-hover:text-gold transition-colors mb-2"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-white/40 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gold/60 tracking-wider uppercase">
                      {count} Games
                    </span>
                    <span className="text-gold/40 group-hover:text-gold group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-white/40 mb-4">
            Can't find what you're looking for?
          </p>
          <button 
            className="btn-outline-gold"
            onClick={() => filterByCategory(null)}
          >
            <span>View All Games</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
