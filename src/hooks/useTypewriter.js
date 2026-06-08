import { useState, useEffect, useRef } from 'react'

export function useTypewriter(words, { speed = 80, deleteSpeed = 40, pause = 2000 } = {}) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting
  const timeoutRef = useRef(null)

  useEffect(() => {
    const word = words[wordIndex % words.length]

    if (phase === 'typing') {
      if (displayed.length < word.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1))
        }, speed)
      } else {
        timeoutRef.current = setTimeout(() => setPhase('pausing'), pause)
      }
    } else if (phase === 'pausing') {
      timeoutRef.current = setTimeout(() => setPhase('deleting'), 300)
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, deleteSpeed)
      } else {
        setWordIndex((i) => i + 1)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeoutRef.current)
  }, [displayed, phase, wordIndex, words, speed, deleteSpeed, pause])

  return { text: displayed, isTyping: phase === 'typing' }
}
