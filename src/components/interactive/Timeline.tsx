import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineEvents, type TimelineEvent } from '../../data/timeline'
import VizHeading from '../ui/VizHeading'
import Legend from '../ui/Legend'
import useReducedMotion from '../../hooks/useReducedMotion'
import { brand, vizPalette, withAlpha } from '../../theme'

type Category = TimelineEvent['category']

/** Categorical colours come from the shared palette, assigned by stable index. */
const CATEGORY_COLORS: Record<Category, string> = {
  innovation: vizPalette[0],
  language: vizPalette[1],
  culture: vizPalette[2],
  genetic: vizPalette[4],
}

const CATEGORY_LABELS: Record<Category, string> = {
  innovation: 'Innovation',
  culture: 'Culture',
  language: 'Language',
  genetic: 'Genetic',
}

const MIN_DATE = -5000
const MAX_DATE = -800
/** The two handles may never come closer than this, so the bracket cannot invert. */
const MIN_SPAN = 100
/** Arrow-key increment, in years. PageUp/PageDown use the coarse step. */
const KEY_STEP = 50
const KEY_STEP_LARGE = 500
const TICK_STEP = 500

/**
 * Markers sit inside a 92%-wide band starting 4% in, so the first and last
 * labels are not clipped by the edge of the track. Every date -> position
 * conversion goes through these two helpers, and `positionToDate` is their
 * exact inverse.
 */
const TRACK_INSET_PCT = 4
const TRACK_SCALE = 0.92

function dateToLabel(date: number): string {
  return `${Math.abs(date)} BCE`
}

function dateToPercent(date: number): number {
  return ((date - MIN_DATE) / (MAX_DATE - MIN_DATE)) * 100
}

function dateToTrackOffset(date: number): string {
  return `calc(${dateToPercent(date)}% * ${TRACK_SCALE} + ${TRACK_INSET_PCT}%)`
}

function dateRangeToWidth(from: number, to: number): string {
  return `calc(${dateToPercent(to) - dateToPercent(from)}% * ${TRACK_SCALE})`
}

function positionToDate(clientX: number, rect: DOMRect): number {
  const rawPct = ((clientX - rect.left) / rect.width) * 100
  const pct = Math.max(0, Math.min(100, (rawPct - TRACK_INSET_PCT) / TRACK_SCALE))
  const date = MIN_DATE + (pct / 100) * (MAX_DATE - MIN_DATE)
  return Math.round(date / 10) * 10
}

function clampLeft(date: number, right: number): number {
  return Math.max(MIN_DATE, Math.min(date, right - MIN_SPAN))
}

function clampRight(date: number, left: number): number {
  return Math.min(MAX_DATE, Math.max(date, left + MIN_SPAN))
}

