import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { navItems } from '../../data/cv'
import { Menu, X } from 'lucide-react'

const ids = navItems.map((n) => n.id)

export default function SideNav() {
  const active = useScrollSpy(ids)
  const [mobileOpen, setMobileOpen] = useState(false)

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      {/* Desktop side nav */}
      <nav
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: 'var(--nav-width)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          zIndex: 100,
          borderRight: '1px solid var(--border)',
          background: 'rgba(10, 22, 40, 0.85)',
          backdropFilter: 'blur(12px)',
        }}
        className="side-nav-desktop"
      >
        {/* Logo / monogram */}
        <div
          style={{
            position: 'absolute',
            top: '1.5rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: '0.8rem',
            color: 'var(--cyan)',
            letterSpacing: 1,
          }}
        >
          WY
        </div>

        {/* Nav dots */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <div key={item.id} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {/* Tooltip */}
                <div
                  className="nav-tooltip"
                  style={{
                    position: 'absolute',
                    left: 'calc(100% + 12px)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    whiteSpace: 'nowrap',
                    opacity: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.2s ease',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {item.label}
                </div>

                <motion.button
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={(e) => {
                    const tooltip = e.currentTarget.previousElementSibling
                    if (tooltip) tooltip.style.opacity = '1'
                  }}
                  onMouseLeave={(e) => {
                    const tooltip = e.currentTarget.previousElementSibling
                    if (tooltip) tooltip.style.opacity = '0'
                  }}
                  style={{
                    width: isActive ? 10 : 8,
                    height: isActive ? 10 : 8,
                    borderRadius: '50%',
                    background: isActive ? 'var(--cyan)' : 'var(--border)',
                    border: isActive ? '2px solid var(--cyan)' : '2px solid transparent',
                    cursor: 'pointer',
                    padding: 0,
                    boxShadow: isActive ? 'var(--cyan-glow)' : 'none',
                    transition: 'all 0.3s ease',
                  }}
                  whileHover={{ scale: 1.4 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={item.label}
                />
              </div>
            )
          })}
        </div>
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 200,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          width: 44,
          height: 44,
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--text-primary)',
        }}
        className="mobile-menu-btn"
        aria-label="Menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(5, 13, 26, 0.97)',
              zIndex: 150,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
            }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  color: active === item.id ? 'var(--cyan)' : 'var(--text-secondary)',
                  transition: 'color 0.2s ease',
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .side-nav-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}
