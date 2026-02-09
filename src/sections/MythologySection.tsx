import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MythWeb from '../components/interactive/MythWeb'

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

export default function MythologySection() {
  return (
    <section
      id="mythology"
      className="section-dark"
      style={{ padding: '8rem 0', position: 'relative' }}
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
              Section V
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-bright)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              Shared Mythology
            </h2>
            <p style={{
              color: 'var(--text-on-dark-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              Beyond words and grammar, the Indo-European peoples shared something even more
              profound: their gods, their creation stories, and their rituals. When we find
              the same sky father invoked from Iceland to India, or the same serpent-slaying
              myth told in Sanskrit hymns and Norse sagas, we glimpse the spiritual world of a
              people who lived five thousand years ago.
            </p>
            <p style={{
              color: 'var(--text-on-dark-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              These shared myths are among the most compelling evidence for a common Indo-European
              origin. Linguists can reconstruct words, but comparative mythology reveals the
              stories those words were used to tell: the divine twins who rescued sailors, the
              sacred fire that carried offerings to the heavens, and the cosmic tree that held
              the universe together.
            </p>
            <p style={{
              color: 'var(--text-on-dark-muted)',
              fontSize: '0.95rem',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}>
              A note on method: the strongest IE mythological reconstructions rest on shared
              linguistic evidence — cognate divine names like *Dyḗus ph₂tḗr and formulaic
              poetic phrases spanning Vedic, Avestan, Greek, and Norse traditions (Watkins 1995).
              Some broader parallels (flood narratives, divine succession myths) may reflect
              shared Bronze Age cultural contact with Near Eastern and other traditions
              (West 1997; Witzel 2012) rather than exclusively PIE inheritance.
            </p>
          </div>
        </FadeIn>

        {/* MythWeb interactive component in dark card */}
        <FadeIn delay={0.1}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
          }}>
            <MythWeb />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
