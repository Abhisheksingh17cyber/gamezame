import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useGameStore, getCategoryIcon } from '../store'

const CATEGORIES = ['Action', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Racing', 'Simulation', 'Puzzle', 'Sports', 'Platformer', 'Arcade', 'Sandbox']

export function AdminSection() {
  const { games, addGame, deleteGame } = useGameStore()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Action',
    download_url: '',
    image_url: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) {
      toast.error('Title is required')
      return
    }

    const result = await addGame(formData)
    if (result.success) {
      toast.success('Game added!')
      setFormData({ title: '', description: '', category: 'Action', download_url: '', image_url: '' })
    } else {
      toast.error(result.error || 'Failed to add game')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      const result = await deleteGame(id)
      if (result.success) {
        toast.success('Game deleted')
      } else {
        toast.error(result.error || 'Failed to delete')
      }
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Admin Panel</h2>
          <p className="text-gray-500">Manage your game collection</p>
        </div>

        {/* Add Game Form */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-8 mb-12">
          <h3 className="text-lg font-semibold text-white mb-6">Add New Game</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Game Title *"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-premium"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="input-premium"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="input-premium resize-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="Download URL"
                value={formData.download_url}
                onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                className="input-premium"
              />
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="input-premium"
              />
            </div>
            <motion.button
              type="submit"
              className="btn-gold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Game</span>
            </motion.button>
          </form>
        </div>

        {/* Games List */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-6">All Games ({games.length})</h3>
          <div className="space-y-2">
            {games.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between p-4 bg-[#161616] border border-[#2a2a2a]"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">{getCategoryIcon(game.category)}</span>
                  <div>
                    <h4 className="font-medium text-white">{game.title}</h4>
                    <p className="text-xs text-gray-500">{game.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(game.id, game.title)}
                  className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
