import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { mythConnections, mythCategories, type MythConnection } from '../../data/myths'

const CATEGORY_KEYS = Object.keys(mythCategories) as MythConnection['category'][]

export default function MythWeb() {
  const [selectedMyth, setSelectedMyth] = useState<MythConnection | null>(null)
  const [activeCategory, setActiveCategory] = useState<MythConnection['category'] | 'all'>('all')
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selectedMyth && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [selectedMyth])

  const filtered = activeCategory === 'all'
    ? mythConnections
    : mythConnections.filter(m => m.category === activeCategory)

  return (
    <div style={{ width: '100%' }}>
      {/* Section intro */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.3rem 0.8rem',
          background: 'rgba(155, 89, 182, 0.15)',
          border: '1px solid rgba(155, 89, 182, 0.3)',
          borderRadius: 20,
          marginBottom: '1rem',
          fontSize: '0.75rem',
          color: '#C39BD3',
          fontFamily: 'var(--font-body)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: '#C39BD3',
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
          The Myth Connection Explorer
        </h3>
        <p style={{
          color: 'var(--text-on-dark-secondary)',
          fontSize: '1rem',
        }}>
          Click any myth below to explore how the same divine figures, rituals, and cosmic ideas
          appear across Indo-European cultures separated by thousands of miles and years.
        </p>
      </div>

      {/* Category filter pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
      }}>
        <button
          onClick={() => setActiveCategory('all')}
          aria-label="Filter by all categories"
          style={{
            padding: '0.4rem 1rem',
            borderRadius: 20,
            border: activeCategory === 'all'
              ? '1px solid rgba(200, 169, 110, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.1)',
            background: activeCategory === 'all'
              ? 'rgba(200, 169, 110, 0.15)'
              : 'rgba(255, 255, 255, 0.04)',
            color: activeCategory === 'all'
              ? 'var(--ochre)'
              : 'var(--text-on-dark-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.8rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          All
        </button>
        {CATEGORY_KEYS.map(cat => {
          const { label, color } = mythCategories[cat]
          const isActive = activeCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(isActive ? 'all' : cat)}
              aria-label={`Filter by ${label}`}
              style={{
                padding: '0.4rem 1rem',
                borderRadius: 20,
                border: isActive
                  ? `1px solid ${color}80`
                  : '1px solid rgba(255, 255, 255, 0.1)',
                background: isActive
                  ? `${color}22`
                  : 'rgba(255, 255, 255, 0.04)',
                color: isActive ? color : 'var(--text-on-dark-muted)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Myth card grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
        gap: '0.75rem',
      }}>
        <AnimatePresence mode="popLayout">
          {filtered.map((myth) => {
            const cat = mythCategories[myth.category]
            const isSelected = selectedMyth?.id === myth.id

            return (
              <motion.button
                key={myth.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                onClick={() => setSelectedMyth(isSelected ? null : myth)}
                aria-label={`${isSelected ? 'Close' : 'View'} myth: ${myth.name}`}
                style={{
                  padding: '1.25rem',
                  background: isSelected
                    ? `${cat.color}15`
                    : 'rgba(34, 40, 54, 0.6)',
                  border: isSelected
                    ? `1px solid ${cat.color}50`
                    : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: 12,
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{
                  background: isSelected
                    ? `${cat.color}20`
                    : 'rgba(34, 40, 54, 0.9)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                {/* Category badge */}
                <span style={{
                  display: 'inline-flex',
                  alignSelf: 'flex-start',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 12,
                  background: `${cat.color}20`,
                  border: `1px solid ${cat.color}40`,
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-body)',
                  color: cat.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {cat.label}
                </span>

                {/* Myth name */}
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  color: isSelected ? cat.color : 'var(--text-bright)',
                  fontWeight: 500,
                  lineHeight: 1.3,
                  margin: 0,
                  transition: 'color 0.2s',
                }}>
                  {myth.name}
                </h4>

                {/* Brief description */}
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  color: 'var(--text-on-dark-muted)',
                  lineHeight: 1.5,
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {myth.description}
                </p>

                {/* Culture count hint */}
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.7rem',
                  color: 'var(--text-on-dark-muted)',
                  marginTop: 'auto',
                  paddingTop: '0.4rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                  opacity: 0.7,
                }}>
                  {myth.cultures.length} culture{myth.cultures.length !== 1 ? 's' : ''} compared
                </span>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence>
        {selectedMyth && (
          <motion.div
            ref={detailRef}
            key={selectedMyth.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '1.5rem',
              padding: 'clamp(1.25rem, 3vw, 2rem)',
              background: 'rgba(20, 24, 32, 0.7)',
              borderRadius: 16,
              border: `1px solid ${mythCategories[selectedMyth.category].color}30`,
            }}>
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
              }}>
                <div>
                  <span style={{
                    display: 'inline-block',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 12,
                    background: `${mythCategories[selectedMyth.category].color}20`,
                    border: `1px solid ${mythCategories[selectedMyth.category].color}40`,
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-body)',
                    color: mythCategories[selectedMyth.category].color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: '0.75rem',
                  }}>
                    {mythCategories[selectedMyth.category].label}
                  </span>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                    color: mythCategories[selectedMyth.category].color,
                    fontWeight: 500,
                    margin: 0,
                    lineHeight: 1.3,
                  }}>
                    {selectedMyth.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedMyth(null)}
                  aria-label="Close myth detail panel"
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: 'var(--text-on-dark-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                    minHeight: 36,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'
                  }}
                >
                  Close
                </button>
              </div>

              {/* Full description */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--text-on-dark-secondary)',
                lineHeight: 1.7,
                maxWidth: '75ch',
                marginBottom: '1.75rem',
              }}>
                {selectedMyth.description}
              </p>

              {/* Culture comparisons */}
              <h4 style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'var(--text-on-dark-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '1rem',
              }}>
                Across Cultures
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '0.75rem',
              }}>
                {selectedMyth.cultures.map((c, i) => (
                  <motion.div
                    key={c.culture}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    style={{
                      padding: '1rem 1.25rem',
                      background: 'rgba(0, 0, 0, 0.25)',
                      borderRadius: 10,
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <span style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      color: 'var(--text-on-dark-muted)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      display: 'block',
                      marginBottom: '0.35rem',
                    }}>
                      {c.culture}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.15rem',
                      color: mythCategories[selectedMyth.category].color,
                      display: 'block',
                      marginBottom: '0.6rem',
                      lineHeight: 1.3,
                    }}>
                      {c.deity}
                    </span>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--text-on-dark-secondary)',
                      lineHeight: 1.6,
                      margin: 0,
                    }}>
                      {c.details}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
