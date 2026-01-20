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
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <ParticleBackground />
      
      {/* Professional background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-black to-red/5 pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-red/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Professional Logo */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center justify-center mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-light to-blue blur-2xl opacity-60" />
              <div 
                className="relative w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl border border-blue/30"
                style={{ background: 'linear-gradient(135deg, #4169e1, #0047ab)' }}
              >
                <Gamepad2 className="w-12 h-12 text-white" />
              </div>
            </div>
          </motion.div>

          <h1 className="font-display text-5xl font-black mb-3">
            <span className="bg-gradient-to-r from-white via-blue-light to-white bg-clip-text text-transparent">
              GAMEZAME
            </span>
          </h1>
          <p className="text-blue/80 text-sm tracking-[0.25em] uppercase font-bold">
            Premium Gaming Hub
          </p>
        </div>

        {/* Professional Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {/* Card glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue/20 via-blue-dark/20 to-blue/20 rounded-3xl opacity-60 blur-xl" />
          
          <div className="relative bg-gradient-to-br from-black-card to-black-light border border-blue/20 rounded-3xl p-10 shadow-2xl backdrop-blur-xl">
            <form onSubmit={handleLogin} className="space-y-7">
              {/* Email with professional styling */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="input-premium pl-14 py-4 text-base"
                    required
                  />
                </div>
              </div>

              {/* Password with professional styling */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter secure password"
                    className="input-premium pl-14 py-4 text-base"
                    required
                  />
                </div>
              </div>

              {/* Professional Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="btn-blue flex-1 text-base"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LogIn className="w-5 h-5" />
                  <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
                </motion.button>

                <motion.button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSignup}
                  className="btn-outline-blue flex-1 text-base"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <UserPlus className="w-5 h-5" />
                  <span>{isLoading ? 'Creating...' : 'Register'}</span>
                </motion.button>
              </div>
            </form>

            {/* Professional divider */}
            <div className="mt-8 pt-8 border-t border-blue/10">
              <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                <div className="text-center">
                  <p className="text-2xl font-black text-blue mb-1">130+</p>
                  <p className="text-xs uppercase tracking-wider">Games</p>
                </div>
                <div className="w-px h-10 bg-blue/20" />
                <div className="text-center">
                  <p className="text-2xl font-black text-blue mb-1">100%</p>
                  <p className="text-xs uppercase tracking-wider">Free</p>
                </div>
                <div className="w-px h-10 bg-blue/20" />
                <div className="text-center">
                  <p className="text-2xl font-black text-blue mb-1">4.9★</p>
                  <p className="text-xs uppercase tracking-wider">Rated</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Footer Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-8 font-medium"
        >
          Join thousands of gamers • Instant access • No credit card required
        </motion.p>
      </motion.div>
    </div>
  )
}
