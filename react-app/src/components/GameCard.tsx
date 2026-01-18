import { motion } from 'framer-motion'
import { Download, Star, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Game } from '../store'
import { useAuthStore, useGameStore, getCategoryIcon, getPlaceholderImage } from '../store'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const { isAdmin } = useAuthStore()
  const { deleteGame } = useGameStore()
  const categoryIcon = getCategoryIcon(game.category)

  const handleDownload = () => {
    if (game.download_url) {
      window.open(game.download_url, '_blank')
      toast.success(`Opening ${game.title} download...`)
    } else {
      toast.error('Download not available')
    }
  }

  const handleDelete = async () => {
    if (confirm(`Delete "${game.title}"?`)) {
      const result = await deleteGame(game.id)
      if (result.success) {
        toast.success('Game deleted')
      } else {
        toast.error(result.error || 'Failed to delete')
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="game-card group"
    >
      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.image_url || getPlaceholderImage(game.category, game.title)}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = getPlaceholderImage(game.category, game.title)
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="tag-gold">
            <span>{categoryIcon}</span>
            <span>{game.category || 'Game'}</span>
          </span>
        </div>

        {/* Download Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <motion.button
            onClick={handleDownload}
            className="btn-gold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-1">
            {game.title}
          </h3>
          <div className="flex items-center gap-1 text-[#d4af37]">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm">4.8</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
          {game.description || 'Experience this amazing game.'}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 uppercase tracking-wider">Free Download</span>
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="p-2 text-gray-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
