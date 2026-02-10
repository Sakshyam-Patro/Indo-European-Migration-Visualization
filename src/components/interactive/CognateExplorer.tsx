import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cognates, type CognateEntry } from '../../data/cognates'

/** Extract the primary word form, stripping parenthetical annotations */
function shortForm(form: string): string {
  if (!form) return '-'
  // If it starts with "(" it's a note like "(not attested...)"
  if (form.startsWith('(')) return form
  // Extract the first word/phrase before any parenthetical
  const match = form.match(/^([^(]+?)(?:\s*\(|$)/)
  return match ? match[1].trim() : form
}

/** Extract the reason from a parenthetical annotation like "(not attested; Slavic lost this root)" */
function extractReason(form: string): string | null {
  if (!form) return 'No cognate attested in this language'
  const match = form.match(/^\((.+)\)$/)
  if (match) {
    // Clean up the inner text — remove leading "not attested" prefix variations and semicolons
    let reason = match[1].trim()
    // Capitalize first letter
    reason = reason.charAt(0).toUpperCase() + reason.slice(1)
    return reason
  }
  return null
}

const LANGUAGES = [
  'English', 'Latin', 'Greek', 'Sanskrit',
  'Russian', 'Irish', 'Persian', 'Lithuanian',
]

const LANG_COLORS: Record<string, string> = {
  English: '#E8DCC8',
  Latin: '#D4A574',
  Greek: '#7DB8A0',
  Sanskrit: '#D4BC8B',
  Russian: '#A8B4C4',
  Irish: '#8CC084',
  Persian: '#C4A0B8',
  Lithuanian: '#B8C4A0',
}

export default function CognateExplorer() {
  const [selectedCognate, setSelectedCognate] = useState<CognateEntry | null>(null)
  const [hoveredLang, setHoveredLang] = useState<string | null>(null)

  return (
    <div style={{ width: '100%' }}>
      {/* Section intro */}
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
          The Cognate Explorer
        </h3>
        <p style={{
          color: 'var(--text-on-dark-secondary)',
          fontSize: '1rem',
        }}>
          Click any word below to see its cousins across eight Indo-European languages, and the ancient root they all descend from.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cognate-grid-scroll {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            margin: 0 -0.5rem;
            padding: 0 0.5rem;
          }
          .cognate-grid-scroll > * {
            min-width: 700px;
          }
          .cognate-vertical-scroll {
            max-height: 60vh;
          }
        }
        .cognate-vertical-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .cognate-vertical-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .cognate-vertical-scroll::-webkit-scrollbar-thumb {
          background: rgba(139, 115, 85, 0.3);
          border-radius: 3px;
        }
      `}</style>

      {/* Legend for missing cognates */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.75rem',
        fontSize: '0.75rem',
        color: 'var(--text-on-dark-muted)',
        fontFamily: 'var(--font-body)',
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          fontSize: '0.75rem',
          color: 'var(--text-on-dark-muted)',
          fontFamily: 'var(--font-display)',
        }}>
          –
        </span>
        <span>= not attested in that language (hover for details)</span>
      </div>

      {/* Scrollable grid wrapper for mobile */}
      <div className="cognate-grid-scroll">
      <div className="cognate-vertical-scroll" style={{
        maxHeight: '70vh',
        overflowY: 'auto',
      }}>

      {/* Language header row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '100px repeat(8, 1fr)',
        gap: 0,
        marginBottom: '2px',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--bg-surface)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          padding: '0.6rem 0.5rem',
          fontSize: '0.75rem',
          color: 'var(--text-on-dark-muted)',
          fontFamily: 'var(--font-body)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Meaning
        </div>
        {LANGUAGES.map(lang => (
          <div
            key={lang}
            onMouseEnter={() => setHoveredLang(lang)}
            onMouseLeave={() => setHoveredLang(null)}
            style={{
              padding: '0.6rem 0.4rem',
              fontSize: '0.7rem',
              color: hoveredLang === lang ? LANG_COLORS[lang] : 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              textAlign: 'center',
              transition: 'color 0.2s',
              cursor: 'default',
              borderBottom: `2px solid ${hoveredLang === lang ? LANG_COLORS[lang] : 'transparent'}`,
            }}
          >
            {lang}
          </div>
        ))}
      </div>

      {/* Cognate grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {cognates.map((entry) => {
          const isSelected = selectedCognate?.pieRoot === entry.pieRoot

          return (
            <motion.button
              key={entry.pieRoot}
              onClick={() => setSelectedCognate(isSelected ? null : entry)}
              aria-label={`View cognates for "${entry.meaning}"`}
              layout
              style={{
                display: 'grid',
                gridTemplateColumns: '100px repeat(8, 1fr)',
                gap: '2px',
                background: isSelected
                  ? 'rgba(13, 115, 119, 0.1)'
                  : 'rgba(34, 40, 54, 0.6)',
                border: isSelected
                  ? '1px solid rgba(13, 115, 119, 0.3)'
                  : '1px solid transparent',
                borderRadius: 6,
                cursor: 'pointer',
                padding: 0,
                width: '100%',
                transition: 'background 0.2s, border 0.2s',
                textAlign: 'left',
              }}
              whileHover={{
                background: isSelected
                  ? 'rgba(13, 115, 119, 0.15)'
                  : 'rgba(34, 40, 54, 0.9)',
              }}
            >
              {/* Meaning cell */}
              <div style={{
                padding: '0.6rem 0.5rem',
                fontSize: '0.85rem',
                color: isSelected ? 'var(--teal-light)' : 'var(--text-on-dark-secondary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
              }}>
                {entry.meaning}
              </div>

              {/* Language cells */}
              {LANGUAGES.map(lang => {
                const form = entry.forms[lang]
                const isNotAttested = !form || form.includes('not attested') || form.startsWith('(no ') || form.startsWith('(not ')
                const reason = isNotAttested ? extractReason(form) : null
                return (
                  <div
                    key={lang}
                    title={reason || undefined}
                    style={{
                      padding: '0.6rem 0.4rem',
                      textAlign: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: isNotAttested ? '0.75rem' : '0.9rem',
                      color: isNotAttested
                        ? 'var(--text-on-dark-muted)'
                        : isSelected
                          ? LANG_COLORS[lang]
                          : 'var(--text-on-dark)',
                      fontStyle: 'normal',
                      opacity: isNotAttested ? 0.6 : (hoveredLang === lang ? 1 : 0.85),
                      transition: 'color 0.2s, opacity 0.2s',
                      background: hoveredLang === lang
                        ? 'rgba(255,255,255,0.03)'
                        : 'transparent',
                      cursor: isNotAttested ? 'help' : undefined,
                    }}
                  >
                    {isNotAttested ? '–' : shortForm(form)}
                  </div>
                )
              })}
            </motion.button>
          )
        })}
      </div>

      </div>{/* end cognate-vertical-scroll */}
      </div>{/* end cognate-grid-scroll */}

      {/* Selected cognate detail panel */}
      <AnimatePresence>
        {selectedCognate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              background: 'rgba(20, 24, 32, 0.6)',
              borderRadius: 12,
              border: '1px solid rgba(200, 169, 110, 0.12)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                marginBottom: '1rem',
                flexWrap: 'wrap',
              }}>
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.8rem',
                  fontStyle: 'italic',
                  color: 'var(--ochre)',
                }}>
                  <span style={{ color: 'var(--teal-light)' }}>*</span>
                  {selectedCognate.pieRoot.replace('*', '')}
                </span>
                <span style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-on-dark-muted)',
                }}>
                  Proto-Indo-European &middot; "{selectedCognate.meaning}"
                </span>
              </div>

              {selectedCognate.soundNotes && (
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-on-dark-secondary)',
                  lineHeight: 1.6,
                  maxWidth: '65ch',
                  marginBottom: 0,
                }}>
                  {selectedCognate.soundNotes}
                </p>
              )}

              {/* Visual flow of cognates */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '1rem',
              }}>
                {LANGUAGES.map(lang => {
                  const form = selectedCognate.forms[lang]
                  if (!form || form.includes('not attested') || form.startsWith('(')) return null
                  return (
                    <span
                      key={lang}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 20,
                        fontFamily: 'var(--font-display)',
                        fontSize: '0.95rem',
                        color: LANG_COLORS[lang],
                        border: `1px solid ${LANG_COLORS[lang]}33`,
                      }}
                    >
                      {shortForm(form)}
                      <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-on-dark-muted)',
                        marginLeft: '0.4rem',
                        fontFamily: 'var(--font-body)',
                      }}>
                        {lang}
                      </span>
                    </span>
                  )
                })}
              </div>

              {/* Missing cognate explanations */}
              {(() => {
                const missing = LANGUAGES
                  .filter(lang => {
                    const form = selectedCognate.forms[lang]
                    return !form || form.includes('not attested') || form.startsWith('(no ') || form.startsWith('(not ')
                  })
                  .map(lang => ({ lang, reason: extractReason(selectedCognate.forms[lang]) }))
                if (missing.length === 0) return null
                return (
                  <div style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 8,
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-on-dark-muted)',
                      fontFamily: 'var(--font-body)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '0.4rem',
                    }}>
                      Not attested
                    </div>
                    {missing.map(({ lang, reason }) => (
                      <div key={lang} style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-on-dark-muted)',
                        fontFamily: 'var(--font-body)',
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: LANG_COLORS[lang], opacity: 0.75 }}>{lang}</span>
                        {reason && <span> — {reason}</span>}
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
