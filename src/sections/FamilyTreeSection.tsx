import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import LanguageTree from '../components/interactive/LanguageTree'

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

export default function FamilyTreeSection() {
  return (
    <section
      id="family-tree"
      className="section-light"
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
              Section IV
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-on-light)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              The Language Family
            </h2>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              Over thousands of years, Proto-Indo-European fractured into roughly ten major
              branches, from Celtic in the west to Tocharian in the deserts of western China.
              Each branch split further, producing the staggering diversity of languages spoken
              across Europe, Iran, and South Asia today.
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              The tree below maps these relationships across more than 445 living languages.
              Click any node to expand a branch, trace how a single prehistoric tongue gave rise
              to Hindi, English, Farsi, and Greek alike, and explore the connections that bind
              nearly half the world's population through shared linguistic ancestry.
            </p>
          </div>
        </FadeIn>

        {/* Language Tree: dark card on light background */}
        <FadeIn delay={0.1}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
          }}>
            <LanguageTree />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
