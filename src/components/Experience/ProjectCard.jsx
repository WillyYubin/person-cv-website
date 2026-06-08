import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function ProjectCard({ project }) {
  const [open, setOpen] = useState(false)
  const tagColor = project.tagColor || 'cyan'

  return (
    <div
      style={{
        borderLeft: '1px solid var(--border)',
        paddingLeft: '1.5rem',
        marginLeft: '1rem',
        marginBottom: '0.75rem',
      }}
    >
      {/* Project header (clickable) */}
      <motion.button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '1rem',
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.75rem 1rem',
          borderRadius: '10px',
          textAlign: 'left',
          transition: 'background 0.2s ease',
        }}
        whileHover={{ backgroundColor: 'rgba(0,212,255,0.04)' }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
              }}
            >
              {project.name}
            </span>
            <span
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {project.period}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
            {project.tags.map((t) => (
              <span key={t} className={`tag tag-${tagColor}`} style={{ fontSize: '0.65rem' }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: 'var(--text-muted)', marginTop: '2px', flexShrink: 0 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0.5rem 1rem 1rem',
                background: 'rgba(0,0,0,0.15)',
                borderRadius: '0 0 10px 10px',
                margin: '0 0 0.25rem',
              }}
            >
              <p
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.75rem',
                  lineHeight: 1.7,
                }}
              >
                🎯 {project.goal}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {project.achievements.map((a, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      fontSize: '0.85rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: 'var(--cyan)', flexShrink: 0, marginTop: '0.15rem' }}>✦</span>
                    <span>{a}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
