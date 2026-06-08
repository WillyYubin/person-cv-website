import { motion } from 'framer-motion'
import { SectionReveal, RevealItem } from '../shared/SectionReveal'
import { certifications } from '../../data/cv'

const colorMap = {
  cyan:   { bg: 'rgba(0,212,255,0.08)',    border: 'rgba(0,212,255,0.3)',    text: '#00d4ff' },
  blue:   { bg: 'rgba(59,130,246,0.08)',   border: 'rgba(59,130,246,0.3)',   text: '#60a5fa' },
  gold:   { bg: 'rgba(234,179,8,0.08)',    border: 'rgba(234,179,8,0.3)',    text: '#fbbf24' },
  green:  { bg: 'rgba(16,185,129,0.08)',   border: 'rgba(16,185,129,0.3)',   text: '#34d399' },
  orange: { bg: 'rgba(249,115,22,0.08)',   border: 'rgba(249,115,22,0.3)',   text: '#fb923c' },
  gray:   { bg: 'rgba(100,116,139,0.08)',  border: 'rgba(100,116,139,0.3)',  text: '#94a3b8' },
}

export default function BadgeList() {
  return (
    <div className="container">
      <SectionReveal>
        <RevealItem>
          <h2 className="section-title">
            资质证书 <span className="gradient">Certifications</span>
          </h2>
          <p className="section-subtitle">专业认证 · 学术荣誉 · 语言能力</p>
        </RevealItem>

        <RevealItem>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
            }}
          >
            {certifications.map((cert, i) => {
              const c = colorMap[cert.color] || colorMap.gray
              return (
                <motion.div
                  key={cert.label}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.7rem 1.1rem',
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    borderRadius: '12px',
                    cursor: 'default',
                    transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 20px ${c.border}`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{cert.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.82rem', color: c.text, fontWeight: 600, lineHeight: 1.3 }}>
                      {cert.label}
                    </p>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                      {cert.year}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </RevealItem>
      </SectionReveal>
    </div>
  )
}
