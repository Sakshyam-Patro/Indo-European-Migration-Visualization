import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import MigrationMap from '../components/interactive/MigrationMap'

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

export default function HomelandSection() {
  return (
    <section
      id="homeland"
      className="section-dark"
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
              Section III
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-bright)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              The Homeland
            </h2>
            <p style={{
              color: 'var(--text-on-dark-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              The Pontic-Caspian steppe, the vast grasslands stretching from modern Ukraine to
              Kazakhstan, is where most scholars now locate the Proto-Indo-European homeland.
              From here, over two thousand years, their descendants carried the language across
              half the world.
            </p>
            <p style={{
              color: 'var(--text-on-dark-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              Watch the story unfold: from early steppe pastoralists to the Yamnaya horizon,
              and the explosive migrations that followed into Europe, Central Asia, and beyond.
            </p>
          </div>
        </FadeIn>

        {/* Migration Map */}
        <FadeIn delay={0.1}>
          <MigrationMap />
        </FadeIn>
      </div>
    </section>
  )
}
