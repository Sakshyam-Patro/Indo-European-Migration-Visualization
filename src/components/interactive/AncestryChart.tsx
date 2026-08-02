import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { CSSProperties, KeyboardEvent } from 'react'
import { geneticSamples, dnaFindings } from '../../data/genetics'
import { brand, surface, vizPalette, withAlpha } from '../../theme'
import Legend from '../ui/Legend'
import VizHeading from '../ui/VizHeading'

/**
 * Ancestry components in stacking order, each pinned to a fixed slot of the
 * shared categorical palette so the same hue never means two things.
 */
const COMPONENTS = [
  {
    key: 'whg' as const,
    label: 'Western Hunter-Gatherer',
    color: vizPalette[5],
    description: 'Europe’s original foragers, living there since the Ice Age',
  },
  {
    key: 'ehg' as const,
    label: 'Eastern Hunter-Gatherer',
    color: vizPalette[1],
    description: 'Foragers from Russia and the eastern Baltic region',
  },
  {
    key: 'anf' as const,
    label: 'Anatolian Farmer',
    color: vizPalette[0],
    description: 'The people who brought agriculture from modern-day Turkey into Europe',
  },
  {
    key: 'steppe' as const,
    label: 'Steppe Pastoralist',
    color: vizPalette[2],
    description:
      'Herders from the Pontic-Caspian steppe — the people most closely linked to Indo-European language spread',
  },
  {
    key: 'other' as const,
    label: 'Other',
    color: vizPalette[4],
    description:
      'Region-specific ancestry such as Caucasus hunter-gatherers, Ancient South Indians, or Levantine groups',
  },
]

/**
 * Sort key for rows dated "Present". Anything later than the newest BCE sample
 * would do; the current year is used so the ordering stays correct without a
 * literal that quietly goes stale.
 */
const PRESENT_YEAR = new Date().getFullYear()

/** Parse a date string like "c. 3000 BCE" or "Present" into a sortable number. */
function parseDateForSort(date: string): number {
  if (date.toLowerCase() === 'present') return PRESENT_YEAR
  const match = date.match(/(\d+)\s*BCE/i)
  if (match) return -parseInt(match[1], 10)
  return 0
}

interface Segment {
  key: string
  label: string
  color: string
  value: number
  /** Cumulative percentage at which this segment begins. */
  start: number
}

interface AncestryRow {
  id: string
  label: string
  date: string
  segments: Segment[]
}

interface HoveredSegment {
  rowId: string
  segmentKey: string
  label: string
  color: string
  value: number
  /** Horizontal centre of the segment, in SVG user units. */
  centerX: number
  /** Top edge of the bar this segment belongs to. */
  rowTop: number
}

const tableHeadCell: CSSProperties = {
  textAlign: 'left',
  padding: '0.4rem 0.6rem',
  borderBottom: `1px solid ${surface.cardBorderSubtle}`,
  color: 'var(--text-on-dark)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
}

const tableCell: CSSProperties = {
  padding: '0.35rem 0.6rem',
  borderBottom: `1px solid ${withAlpha(brand.textBright, 0.05)}`,
}

/** Layout constants shared by the chart body and the tooltip placement. */
const BAR_HEIGHT = 28
const BAR_GAP = 6
const TOP_PADDING = 12
const TOOLTIP_HEIGHT = 30
const TOOLTIP_GAP = 8

