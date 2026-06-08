import { useRef } from 'react'
import { useSpring } from 'framer-motion'

export function useMagnet(strength = 0.35) {
  const ref = useRef(null)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, x, y, handleMouseMove, handleMouseLeave }
}
