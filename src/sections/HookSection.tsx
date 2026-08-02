import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MigrationBackdrop from '../components/ui/MigrationBackdrop'
import { wordChain, ieStats } from '../data/hookContent'
import { useReducedMotion, prefersReducedMotion } from '../hooks/useReducedMotion'

const FIRST_STEP_DELAY = 2200
const STEP_DELAY = 1200
const STATS_REVEAL_DELAY = 800

export default function HookSection() {
  // Reduced-motion visitors start at the end of the chain rather than watching
  // an animation they did not ask for and cannot outrun.
  const [activeWordIndex, setActiveWordIndex] = useState(() =>
    prefersReducedMotion() ? wordChain.length - 1 : 0
  )
  const [showStats, setShowStats] = useState(prefersReducedMotion)
  const [isPaused, setIsPaused] = useState(prefersReducedMotion)
  const reduced = useReducedMotion()

  const isPIE = activeWordIndex === wordChain.length - 1
  const step = wordChain[activeWordIndex]

  useEffect(() => {
    if (isPaused) return

    if (activeWordIndex >= wordChain.length - 1) {
      const timer = setTimeout(() => setShowStats(true), STATS_REVEAL_DELAY)
      return () => clearTimeout(timer)
    }

    const delay = activeWordIndex === 0 ? FIRST_STEP_DELAY : STEP_DELAY
    const timer = setTimeout(() => setActiveWordIndex(prev => prev + 1), delay)
    return () => clearTimeout(timer)
  }, [isPaused, activeWordIndex])

  const advance = () => {
    setIsPaused(true)
    if (activeWordIndex < wordChain.length - 1) {
      setActiveWordIndex(prev => prev + 1)
    } else {
      setShowStats(true)
    }
  }

  const selectStep = (index: number) => {
    setIsPaused(true)
    setActiveWordIndex(index)
    if (index === wordChain.length - 1) setShowStats(true)
  }

  const autoplayFinished = activeWordIndex >= wordChain.length - 1

  return (
    <section
      id="hook"
      className="section-dark"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: 0.4,
          filter: 'saturate(0.5)',
        }}
      >
        <MigrationBackdrop />
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: `
            radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, var(--bg-deep) 100%),
            linear-gradient(to bottom, rgba(20, 24, 32, 0.3) 0%, rgba(20, 24, 32, 0.8) 100%)
          `,
          pointerEvents: 'none',
        }}
      />

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 1.2, ease: 'easeOut' }}
        style={{ textAlign: 'center', maxWidth: 900, position: 'relative', zIndex: 2 }}
      >
        <div className="section-eyebrow" style={{ fontWeight: 600 }}>
          Proto-Indo-European
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
            lineHeight: 1.15,
            color: 'var(--text-bright)',
            marginBottom: '1.5rem',
            letterSpacing: '-0.01em',
          }}
        >
          One language became{' '}
          <span style={{ color: 'var(--ochre-light)', fontStyle: 'italic' }}>
            half the world's words.
          </span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-on-dark-secondary)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Follow <span style={{ color: 'var(--ochre-light)', fontWeight: 600 }}>Proto-Indo-European</span>{' '}
          from the Pontic-Caspian steppe to Sanskrit, Greek, Latin, and English, through
          genetics, archaeology, linguistics, and myth.
        </p>
      </motion.div>

      <div
        style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <p
          style={{
            color: isPIE ? 'var(--text-on-dark-muted)' : 'var(--ochre-light)',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.05em',
          }}
        >
          {isPIE
            ? "You've reached the root: roughly six thousand years deep"
            : 'Select to trace "father" further back in time'}
        </p>

        <button
          onClick={advance}
          aria-label={
            isPIE
              ? 'Oldest form reached: Proto-Indo-European *ph₂tḗr'
              : `Currently showing ${step.word}, ${step.lang}. Trace this word further back in time.`
          }
          style={{
            background: 'none',
            border: 'none',
            cursor: isPIE && showStats ? 'default' : 'pointer',
            padding: '0.75rem 2rem',
            position: 'relative',
          }}
        >
          <span aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeWordIndex}
                initial={reduced ? false : { opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: reduced ? 0 : 0.5, ease: 'easeOut' }}
                style={{ display: 'block' }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                    fontWeight: 400,
                    fontStyle: isPIE ? 'italic' : 'normal',
                    color: isPIE ? 'var(--ochre-light)' : 'var(--text-bright)',
                    display: 'block',
                    lineHeight: 1,
                    textShadow: isPIE
                      ? '0 0 40px rgba(184, 134, 11, 0.4)'
                      : '0 0 30px rgba(245, 240, 232, 0.1)',
                  }}
                >
                  {isPIE && <span style={{ color: 'var(--teal-light)' }}>*</span>}
                  {step.word.replace('*', '')}
                </span>
                <span style={{ display: 'block', marginTop: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.95rem',
                      color: 'var(--teal-light)',
                      fontWeight: 500,
                    }}
                  >
                    {step.lang}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      color: 'var(--text-on-dark-muted)',
                      marginLeft: '0.75rem',
                    }}
                  >
                    {step.year}
                  </span>
                </span>
              </motion.span>
            </AnimatePresence>
          </span>
        </button>

        <div
          role="group"
          aria-label="Word chain steps"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0,
            marginTop: '1.25rem',
          }}
        >
          {wordChain.map((entry, i) => (
            <button
              key={entry.lang}
              aria-label={`Step ${i + 1} of ${wordChain.length}: ${entry.word}, ${entry.lang}`}
              aria-current={i === activeWordIndex ? 'true' : undefined}
              onClick={() => selectStep(i)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '9px 5px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: i === activeWordIndex ? 20 : 7,
                  height: 7,
                  borderRadius: 4,
                  background:
                    i <= activeWordIndex
                      ? i === wordChain.length - 1 && i === activeWordIndex
                        ? 'var(--ochre)'
                        : 'var(--teal)'
                      : 'rgba(255,255,255,0.25)',
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            </button>
          ))}
        </div>

        {!autoplayFinished && (
          <button
            onClick={() => setIsPaused(p => !p)}
            style={{
              marginTop: '0.75rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '0.4rem 0.75rem',
            }}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>

      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.2 }}
            style={{
              marginTop: '3rem',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.5rem',
              }}
            >
              {[
                { value: ieStats.speakers, label: 'speakers today' },
                { value: ieStats.percentage, label: 'of world population' },
                { value: ieStats.languages, label: 'living languages' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={reduced ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.4 + i * 0.12, duration: reduced ? 0 : 0.5 }}
                  style={{
                    padding: '1.25rem 1.75rem',
                    background: 'rgba(20, 24, 32, 0.7)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.08)',
                    minWidth: 140,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.8rem',
                      fontWeight: 600,
                      color: 'var(--ochre-light)',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      color: 'var(--text-on-dark-muted)',
                      marginTop: '0.4rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-on-dark-muted)',
                marginTop: '1rem',
                marginBottom: 0,
                maxWidth: '48ch',
                marginLeft: 'auto',
                marginRight: 'auto',
                lineHeight: 1.5,
              }}
            >
              Family-wide figures for living Indo-European languages worldwide. PIE itself is
              generally dated to roughly 4500-2500 BCE.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {!showStats && (
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: reduced ? 0 : 3, duration: reduced ? 0 : 1 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <motion.div
            animate={reduced ? undefined : { y: [0, 8, 0] }}
            transition={reduced ? undefined : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                color: 'var(--ochre)',
                letterSpacing: '0.1em',
                marginBottom: '0.4rem',
                textTransform: 'uppercase',
              }}
            >
              Scroll to explore
            </p>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ochre)"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              style={{ margin: '0 auto' }}
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
