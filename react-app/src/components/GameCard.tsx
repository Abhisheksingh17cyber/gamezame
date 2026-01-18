import { motion } from 'framer-motion'
import { Download, Trash2, Star, Crown } from 'lucide-react'
import Tilt from 'react-parallax-tilt'
import toast from 'react-hot-toast'
import { useAuthStore, useGameStore, getCategoryIcon, getPlaceholderImage } from '../store'
import type { Game } from '../store'

interface GameCardProps {
  game: Game
  index: number
}

export function GameCard({ game, index }: GameCardProps) {
  const { isAdmin } = useAuthStore()
  const { deleteGame } = useGameStore()
  const CategoryIcon = getCategoryIcon(game.category)

  const handleDownload = () => {
    if (game.download_url) {
      window.open(game.download_url, '_blank')
      toast.success(`Opening ${game.name} download...`)
    } else {
      toast.error('Download link not available')
    }
  }

  const handleDelete = async () => {
    if (confirm(`Delete "${game.name}"?`)) {
      const result = await deleteGame(game.id)
      if (result.success) {
        toast.success('Game deleted')
      } else {
        toast.error(result.error || 'Delete failed')
      }
    }
  }

  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      scale={1.02}
      transitionSpeed={400}
      className="h-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group h-full"
      >
        <div className="card-premium h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={game.image_url || getPlaceholderImage(game.category)}
              alt={game.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = getPlaceholderImage(game.category)
              }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Top badges */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              <div className="tag-gold flex items-center gap-1.5">
                <CategoryIcon className="w-3 h-3" />
                <span>{game.category}</span>
              </div>
              
              {game.featured && (
                <div className="flex items-center gap-1 px-2 py-1 bg-gold/90 text-black text-[10px] font-bold tracking-wider">
                  <Crown className="w-3 h-3" />
                  FEATURED
                </div>
              )}
            </div>

            {/* Download button on hover */}
            <motion.button
              onClick={handleDownload}
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 btn-gold py-2 px-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-4 h-4" />
              <span className="text-xs">Download</span>
            </motion.button>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 flex flex-col">
            {/* Title & Rating */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 
                className="text-lg font-semibold text-white group-hover:text-gold transition-colors line-clamp-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {game.name}
              </h3>
              
              <div className="flex items-center gap-1 text-gold">
                <Star className="w-4 h-4 fill-gold" />
                <span className="text-sm">4.8</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-white/50 leading-relaxed line-clamp-2 mb-4 flex-1">
              {game.description || 'Experience the thrill of this amazing game. Download now and start your adventure.'}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gold/10">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gold/70 tracking-wider uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  {game.size || 'Various'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isAdmin && (
                  <motion.button
                    onClick={handleDelete}
                    className="p-2 text-white/40 hover:text-red-400 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Tilt>
  )
}
