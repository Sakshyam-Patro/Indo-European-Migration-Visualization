import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

function getInitial(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(QUERY).matches
}

/**
 * Tracks the user's reduced-motion preference and updates when it changes.
 *
 * Framer Motion ships its own hook, but D3 and Leaflet code needs the raw
 * boolean too, so every animation in the app reads this one.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(getInitial)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mql = window.matchMedia(QUERY)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/** Non-reactive read, for imperative code that runs outside React's lifecycle. */
export function prefersReducedMotion(): boolean {
  return getInitial()
}

export default useReducedMotion
