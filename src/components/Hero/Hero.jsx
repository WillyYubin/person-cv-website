import { motion, useScroll, useSpring } from 'framer-motion'
import { Mail, Phone, MapPin, ChevronDown, FileDown } from 'lucide-react'
import { useTypewriter } from '../../hooks/useTypewriter'
import { MagneticButton } from '../shared/MagneticButton'
import ParticlesBg from './Particles'
import FloatingTags from './FloatingTags'
import { profile } from '../../data/cv'

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const terminalLines = [
  { key: 'name',     label: 'name',     value: 'Willy Yu (余彬)' },
  { key: 'role',     label: 'role',     value: 'Full Stack Engineer' },
  { key: 'company',  label: 'company',  value: 'Merck China · 5yr+' },
  { key: 'edu',      label: 'edu',      value: 'MSc UCD Ireland' },
  { key: 'cert',     label: 'cert',     value: 'CISSP · CISP' },
  { key: 'location', label: 'location', value: 'Shanghai, China' },
]

function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="progress-bar" style={{ scaleX }} />
}

export default function Hero() {
  const { text, isTyping } = useTypewriter(profile.roles, { speed: 75, pause: 2200 })

  return (
    <>
      <ProgressBar />
      <section
        id="hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.05) 0%, transparent 60%), var(--bg-primary)',
        }}
      >
        <ParticlesBg />

        {/* Cursor glow overlay */}
        <div
          id="cursor-glow"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
              minHeight: '80vh',
              padding: '4rem 0',
            }}
          >
            {/* Left */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
            >
              <motion.p
                variants={fadeUp}
                style={{ color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.9rem' }}
              >
                Hi, I'm
              </motion.p>

              <motion.h1
                variants={fadeUp}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  background: 'var(--grad-text)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {profile.name.en}
                <span style={{ display: 'block', fontSize: '0.55em', WebkitTextFillColor: 'var(--text-secondary)' }}>
                  {profile.name.zh}
                </span>
              </motion.h1>

              {/* Typewriter role */}
              <motion.div
                variants={fadeUp}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  minHeight: '2em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: 'var(--cyan)', fontFamily: "'JetBrains Mono', monospace" }}>▶</span>
                {text}
                <span
                  style={{
                    display: 'inline-block',
                    width: 2,
                    height: '1.1em',
                    background: isTyping ? 'var(--cyan)' : 'transparent',
                    borderRadius: 1,
                    animation: 'blink 1s step-end infinite',
                  }}
                />
              </motion.div>

              <motion.p
                variants={fadeUp}
                style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}
              >
                {profile.summary}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <MagneticButton
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{}}
                >
                  <span
                    style={{
                      background: 'var(--grad-cyan)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      color: 'transparent',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '9999px',
                      border: '1px solid rgba(0,212,255,0.4)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  >
                    查看项目经历
                  </span>
                </MagneticButton>

                <MagneticButton href="/person-cv-website/resume.pdf">
                  <span
                    style={{
                      color: 'var(--text-secondary)',
                      padding: '0.75rem 1.75rem',
                      borderRadius: '9999px',
                      border: '1px solid var(--border)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <FileDown size={16} />
                    下载简历
                  </span>
                </MagneticButton>
              </motion.div>

              {/* Contact row */}
              <motion.div
                variants={fadeUp}
                style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}
              >
                {[
                  { icon: <Phone size={14} />, text: profile.contact.phone },
                  { icon: <Mail size={14} />, text: profile.contact.email, href: `mailto:${profile.contact.email}` },
                  { icon: <MapPin size={14} />, text: profile.contact.location },
                ].map(({ icon, text, href }) => (
                  <a
                    key={text}
                    href={href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--cyan)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                  >
                    {icon}
                    {text}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              {/* Terminal Card */}
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                }}
              >
                {/* Terminal header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid var(--border)',
                    background: 'rgba(0,0,0,0.2)',
                  }}
                >
                  {['#ff5f57', '#ffbd2e', '#28ca41'].map((c) => (
                    <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                  ))}
                  <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>
                    ~ whoami
                  </span>
                </div>
                {/* Terminal body */}
                <div style={{ padding: '1.25rem 1.5rem', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.82rem' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>$ profile --full</p>
                  {terminalLines.map((line, i) => (
                    <motion.div
                      key={line.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + i * 0.1, duration: 0.4 }}
                      style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.4rem' }}
                    >
                      <span style={{ color: 'var(--cyan)', minWidth: 70 }}>{line.label}</span>
                      <span style={{ color: 'var(--text-muted)' }}>:</span>
                      <span style={{ color: 'var(--text-primary)' }}>{line.value}</span>
                    </motion.div>
                  ))}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                    style={{ marginTop: '0.75rem', color: 'var(--green)' }}
                  >
                    ✓ Ready for new challenges
                  </motion.p>
                </div>
              </div>

              {/* Floating tags */}
              <div style={{ height: 200, position: 'relative' }}>
                <FloatingTags />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down arrow */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            cursor: 'pointer',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <ChevronDown size={24} style={{ color: 'var(--text-muted)' }} />
        </motion.div>

        <style>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}</style>
      </section>
    </>
  )
}
