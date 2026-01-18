import { useState } from 'react'

interface Particle {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  opacity: number
}

const generateParticles = (): Particle[] => {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.4 + 0.1,
  }))
}

export function ParticleBackground() {
  const [particles] = useState<Particle[]>(generateParticles)

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Subtle gold radial glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 opacity-20"
        style={{ background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)' }}
      />
      
      {/* Floating particles SVG */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="goldParticle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5d861" stopOpacity="1" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={`${particle.x}%`}
            cy={`${particle.y}%`}
            r={particle.size}
            fill="url(#goldParticle)"
            opacity={particle.opacity}
          >
            <animate
              attributeName="cy"
              values={`${particle.y}%;${particle.y - 20}%;${particle.y}%`}
              dur={`${particle.duration}s`}
              begin={`${particle.delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values={`${particle.opacity};${particle.opacity * 1.5};${particle.opacity}`}
              dur={`${particle.duration}s`}
              begin={`${particle.delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
      
      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)' }}
      />
    </div>
  )
}