export default function AncestryChart() {
  const titleId = useId()
  const descId = useId()

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(800)
  const [hovered, setHovered] = useState<HoveredSegment | null>(null)
  /** Roving tabindex: only one segment is in the tab order at a time. */
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 })
  const segmentRefs = useRef(new Map<string, SVGRectElement>())

  // Chronological order (oldest first) plus each bar's segment geometry, in
  // percentages so the memo survives every resize.
  const rows = useMemo<AncestryRow[]>(() => {
    return [...geneticSamples]
      .sort((a, b) => parseDateForSort(a.date) - parseDateForSort(b.date))
      .map(sample => {
        let start = 0
        const segments: Segment[] = []
        for (const comp of COMPONENTS) {
          const value =
            comp.key === 'other' ? (sample.components.other ?? 0) : sample.components[comp.key]
          if (value <= 0) continue
          segments.push({
            key: comp.key,
            label: comp.label,
            color: comp.color,
            value,
            start,
          })
          start += value
        }
        return { id: sample.id, label: sample.label, date: sample.date, segments }
      })
  }, [])

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

  const labelWidth = Math.min(220, containerWidth * 0.28)
  const barAreaWidth = Math.max(containerWidth - labelWidth - 16, 1)
  const svgHeight = TOP_PADDING + rows.length * (BAR_HEIGHT + BAR_GAP)
  const compact = containerWidth < 600

  function focusCell(row: number, col: number) {
    setActiveCell({ row, col })
    segmentRefs.current.get(`${row}:${col}`)?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<SVGRectElement>, row: number, col: number) {
    let nextRow = row
    let nextCol = col

    switch (event.key) {
      case 'ArrowRight':
        nextCol = Math.min(col + 1, rows[row].segments.length - 1)
        break
      case 'ArrowLeft':
        nextCol = Math.max(col - 1, 0)
        break
      case 'ArrowDown':
        nextRow = Math.min(row + 1, rows.length - 1)
        nextCol = Math.min(col, rows[nextRow].segments.length - 1)
        break
      case 'ArrowUp':
        nextRow = Math.max(row - 1, 0)
        nextCol = Math.min(col, rows[nextRow].segments.length - 1)
        break
      case 'Home':
        nextCol = 0
        break
      case 'End':
        nextCol = rows[row].segments.length - 1
        break
      case 'Escape':
        setHovered(null)
        return
      default:
        return
    }

    event.preventDefault()
    focusCell(nextRow, nextCol)
  }

  // Tooltip placement, clamped so the first row does not push it past the top
  // edge and long labels do not run off either side.
  let tooltipStyle: CSSProperties | null = null
  if (hovered) {
    const above = hovered.rowTop - TOOLTIP_HEIGHT - TOOLTIP_GAP
    tooltipStyle = {
      left: Math.min(Math.max(hovered.centerX, 80), Math.max(containerWidth - 80, 80)),
      top: above >= 0 ? above : hovered.rowTop + BAR_HEIGHT + TOOLTIP_GAP,
    }
  }

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <VizHeading title="Ancient DNA Ancestry Components">
        Each bar shows the genetic makeup of one ancient or modern individual — what percentage
        of their DNA came from each ancestral population. Read top to bottom: steppe pastoralist
        ancestry is absent everywhere before about 3000 BCE, then appears abruptly and never
        leaves. Hover a segment for its exact figure, or tab into the chart and use the arrow
        keys to move between segments. Every value is also listed in the table below the chart.
      </VizHeading>

      <Legend
        title="Ancestry components"
        items={COMPONENTS.map(comp => ({ color: comp.color, label: comp.label }))}
        style={{ marginBottom: '1.5rem' }}
      />

      <div style={{ position: 'relative' }}>
        <svg
          width={containerWidth}
          height={svgHeight}
          aria-labelledby={titleId}
          aria-describedby={descId}
          style={{ display: 'block', overflow: 'visible' }}
        >
          <title id={titleId}>
            Stacked bar chart of ancestry components for {rows.length} ancient and modern DNA
            samples, ordered oldest first
          </title>
          <desc id={descId}>
            Samples before about 3000 BCE carry no steppe ancestry at all. From Corded Ware
            onward it dominates, and it is still roughly half of the modern northern European
            profile. Exact percentages are listed in the data table below the chart.
          </desc>

          {rows.map((row, r) => {
            const y = TOP_PADDING + r * (BAR_HEIGHT + BAR_GAP)

            return (
              <g key={row.id}>
                <text
                  x={labelWidth - 8}
                  y={y + BAR_HEIGHT / 2}
                  textAnchor="end"
                  dominantBaseline="central"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: compact ? '0.75rem' : '0.8rem',
                    fill: 'var(--text-on-dark-secondary)',
                  }}
                >
                  {row.label}
                </text>
                <text
                  x={labelWidth - 8}
                  y={y + BAR_HEIGHT / 2 + (compact ? 10 : 12)}
                  textAnchor="end"
                  dominantBaseline="central"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: compact ? '0.7rem' : '0.75rem',
                    fill: 'var(--text-on-dark-muted)',
                  }}
                >
                  {row.date}
                </text>

                {row.segments.map((segment, c) => {
                  const segmentWidth = (segment.value / 100) * barAreaWidth
                  const x = labelWidth + (segment.start / 100) * barAreaWidth
                  const cellKey = `${r}:${c}`
                  const isActive =
                    hovered !== null &&
                    hovered.rowId === row.id &&
                    hovered.segmentKey === segment.key

                  function activate() {
                    setHovered({
                      rowId: row.id,
                      segmentKey: segment.key,
                      label: segment.label,
                      color: segment.color,
                      value: segment.value,
                      centerX: x + segmentWidth / 2,
                      rowTop: y,
                    })
                  }

                  return (
                    <rect
                      key={segment.key}
                      ref={node => {
                        if (node) segmentRefs.current.set(cellKey, node)
                        else segmentRefs.current.delete(cellKey)
                      }}
                      x={x}
                      y={y}
                      width={segmentWidth}
                      height={BAR_HEIGHT}
                      rx={segment.start === 0 ? 3 : 0}
                      fill={segment.color}
                      opacity={hovered ? (isActive ? 1 : 0.45) : 0.85}
                      stroke={isActive ? brand.textBright : 'none'}
                      strokeWidth={isActive ? 2 : 0}
                      role="img"
                      aria-label={`${row.label}, ${row.date}: ${segment.label} ${segment.value} percent`}
                      tabIndex={activeCell.row === r && activeCell.col === c ? 0 : -1}
                      style={{ cursor: 'pointer', transition: 'opacity 0.15s ease' }}
                      onMouseEnter={activate}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => {
                        setActiveCell({ row: r, col: c })
                        activate()
                      }}
                      onBlur={() => setHovered(null)}
                      onKeyDown={event => handleKeyDown(event, r, c)}
                    />
                  )
                })}

                <rect
                  x={labelWidth}
                  y={y}
                  width={barAreaWidth}
                  height={BAR_HEIGHT}
                  rx={3}
                  fill="none"
                  stroke={withAlpha(brand.textBright, 0.06)}
                  strokeWidth={1}
                  pointerEvents="none"
                />
              </g>
            )
          })}
        </svg>

        {hovered && tooltipStyle && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              transform: 'translateX(-50%)',
              background: 'var(--bg-elevated)',
              border: `1px solid ${surface.cardBorder}`,
              borderRadius: 8,
              padding: '0.4rem 0.7rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-on-dark)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              boxShadow: surface.cardShadow,
              zIndex: 20,
              ...tooltipStyle,
            }}
          >
            <span style={{ color: hovered.color, fontWeight: 600 }}>{hovered.label}</span>
            {': '}
            <span style={{ color: 'var(--text-bright)', fontWeight: 600 }}>{hovered.value}%</span>
          </div>
        )}
      </div>

      <details style={{ marginTop: '1.5rem' }}>
        <summary
          style={{
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--text-on-dark-secondary)',
            padding: '0.4rem 0',
          }}
        >
          Ancestry percentages as a table
        </summary>
        <div style={{ overflowX: 'auto', marginTop: '0.5rem' }}>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              color: 'var(--text-on-dark-secondary)',
            }}
          >
            <caption
              style={{
                captionSide: 'top',
                textAlign: 'left',
                color: 'var(--text-on-dark-muted)',
                fontSize: '0.75rem',
                paddingBottom: '0.5rem',
              }}
            >
              Percentage of each ancestry component per sample, oldest first.
            </caption>
            <thead>
              <tr>
                <th scope="col" style={tableHeadCell}>
                  Sample
                </th>
                <th scope="col" style={tableHeadCell}>
                  Date
                </th>
                {COMPONENTS.map(comp => (
                  <th key={comp.key} scope="col" style={{ ...tableHeadCell, textAlign: 'right' }}>
                    {comp.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  <th
                    scope="row"
                    style={{ ...tableCell, textAlign: 'left', fontWeight: 600, whiteSpace: 'nowrap' }}
                  >
                    {row.label}
                  </th>
                  <td style={{ ...tableCell, whiteSpace: 'nowrap' }}>{row.date}</td>
                  {COMPONENTS.map(comp => {
                    const segment = row.segments.find(s => s.key === comp.key)
                    return (
                      <td key={comp.key} style={{ ...tableCell, textAlign: 'right' }}>
                        {segment ? segment.value : 0}%
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <details style={{ marginTop: '0.75rem' }}>
        <summary
          style={{
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--text-on-dark-secondary)',
            padding: '0.4rem 0',
          }}
        >
          What each ancestry component means
        </summary>
        <dl
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '0.75rem',
            margin: 0,
            marginTop: '0.5rem',
            padding: '1rem',
            background: withAlpha(brand.bgDeep, 0.4),
            borderRadius: 10,
            border: `1px solid ${surface.cardBorderSubtle}`,
            fontFamily: 'var(--font-body)',
          }}
        >
          {COMPONENTS.map(comp => (
            <div key={comp.key}>
              <dt style={{ fontSize: '0.8rem', color: 'var(--text-on-dark)', fontWeight: 600 }}>
                {comp.label}
              </dt>
              <dd
                style={{
                  margin: 0,
                  fontSize: '0.75rem',
                  color: 'var(--text-on-dark-muted)',
                  lineHeight: 1.4,
                }}
              >
                {comp.description}
              </dd>
            </div>
          ))}
        </dl>
      </details>

      <div style={{ marginTop: '3rem' }}>
        <h4
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
            color: 'var(--text-bright)',
            marginBottom: '1.25rem',
          }}
        >
          Key DNA Findings
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {dnaFindings.map(finding => (
            <div
              key={finding.title}
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                padding: '1rem',
                background: withAlpha(brand.bgDeep, 0.6),
                borderRadius: 10,
                border: `1px solid ${surface.cardBorderSubtle}`,
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 48,
                  padding: '0.25rem 0.6rem',
                  background: withAlpha(brand.ochreLight, 0.12),
                  border: `1px solid ${withAlpha(brand.ochreLight, 0.2)}`,
                  borderRadius: 6,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--ochre-light)',
                  letterSpacing: '0.02em',
                }}
              >
                {finding.year}
              </span>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: 'var(--text-on-dark)',
                    marginBottom: '0.35rem',
                    lineHeight: 1.4,
                  }}
                >
                  {finding.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--text-on-dark-muted)',
                    lineHeight: 1.5,
                  }}
                >
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
