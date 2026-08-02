import { references, referenceCategoryLabels } from '../../data/references'
import type { Reference } from '../../data/references'

const CATEGORY_ORDER: Reference['category'][] = [
  'genetics',
  'archaeology',
  'linguistics',
  'mythology',
]

function ReferenceEntry({ reference }: { reference: Reference }) {
  const citation = `${reference.authors} (${reference.year}). ${reference.title}. ${reference.venue}.`
  return (
    <li style={{ marginBottom: '0.4rem', lineHeight: 1.5 }}>
      {citation}
      {reference.doi && (
        <>
          {' '}
          <a
            href={`https://doi.org/${reference.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--teal-light)', whiteSpace: 'nowrap' }}
          >
            doi:{reference.doi}
          </a>
        </>
      )}
    </li>
  )
}

/**
 * Site-wide footer. Lives outside `<main>` so it is exposed as a
 * `contentinfo` landmark rather than being buried inside the last section.
 */
export default function SiteFooter() {
  return (
    <footer
      className="section-dark"
      style={{
        borderTop: '1px solid var(--card-border-subtle)',
        padding: '3rem 2rem 2.5rem',
      }}
    >
      <div
        style={{
          maxWidth: 1000,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: 'var(--text-bright)',
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          The Indo-European Explorer
        </h2>

        <p
          style={{
            color: 'var(--text-on-dark-muted)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            maxWidth: '55ch',
            marginBottom: 0,
          }}
        >
          An interactive introduction to the Proto-Indo-European language family, drawing on
          historical linguistics, archaeology, ancient DNA, and comparative mythology.
        </p>

        <p
          style={{
            color: 'var(--text-on-dark-secondary)',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-body)',
            marginBottom: 0,
          }}
        >
          Created by{' '}
          <a
            href="https://x.com/GordianFra12173"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--teal-light)' }}
          >
            Sakshyam Patro
          </a>
          . Inspired by{' '}
          <a href="https://ncase.me" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ochre-light)' }}>
            Nicky Case
          </a>
          ,{' '}
          <a href="https://explorabl.es" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ochre-light)' }}>
            Explorable Explanations
          </a>
          , and{' '}
          <a href="https://reich.hms.harvard.edu" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ochre-light)' }}>
            David Reich's lab
          </a>
          .
        </p>

        <details style={{ width: '100%', maxWidth: 760, textAlign: 'left', marginTop: '0.5rem' }}>
          <summary
            style={{
              cursor: 'pointer',
              color: 'var(--ochre-light)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              textAlign: 'center',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              padding: '0.5rem',
            }}
          >
            References ({references.length} works)
          </summary>
          <div style={{ marginTop: '1rem' }}>
            {CATEGORY_ORDER.map(category => {
              const group = references.filter(r => r.category === category)
              if (group.length === 0) return null
              return (
                <section key={category} style={{ marginBottom: '1.5rem' }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.7rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--ochre)',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                    }}
                  >
                    {referenceCategoryLabels[category]}
                  </h3>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      color: 'var(--text-on-dark-muted)',
                      fontSize: '0.78rem',
                    }}
                  >
                    {group.map(reference => (
                      <ReferenceEntry key={`${reference.authors}-${reference.year}-${reference.title}`} reference={reference} />
                    ))}
                  </ul>
                </section>
              )
            })}
          </div>
        </details>

        <p
          style={{
            color: 'var(--text-on-dark-muted)',
            fontSize: '0.75rem',
            marginBottom: 0,
            maxWidth: '62ch',
            lineHeight: 1.55,
          }}
        >
          Reconstructed PIE forms follow standard notation; an asterisk (*) marks an unattested
          reconstruction. Indo-European studies is an active field: the migration routes, dates,
          and genetic findings presented here reflect scholarship as of early 2025 and will be
          revised as new evidence appears. Areas of ongoing debate include the route of the
          Anatolian branch, the Tocharian-Afanasievo connection, the status of the trifunctional
          hypothesis, and precise chronologies for many cultures.
        </p>

        <p
          style={{
            color: 'var(--text-on-dark-muted)',
            fontSize: '0.7rem',
            marginBottom: 0,
            opacity: 0.75,
          }}
        >
          Map data © OpenStreetMap contributors, tiles © CARTO.
        </p>
      </div>
    </footer>
  )
}
