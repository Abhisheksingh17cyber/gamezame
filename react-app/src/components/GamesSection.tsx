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
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Game Library</h2>
          <p className="text-gray-500 max-w-md mx-auto">
            Browse our collection of {games.length}+ premium games
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              className="input-premium pl-12 w-full"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 border transition-colors ${viewMode === 'grid' ? 'border-[#d4af37] text-[#d4af37]' : 'border-[#2a2a2a] text-gray-500'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 border transition-colors ${viewMode === 'list' ? 'border-[#d4af37] text-[#d4af37]' : 'border-[#2a2a2a] text-gray-500'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat === 'All' ? '' : cat)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                (cat === 'All' && !categoryFilter) || categoryFilter === cat
                  ? 'bg-[#d4af37] text-black'
                  : 'bg-[#161616] text-gray-400 border border-[#2a2a2a] hover:border-[#d4af37] hover:text-[#d4af37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <motion.div
          layout
          className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
        >
          {displayGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </motion.div>

        {displayGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500">No games found</p>
          </div>
        )}
      </div>
    </section>
  )
}
