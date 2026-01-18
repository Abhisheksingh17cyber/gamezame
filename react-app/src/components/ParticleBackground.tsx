import { useState } from 'react'

export function ParticleBackground() {
  const [particles] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black-light to-black" />
      
      {/* Radial gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-gold/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/3 bg-gradient-to-t from-gold/3 to-transparent blur-3xl" />
      
      {/* Floating gold particles */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="goldParticle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4d03f" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#d4af37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#aa8c2c" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill="url(#goldParticle)"
            filter="url(#glow)"
            opacity={particle.opacity}
          >
            <animate
              attributeName="cy"
              values={`${particle.y}%;${particle.y - 30}%;${particle.y}%`}
              dur={`${particle.duration}s`}
              begin={`${particle.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values={`${particle.opacity};${particle.opacity * 2};${particle.opacity}`}
              dur={`${particle.duration}s`}
              begin={`${particle.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
      
      {/* Luxury grid overlay */}
      <div className="absolute inset-0 luxury-grid opacity-20" />
      
      {/* Diamond pattern */}
      <div className="absolute inset-0 diamond-pattern opacity-30" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
    </div>
  )
}
