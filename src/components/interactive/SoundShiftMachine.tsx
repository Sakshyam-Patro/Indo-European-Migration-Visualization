import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { grimmsLaw, type SoundShift } from '../../data/soundChanges'

const SHIFT_TYPE_COLORS: Record<string, string> = {
  'Voiceless stops → Fricatives': '#D4A537',
  'Voiced stops → Voiceless stops': '#14919B',
  'Voiced aspirates → Voiced stops': '#B8724D',
}

const PHONETIC_GLOSSARY: Record<string, string> = {
  'Voiceless stops': 'Consonants made by fully blocking airflow with no vocal cord vibration (like p, t, k)',
  'Fricatives': 'Consonants made by forcing air through a narrow gap, creating friction (like f, th, h)',
  'Voiced stops': 'Consonants made by fully blocking airflow WITH vocal cord vibration (like b, d, g)',
  'Voiced aspirates': 'Consonants with vocal cord vibration plus a puff of breath (like bh, dh, gh in Sanskrit)',
}

const SHIFT_GROUPS = [
  {
    label: 'Voiceless stops → Fricatives',
    description: 'PIE voiceless stops became fricatives in Germanic',
    indices: [0, 1, 2], // p→f, t→þ, k→h
  },
  {
    label: 'Voiced stops → Voiceless stops',
    description: 'PIE voiced stops lost their voicing in Germanic',
    indices: [3, 4, 5], // d→t, b→p, g→k
  },
  {
    label: 'Voiced aspirates → Voiced stops',
    description: 'PIE breathy voiced stops lost their aspiration in Germanic',
    indices: [6, 7, 8], // bʰ→b, dʰ→d, gʰ→g
  },
]

