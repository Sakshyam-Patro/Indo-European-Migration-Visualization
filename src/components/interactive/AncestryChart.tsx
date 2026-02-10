import { useState, useRef, useEffect } from 'react'
import { geneticSamples, dnaFindings } from '../../data/genetics'

/** Ancestry component keys and their display colors */
const COMPONENTS = [
  { key: 'whg' as const, label: 'Western Hunter-Gatherer', color: '#3498DB', description: 'Europe\u2019s original foragers, living there since the Ice Age' },
  { key: 'ehg' as const, label: 'Eastern Hunter-Gatherer', color: '#1ABC9C', description: 'Foragers from Russia and the eastern Baltic region' },
  { key: 'anf' as const, label: 'Anatolian Farmer', color: '#E67E22', description: 'The people who brought agriculture from modern-day Turkey into Europe' },
  { key: 'steppe' as const, label: 'Steppe Pastoralist', color: '#E74C3C', description: 'Herders from the Pontic-Caspian steppe \u2014 the people most closely linked to Indo-European language spread' },
  { key: 'other' as const, label: 'Other', color: '#95A5A6', description: 'Region-specific ancestry such as Caucasus hunter-gatherers, Ancient South Indians, or Levantine groups' },
]

/** Parse a date string like "~3000 BCE" or "Present" into a sortable number */
function parseDateForSort(date: string): number {
  if (date.toLowerCase() === 'present') return 2025
  const match = date.match(/(\d+)\s*BCE/i)
  if (match) return -parseInt(match[1], 10)
  return 0
}

