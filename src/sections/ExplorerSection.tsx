import { useRef, useState, useMemo } from 'react'
import { motion, useInView } from 'framer-motion'
import { cognates, type CognateEntry } from '../data/cognates'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function CognateSearchResult({ entry, query }: { entry: CognateEntry; query: string }) {
  const languages = Object.entries(entry.forms)
  const [copied, setCopied] = useState(false)

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#explorer?q=${encodeURIComponent(query)}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: 16,
      border: '1px solid rgba(200, 169, 110, 0.15)',
      padding: 'clamp(1.25rem, 2.5vw, 2rem)',
      marginBottom: '1.5rem',
    }}>
      {/* Header: PIE root, meaning, and share button */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
            fontStyle: 'italic',
            color: 'var(--ochre-light)',
            fontWeight: 500,
          }}>
            <span style={{ color: 'var(--teal-light)' }}>*</span>
            {entry.pieRoot.replace(/^\*/, '')}
          </span>
          <span style={{
            marginLeft: '0.75rem',
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--text-on-dark-secondary)',
          }}>
            "{entry.meaning}"
          </span>
        </div>
        <button
          onClick={handleShare}
          style={{
            background: copied ? 'rgba(39, 174, 96, 0.15)' : 'rgba(13, 115, 119, 0.1)',
            border: `1px solid ${copied ? 'rgba(39, 174, 96, 0.3)' : 'rgba(13, 115, 119, 0.25)'}`,
            borderRadius: 6,
            color: copied ? '#27AE60' : 'var(--teal-light)',
            cursor: 'pointer',
            padding: '0.3rem 0.7rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-body)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            transition: 'all 0.2s ease',
          }}
        >
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      {/* Language forms grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '0.75rem',
      }}>
        {languages.map(([lang, form]) => (
          <div
            key={lang}
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 10,
              padding: '0.75rem 1rem',
              border: '1px solid rgba(200, 169, 110, 0.08)',
            }}
          >
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              color: 'var(--ochre)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '0.3rem',
            }}>
              {lang}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.05rem',
              color: 'var(--text-on-dark)',
              fontStyle: 'italic',
            }}>
              {form}
            </div>
          </div>
        ))}
      </div>

      {/* Sound notes */}
      {entry.soundNotes && (
        <p style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: 'var(--text-on-dark-muted)',
          lineHeight: 1.6,
          maxWidth: '65ch',
          marginBottom: 0,
        }}>
          {entry.soundNotes}
        </p>
      )}
    </div>
  )
}

