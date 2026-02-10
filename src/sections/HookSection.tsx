import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { migrations } from '../data/migrations'

const WORD_CHAIN = [
  { word: 'father', lang: 'English', year: 'Modern' },
  { word: 'fæder', lang: 'Old English', year: '~900 CE' },
  { word: 'fadar', lang: 'Gothic', year: '~350 CE' },
  { word: 'pater', lang: 'Latin', year: '~100 BCE' },
  { word: 'patḗr', lang: 'Greek', year: '~500 BCE' },
  { word: 'pitṛ́', lang: 'Sanskrit', year: '~1500 BCE' },
  { word: '*ph₂tḗr', lang: 'Proto-Indo-European', year: '~4000 BCE' },
]

const IE_STATS = {
  speakers: '3.2 billion',
  percentage: '~46%',
  languages: '445+',
}

export default function HookSection() {
  const [activeWordIndex, setActiveWordIndex] = useState(0)
  const [showStats, setShowStats] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  const isPIE = activeWordIndex === WORD_CHAIN.length - 1

  // Initialize background map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: [44, 48],
      zoom: 4,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false,
    })

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    // Draw migration routes as background decoration
    migrations.forEach(route => {
      L.polyline(route.path as L.LatLngExpression[], {
        color: route.color,
        weight: 2,
        opacity: 0.25,
        dashArray: '6, 4',
      }).addTo(map)
    })

    mapRef.current = map
    setTimeout(() => setMapReady(true), 500)

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  const handleWordClick = () => {
    setHasInteracted(true)
    if (activeWordIndex < WORD_CHAIN.length - 1) {
      setActiveWordIndex(prev => prev + 1)
    } else {
      setShowStats(true)
    }
  }

  useEffect(() => {
    if (hasInteracted) return
    if (activeWordIndex >= WORD_CHAIN.length - 1) {
      // Reached PIE — reveal stats after a short pause
      const timer = setTimeout(() => setShowStats(true), 800)
      return () => clearTimeout(timer)
    }
    // Auto-advance: first step waits longer, then speeds up
    const delay = activeWordIndex === 0 ? 2200 : 1200
    const timer = setTimeout(() => {
      setActiveWordIndex(prev => prev + 1)
    }, delay)
    return () => clearTimeout(timer)
  }, [hasInteracted, activeWordIndex])

  return (
    <section
      id="hook"
      ref={sectionRef}
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
      {/* Background map */}
      <div
        ref={mapContainerRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          opacity: mapReady ? 0.35 : 0,
          transition: 'opacity 2s ease',
          filter: 'saturate(0.4) brightness(0.5)',
        }}
      />

      {/* Gradient overlay for readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        background: `
          radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, var(--bg-deep) 100%),
          linear-gradient(to bottom, rgba(20, 24, 32, 0.3) 0%, rgba(20, 24, 32, 0.8) 100%)
        `,
        pointerEvents: 'none',
      }} />

      {/* Main heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ textAlign: 'center', maxWidth: 900, position: 'relative', zIndex: 2 }}
      >
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
          color: 'var(--ochre)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          marginBottom: '1rem',
          fontWeight: 600,
        }}>
          Proto-Indo-European
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
          lineHeight: 1.15,
          color: '#F5F0E8',
          marginBottom: '1.5rem',
          letterSpacing: '-0.01em',
        }}>
          One language became{' '}
          <span style={{ color: 'var(--ochre-light)', fontStyle: 'italic' }}>
            half the world's words.
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'var(--text-on-dark-secondary)',
            maxWidth: 600,
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          Trace the journey of{' '}
          <span style={{ color: 'var(--ochre-light)', fontWeight: 600 }}>Proto-Indo-European</span>,
          from the Pontic-Caspian steppe to Sanskrit, Greek, Latin, and English,
          through genetics, archaeology, linguistics, and myth.
        </motion.p>
      </motion.div>

      {/* Word chain interactive */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          marginTop: '3.5rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <motion.p
          animate={{ opacity: isPIE ? 0.5 : 0.8 }}
          style={{
            color: isPIE ? 'var(--text-on-dark-muted)' : 'var(--ochre-light)',
            fontSize: '0.9rem',
            marginBottom: '1rem',
            fontFamily: 'var(--font-body)',
            letterSpacing: '0.05em',
          }}
        >
          {isPIE
            ? 'You\'ve reached the root: 6,000 years deep'
            : 'Click to trace "father" back through time'}
        </motion.p>

        <button
          onClick={handleWordClick}
          aria-label={isPIE ? 'Word origin reached: Proto-Indo-European' : 'Trace this word further back in time'}
          style={{
            background: 'none',
            border: 'none',
            cursor: isPIE && showStats ? 'default' : 'pointer',
            padding: '0.75rem 2rem',
            position: 'relative',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeWordIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 400,
                fontStyle: isPIE ? 'italic' : 'normal',
                color: isPIE ? 'var(--ochre-light)' : '#F5F0E8',
                display: 'block',
                lineHeight: 1,
                textShadow: isPIE
                  ? '0 0 40px rgba(184, 134, 11, 0.4)'
                  : '0 0 30px rgba(245, 240, 232, 0.1)',
              }}>
                {isPIE && <span style={{ color: 'var(--teal-light)' }}>*</span>}
                {WORD_CHAIN[activeWordIndex].word.replace('*', '')}
              </span>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${activeWordIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{ marginTop: '0.75rem' }}
            >
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--teal-light)',
                fontWeight: 500,
              }}>
                {WORD_CHAIN[activeWordIndex].lang}
              </span>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--text-on-dark-muted)',
                marginLeft: '0.75rem',
              }}>
                {WORD_CHAIN[activeWordIndex].year}
              </span>
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Progress dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '6px',
          marginTop: '1.5rem',
        }}>
          {WORD_CHAIN.map((_, i) => (
            <button
              key={i}
              aria-label={`Word ${i + 1} of ${WORD_CHAIN.length}: ${WORD_CHAIN[i].word} (${WORD_CHAIN[i].lang})`}
              onClick={() => {
                setActiveWordIndex(i)
                setHasInteracted(true)
                if (i === WORD_CHAIN.length - 1) setShowStats(true)
              }}
              style={{
                width: i === activeWordIndex ? 20 : 7,
                height: 7,
                borderRadius: 4,
                background: i <= activeWordIndex
                  ? i === WORD_CHAIN.length - 1 && i === activeWordIndex
                    ? 'var(--ochre)'
                    : 'var(--teal)'
                  : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: i <= activeWordIndex ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Stats reveal */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              marginTop: '3rem',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
            }}>
              {[
                { value: IE_STATS.speakers, label: 'speakers today' },
                { value: IE_STATS.percentage, label: 'of world population' },
                { value: IE_STATS.languages, label: 'living languages' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.5 }}
                  style={{
                    padding: '1.25rem 1.75rem',
                    background: 'rgba(20, 24, 32, 0.7)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 10,
                    border: '1px solid rgba(255,255,255,0.08)',
                    minWidth: 140,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    color: 'var(--ochre-light)',
                    lineHeight: 1,
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    color: 'var(--text-on-dark-muted)',
                    marginTop: '0.4rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showStats ? 0 : 0.7 }}
        transition={{ delay: showStats ? 0 : 3, duration: showStats ? 0.3 : 1 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          textAlign: 'center',
          zIndex: 2,
          pointerEvents: showStats ? 'none' : 'auto',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--ochre)',
            letterSpacing: '0.1em',
            marginBottom: '0.4rem',
            textTransform: 'uppercase',
          }}>
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
            style={{ margin: '0 auto' }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
