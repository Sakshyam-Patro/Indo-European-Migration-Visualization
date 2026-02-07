import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { timelineEvents, type TimelineEvent } from '../../data/timeline'

const CATEGORY_COLORS: Record<string, string> = {
  innovation: '#D4A537',
  culture: '#E67E22',
  language: '#14919B',
  genetic: '#9B59B6',
}

const CATEGORY_LABELS: Record<string, string> = {
  innovation: 'Innovation',
  culture: 'Culture',
  language: 'Language',
  genetic: 'Genetic',
}

const MIN_DATE = -5000
const MAX_DATE = -800

function dateToLabel(date: number): string {
  return `${Math.abs(date)} BCE`
}

function dateToPercent(date: number): number {
  return ((date - MIN_DATE) / (MAX_DATE - MIN_DATE)) * 100
}

export default function Timeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  const [pieBracket, setPieBracket] = useState<[number, number]>([-4500, -2500])
  const [isDragging, setIsDragging] = useState<'left' | 'right' | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedEvent && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [selectedEvent])

  const handleTrackMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const date = Math.round(MIN_DATE + pct * (MAX_DATE - MIN_DATE))

    setPieBracket(prev => {
      if (isDragging === 'left') {
        return [Math.min(date, prev[1] + 100), prev[1]]
      } else {
        return [prev[0], Math.max(date, prev[0] - 100)]
      }
    })
  }

  useEffect(() => {
    if (!isDragging) return
    const handleUp = () => setIsDragging(null)
    const handleMove = (e: MouseEvent) => handleTrackMouseMove(e)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('mousemove', handleMove)
    }
  }, [isDragging])

  // Tick marks every 500 years
  const ticks: number[] = []
  for (let d = -5000; d <= -1000; d += 500) {
    ticks.push(d)
  }

  return (
    <div style={{ width: '100%' }}>
      <style>{`
        @keyframes markerPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(200, 169, 110, 0.4); }
          50% { box-shadow: 0 0 0 6px rgba(200, 169, 110, 0); }
        }
        .timeline-marker:not(.timeline-marker-selected) {
          animation: markerPulse 2.5s ease-in-out infinite;
        }
        .timeline-marker:hover .timeline-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
          pointer-events: auto;
        }
        @media (max-width: 600px) {
          .timeline-scroll-wrapper {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -1rem;
            padding: 0 1rem;
          }
          .timeline-track-area {
            min-width: 600px;
          }
        }
      `}</style>
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
          The Timeline
        </h3>
        <p style={{
          color: 'var(--text-on-dark-secondary)',
          fontSize: '1rem',
        }}>
          Drag the golden bracket to explore when Proto-Indo-European could have been spoken.
          {' '}<strong style={{ color: 'var(--text-bright)' }}>Click any colored marker</strong> to learn more.
        </p>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
          <div key={key} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            color: 'var(--text-on-dark-muted)',
            fontFamily: 'var(--font-body)',
          }}>
            <span style={{
              width: 8, height: 8,
              borderRadius: '50%',
              background: CATEGORY_COLORS[key],
            }} />
            {label}
          </div>
        ))}
      </div>

      {/* Timeline track */}
      <div className="timeline-scroll-wrapper">
      <div
        ref={trackRef}
        className="timeline-track-area"
        style={{
          position: 'relative',
          height: 240,
          padding: '0 20px',
          userSelect: 'none',
        }}
      >
        {/* Background track line */}
        <div style={{
          position: 'absolute',
          top: 120,
          left: 20,
          right: 20,
          height: 2,
          background: 'var(--bronze)',
        }} />

        {/* Tick marks */}
        {ticks.map(d => (
          <div
            key={d}
            style={{
              position: 'absolute',
              left: `calc(${dateToPercent(d)}% * 0.92 + 4%)`,
              top: 112,
              transform: 'translateX(-50%)',
              textAlign: 'center',
            }}
          >
            <div style={{
              width: 1,
              height: 16,
              background: 'rgba(139, 115, 85, 0.4)',
              margin: '0 auto',
            }} />
            <span style={{
              fontSize: '0.65rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-body)',
              whiteSpace: 'nowrap',
              fontWeight: 500,
            }}>
              {dateToLabel(d)}
            </span>
          </div>
        ))}

        {/* PIE bracket */}
        <div style={{
          position: 'absolute',
          left: `calc(${dateToPercent(pieBracket[0])}% * 0.92 + 4%)`,
          width: `calc(${dateToPercent(pieBracket[1]) - dateToPercent(pieBracket[0])}% * 0.92)`,
          top: 90,
          height: 60,
          background: 'rgba(200, 169, 110, 0.08)',
          border: '1px solid rgba(200, 169, 110, 0.3)',
          borderRadius: 8,
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            top: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '0.65rem',
            color: 'var(--ochre)',
            fontFamily: 'var(--font-body)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.05em',
          }}>
            PIE WINDOW
          </div>
        </div>

        {/* Bracket drag handles */}
        {(['left', 'right'] as const).map(side => (
          <div
            key={side}
            onMouseDown={() => setIsDragging(side)}
            aria-label={`Drag to adjust ${side} bound of PIE date range`}
            role="slider"
            style={{
              position: 'absolute',
              left: `calc(${dateToPercent(side === 'left' ? pieBracket[0] : pieBracket[1])}% * 0.92 + 4%)`,
              top: 88,
              transform: 'translateX(-50%)',
              width: 14,
              height: 64,
              cursor: 'ew-resize',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
            }}
          >
            <div style={{
              width: 4,
              height: 28,
              borderRadius: 2,
              background: isDragging === side ? 'var(--ochre)' : 'var(--ochre-dark)',
              transition: 'background 0.15s',
            }} />
          </div>
        ))}

        {/* Event markers */}
        {timelineEvents.map(event => {
          const isSelected = selectedEvent?.id === event.id
          const pct = dateToPercent(event.date)
          const isAbove = event.category === 'innovation' || event.category === 'genetic'

          return (
            <motion.button
              key={event.id}
              className={`timeline-marker${isSelected ? ' timeline-marker-selected' : ''}`}
              onClick={() => setSelectedEvent(isSelected ? null : event)}
              whileHover={{ scale: 1.4 }}
              style={{
                position: 'absolute',
                left: `calc(${pct}% * 0.92 + 4%)`,
                top: isAbove ? 90 : 130,
                transform: 'translate(-50%, -50%)',
                width: isSelected ? 18 : 14,
                height: isSelected ? 18 : 14,
                borderRadius: '50%',
                background: CATEGORY_COLORS[event.category],
                border: isSelected ? '2px solid var(--text-bright)' : '2px solid var(--bg-deep)',
                cursor: 'pointer',
                zIndex: isSelected ? 10 : 2,
                boxShadow: isSelected
                  ? `0 0 12px ${CATEGORY_COLORS[event.category]}88`
                  : 'none',
                transition: 'width 0.2s, height 0.2s, border 0.2s, box-shadow 0.2s',
                padding: 0,
              }}
              aria-label={`${event.label}, ${dateToLabel(event.date)}`}
            >
              {/* Hover tooltip */}
              <span
                className="timeline-tooltip"
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(4px)',
                  marginBottom: 8,
                  padding: '0.35rem 0.6rem',
                  background: 'rgba(10, 12, 18, 0.95)',
                  border: `1px solid ${CATEGORY_COLORS[event.category]}50`,
                  borderRadius: 8,
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-bright)',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  opacity: 0,
                  transition: 'opacity 0.2s, transform 0.2s',
                  zIndex: 20,
                }}
              >
                {event.label}
              </span>
            </motion.button>
          )
        })}
      </div>
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
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '1rem',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              background: 'rgba(20, 24, 32, 0.6)',
              borderRadius: 12,
              border: `1px solid ${CATEGORY_COLORS[selectedEvent.category]}33`,
              textAlign: 'center',
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}>
                <span style={{
                  width: 10, height: 10,
                  borderRadius: '50%',
                  background: CATEGORY_COLORS[selectedEvent.category],
                  display: 'inline-block',
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  color: 'var(--text-bright)',
                }}>
                  {selectedEvent.label}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--text-on-dark-muted)',
                  padding: '0.15rem 0.5rem',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 12,
                }}>
                  {dateToLabel(selectedEvent.date)}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.65rem',
                  color: CATEGORY_COLORS[selectedEvent.category],
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}>
                  {CATEGORY_LABELS[selectedEvent.category]}
                </span>
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-on-dark-secondary)',
                lineHeight: 1.7,
                maxWidth: '65ch',
                margin: '0 auto',
              }}>
                {selectedEvent.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
