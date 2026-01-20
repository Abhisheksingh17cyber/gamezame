import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gamepad2 } from 'lucide-react'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div 
          className="w-16 h-16 flex items-center justify-center mb-6"
          style={{ background: 'linear-gradient(135deg, #f5d861 0%, #d4af37 50%, #9a7b2f 100%)' }}
        >
          <Gamepad2 className="w-8 h-8 text-black" />
        </div>

        <h1 className="font-display text-3xl font-bold text-white mb-2 tracking-wide">
          GAMEZAME
        </h1>
        
        <p className="text-gray-500 text-sm tracking-widest uppercase mb-8">
          Loading
        </p>

        <div className="w-48 h-0.5 bg-[#2a2a2a] overflow-hidden">
          <motion.div
            className="h-full"
            style={{ background: 'linear-gradient(90deg, #9a7b2f, #d4af37, #f5d861)' }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
