import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Timeline from '../components/interactive/Timeline'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
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

export default function DatingSection() {
  return (
    <section
      id="dating"
      className="section-light"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
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
        <FadeIn>
          <div style={{ marginBottom: '4rem', maxWidth: '65ch', margin: '0 auto 4rem' }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              color: 'var(--ochre)',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              display: 'block',
              marginBottom: '1rem',
            }}>
              Section II
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-on-light)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              When and Where?
            </h2>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              If Proto-Indo-European was a real language spoken by real people, when did they
              live? Linguists found the answer hidden in the vocabulary they reconstructed.
            </p>
          </div>
        </FadeIn>

        {/* The Wheel Argument */}
        <FadeIn delay={0.1}>
          <div style={{
            marginBottom: '3rem',
            padding: '2rem',
            background: 'var(--bg-light-card)',
            borderRadius: 16,
            border: '1px solid var(--bg-light-elevated)',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              color: 'var(--ochre-dark)',
              marginBottom: '1rem',
              fontWeight: 500,
            }}>
              The Wheel Argument
            </h4>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}>
              PIE has a reconstructed word for "wheel": <span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'var(--ochre-dark)',
              }}>
                <span style={{ color: 'var(--teal)' }}>*</span>kʷékʷlos
              </span>, derived from the verb "to turn" (<span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'var(--ochre-dark)',
              }}>
                <span style={{ color: 'var(--teal)' }}>*</span>kʷel-
              </span>) using a rare reduplication pattern.
              This same word appears in Greek <em>kúklos</em>, Sanskrit <em>cakrá</em>,
              and English <em>wheel</em>.
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}>
              Here's the key: <strong>wheeled vehicles didn't exist before ~3500 BCE</strong>.
              The word's unusual derivation pattern is too specific to have been invented
              independently in nine+ language branches. It must be inherited from a single source.
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
            }}>
              PIE also has words for <em>axle</em> (<span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'var(--ochre-dark)',
              }}>
                <span style={{ color: 'var(--teal)' }}>*</span>h₂eḱs-
              </span>), <em>yoke</em> (<span style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                color: 'var(--ochre-dark)',
              }}>
                <span style={{ color: 'var(--teal)' }}>*</span>yugóm
              </span>), <em>horse</em>, <em>wool</em>, and <em>honey/mead</em>.
              Combined with the earliest written IE language (Hittite, ~1650 BCE),
              this brackets PIE to roughly <strong>4500 to 2500 BCE</strong>.
            </p>
          </div>
        </FadeIn>

        {/* Timeline: dark card */}
        <FadeIn delay={0.1}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
          }}>
            <Timeline />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
