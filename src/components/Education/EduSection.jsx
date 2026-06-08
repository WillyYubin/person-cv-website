import { motion } from 'framer-motion'
import { SectionReveal, RevealItem } from '../shared/SectionReveal'
import { education } from '../../data/cv'

function GpaBar({ gpa, gpaMax }) {
  const pct = (gpa / gpaMax) * 100

  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>GPA</span>
        <span style={{ fontSize: '0.8rem', color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace" }}>
          {gpa} / {gpaMax}
        </span>
      </div>
      <div
        style={{
          height: 4,
          background: 'var(--border)',
          borderRadius: 9999,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{
            height: '100%',
            background: 'var(--grad-cyan)',
            borderRadius: 9999,
          }}
        />
      </div>
    </div>
  )
}

function EduCard({ edu, direction }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 16,
        padding: '1.75rem',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
      }}
      whileHover={{
        borderColor: 'rgba(0,212,255,0.3)',
        y: -4,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <span style={{ fontSize: '2rem', marginRight: '0.5rem' }}>{edu.flag}</span>
          <h3
            style={{
              display: 'inline',
              fontSize: '1.05rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            {edu.school}
          </h3>
        </div>
        <span
          style={{
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            fontFamily: "'JetBrains Mono', monospace",
            textAlign: 'right',
            flexShrink: 0,
          }}
        >
          {edu.period}
        </span>
      </div>

      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--cyan)', marginBottom: '0.25rem' }}>
        {edu.degree}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
        {edu.major}
      </p>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        📍 {edu.location}
      </p>

      {/* GPA bar */}
      <GpaBar gpa={edu.gpa} gpaMax={edu.gpaMax} />

      {/* Rank + note */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <span
          style={{
            fontSize: '0.72rem',
            background: 'var(--cyan-dim)',
            color: 'var(--cyan)',
            border: '1px solid rgba(0,212,255,0.25)',
            padding: '0.2rem 0.6rem',
            borderRadius: '9999px',
            fontWeight: 600,
          }}
        >
          {edu.rank}
        </span>
        {edu.note && (
          <span
            style={{
              fontSize: '0.72rem',
              background: 'rgba(16,185,129,0.1)',
              color: 'var(--green)',
              border: '1px solid rgba(16,185,129,0.25)',
              padding: '0.2rem 0.6rem',
              borderRadius: '9999px',
            }}
          >
            ✦ {edu.note}
          </span>
        )}
      </div>

      {/* Courses */}
      <div>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          核心课程
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
          {edu.courses.map((c) => (
            <span
              key={c}
              style={{
                fontSize: '0.7rem',
                color: 'var(--text-secondary)',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--border)',
                padding: '0.15rem 0.5rem',
                borderRadius: '6px',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function EduSection() {
  return (
    <div className="container">
      <SectionReveal>
        <RevealItem>
          <h2 className="section-title">
            教育背景 <span className="gradient">Education</span>
          </h2>
          <p className="section-subtitle">国际名校硕士 · 国内工科学士 · 双语背景</p>
        </RevealItem>
      </SectionReveal>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
        }}
        className="edu-grid"
      >
        {education.map((edu, i) => (
          <EduCard key={edu.school} edu={edu} direction={i % 2 === 0 ? 'left' : 'right'} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
