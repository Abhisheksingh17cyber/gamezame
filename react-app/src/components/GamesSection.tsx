import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Grid3X3, LayoutList, Crown } from 'lucide-react'
import { useGameStore, getCategoryIcon } from '../store'
import { GameCard } from './GameCard'

const categories = ['All', 'Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Sports', 'Racing', 'Simulation', 'Puzzle']

export function GamesSection() {
  const { games, filteredGames, fetchGames, filterByCategory, searchGames, selectedCategory } = useGameStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetchGames()
  }, [fetchGames])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    searchGames(term)
  }

  const handleCategoryFilter = (category: string) => {
    filterByCategory(category === 'All' ? null : category)
    setSearchTerm('')
  }

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 luxury-grid opacity-10" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-6 border border-gold/30 bg-black/50"
          >
            <Crown className="w-4 h-4 text-gold" />
            <span className="text-xs text-gold tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Game Library
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-[0.1em] mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-gradient-gold">PREMIUM</span>
            <span className="text-white"> COLLECTION</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto"
          >
            Browse our curated selection of the finest games
          </motion.p>
        </div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-12"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search games..."
              className="input-premium pl-12 w-full"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 p-1 bg-black/50 border border-gold/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-white'}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${viewMode === 'list' ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-white'}`}
            >
              <LayoutList className="w-5 h-5" />
            </button>
          </div>

          {/* Filter button */}
          <button className="flex items-center gap-2 px-4 py-3 border border-gold/20 text-gold/70 hover:text-gold hover:border-gold/40 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="text-sm tracking-wider" style={{ fontFamily: "'Cinzel', serif" }}>Filters</span>
          </button>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = getCategoryIcon(category)
            const isActive = (selectedCategory === null && category === 'All') || selectedCategory === category
            
            return (
              <motion.button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 text-sm tracking-wider transition-all duration-300
                  ${isActive 
                    ? 'bg-gold text-black' 
                    : 'bg-black/50 text-white/60 border border-gold/20 hover:text-gold hover:border-gold/40'}
                `}
                style={{ fontFamily: "'Cinzel', serif" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4" />
                {category}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-8 pb-4 border-b border-gold/10"
        >
          <p className="text-sm text-white/50">
            Showing <span className="text-gold font-semibold">{filteredGames.length}</span> games
            {selectedCategory && <span> in {selectedCategory}</span>}
          </p>
          <p className="text-xs text-gold/50 tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
            {games.length} Total Games
          </p>
        </motion.div>

        {/* Games Grid */}
        {filteredGames.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`
              grid gap-6
              ${viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-3xl mx-auto'}
            `}
          >
            {filteredGames.map((game, index) => (
              <GameCard key={game.id} game={game} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-gold/40" />
            </div>
            <h3 
              className="text-xl font-semibold text-white/70 mb-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              No Games Found
            </h3>
            <p className="text-white/40 max-w-md">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
