import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface LazyMountProps {
  /** Anchor id, held by the placeholder so in-page navigation works before mount. */
  id: string
  children: ReactNode
  /** Reserved height so the scrollbar does not jump as sections mount. */
  placeholderMinHeight?: string
  /** How far ahead of the viewport to start loading. */
  rootMargin?: string
}

/**
 * Defers mounting a section until it approaches the viewport.
 *
 * `React.lazy` alone only defers parsing: every section rendered on the first
 * pass fetches its chunk immediately. Gating the mount means a visitor who
 * never scrolls past the hero never downloads the tree, map, or chart chunks.
 *
 * The placeholder carries the section id so header navigation and deep links
 * still resolve to a real element while the section is unmounted.
 */
export default function LazyMount({
  id,
  children,
  placeholderMinHeight = '60vh',
  rootMargin = '600px 0px',
}: LazyMountProps) {
  // Mount immediately when there is no observer to gate on, or when the page
  // was opened on a deep link to this section.
  const [shouldMount, setShouldMount] = useState(
    () =>
      typeof IntersectionObserver === 'undefined' ||
      (typeof window !== 'undefined' && window.location.hash === `#${id}`)
  )
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldMount) return
    const node = placeholderRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setShouldMount(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldMount, rootMargin])

  // Navigating to this section's hash must mount it even if it is off-screen.
  useEffect(() => {
    if (shouldMount) return
    const onHashChange = () => {
      if (window.location.hash === `#${id}`) setShouldMount(true)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [shouldMount, id])

  if (shouldMount) return <>{children}</>

  return <div id={id} ref={placeholderRef} style={{ minHeight: placeholderMinHeight }} aria-hidden="true" />
}
