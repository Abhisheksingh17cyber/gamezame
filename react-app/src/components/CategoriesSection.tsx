import { motion } from 'framer-motion'
import { useGameStore, useUIStore, categories } from '../store'

export function CategoriesSection() {
  const { games, setCategoryFilter } = useGameStore()
  const { setActiveSection } = useUIStore()

  const handleCategoryClick = (categoryName: string) => {
    setCategoryFilter(categoryName)
    setActiveSection('games')
  }

  const getCategoryCount = (categoryName: string) => {
    return games.filter(g => g.category?.toLowerCase() === categoryName.toLowerCase()).length
  }

  return (
    <section className="py-24 px-6 bg-linear-to-b from-black-card to-black">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-red/10 border border-red/30 rounded-full mb-6"
          >
            <span className="text-sm text-red-light font-bold uppercase tracking-[0.15em]">Browse by Genre</span>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-6">
            <span className="bg-linear-to-r from-white via-red-light to-white bg-clip-text text-transparent">
              Game Categories
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore our diverse collection organized by genre. Find exactly what you're looking for.
          </p>
        </div>

        {/* Professional Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const count = getCategoryCount(category.name)
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => handleCategoryClick(category.name)}
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-1 bg-linear-to-r from-blue/30 via-red/30 to-blue/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
                
                <div className="relative p-8 bg-linear-to-br from-black-card to-black-light border border-gray-800 group-hover:border-blue/50 rounded-2xl transition-all duration-500 h-full flex flex-col items-center justify-center text-center">
                  {/* Icon with gradient background */}
                  <div className="w-20 h-20 mb-5 flex items-center justify-center rounded-2xl bg-linear-to-br from-blue/10 to-red/10 group-hover:from-blue/20 group-hover:to-red/20 border border-blue/20 group-hover:border-blue/40 transition-all duration-500">
                    <span className="text-5xl filter drop-shadow-lg">{category.icon}</span>
                  </div>
                  
                  {/* Category name */}
                  <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-light transition-colors">
                    {category.name}
                  </h3>
                  
                  {/* Game count with professional badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue/10 border border-blue/20 rounded-lg">
                    <span className="text-sm font-bold text-blue">{count}</span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Games</span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
