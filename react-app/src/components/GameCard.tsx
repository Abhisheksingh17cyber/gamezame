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

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (game.download_url) {
      toast.success(`Opening ${game.title} download...`)
    } else {
      e.preventDefault()
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
      className="game-card group relative"
    >
      {/* Professional card border glow */}
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue/20 via-blue-dark/20 to-blue/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
      
      <div className="relative bg-linear-to-br from-black-card to-black-light rounded-2xl overflow-hidden border border-gray-800 group-hover:border-blue/40 transition-all duration-500">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={game.image_url || getPlaceholderImage(game.category, game.title)}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = getPlaceholderImage(game.category, game.title)
            }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent opacity-70" />
          
          {/* Category Badge with blue accent */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue/20 backdrop-blur-xl border border-blue/40 rounded-lg text-blue-light text-xs font-bold uppercase tracking-wider shadow-lg">
              <span>{categoryIcon}</span>
              <span>{game.category || 'Game'}</span>
            </span>
          </div>

          {/* Download Button Overlay with professional design */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 backdrop-blur-sm">
            {game.download_url ? (
              <motion.a
                href={game.download_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDownload}
                className="btn-blue text-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Download className="w-4 h-4" />
                <span>Download Now</span>
              </motion.a>
            ) : (
              <motion.button
                onClick={handleDownload}
                className="btn-blue text-sm opacity-50 cursor-not-allowed"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.5 }}
              >
                <Download className="w-4 h-4" />
                <span>Not Available</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Content with professional spacing */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="font-bold text-white text-lg leading-tight line-clamp-1 group-hover:text-blue-light transition-colors">
              {game.title}
            </h3>
            <div className="flex items-center gap-1.5 text-blue-light bg-blue/10 px-2.5 py-1 rounded-lg">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold">4.8</span>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-5 leading-relaxed">
            {game.description || 'Experience this amazing premium game with stunning graphics and gameplay.'}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <span className="inline-flex items-center gap-2 text-xs text-blue font-bold uppercase tracking-widest bg-blue/10 px-3 py-1.5 rounded-lg">
              100% Free
            </span>
            {isAdmin && (
              <button
                onClick={handleDelete}
                className="p-2.5 text-gray-500 hover:text-red hover:bg-red/10 rounded-lg transition-all duration-300 border border-transparent hover:border-red/30"
                title="Delete game"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
