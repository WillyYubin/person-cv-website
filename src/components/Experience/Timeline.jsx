import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionReveal, RevealItem } from '../shared/SectionReveal'
import ProjectCard from './ProjectCard'
import { experiences } from '../../data/cv'

function TimelineEntry({ exp, index }) {
  return (
    <RevealItem>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3rem' }}>
        {/* Left: time dot + line */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: exp.current ? 'var(--green)' : 'var(--cyan)',
              boxShadow: exp.current
                ? '0 0 0 4px rgba(16,185,129,0.15), 0 0 20px rgba(16,185,129,0.4)'
                : '0 0 0 4px rgba(0,212,255,0.15)',
              zIndex: 1,
              marginTop: '0.35rem',
            }}
          />
          <div
            style={{
              flex: 1,
              width: 1,
              background: 'linear-gradient(to bottom, var(--border), transparent)',
              marginTop: '0.5rem',
            }}
          />
        </div>

        {/* Right: content */}
        <div style={{ flex: 1, paddingBottom: '1rem' }}>
          {/* Company header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {exp.company}
            </h3>
            {exp.current && (
              <motion.span
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  fontSize: '0.65rem',
                  background: 'rgba(16,185,129,0.15)',
                  color: 'var(--green)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '9999px',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                ● 在职
              </motion.span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--cyan)', fontWeight: 500 }}>
              {exp.role}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
              {exp.period}
            </span>
          </div>

          {/* Projects */}
          <div>
            {exp.projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </div>
    </RevealItem>
  )
}

export default function Timeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div className="container" ref={ref}>
      <SectionReveal>
        <RevealItem>
          <h2 className="section-title">
            工作经历 <span className="gradient">Experience</span>
          </h2>
          <p className="section-subtitle">以技术驱动，在医药行业深耕 5 年以上全栈开发</p>
        </RevealItem>

        <div style={{ position: 'relative' }}>
          {/* Animated timeline line */}
          <motion.div
            style={{
              position: 'absolute',
              left: 6,
              top: 0,
              bottom: 0,
              width: 1,
              background: 'var(--cyan)',
              transformOrigin: 'top',
              scaleY,
              opacity: 0.3,
            }}
          />

          <div style={{ paddingLeft: 0 }}>
            {experiences.map((exp, i) => (
              <TimelineEntry key={exp.company} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </SectionReveal>
    </div>
  )
}