function CognateSearch() {
  const [query, setQuery] = useState(() => {
    // Read query from URL hash (e.g. #explorer?q=father)
    const hash = window.location.hash
    const match = hash.match(/[?&]q=([^&]+)/)
    return match ? decodeURIComponent(match[1]) : ''
  })

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    return cognates.filter(entry => {
      if (entry.meaning.toLowerCase().includes(q)) return true
      if (entry.pieRoot.toLowerCase().includes(q)) return true
      return Object.values(entry.forms).some(form =>
        form.toLowerCase().includes(q)
      )
    })
  }, [query])

  return (
    <div>
      {/* Search input */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Search for a word (e.g. "sun", "fire", "door", "know")'
          style={{
            width: '100%',
            padding: '1rem 1.25rem 1rem 3rem',
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-on-dark)',
            background: 'var(--bg-elevated)',
            border: '1px solid rgba(200, 169, 110, 0.2)',
            borderRadius: 12,
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = 'var(--teal)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(13, 115, 119, 0.15)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = 'rgba(200, 169, 110, 0.2)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
        {/* Search icon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-on-dark-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>

      {/* Results */}
      {query.trim() && results.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-on-dark-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
        }}>
          No matching cognates found for "{query}". Try words like "father", "sun", "fire", "door", "know", or "eat".
        </div>
      )}

      {results.map(entry => (
        <CognateSearchResult key={entry.pieRoot} entry={entry} query={query} />
      ))}

      {/* Hint when empty */}
      {!query.trim() && (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          color: 'var(--text-on-dark-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
        }}>
          <p style={{ marginBottom: '0.75rem', maxWidth: 'none' }}>
            Type a word above to search through reconstructed Proto-Indo-European cognates.
          </p>
          <p style={{
            color: 'var(--text-on-dark-muted)',
            fontSize: '0.85rem',
            maxWidth: 'none',
            marginBottom: 0,
          }}>
            Try: {[
              'mother', 'water', 'sun', 'fire', 'three', 'horse',
              'door', 'know', 'eat', 'stand', 'moon', 'foot',
            ].map((word, i, arr) => (
              <span key={word}>
                <span style={{ color: 'var(--ochre-light)', cursor: 'pointer' }} onClick={() => setQuery(word)}>{word}</span>
                {i < arr.length - 1 && <>{' '}&middot;{' '}</>}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  )
}

export default function ExplorerSection() {
  return (
    <section
      id="explorer"
      className="section-dark"
      style={{ padding: '8rem 0 0', position: 'relative' }}
    >
      {/* Subtle divider */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        maxWidth: 400,
        height: 1,
        background: 'linear-gradient(to right, transparent, var(--bronze), transparent)',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        {/* Section heading */}
        <FadeIn>
          <div style={{ maxWidth: '65ch', margin: '0 auto 4rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--ochre)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '1rem',
            }}>
              Section VII
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-bright)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              Explore the Connections
            </h2>
            <p style={{
              color: 'var(--text-on-dark-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              You've traced a story that spans six thousand years, from a reconstructed mother
              tongue to the living languages of today. Now explore the evidence yourself. Search
              for any word below to see how it echoes across the Indo-European family, transformed
              by millennia of sound change yet still recognizably the same.
            </p>
          </div>
        </FadeIn>

        {/* Interactive cognate search */}
        <FadeIn delay={0.1}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
            marginBottom: '5rem',
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
              color: 'var(--text-bright)',
              fontWeight: 400,
              marginBottom: '1.5rem',
            }}>
              Cognate Search
            </h3>
            <CognateSearch />
          </div>
        </FadeIn>

      </div>

      {/* Footer */}
      <FadeIn delay={0.3}>
        <footer style={{
          borderTop: '1px solid rgba(200, 169, 110, 0.1)',
          padding: '3rem 2rem 2.5rem',
          marginTop: '2rem',
        }}>
          <div style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'center',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              color: 'var(--text-bright)',
              fontWeight: 400,
              marginBottom: 0,
            }}>
              The Indo-European Explorer
            </h4>

            <p style={{
              color: 'var(--text-on-dark-muted)',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              maxWidth: '55ch',
              marginBottom: 0,
            }}>
              An interactive journey through the history and legacy of the Proto-Indo-European
              language family. Built with care for accuracy and a love of linguistic history.
            </p>

            {/* Credits */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.25rem 0.5rem',
              marginTop: '0.5rem',
            }}>
              <span style={{
                color: 'var(--text-on-dark-secondary)',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-body)',
              }}>
                Created by{' '}
                <a
                  href="https://x.com/GordianFra12173"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--teal-light)',
                    textDecoration: 'none',
                    borderBottom: '1px solid rgba(20, 145, 155, 0.3)',
                  }}
                >
                  Sakshyam Patro
                </a>
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.25rem 0.5rem',
              marginTop: '0.5rem',
            }}>
              <span style={{
                color: 'var(--text-on-dark-muted)',
                fontSize: '0.75rem',
                fontFamily: 'var(--font-body)',
              }}>
                Inspired by{' '}
                <a href="https://ncase.me" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ochre-light)', textDecoration: 'none' }}>Nicky Case</a>,{' '}
                <a href="https://explorabl.es" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ochre-light)', textDecoration: 'none' }}>Explorable Explanations</a>, and{' '}
                <a href="https://reich.hms.harvard.edu" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ochre-light)', textDecoration: 'none' }}>David Reich's lab</a>
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.5rem 1.5rem',
              marginTop: '0.5rem',
            }}>
              <span style={{ color: 'var(--text-on-dark-muted)', fontSize: '0.8rem' }}>
                References:
              </span>
              {[
                'Anthony, D.W., The Horse, the Wheel, and Language (2007)',
                'Mallory, J.P., In Search of the Indo-Europeans (1989)',
                'Fortson, B.W., Indo-European Language and Culture (2010)',
                'Haak et al., Massive migration from the steppe (Nature, 2015)',
                'Reich, D., Who We Are and How We Got Here (2018)',
                'Lazaridis et al., The genetic history of the Southern Arc (Nature, 2022)',
                'Lazaridis et al., The genetic origin of the Indo-Europeans (Nature, 2025)',
                'Narasimhan et al., Formation of human populations in South and Central Asia (Science, 2019)',
                'Zhang et al., Genomic origins of the Bronze Age Tarim Basin mummies (Nature, 2021)',
                'Olalde et al., The Beaker phenomenon and the genomic transformation of NW Europe (Nature, 2018)',
                'Heggarty et al., Language trees with sampled ancestors (Science, 2023)',
                'Librado et al., The origins of domestic horses (Nature, 2021)',
                'Ringe, D., From Proto-Indo-European to Proto-Germanic (2017)',
                'Watkins, C., American Heritage Dictionary of IE Roots (2011)',
              ].map((ref, i) => (
                <span
                  key={i}
                  style={{
                    color: 'var(--text-on-dark-muted)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {ref}
                </span>
              ))}
            </div>

            <p style={{
              color: 'var(--text-on-dark-muted)',
              fontSize: '0.75rem',
              marginTop: '1rem',
              opacity: 0.8,
              marginBottom: 0,
            }}>
              All reconstructed PIE forms follow standard notation. Asterisk (*) marks unattested reconstructions.
            </p>
            <p style={{
              color: 'var(--text-on-dark-muted)',
              fontSize: '0.75rem',
              marginTop: '0.75rem',
              opacity: 0.8,
              marginBottom: 0,
              maxWidth: '60ch',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.5,
            }}>
              Note: Indo-European studies is an active field of research. Migration routes, dates, and genetic findings presented here reflect scholarship as of early 2025 and may be revised as new ancient DNA studies, archaeological discoveries, and linguistic analyses emerge. Areas of particular ongoing debate include the Anatolian branch route, the Tocharian-Afanasievo connection, and precise chronologies for many cultures.
            </p>
          </div>
        </footer>
      </FadeIn>
    </section>
  )
}
