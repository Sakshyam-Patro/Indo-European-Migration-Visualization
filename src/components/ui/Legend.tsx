import type { CSSProperties } from 'react'

export interface LegendItem {
  color: string
  label: string
  /** Marks the entry as inactive, e.g. a filtered-out series. */
  dimmed?: boolean
}

interface LegendProps {
  items: LegendItem[]
  /** Rendered as a caption above the swatches. */
  title?: string
  /** Swatch shape. Lines read better for routes, dots for categories. */
  shape?: 'dot' | 'line'
  style?: CSSProperties
}

/**
 * Shared colour key for visualisations.
 *
 * Rendered as a definition list so screen readers announce the colour/label
 * pairing rather than a run of unlabelled swatches.
 */
export function Legend({ items, title, shape = 'dot', style }: LegendProps) {
  return (
    <div style={style}>
      {title && (
        <div
          style={{
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--text-on-dark-muted)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          {title}
        </div>
      )}
      <dl
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem 1rem',
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
        }}
      >
        {items.map(item => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              opacity: item.dimmed ? 0.45 : 1,
            }}
          >
            <dt style={{ margin: 0 }}>
              <span
                aria-hidden="true"
                style={{
                  display: 'inline-block',
                  width: shape === 'line' ? 16 : 9,
                  height: shape === 'line' ? 3 : 9,
                  borderRadius: shape === 'line' ? 2 : '50%',
                  background: item.color,
                  flexShrink: 0,
                }}
              />
            </dt>
            <dd style={{ margin: 0, color: 'var(--text-on-dark-secondary)' }}>{item.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default Legend
