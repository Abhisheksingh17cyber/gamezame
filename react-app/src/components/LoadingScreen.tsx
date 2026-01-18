import { motion } from 'framer-motion'
import { Gamepad2 } from 'lucide-react'

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-black via-black-light to-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Luxury grid */}
      <div className="absolute inset-0 luxury-grid opacity-20" />
      
      {/* Gold orbs */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with glow */}
        <motion.div
          className="relative mb-8"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="absolute inset-0 w-20 h-20 rounded-2xl bg-gold blur-xl opacity-40" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 text-black" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold tracking-[0.2em] mb-3 text-gradient-gold"
          style={{ fontFamily: "'Cinzel', serif" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          GAMEZAME
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gold/50 text-sm tracking-[0.3em] uppercase mb-12"
          style={{ fontFamily: "'Cinzel', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Premium Gaming
        </motion.p>

        {/* Loading bar */}
        <div className="w-64 h-0.5 bg-gold/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Loading text */}
        <motion.p
          className="mt-6 text-xs text-gold/40 tracking-[0.3em] uppercase"
          style={{ fontFamily: "'Cinzel', serif" }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading Experience
        </motion.p>
      </div>
    </motion.div>
  )
}