export default function AncestryChart() {
  const [hovered, setHovered] = useState<{
    sampleId: string
    componentKey: string
    percentage: number
    x: number
    y: number
  } | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(800)

  // Sort chronologically: oldest (most negative) at top
  const sortedSamples = [...geneticSamples].sort(
    (a, b) => parseDateForSort(a.date) - parseDateForSort(b.date)
  )

  // Responsive width tracking
  useEffect(() => {
    function measure() {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth)
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Layout constants
  const labelWidth = Math.min(220, containerWidth * 0.28)
  const barAreaWidth = containerWidth - labelWidth - 16
  const barHeight = 28
  const barGap = 6
  const topPadding = 12
  const svgHeight = topPadding + sortedSamples.length * (barHeight + barGap)

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.3rem 0.8rem',
          background: 'rgba(13, 115, 119, 0.15)',
          border: '1px solid rgba(13, 115, 119, 0.3)',
          borderRadius: 20,
          marginBottom: '1rem',
          fontSize: '0.75rem',
          color: 'var(--teal-light)',
          fontFamily: 'var(--font-body)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--teal-light)',
            display: 'inline-block',
          }} />
          Interactive
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'var(--text-bright)',
          marginBottom: '0.75rem',
        }}>
          Ancient DNA Ancestry Components
        </h3>
        <p style={{
          color: 'var(--text-on-dark-secondary)',
          fontSize: '1rem',
          marginBottom: 0,
        }}>
          Each bar shows the genetic makeup of an ancient individual — what
          percentage of their DNA came from different ancestral populations.
          Watch how the red steppe component appears suddenly around 3000 BCE
          and persists into the present. Hover over any segment for exact
          percentages.
        </p>
      </div>

      {/* Color legend with descriptions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: 'rgba(20, 24, 32, 0.4)',
        borderRadius: 10,
        border: '1px solid rgba(200, 169, 110, 0.08)',
      }}>
        {COMPONENTS.map(comp => (
          <div key={comp.key} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            fontFamily: 'var(--font-body)',
          }}>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: comp.color,
              display: 'inline-block',
              flexShrink: 0,
              marginTop: 4,
            }} />
            <div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--text-on-dark)',
                fontWeight: 600,
              }}>
                {comp.label}
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-on-dark-muted)',
                lineHeight: 1.4,
              }}>
                {comp.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SVG Chart */}
      <div style={{ position: 'relative' }}>
        <svg
          width={containerWidth}
          height={svgHeight}
          style={{ display: 'block', overflow: 'visible' }}
        >
          {sortedSamples.map((sample, i) => {
            const y = topPadding + i * (barHeight + barGap)
            let xOffset = 0

            return (
              <g key={sample.id}>
                {/* Label: sample name + date */}
                <text
                  x={labelWidth - 8}
                  y={y + barHeight / 2}
                  textAnchor="end"
                  dominantBaseline="central"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: containerWidth < 600 ? '0.6rem' : '0.72rem',
                    fill: 'var(--text-on-dark-secondary)',
                  }}
                >
                  {sample.label}
                </text>
                <text
                  x={labelWidth - 8}
                  y={y + barHeight / 2 + (containerWidth < 600 ? 10 : 12)}
                  textAnchor="end"
                  dominantBaseline="central"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: containerWidth < 600 ? '0.5rem' : '0.6rem',
                    fill: 'var(--text-on-dark-muted)',
                  }}
                >
                  {sample.date}
                </text>

                {/* Stacked bar segments */}
                {COMPONENTS.map(comp => {
                  const value = comp.key === 'other'
                    ? (sample.components.other ?? 0)
                    : sample.components[comp.key]
                  if (value <= 0) {
                    return null
                  }
                  const segmentWidth = (value / 100) * barAreaWidth
                  const currentX = xOffset
                  xOffset += segmentWidth

                  return (
                    <rect
                      key={comp.key}
                      x={labelWidth + currentX}
                      y={y}
                      width={Math.max(segmentWidth, 0)}
                      height={barHeight}
                      rx={i === 0 && currentX === 0 ? 3 : (currentX === 0 ? 3 : 0)}
                      fill={comp.color}
                      opacity={
                        hovered
                          ? (hovered.sampleId === sample.id && hovered.componentKey === comp.key ? 1 : 0.5)
                          : 0.85
                      }
                      style={{
                        cursor: 'pointer',
                        transition: 'opacity 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        const svgRect = (e.target as SVGRectElement).ownerSVGElement?.getBoundingClientRect()
                        setHovered({
                          sampleId: sample.id,
                          componentKey: comp.key,
                          percentage: value,
                          x: svgRect ? e.clientX - svgRect.left : labelWidth + currentX + segmentWidth / 2,
                          y: svgRect ? e.clientY - svgRect.top : y,
                        })
                      }}
                      onMouseMove={(e) => {
                        const svgRect = (e.target as SVGRectElement).ownerSVGElement?.getBoundingClientRect()
                        setHovered(prev => prev ? {
                          ...prev,
                          x: svgRect ? e.clientX - svgRect.left : prev.x,
                          y: svgRect ? e.clientY - svgRect.top : prev.y,
                        } : null)
                      }}
                      onMouseLeave={() => setHovered(null)}
                    />
                  )
                })}

                {/* Subtle border around the full bar */}
                <rect
                  x={labelWidth}
                  y={y}
                  width={barAreaWidth}
                  height={barHeight}
                  rx={3}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth={1}
                  pointerEvents="none"
                />
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {hovered && (
          <div
            style={{
              position: 'absolute',
              left: hovered.x,
              top: hovered.y - 44,
              transform: 'translateX(-50%)',
              background: 'var(--bg-elevated)',
              border: '1px solid rgba(200, 169, 110, 0.2)',
              borderRadius: 8,
              padding: '0.4rem 0.7rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-on-dark)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              zIndex: 20,
            }}
          >
            <span style={{
              color: COMPONENTS.find(c => c.key === hovered.componentKey)?.color ?? '#fff',
              fontWeight: 600,
            }}>
              {COMPONENTS.find(c => c.key === hovered.componentKey)?.label}
            </span>
            {': '}
            <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>
              {hovered.percentage}%
            </span>
          </div>
        )}
      </div>

      {/* DNA Findings */}
      <div style={{ marginTop: '3rem' }}>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          color: 'var(--text-bright)',
          marginBottom: '1.25rem',
        }}>
          Key DNA Findings
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {dnaFindings.map((finding, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                padding: '1rem',
                background: 'rgba(20, 24, 32, 0.6)',
                borderRadius: 10,
                border: '1px solid rgba(200, 169, 110, 0.08)',
              }}
            >
              {/* Year badge */}
              <span style={{
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: 48,
                padding: '0.25rem 0.6rem',
                background: 'rgba(200, 169, 110, 0.12)',
                border: '1px solid rgba(200, 169, 110, 0.2)',
                borderRadius: 6,
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--ochre-light)',
                letterSpacing: '0.02em',
              }}>
                {finding.year}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: 'var(--text-on-dark)',
                  marginBottom: '0.35rem',
                  lineHeight: 1.4,
                }}>
                  {finding.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--text-on-dark-muted)',
                  lineHeight: 1.5,
                }}>
                  {finding.significance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
