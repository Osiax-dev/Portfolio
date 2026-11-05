import { useEffect, useState } from 'react'

/** Masque l'en-tête quand on descend, le réaffiche dès qu'on remonte. */
export function useHideOnScroll(threshold = 8) {
  const [state, setState] = useState({ hidden: false, scrolled: false })

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const delta = y - lastY
      if (Math.abs(delta) > threshold) {
        setState({ hidden: delta > 0 && y > 240, scrolled: y > 16 })
        lastY = y
      } else if (y <= 16) {
        setState({ hidden: false, scrolled: false })
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return state
}