export default function SoundShiftMachine() {
  const [selectedShift, setSelectedShift] = useState<SoundShift | null>(null)
  const [activeGroup, setActiveGroup] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleShiftClick = (shift: SoundShift) => {
    if (isAnimating) return
    setIsAnimating(true)
    setSelectedShift(shift)
    setTimeout(() => setIsAnimating(false), 800)
  }

  return (
    <div style={{ width: '100%' }}>
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
          Grimm's Law Machine
        </h3>
        <p style={{
          color: 'var(--text-on-dark-secondary)',
          fontSize: '1rem',
        }}>
          In 1822, Jacob Grimm (yes, of fairy tale fame) discovered that consonants shifted systematically from Proto-Indo-European to Germanic languages. Click any shift below to see it in action.
        </p>
      </div>

      {/* Group tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {SHIFT_GROUPS.map((group, i) => (
          <button
            key={group.label}
            onClick={() => setActiveGroup(i)}
            aria-label={`Show ${group.label} sound shifts`}
            title={group.label.split(' → ').map(term => `${term}: ${PHONETIC_GLOSSARY[term] || ''}`).join('\n')}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 8,
              border: `1px solid ${activeGroup === i
                ? Object.values(SHIFT_TYPE_COLORS)[i] + '66'
                : 'rgba(139, 115, 85, 0.25)'}`,
              background: activeGroup === i
                ? Object.values(SHIFT_TYPE_COLORS)[i] + '15'
                : 'transparent',
              color: activeGroup === i
                ? Object.values(SHIFT_TYPE_COLORS)[i]
                : 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--text-on-dark-muted)',
        fontSize: '0.85rem',
        marginBottom: '0.75rem',
        fontStyle: 'italic',
      }}>
        {SHIFT_GROUPS[activeGroup].description}
      </p>

      {/* Inline phonetic glossary */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
      }}>
        {SHIFT_GROUPS[activeGroup].label.split(' → ').map(term => (
          PHONETIC_GLOSSARY[term] ? (
            <div key={term} style={{
              fontSize: '0.72rem',
              color: 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)',
              opacity: 0.75,
              lineHeight: 1.4,
              flex: '1 1 200px',
            }}>
              <span style={{ fontWeight: 600, color: Object.values(SHIFT_TYPE_COLORS)[activeGroup] }}>{term}:</span>{' '}
              {PHONETIC_GLOSSARY[term]}
            </div>
          ) : null
        ))}
      </div>

      {/* Shift buttons grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '0.75rem',
        marginBottom: '2rem',
      }}>
        {SHIFT_GROUPS[activeGroup].indices.map(idx => {
          const shift = grimmsLaw[idx]
          if (!shift) return null
          const isActive = selectedShift?.pieLetter === shift.pieLetter
          const color = Object.values(SHIFT_TYPE_COLORS)[activeGroup]

          return (
            <motion.button
              key={shift.pieLetter}
              onClick={() => handleShiftClick(shift)}
              aria-label={`Sound shift: ${shift.pieLetter} to ${shift.shifts[0]?.result} - ${shift.description}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '1.25rem',
                borderRadius: 12,
                border: `1px solid ${isActive ? color + '55' : 'rgba(139, 115, 85, 0.15)'}`,
                background: isActive
                  ? color + '12'
                  : 'rgba(20, 24, 32, 0.5)',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'border 0.2s, background 0.2s',
              }}
            >
              {/* The shift display */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: 'var(--text-on-dark-secondary)',
                  fontStyle: 'italic',
                }}>
                  <span style={{ color: 'var(--teal)', fontSize: '0.7em' }}>*</span>
                  {shift.pieLetter}
                </span>
                <motion.span
                  animate={isActive ? { x: [0, 5, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  style={{
                    color: color,
                    fontSize: '1.2rem',
                  }}
                >
                  →
                </motion.span>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  color: color,
                  fontWeight: 500,
                }}>
                  {shift.shifts[0]?.result}
                </span>
              </div>
              <div style={{
                fontSize: '0.7rem',
                color: 'var(--text-on-dark-muted)',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                {shift.description}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Animated example */}
      <AnimatePresence mode="wait">
        {selectedShift && selectedShift.shifts[0]?.example && (
          <motion.div
            key={selectedShift.pieLetter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '2rem',
              background: 'rgba(20, 24, 32, 0.6)',
              borderRadius: 16,
              border: '1px solid rgba(200, 169, 110, 0.12)',
            }}
          >
            <div style={{
              fontSize: '0.7rem',
              color: 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '1.5rem',
            }}>
              Example: "{selectedShift.shifts[0].example.meaning}"
            </div>

            {/* The transformation pipeline */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}>
              {/* PIE form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-on-dark-secondary)',
                }}>
                  <span style={{ color: 'var(--teal-light)' }}>*</span>
                  {selectedShift.shifts[0].example.pie}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-on-dark-muted)',
                  marginTop: '0.3rem',
                  fontFamily: 'var(--font-body)',
                }}>
                  Proto-Indo-European
                </div>
              </motion.div>

              {/* Arrow / gear animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '2px solid var(--bronze)',
                    borderTopColor: 'var(--ochre)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--ochre)',
                  }} />
                </motion.div>
                <span style={{
                  fontSize: '0.6rem',
                  color: 'var(--ochre-dark)',
                  fontFamily: 'var(--font-body)',
                  letterSpacing: '0.05em',
                }}>
                  GRIMM'S LAW
                </span>
              </motion.div>

              {/* Germanic result */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontWeight: 500,
                  color: Object.values(SHIFT_TYPE_COLORS)[activeGroup],
                }}>
                  {selectedShift.shifts[0].example.daughter}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-on-dark-muted)',
                  marginTop: '0.3rem',
                  fontFamily: 'var(--font-body)',
                }}>
                  English (Germanic)
                </div>
              </motion.div>
            </div>

            {/* Other branches for comparison */}
            {selectedShift.shifts.length > 1 && (
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(139, 115, 85, 0.2)',
              }}>
                <div style={{
                  fontSize: '0.7rem',
                  color: 'var(--text-on-dark-muted)',
                  marginBottom: '0.75rem',
                  fontFamily: 'var(--font-body)',
                }}>
                  Same root in other branches (no Grimm's Law shift):
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {selectedShift.shifts.slice(1).map(s => (
                    s.example && (
                      <span
                        key={s.branch}
                        style={{
                          padding: '0.3rem 0.7rem',
                          background: 'rgba(0,0,0,0.25)',
                          borderRadius: 16,
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.9rem',
                          color: 'var(--text-on-dark-secondary)',
                        }}
                      >
                        {s.example.daughter}
                        <span style={{
                          fontSize: '0.6rem',
                          color: 'var(--text-on-dark-muted)',
                          marginLeft: '0.4rem',
                          fontFamily: 'var(--font-body)',
                        }}>
                          {s.branch}
                        </span>
                      </span>
                    )
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
