import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import AncestryChart from '../components/interactive/AncestryChart'

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

export default function DNASection() {
  return (
    <section
      id="dna"
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
              Section VI
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-on-light)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              The DNA Revolution
            </h2>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              For over two centuries, the Indo-European question was the province of
              linguists and archaeologists alone. Then, beginning around 2010, a revolution
              in ancient DNA technology transformed the field overnight. By extracting and
              sequencing genetic material from human remains thousands of years old,
              researchers could finally track the actual movements of people across
              prehistoric Eurasia: not just their pots, their words, or their burial customs,
              but their very genomes.
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              The results were dramatic. Ancient DNA confirmed that a massive migration
              from the Pontic-Caspian steppe around 3000 BCE reshaped the genetic landscape
              of Europe and, a few centuries later, South Asia. The Yamnaya-related ancestry
              that appeared in Corded Ware, Bell Beaker, and Sintashta populations mapped
              almost perfectly onto the regions where Indo-European languages are spoken today.
              Linguistics, archaeology, and genetics had finally converged on the same story.
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              The pattern is strikingly consistent: wherever steppe DNA appears in the
              archaeological record, Indo-European languages follow within generations. In
              Britain, Bell Beaker migrants replaced roughly 90% of the Neolithic gene pool
              and brought a Celtic tongue. In Greece, the ~15% steppe component that
              distinguishes Mycenaeans from Minoans marks the arrival of the Greek language.
              In South Asia, steppe ancestry appears only after the decline of the Indus
              Valley Civilization, coinciding with the earliest Vedic Sanskrit texts. DNA
              does not tell us what language someone spoke, but it reveals the migrations
              that carried those languages across continents.
            </p>
          </div>
        </FadeIn>

        {/* Ancestry Chart, dark card on light background */}
        <FadeIn delay={0.1}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
          }}>
            <AncestryChart />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
