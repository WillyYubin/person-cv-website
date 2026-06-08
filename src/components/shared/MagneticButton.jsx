import { motion } from 'framer-motion'
import { useMagnet } from '../../hooks/useMagnet'

export function MagneticButton({ children, className = '', onClick, href, style = {} }) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagnet(0.3)

  const Tag = href ? 'a' : 'button'
  const linkProps = href ? { href, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: 'inline-block', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Tag
        className={`magnetic-btn ${className}`}
        onClick={onClick}
        {...linkProps}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1.75rem',
          borderRadius: '9999px',
          font: 'inherit',
          fontSize: '0.9rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          textDecoration: 'none',
          border: 'none',
        }}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
