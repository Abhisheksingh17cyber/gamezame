import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, UserPlus, LogIn, Gamepad2, Crown } from 'lucide-react'
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
      toast.success('Welcome back, Player!')
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
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-lg mx-auto"
      >
        {/* Logo Section - Perfectly Centered */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-8"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-gold-light to-gold-dark blur-xl opacity-50 animate-pulse-gold" />
            
            {/* Icon container */}
            <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-2xl">
              <Gamepad2 className="w-12 h-12 text-black" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold tracking-wider mb-4"
            style={{ fontFamily: "'Cinzel', serif" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gradient-gold">GAMEZAME</span>
          </motion.h1>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/50" />
            <p className="text-gold/80 tracking-[0.3em] text-sm uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Premium Gaming
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/50" />
          </motion.div>
        </div>

        {/* Auth Card - Premium Glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-premium"
        >
          {/* Premium Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20 bg-black/50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gold/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-gold/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-gold" />
            </div>
            <span className="text-xs text-gold/60 tracking-[0.2em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Secure Portal
            </span>
          </div>

          {/* Form - Properly Aligned */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div className="space-y-3">
              <label 
                className="block text-xs tracking-[0.2em] text-gold/70 uppercase" 
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="input-premium pl-12 w-full"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label 
                className="block text-xs tracking-[0.2em] text-gold/70 uppercase" 
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/50" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-premium pl-12 w-full"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={isLoading}
                className="btn-gold flex-1 justify-center"
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
                className="btn-outline-gold flex-1 justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Footer - Centered */}
        <motion.div
          className="flex flex-col items-center mt-10 space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <Crown className="w-4 h-4 text-gold" />
            <span 
              className="text-sm text-gold/60 tracking-[0.2em] uppercase" 
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Premium Gaming Experience
            </span>
            <Crown className="w-4 h-4 text-gold" />
          </div>
          <p className="text-xs text-text-muted tracking-wider">
            Access to 1000+ Premium Games
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
