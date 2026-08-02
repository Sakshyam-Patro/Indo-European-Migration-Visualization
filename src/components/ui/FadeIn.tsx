import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface FadeInProps {
  children: ReactNode
  delay?: number
  /** Root margin passed to the viewport observer. */
  margin?: `${number}px`
  className?: string
}

/**
 * Scroll-triggered entrance used by every section.
 *
 * Honours `prefers-reduced-motion`: reduced-motion visitors get the content
 * immediately with no transform and no fade.
 */
export function FadeIn({ children, delay = 0, margin = '-100px', className }: FadeInProps) {
  const ref = useRef(null)
  const reduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin })

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default FadeIn
