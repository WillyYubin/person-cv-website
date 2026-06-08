import { useCallback, useState, useEffect } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlimPreset } from '@tsparticles/slim'

const particleOptions = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 70, density: { enable: true, area: 900 } },
    color: { value: '#00d4ff' },
    opacity: { value: { min: 0.05, max: 0.3 } },
    size: { value: { min: 1, max: 2.5 } },
    links: {
      enable: true,
      color: '#00d4ff',
      opacity: 0.08,
      distance: 140,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: 'none',
      random: true,
      outModes: { default: 'bounce' },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
    },
    modes: {
      grab: { distance: 120, links: { opacity: 0.25 } },
    },
  },
  detectRetina: true,
}

export default function ParticlesBg() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlimPreset(engine)
    }).then(() => setInit(true))
  }, [])

  const particlesLoaded = useCallback(() => {}, [])

  if (!init) return null

  return (
    <Particles
      id="hero-particles"
      particlesLoaded={particlesLoaded}
      options={particleOptions}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
      }}
    />
  )
}
