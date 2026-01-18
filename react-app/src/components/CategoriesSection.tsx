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
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Game Categories</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Explore games by genre and find your next adventure
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCategoryClick(category.name)}
              className="group p-6 bg-[#161616] border border-[#2a2a2a] hover:border-[#d4af37] transition-all text-center"
            >
              <span className="text-3xl mb-3 block">{category.icon}</span>
              <h3 className="font-semibold text-white mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{getCategoryCount(category.name)} games</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
