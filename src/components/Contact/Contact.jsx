import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, FileDown } from 'lucide-react'
import { SectionReveal, RevealItem } from '../shared/SectionReveal'
import { MagneticButton } from '../shared/MagneticButton'
import { profile } from '../../data/cv'

const contactItems = [
  {
    icon: <Phone size={22} />,
    label: '电话',
    value: profile.contact.phone,
    href: `tel:${profile.contact.phone}`,
    color: 'var(--cyan)',
  },
  {
    icon: <Mail size={22} />,
    label: '邮件',
    value: profile.contact.email,
    href: `mailto:${profile.contact.email}`,
    color: 'var(--purple)',
  },
  {
    icon: <MapPin size={22} />,
    label: '地点',
    value: profile.contact.location,
    href: null,
    color: 'var(--green)',
  },
]

export default function Contact() {
  return (
    <div className="container">
      <SectionReveal>
        <RevealItem>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            联系我 <span className="gradient">Get In Touch</span>
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center' }}>
            欢迎探讨全栈开发、AI 集成或职位机会
          </p>
        </RevealItem>

        <RevealItem>
          <div
            style={{
              display: 'flex',
              gap: '1.25rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {contactItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ scale: 1.04, y: -4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  padding: '1.1rem 1.5rem',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  minWidth: 200,
                  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = item.color
                  e.currentTarget.style.boxShadow = `0 0 20px ${item.color}33`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
                <div>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.value}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </RevealItem>

        <RevealItem>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MagneticButton href="/person-cv-website/resume.pdf">
              <motion.span
                animate={{ boxShadow: ['0 0 0px rgba(0,212,255,0)', '0 0 20px rgba(0,212,255,0.4)', '0 0 0px rgba(0,212,255,0)'] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 2.25rem',
                  borderRadius: '9999px',
                  background: 'var(--grad-cyan)',
                  color: '#050d1a',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                }}
              >
                <FileDown size={18} />
                下载 PDF 简历
              </motion.span>
            </MagneticButton>
          </div>
        </RevealItem>

        {/* Footer */}
        <RevealItem>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.78rem',
              marginTop: '3rem',
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            Built with React + Framer Motion · Deployed on GitHub Pages
          </p>
        </RevealItem>
      </SectionReveal>
    </div>
  )
}
