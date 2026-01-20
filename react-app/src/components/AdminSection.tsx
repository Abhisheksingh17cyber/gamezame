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
    <section className="py-24 px-6 bg-gradient-to-b from-black to-black-card min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Professional Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-blue/10 border border-blue/30 rounded-full mb-6"
          >
            <span className="text-sm text-blue-light font-bold uppercase tracking-[0.15em]">Administration</span>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-white via-blue-light to-white bg-clip-text text-transparent">
              Admin Dashboard
            </span>
          </h2>
          <p className="text-lg text-gray-400">Manage your premium game collection with ease</p>
        </div>

        {/* Professional Add Game Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-16"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue/20 via-blue-dark/20 to-blue/20 rounded-3xl opacity-60 blur-xl" />
          
          <div className="relative bg-gradient-to-br from-black-card to-black-light border border-blue/20 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue/20 flex items-center justify-center">
                <Plus className="w-6 h-6 text-blue" />
              </div>
              <h3 className="text-2xl font-bold text-white">Add New Game</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Game Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter game title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="input-premium py-4"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="input-premium py-4"
                    required
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                  Description
                </label>
                <textarea
                  placeholder="Enter game description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="input-premium resize-none py-4"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Download URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/download"
                    value={formData.download_url}
                    onChange={(e) => setFormData({ ...formData, download_url: e.target.value })}
                    className="input-premium py-4"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                    Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="input-premium py-4"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn-blue w-full md:w-auto text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-5 h-5" />
                <span>Add Game to Library</span>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Professional Games List */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">
              Game Library <span className="text-blue ml-2">({games.length} games)</span>
            </h3>
          </div>

          <div className="space-y-4">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue/10 to-red/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
                
                <div className="relative flex items-center justify-between p-6 bg-gradient-to-br from-black-card to-black-light border border-gray-800 group-hover:border-blue/40 rounded-2xl transition-all duration-500">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-xl bg-blue/10 flex items-center justify-center text-3xl border border-blue/20">
                      {getCategoryIcon(game.category)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1 group-hover:text-blue-light transition-colors">
                        {game.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-blue bg-blue/10 px-3 py-1 rounded-lg font-semibold">
                          {game.category}
                        </span>
                        {game.download_url && (
                          <span className="text-xs text-gray-500">• Download available</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(game.id, game.title)}
                    className="p-3 text-gray-500 hover:text-red hover:bg-red/10 rounded-xl transition-all duration-300 border border-transparent hover:border-red/30"
                    title="Delete game"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {games.length === 0 && (
            <div className="text-center py-20 bg-black-card border border-gray-800 rounded-2xl">
              <p className="text-gray-500 text-lg">No games in the library yet</p>
              <p className="text-gray-600 text-sm mt-2">Add your first game using the form above</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
