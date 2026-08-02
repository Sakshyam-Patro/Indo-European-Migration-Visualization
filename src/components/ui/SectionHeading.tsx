import type { ReactNode } from 'react'

interface SectionHeadingProps {
  /** Kicker above the title, e.g. "Section III". */
  eyebrow: string
  title: string
  /** Standfirst paragraphs and any other intro copy. */
  children?: ReactNode
  /** Widen the measure when the heading sits above a full-bleed visual. */
  maxWidth?: string
}

/**
 * Eyebrow + title + standfirst block that opens each section.
 *
 * Colours come from `.section-light` / `.section-dark` on the ancestor
 * `<section>`, so this component never needs to know which mode it is in.
 */
export function SectionHeading({
  eyebrow,
  title,
  children,
  maxWidth = '65ch',
}: SectionHeadingProps) {
  return (
    <div style={{ maxWidth, margin: '0 auto 4rem' }}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 300,
          marginBottom: '1.5rem',
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  )
}

export default SectionHeading
