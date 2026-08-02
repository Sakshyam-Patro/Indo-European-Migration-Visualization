import type { CSSProperties, ReactNode } from 'react'
import { surface } from '../../theme'

interface VizCardProps {
  children: ReactNode
  style?: CSSProperties
}

/** Dark, elevated container that every interactive visualisation sits in. */
export function VizCard({ children, style }: VizCardProps) {
  return (
    <div
      style={{
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        background: 'var(--bg-surface)',
        borderRadius: 20,
        border: `1px solid ${surface.cardBorderSubtle}`,
        boxShadow: surface.cardShadow,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

interface ContentCardProps {
  title: string
  children: ReactNode
  style?: CSSProperties
}

/** Light reading card used for prose asides inside light sections. */
export function ContentCard({ title, children, style }: ContentCardProps) {
  return (
    <div
      style={{
        padding: '2rem',
        background: 'var(--bg-light-card)',
        borderRadius: 16,
        border: '1px solid var(--bg-light-elevated)',
        boxShadow: surface.panelShadow,
        maxWidth: 800,
        marginLeft: 'auto',
        marginRight: 'auto',
        ...style,
      }}
    >
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          color: 'var(--ochre-dark)',
          marginBottom: '1rem',
          fontWeight: 500,
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  )
}

/** Hairline rule that marks the top edge of a section. */
export function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        maxWidth: 400,
        height: 1,
        background: 'linear-gradient(to right, transparent, var(--bronze), transparent)',
      }}
    />
  )
}

/** Pull-quote style closing thought that ends several sections. */
export function ClosingNote({ children, accent = 'var(--ochre)' }: { children: ReactNode; accent?: string }) {
  return (
    <div
      style={{
        padding: '2rem',
        borderLeft: `3px solid ${accent}`,
        maxWidth: '65ch',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
          fontStyle: 'italic',
          lineHeight: 1.6,
          marginBottom: 0,
        }}
      >
        {children}
      </p>
    </div>
  )
}

export default VizCard