// Tick marks derived from the range constants, not hard-coded dates. The range
// is not a whole number of steps, so the end cap is only added when there is
// room for its label.
const ticks: number[] = (() => {
  const out: number[] = []
  for (let d = MIN_DATE; d <= MAX_DATE; d += TICK_STEP) out.push(d)
  if (MAX_DATE - out[out.length - 1] >= TICK_STEP * 0.6) out.push(MAX_DATE)
  return out
})()

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [pieBracket, setPieBracket] = useState<[number, number]>([-4500, -2500])
  const [dragSide, setDragSide] = useState<'left' | 'right' | null>(null)
  const [activeMarker, setActiveMarker] = useState<string | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)
  const pointerIdRef = useRef<number | null>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!selectedEvent) return
    const timer = window.setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'nearest',
      })
    }, 100)
    return () => window.clearTimeout(timer)
  }, [selectedEvent, reduced])

  const setHandle = useCallback((side: 'left' | 'right', date: number) => {
    setPieBracket(prev =>
      side === 'left'
        ? [clampLeft(date, prev[1]), prev[1]]
        : [prev[0], clampRight(date, prev[0])]
    )
  }, [])

  // Pointer events cover mouse, touch and pen with one code path.
  useEffect(() => {
    if (!dragSide) return

    const handleMove = (e: PointerEvent) => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return
      const track = trackRef.current
      if (!track) return
      setHandle(dragSide, positionToDate(e.clientX, track.getBoundingClientRect()))
    }
    const handleEnd = (e: PointerEvent) => {
      if (pointerIdRef.current !== null && e.pointerId !== pointerIdRef.current) return
      pointerIdRef.current = null
      setDragSide(null)
    }

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerup', handleEnd)
    window.addEventListener('pointercancel', handleEnd)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerup', handleEnd)
      window.removeEventListener('pointercancel', handleEnd)
    }
  }, [dragSide, setHandle])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, side: 'left' | 'right') => {
    const current = side === 'left' ? pieBracket[0] : pieBracket[1]
    let next: number

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        next = current - KEY_STEP
        break
      case 'ArrowRight':
      case 'ArrowUp':
        next = current + KEY_STEP
        break
      case 'PageDown':
        next = current - KEY_STEP_LARGE
        break
      case 'PageUp':
        next = current + KEY_STEP_LARGE
        break
      case 'Home':
        next = side === 'left' ? MIN_DATE : pieBracket[0] + MIN_SPAN
        break
      case 'End':
        next = side === 'left' ? pieBracket[1] - MIN_SPAN : MAX_DATE
        break
      default:
        return
    }

    e.preventDefault()
    setHandle(side, next)
  }

  const bracketSpan = pieBracket[1] - pieBracket[0]
  const bracketLabel = `${Math.abs(pieBracket[0])}–${Math.abs(pieBracket[1])} BCE`

  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="The Timeline">
        Drag either end of the golden bracket — or focus a handle and use the arrow
        keys — to mark the window in which you think Proto-Indo-European was still a
        single language.{' '}
        <strong style={{ color: 'var(--text-bright)' }}>Select any coloured marker</strong>{' '}
        for the evidence behind that date.
      </VizHeading>

      <Legend
        title="Event type"
        items={(Object.keys(CATEGORY_LABELS) as Category[]).map(key => ({
          color: CATEGORY_COLORS[key],
          label: CATEGORY_LABELS[key],
        }))}
        style={{ marginBottom: '1.5rem' }}
      />

      {/* Timeline track */}
      <div style={{ overflowX: 'auto' }}>
        <div
          ref={trackRef}
          style={{
            position: 'relative',
            height: 240,
            padding: '0 20px',
            minWidth: 600,
            userSelect: 'none',
          }}
        >
          {/* Background track line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 120,
              left: 20,
              right: 20,
              height: 2,
              background: 'var(--bronze)',
            }}
          />

          {/* Tick marks */}
          {ticks.map(d => (
            <div
              key={d}
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: dateToTrackOffset(d),
                top: 112,
                transform: 'translateX(-50%)',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 1,
                  height: 16,
                  background: withAlpha(brand.bronze, 0.4),
                  margin: '0 auto',
                }}
              />
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-on-dark-secondary)',
                  fontFamily: 'var(--font-body)',
                  whiteSpace: 'nowrap',
                  fontWeight: 500,
                }}
              >
                {dateToLabel(d)}
              </span>
            </div>
          ))}

          {/* PIE bracket */}
          <div
            style={{
              position: 'absolute',
              left: dateToTrackOffset(pieBracket[0]),
              width: dateRangeToWidth(pieBracket[0], pieBracket[1]),
              top: 90,
              height: 60,
              background: withAlpha(vizPalette[0], 0.08),
              border: `1px solid ${withAlpha(vizPalette[0], 0.3)}`,
              borderRadius: 8,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -22,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '0.75rem',
                color: 'var(--ochre)',
                fontFamily: 'var(--font-body)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              {bracketLabel}
            </div>
          </div>

          {/* Bracket drag handles */}
          {(['left', 'right'] as const).map(side => {
            const value = side === 'left' ? pieBracket[0] : pieBracket[1]
            return (
              <div
                key={side}
                role="slider"
                tabIndex={0}
                aria-orientation="horizontal"
                aria-label={
                  side === 'left'
                    ? 'Earliest date of your Proto-Indo-European window'
                    : 'Latest date of your Proto-Indo-European window'
                }
                aria-valuemin={side === 'left' ? MIN_DATE : pieBracket[0] + MIN_SPAN}
                aria-valuemax={side === 'left' ? pieBracket[1] - MIN_SPAN : MAX_DATE}
                aria-valuenow={value}
                aria-valuetext={dateToLabel(value)}
                onKeyDown={e => handleKeyDown(e, side)}
                onPointerDown={e => {
                  // A drag already owns a pointer: ignore the second finger
                  // rather than letting it steal the handle mid-gesture.
                  if (pointerIdRef.current !== null) return
                  e.preventDefault()
                  e.currentTarget.setPointerCapture(e.pointerId)
                  e.currentTarget.focus()
                  pointerIdRef.current = e.pointerId
                  setDragSide(side)
                }}
                style={{
                  position: 'absolute',
                  left: dateToTrackOffset(value),
                  top: 88,
                  transform: 'translateX(-50%)',
                  width: 24,
                  height: 64,
                  cursor: 'ew-resize',
                  touchAction: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                  zIndex: 5,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 28,
                    borderRadius: 2,
                    background: dragSide === side ? 'var(--ochre)' : 'var(--ochre-dark)',
                  }}
                />
              </div>
            )
          })}

          {/* Event markers */}
          {timelineEvents.map(event => {
            const isSelected = selectedEvent?.id === event.id
            const color = CATEGORY_COLORS[event.category]
            const isAbove = event.category === 'innovation' || event.category === 'genetic'
            const showTooltip = activeMarker === event.id || isSelected
            const size = isSelected ? 18 : 14

            return (
              // Wrapper owns the centring transform so framer-motion is free to
              // own `transform` on the button it animates.
              <div
                key={event.id}
                style={{
                  position: 'absolute',
                  left: dateToTrackOffset(event.date),
                  top: isAbove ? 90 : 130,
                  transform: 'translate(-50%, -50%)',
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: isSelected ? 10 : 2,
                }}
              >
                <motion.button
                  type="button"
                  onClick={() => setSelectedEvent(isSelected ? null : event)}
                  onPointerEnter={() => setActiveMarker(event.id)}
                  onPointerLeave={() => setActiveMarker(prev => (prev === event.id ? null : prev))}
                  onFocus={() => setActiveMarker(event.id)}
                  onBlur={() => setActiveMarker(prev => (prev === event.id ? null : prev))}
                  whileHover={{ scale: reduced ? 1 : 1.4 }}
                  whileFocus={{ scale: reduced ? 1 : 1.4 }}
                  // boxShadow stays in `animate` for every state. Dropping it
                  // back to `undefined` would leave the last pulse keyframe
                  // latched on the element, which then wins over `style` and
                  // swallows the selected glow.
                  animate={{
                    boxShadow: isSelected
                      ? `0 0 12px ${withAlpha(color, 0.55)}`
                      : reduced
                        ? `0 0 0 0 ${withAlpha(color, 0)}`
                        : [
                            `0 0 0 0 ${withAlpha(color, 0.4)}`,
                            `0 0 0 6px ${withAlpha(color, 0)}`,
                            `0 0 0 0 ${withAlpha(color, 0.4)}`,
                          ],
                  }}
                  // Per-property, so the looping pulse cannot also be applied
                  // to the hover/focus scale.
                  transition={{
                    boxShadow:
                      isSelected || reduced
                        ? { duration: reduced ? 0 : 0.2 }
                        : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                    scale: { duration: reduced ? 0 : 0.18, ease: 'easeOut' },
                  }}
                  aria-pressed={isSelected}
                  aria-label={`${event.label}, ${dateToLabel(event.date)}, ${CATEGORY_LABELS[event.category]}`}
                  style={{
                    width: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: size,
                      height: size,
                      borderRadius: '50%',
                      background: color,
                      border: isSelected
                        ? '2px solid var(--text-bright)'
                        : '2px solid var(--bg-deep)',
                    }}
                  />
                </motion.button>

                {/* Tooltip: driven by state so hover, focus and tap all reveal it. */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    marginBottom: 4,
                    padding: '0.35rem 0.6rem',
                    background: withAlpha(brand.bgDeep, 0.95),
                    border: `1px solid ${withAlpha(color, 0.3)}`,
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-bright)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    opacity: showTooltip ? 1 : 0,
                    visibility: showTooltip ? 'visible' : 'hidden',
                    transform: showTooltip
                      ? 'translateX(-50%) translateY(0)'
                      : 'translateX(-50%) translateY(4px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                    zIndex: 20,
                  }}
                >
                  {event.label} · {dateToLabel(event.date)} ·{' '}
                  {CATEGORY_LABELS[event.category]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Live readout of the bracket */}
      <div
        style={{
          marginTop: '1rem',
          padding: '0.9rem 1.1rem',
          background: withAlpha(vizPalette[0], 0.06),
          border: `1px solid ${withAlpha(vizPalette[0], 0.22)}`,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: '0.4rem 0.9rem',
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Your PIE window
          </span>
          <strong
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.35rem',
              color: 'var(--ochre)',
            }}
          >
            {bracketLabel}
          </strong>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-on-dark-muted)',
            }}
          >
            {bracketSpan.toLocaleString()} years wide
          </span>
        </div>
        <p
          style={{
            marginTop: '0.5rem',
            marginBottom: 0,
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: 'var(--text-on-dark-secondary)',
            maxWidth: '65ch',
          }}
        >
          The bracket is the span in which you are placing Proto-Indo-European as a
          single, unbroken language: it began no earlier than{' '}
          {dateToLabel(pieBracket[0])} and had broken into daughter branches by{' '}
          {dateToLabel(pieBracket[1])}. Most linguists settle on roughly 4500–2500 BCE,
          bounded below by shared wheel vocabulary and above by the first attested
          Anatolian and Greek.
        </p>
      </div>

      {/* Selected event detail */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            ref={detailRef}
            key={selectedEvent.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                marginTop: '1rem',
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                background: withAlpha(brand.bgSurface, 0.6),
                borderRadius: 12,
                border: `1px solid ${withAlpha(CATEGORY_COLORS[selectedEvent.category], 0.2)}`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.75rem',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: CATEGORY_COLORS[selectedEvent.category],
                    display: 'inline-block',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    color: 'var(--text-bright)',
                  }}
                >
                  {selectedEvent.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    color: 'var(--text-on-dark-muted)',
                    padding: '0.15rem 0.5rem',
                    background: withAlpha(brand.bgDeep, 0.5),
                    borderRadius: 12,
                  }}
                >
                  {dateToLabel(selectedEvent.date)}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.7rem',
                    // Not the category colour: teal and sienna land at ~4.4:1
                    // on this surface, under the 4.5:1 bar for text this small.
                    // The swatch beside the title carries the colour instead.
                    color: 'var(--text-on-dark-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {CATEGORY_LABELS[selectedEvent.category]}
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-on-dark-secondary)',
                  lineHeight: 1.7,
                  maxWidth: '65ch',
                  margin: '0 auto',
                }}
              >
                {selectedEvent.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
