import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Crown, Image, Link, FileText, Tag, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import { useGameStore, getCategoryIcon } from '../store'

const categories = ['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Sports', 'Racing', 'Simulation', 'Puzzle']

export function AdminSection() {
  const { games, addGame, deleteGame } = useGameStore()
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    category: 'Action',
    description: '',
    image_url: '',
    download_url: '',
    size: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.category) {
      toast.error('Name and category are required')
      return
    }

    setIsAdding(true)
    const result = await addGame({
      ...formData,
      featured: false,
    })
    setIsAdding(false)

    if (result.success) {
      toast.success('Game added successfully')
      setFormData({
        name: '',
        category: 'Action',
        description: '',
        image_url: '',
        download_url: '',
        size: '',
      })
    } else {
      toast.error(result.error || 'Failed to add game')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      const result = await deleteGame(id)
      if (result.success) {
        toast.success('Game deleted')
      } else {
        toast.error(result.error || 'Delete failed')
      }
    }
  }

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 relative">
      {/* Background */}
      <div className="absolute inset-0 luxury-grid opacity-10" />
      
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
              Admin Panel
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
            <span className="text-white"> MANAGEMENT</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Game Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-premium p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 flex items-center justify-center border border-gold/30 bg-gold/10">
                <Plus className="w-5 h-5 text-gold" />
              </div>
              <h3 
                className="text-xl font-semibold tracking-wider"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Add New Game
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gold/70 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  <FileText className="w-4 h-4" />
                  Game Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter game name"
                  className="input-premium w-full"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gold/70 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  <Tag className="w-4 h-4" />
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-premium w-full"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gold/70 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  <FileText className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter game description"
                  className="input-premium w-full h-24 resize-none"
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gold/70 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  <Image className="w-4 h-4" />
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                  className="input-premium w-full"
                />
              </div>

              {/* Download URL */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gold/70 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  <Link className="w-4 h-4" />
                  Download URL
                </label>
                <input
                  type="url"
                  value={formData.download_url}
                  onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                  placeholder="https://..."
                  className="input-premium w-full"
                />
              </div>

              {/* Size */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs text-gold/70 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                  Size
                </label>
                <input
                  type="text"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  placeholder="e.g., 50 GB"
                  className="input-premium w-full"
                />
              </div>

              <button
                type="submit"
                disabled={isAdding}
                className="btn-gold w-full justify-center mt-4"
              >
                <Save className="w-4 h-4" />
                {isAdding ? 'Adding...' : 'Add Game'}
              </button>
            </form>
          </motion.div>

          {/* Games List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-premium p-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center border border-gold/30 bg-gold/10">
                  <Crown className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-semibold tracking-wider"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    Game Library
                  </h3>
                  <p className="text-xs text-gold/50">{games.length} Total Games</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {games.length === 0 ? (
                <div className="text-center py-12 text-white/40">
                  No games in library
                </div>
              ) : (
                games.map((game, index) => {
                  const Icon = getCategoryIcon(game.category)
                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-4 bg-black/30 border border-gold/10 hover:border-gold/30 transition-colors group"
                    >
                      <div className="w-10 h-10 flex items-center justify-center border border-gold/20">
                        <Icon className="w-5 h-5 text-gold/60" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white truncate">{game.name}</h4>
                        <p className="text-xs text-gold/50">{game.category}</p>
                      </div>
                      
                      <button
                        onClick={() => handleDelete(game.id, game.name)}
                        className="p-2 text-white/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )
                })
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
