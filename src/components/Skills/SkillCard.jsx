import { motion } from 'framer-motion'
import { GlowCard } from '../shared/GlowCard'

const pillVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function SkillCard({ icon, label, tags, color = 'cyan', glow = false }) {
  return (
    <GlowCard glowColor={color} style={{ height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '1.4rem' }}>{icon}</span>
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: glow ? 'var(--purple)' : 'var(--cyan)',
          }}
        >
          {label}
        </h3>
        {glow && (
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: '0.6rem',
              color: 'var(--purple)',
              border: '1px solid var(--purple)',
              padding: '0.1rem 0.4rem',
              borderRadius: '4px',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            HOT
          </motion.span>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            className={`tag tag-${color}`}
            custom={i}
            variants={pillVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
    </GlowCard>
  )
}
