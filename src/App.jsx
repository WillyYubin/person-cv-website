import { useEffect } from 'react'
import Lenis from 'lenis'
import Hero from './components/Hero/Hero'
import SideNav from './components/Nav/SideNav'
import SkillSection from './components/Skills/SkillSection'
import Timeline from './components/Experience/Timeline'
import EduSection from './components/Education/EduSection'
import BadgeList from './components/Certifications/BadgeList'
import Contact from './components/Contact/Contact'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="app">
      <SideNav />
      <main>
        <section id="hero" style={{ minHeight: '100vh', padding: 0 }}>
          <Hero />
        </section>

        <section id="skills" style={{ padding: 'var(--section-pad) 0' }}>
          <SkillSection />
        </section>

        <section id="experience" style={{ padding: 'var(--section-pad) 0' }}>
          <Timeline />
        </section>

        <section id="education" style={{ padding: 'var(--section-pad) 0' }}>
          <EduSection />
        </section>

        <section id="certifications" style={{ padding: 'var(--section-pad) 0' }}>
          <BadgeList />
        </section>

        <section id="contact" style={{ padding: 'var(--section-pad) 0', paddingBottom: '4rem' }}>
          <Contact />
        </section>
      </main>
    </div>
  )
}
