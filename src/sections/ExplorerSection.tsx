import { useState, useMemo, useEffect, useRef } from 'react'
import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { VizCard, SectionDivider } from '../components/ui/VizCard'
import PIEForm from '../components/ui/PIEForm'
import { cognates } from '../data/cognates'
import type { CognateEntry } from '../data/cognates'

const SUGGESTIONS = [
  'mother', 'water', 'sun', 'fire', 'three', 'horse',
  'door', 'know', 'eat', 'stand', 'moon', 'foot',
]

/** Reads the shared-link query, which is a real query string, not a hash fragment. */
function readQueryFromUrl(): string {
  if (typeof window === 'undefined') return ''
  const fromSearch = new URLSearchParams(window.location.search).get('q')
  if (fromSearch) return fromSearch
  // Tolerate links produced by the earlier "#explorer?q=" format.
  const legacy = window.location.hash.match(/[?&]q=([^&]+)/)
  return legacy ? decodeURIComponent(legacy[1]) : ''
}

function CognateSearchResult({ entry, query }: { entry: CognateEntry; query: string }) {
  const languages = Object.entries(entry.forms)
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?q=${encodeURIComponent(query)}#explorer`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      resetTimer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard access can be denied; leave the button in its resting state.
    }
  }

  return (
    <article
      style={{
        background: 'var(--bg-card)',
        borderRadius: 16,
        border: '1px solid var(--card-border)',
        padding: 'clamp(1.25rem, 2.5vw, 2rem)',
        marginBottom: '1.5rem',
      }}
    >
      <div
        style={{
          marginBottom: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <h4 style={{ margin: 0, fontWeight: 500 }}>
          <PIEForm
            root={entry.pieRoot}
            style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)' }}
          />
          <span
            style={{
              marginLeft: '0.75rem',
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-on-dark-secondary)',
            }}
          >
            "{entry.meaning}"
          </span>
        </h4>
        <button
          onClick={handleShare}
          style={{
            background: copied ? 'rgba(95, 143, 95, 0.15)' : 'rgba(13, 115, 119, 0.1)',
            border: `1px solid ${copied ? 'rgba(95, 143, 95, 0.35)' : 'rgba(13, 115, 119, 0.25)'}`,
            borderRadius: 6,
            color: copied ? '#7EA97E' : 'var(--teal-light)',
            cursor: 'pointer',
            padding: '0.4rem 0.8rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-body)',
          }}
        >
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>

      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '0.75rem',
          margin: 0,
        }}
      >
        {languages.map(([lang, form]) => (
          <div
            key={lang}
            style={{
              background: 'var(--bg-elevated)',
              borderRadius: 10,
              padding: '0.75rem 1rem',
              border: '1px solid var(--card-border-subtle)',
            }}
          >
            <dt
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                color: 'var(--ochre)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '0.3rem',
              }}
            >
              {lang}
            </dt>
            <dd
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                color: 'var(--text-on-dark)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              {form}
            </dd>
          </div>
        ))}
      </dl>

      {entry.soundNotes && (
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.875rem',
            color: 'var(--text-on-dark-muted)',
            lineHeight: 1.6,
            maxWidth: '65ch',
            marginBottom: 0,
          }}
        >
          {entry.soundNotes}
        </p>
      )}
    </article>
  )
}

function CognateSearch() {
  const [query, setQuery] = useState(readQueryFromUrl)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return cognates.filter(entry => {
      if (entry.meaning.toLowerCase().includes(q)) return true
      if (entry.pieRoot.toLowerCase().includes(q)) return true
      return Object.values(entry.forms).some(form => form.toLowerCase().includes(q))
    })
  }, [query])

  // A shared link lands on the page with a query already filled in; bring the
  // reader to the results rather than leaving them at the top of the page.
  useEffect(() => {
    if (!readQueryFromUrl()) return
    const target = document.getElementById('explorer')
    if (!target) return
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div>
      <label
        htmlFor="cognate-search"
        style={{
          display: 'block',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--text-on-dark-secondary)',
          marginBottom: '0.5rem',
        }}
      >
        Search by English meaning, PIE root, or any attested form
      </label>
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        <input
          id="cognate-search"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='e.g. "sun", "fire", "door", "know"'
          style={{
            width: '100%',
            padding: '1rem 1.25rem 1rem 3rem',
            fontFamily: 'var(--font-body)',
            fontSize: '1.1rem',
            color: 'var(--text-on-dark)',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--card-border)',
            borderRadius: 12,
          }}
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-on-dark-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
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

      <p aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {query.trim() ? `${results.length} matching root${results.length === 1 ? '' : 's'}` : ''}
      </p>

      {query.trim() && results.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem',
            color: 'var(--text-on-dark-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          No matching cognates for "{query}". Try words like "father", "sun", "fire", or "know".
        </div>
      )}

      {results.map(entry => (
        <CognateSearchResult key={entry.pieRoot} entry={entry} query={query} />
      ))}

      {!query.trim() && (
        <div
          style={{
            textAlign: 'center',
            padding: '2.5rem 1rem',
            color: 'var(--text-on-dark-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}
        >
          <p style={{ marginBottom: '1rem' }}>
            Type a word above to search the reconstructed Proto-Indo-European roots.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem' }}>
            {SUGGESTIONS.map(word => (
              <button
                key={word}
                onClick={() => setQuery(word)}
                style={{
                  background: 'rgba(212, 165, 55, 0.08)',
                  border: '1px solid var(--card-border-subtle)',
                  borderRadius: 16,
                  color: 'var(--ochre-light)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.85rem',
                  padding: '0.35rem 0.85rem',
                }}
              >
                {word}
              </button>
            ))}
          </div>
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
      style={{ padding: '8rem 0 5rem', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section VIII" title="Explore the Connections">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              You've followed a story spanning six thousand years, from a reconstructed mother
              tongue to the living languages of today. Now explore the evidence directly. Search
              for a word to see how it echoes across the Indo-European family, reshaped by
              millennia of sound change yet still recognisable.
            </p>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <VizCard>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                color: 'var(--text-bright)',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              Cognate Search
            </h3>
            <CognateSearch />
          </VizCard>
        </FadeIn>
      </div>
    </section>
  )
}
