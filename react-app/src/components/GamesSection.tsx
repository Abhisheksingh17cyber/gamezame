import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid, List } from 'lucide-react'
import { useGameStore } from '../store'
import { GameCard } from './GameCard'

const CATEGORIES = ['All', 'Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Racing', 'Simulation', 'Puzzle', 'Sports']

export function GamesSection() {
  const { games, filteredGames, setSearchQuery, setCategoryFilter, categoryFilter, viewMode, setViewMode } = useGameStore()
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (value: string) => {
    setSearchInput(value)
    setSearchQuery(value)
  }

  const displayGames = filteredGames.length > 0 || categoryFilter || searchInput ? filteredGames : games

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-black to-black-card">
      <div className="max-w-7xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue/10 border border-blue/30 rounded-full mb-6"
          >
            <span className="text-sm text-blue-light font-bold uppercase tracking-[0.15em]">Game Library</span>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-white via-blue-light to-white bg-clip-text text-transparent">
              Explore Premium Games
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover our curated collection of <span className="text-blue font-semibold">{games.length}+ premium titles</span> across multiple genres
          </p>
        </div>

        {/* Professional Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12 items-center">
          {/* Search with modern design */}
          <div className="relative flex-1 max-w-xl w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search for games by title or description..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              className="input-premium pl-14 pr-6 py-4 w-full text-base"
            />
          </div>

          {/* View Toggle with professional styling */}
          <div className="flex items-center gap-3 bg-black-card border border-gray-800 rounded-xl p-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-blue text-white shadow-lg' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="Grid view"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-lg transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-blue text-white shadow-lg' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
              title="List view"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Professional Category Pills */}
        <div className="flex flex-wrap gap-3 mb-16 justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = (cat === 'All' && !categoryFilter) || categoryFilter === cat
            return (
              <motion.button
                key={cat}
                onClick={() => setCategoryFilter(cat === 'All' ? '' : cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-blue to-blue-dark text-white shadow-lg shadow-blue/30 border border-blue/50'
                    : 'bg-black-card text-gray-400 border border-gray-800 hover:border-blue/40 hover:text-blue hover:bg-blue/5'
                }`}
              >
                {cat}
              </motion.button>
            )
          })}
        </div>

        {/* Professional Games Grid */}
        <motion.div
          layout
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          {displayGames.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GameCard game={game} />
            </motion.div>
          ))}
        </motion.div>

        {/* Professional Empty State */}
        {displayGames.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue/10 border border-blue/20 mb-6">
              <Search className="w-12 h-12 text-blue" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">No games found</h3>
            <p className="text-gray-400 mb-8">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchInput('')
                setSearchQuery('')
                setCategoryFilter('')
              }}
              className="btn-outline-blue"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
