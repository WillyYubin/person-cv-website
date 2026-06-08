import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function GlowCard({ children, className = '', glowColor = 'cyan', style = {} }) {
  const ref = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const [hovered, setHovered] = useState(false)

  const glowVar = glowColor === 'purple'
    ? 'rgba(168, 85, 247, 0.12)'
    : 'rgba(0, 212, 255, 0.08)'

  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015, y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        position: 'relative',
        background: hovered
          ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, ${glowVar} 0%, var(--bg-card) 65%)`
          : 'var(--bg-card)',
        border: `1px solid ${hovered
          ? (glowColor === 'purple' ? 'rgba(168,85,247,0.35)' : 'rgba(0,212,255,0.3)')
          : 'var(--border)'}`,
        borderRadius: '16px',
        padding: '1.75rem',
        transition: 'border-color 0.3s ease',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}
