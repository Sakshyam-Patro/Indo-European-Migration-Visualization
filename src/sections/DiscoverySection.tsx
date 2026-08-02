import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { VizCard, SectionDivider, ClosingNote } from '../components/ui/VizCard'
import PIEForm from '../components/ui/PIEForm'
import CognateExplorer from '../components/interactive/CognateExplorer'
import SoundShiftMachine from '../components/interactive/SoundShiftMachine'
import { notationEntries } from '../data/notationGuide'
import { useReducedMotion } from '../hooks/useReducedMotion'

function NotationGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const reduced = useReducedMotion()

  return (
    <div style={{ maxWidth: '65ch', margin: '0 auto 3rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="notation-guide-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 1rem',
          background: 'var(--bg-light-surface)',
          border: '1px solid rgba(139, 115, 85, 0.2)',
          borderRadius: 10,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--text-on-light-secondary)',
          width: '100%',
          textAlign: 'left',
        }}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        <span style={{ fontWeight: 500 }}>How to Read PIE Notation</span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '0.75rem',
            color: 'var(--text-on-light-muted)',
          }}
        >
          {isOpen ? 'Collapse' : 'Expand'}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="notation-guide-panel"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: reduced ? 0 : 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <dl
              style={{
                padding: '1.25rem',
                background: 'var(--bg-light-surface)',
                border: '1px solid rgba(139, 115, 85, 0.15)',
                borderTop: 'none',
                borderRadius: '0 0 10px 10px',
                margin: 0,
              }}
            >
              {notationEntries.map((entry, i) => (
                <div
                  key={entry.symbol}
                  style={{ marginBottom: i < notationEntries.length - 1 ? '1rem' : '0.75rem' }}
                >
                  <dt
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      color: 'var(--ochre-dark)',
                      fontWeight: 600,
                    }}
                  >
                    {entry.symbol}
                  </dt>
                  <dd
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-on-light-secondary)',
                      lineHeight: 1.6,
                      marginTop: '0.25rem',
                      marginLeft: 0,
                    }}
                  >
                    {entry.explanation}
                  </dd>
                </div>
              ))}
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-on-light-muted)',
                  fontStyle: 'italic',
                  marginTop: '1rem',
                  marginBottom: 0,
                }}
              >
                These conventions are standard in historical linguistics. The reconstructions
                represent broad scholarly consensus, though many details remain actively debated.
              </p>
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Aside({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        maxWidth: '65ch',
        margin: '0 auto 2rem',
        padding: '1.25rem 1.5rem',
        borderLeft: '3px solid var(--teal)',
        background: 'rgba(13, 115, 119, 0.04)',
        borderRadius: '0 8px 8px 0',
      }}
    >
      {children}
    </div>
  )
}

export default function DiscoverySection() {
  const cognateRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="discovery"
      className="section-light"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section I" title="The Discovery">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              In 1786, a British judge in Calcutta named <strong>Sir William Jones</strong> made
              a striking observation. Sanskrit, the ancient language of India, resembled Greek
              and Latin not in a few scattered words but in its grammar and structure. He
              proposed that all three must have sprung from a common source, "which, perhaps, no
              longer exists."
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              He was right. That source is what we now call <em>Proto-Indo-European</em>: a
              language spoken by a community somewhere in Eurasia, more than six thousand years
              ago. We have no recordings of it and no written texts. And yet linguists have
              reconstructed thousands of its words.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              How? By comparing the daughter languages and finding patterns too systematic to be
              coincidence.
            </p>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.05}>
          <NotationGuide />
        </FadeIn>

        <FadeIn delay={0.08}>
          <Aside>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'var(--text-on-light)',
                fontStyle: 'italic',
                lineHeight: 1.6,
                marginBottom: 0,
              }}
            >
              Take a look at the table below. As you scan across the languages, can you spot any
              patterns in how the sounds change? Pay attention to the first consonant of each
              word.
            </p>
          </Aside>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div ref={cognateRef} style={{ scrollMarginTop: '60px' }}>
            <VizCard style={{ marginBottom: '6rem' }}>
              <CognateExplorer />
            </VizCard>
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ maxWidth: '65ch', margin: '0 auto 4rem' }}>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              The similarities aren't random. Looked at carefully, <strong>the differences
              follow rules</strong>. Where Latin has a <em>p</em>, English has an <em>f</em>.
              Where Latin has a <em>d</em>, English has a <em>t</em>. Consistently, and across
              the whole vocabulary.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              In 1822, <strong>Jacob Grimm</strong>, better known today for the folk tales he
              collected with his brother Wilhelm, formalized these patterns into what is now
              called <em>Grimm's Law</em>. It describes how an entire set of consonants shifted
              as Proto-Indo-European developed into the Germanic languages.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <VizCard>
            <SoundShiftMachine />
          </VizCard>
        </FadeIn>

        <FadeIn>
          <div style={{ marginTop: '3rem' }}>
            <Aside>
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                  color: 'var(--text-on-light)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}
              >
                Now that you've seen how the consonants shifted, go back to the cognate table.
                Notice how Latin <em>pater</em> and English <em>father</em> follow exactly the
                pattern you just explored: <PIEForm root="p" /> became <em>f</em>.
              </p>
              <button
                onClick={() => {
                  cognateRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.6rem 1.25rem',
                  background: 'transparent',
                  border: '1px solid var(--teal)',
                  borderRadius: 20,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--teal)',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                Revisit the Cognate Table
              </button>
            </Aside>
          </div>
        </FadeIn>

        <FadeIn>
          <div style={{ marginTop: '5rem' }}>
            <ClosingNote>
              These sound laws showed that languages change with striking regularity, and that
              tongues as distant as Icelandic and Hindi trace back to a single ancestor. But who
              spoke it, and where did they live?
            </ClosingNote>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
