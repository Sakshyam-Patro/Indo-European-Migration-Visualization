import type { ReactNode } from 'react'
import InteractiveLabel from './InteractiveLabel'

interface VizHeadingProps {
  title: string
  /** Short explanation of what the visualisation shows and how to drive it. */
  children?: ReactNode
  /** Hide the "Interactive" pill for static figures. */
  showBadge?: boolean
}

/**
 * Badge + title + intro block that opens every interactive visualisation.
 * Keeps the eight visualisations visually identical without eight copies of
 * the same style object.
 */
export function VizHeading({ title, children, showBadge = true }: VizHeadingProps) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {showBadge && <InteractiveLabel />}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'var(--text-bright)',
          fontWeight: 400,
          marginBottom: children ? '0.75rem' : 0,
        }}
      >
        {title}
      </h3>
      {children && (
        <div
          style={{
            color: 'var(--text-on-dark-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            maxWidth: '65ch',
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default VizHeading
