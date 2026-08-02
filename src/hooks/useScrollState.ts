import { useState, useEffect } from 'react'

export interface ScrollState {
  /** 0-1 fraction of the document scrolled. */
  progress: number
  /** Raw scroll offset, so consumers do not each read window.scrollY. */
  scrollY: number
}

/**
 * Single rAF-batched scroll listener for the whole app.
 *
 * Also recomputes on resize and whenever the document grows — lazily mounted
 * sections change `scrollHeight` after load, which would otherwise leave the
 * progress bar reading a stale maximum.
 */
export function useScrollState(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, scrollY: 0 })

  useEffect(() => {
    let rafId = 0

    const measure = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollTop / maxScroll, 0), 1) : 0

      setState(prev =>
        prev.scrollY === scrollTop && prev.progress === progress
          ? prev
          : { progress, scrollY: scrollTop }
      )
    }

    const schedule = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(measure)
    }

    rafId = requestAnimationFrame(measure)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    // Lazily mounted sections change the document height after first paint.
    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null
    observer?.observe(document.documentElement)

    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer?.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [])

  return state
}
