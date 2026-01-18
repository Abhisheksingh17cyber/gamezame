import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, UserPlus, LogIn, Gamepad2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store'
import { ParticleBackground } from './ParticleBackground'

export function AuthSection() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, signup } = useAuthStore()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }

    setIsLoading(true)
    const result = await login(email, password)
    setIsLoading(false)

    if (result.success) {
      toast.success('Welcome back!')
    } else {
      toast.error(result.error || 'Login failed')
    }
  }

  const handleSignup = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    const result = await signup(email, password)
    setIsLoading(false)

    if (result.success) {
      toast.success('Account created! You can now login.')
    } else {
      toast.error(result.error || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center justify-center w-20 h-20 mb-6"
            style={{ background: 'linear-gradient(135deg, #f5d861 0%, #d4af37 50%, #9a7b2f 100%)' }}
          >
            <Gamepad2 className="w-10 h-10 text-black" />
          </motion.div>

          <h1 className="font-display text-4xl font-bold text-white mb-2 tracking-wide">
            GAMEZAME
          </h1>
          <p className="text-gray-500 text-sm tracking-widest uppercase">
            Premium Gaming Platform
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-[#161616] border border-[#2a2a2a] p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-premium pl-12"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-premium pl-12"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-gold flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </motion.button>

              <motion.button
                type="button"
                disabled={isLoading}
                onClick={handleSignup}
                className="btn-outline-gold flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </motion.button>
            </div>
          </form>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-600 text-sm mt-8">
          Access 130+ premium games instantly
        </p>
      </motion.div>
    </div>
  )
}
