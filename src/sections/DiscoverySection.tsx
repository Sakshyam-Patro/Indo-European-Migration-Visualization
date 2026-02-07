import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import CognateExplorer from '../components/interactive/CognateExplorer'
import SoundShiftMachine from '../components/interactive/SoundShiftMachine'

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

const NOTATION_ENTRIES = [
  { symbol: '* (asterisk)', explanation: 'Marks a reconstructed form that is not directly attested in any written record. For example, *ph₂tḗr is a best estimate based on comparing daughter languages.' },
  { symbol: 'Accent marks (ā, ḗ, etc.)', explanation: 'Indicate vowel length or pitch accent in reconstructed and attested forms. A macron (ā) means a long vowel; an acute (é) marks stress or high pitch.' },
  { symbol: 'Superscript h (bʰ, dʰ, gʰ)', explanation: 'Represents "aspirated" consonants: stops pronounced with a puff of breath. PIE had a full series of these, preserved most clearly in Sanskrit (bh, dh, gh).' },
  { symbol: 'Superscript w (kʷ, gʷ)', explanation: 'Represents "labialized" consonants: sounds pronounced with rounded lips, like saying "k" and "w" simultaneously. These became "qu" in Latin and "wh" in English.' },
  { symbol: 'h₁, h₂, h₃ (laryngeals)', explanation: 'Three reconstructed sounds whose exact pronunciation is debated. They affected neighboring vowels: h₁ left e-coloring, h₂ produced a-coloring, and h₃ produced o-coloring. Hittite preserved some as actual consonants.' },
  { symbol: '> (arrow)', explanation: 'Means "became" or "developed into." For example, PIE *p > Germanic *f shows that the PIE p-sound shifted to f in the Germanic branch (Grimm\'s Law).' },
]

function NotationGuide() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{
      maxWidth: '65ch',
      margin: '0 auto 3rem',
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          background: 'var(--bg-light-surface)',
          border: '1px solid rgba(139, 115, 85, 0.2)',
          borderRadius: 10,
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: '0.875rem',
          color: 'var(--text-on-light-secondary)',
          transition: 'background 0.2s, border-color 0.2s',
          width: '100%',
          textAlign: 'left',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'var(--bg-light-elevated)'
          e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.35)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'var(--bg-light-surface)'
          e.currentTarget.style.borderColor = 'rgba(139, 115, 85, 0.2)'
        }}
      >
        <span style={{
          display: 'inline-block',
          transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s',
          fontSize: '0.7rem',
        }}>
          &#9654;
        </span>
        <span style={{ fontWeight: 500 }}>How to Read PIE Notation</span>
        <span style={{
          marginLeft: 'auto',
          fontSize: '0.75rem',
          color: 'var(--text-on-light-muted)',
        }}>
          {isOpen ? 'Collapse' : 'Expand'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '1.25rem',
              background: 'var(--bg-light-surface)',
              border: '1px solid rgba(139, 115, 85, 0.15)',
              borderTop: 'none',
              borderRadius: '0 0 10px 10px',
            }}>
              {NOTATION_ENTRIES.map((entry, i) => (
                <div key={i} style={{
                  marginBottom: i < NOTATION_ENTRIES.length - 1 ? '1rem' : '0.75rem',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    color: 'var(--ochre-dark)',
                    fontWeight: 600,
                  }}>
                    {entry.symbol}
                  </span>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-on-light-secondary)',
                    lineHeight: 1.6,
                    marginTop: '0.25rem',
                    marginBottom: 0,
                  }}>
                    {entry.explanation}
                  </p>
                </div>
              ))}
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-on-light-muted)',
                fontStyle: 'italic',
                marginTop: '1rem',
                marginBottom: 0,
              }}>
                These conventions are standard in historical linguistics. The reconstructions
                represent scholarly consensus, though details are actively debated.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function DiscoverySection() {
  return (
    <section
      id="discovery"
      className="section-light"
      style={{
        padding: '8rem 0',
        position: 'relative',
      }}
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

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 2rem',
      }}>
        {/* Section title */}
        <FadeInSection>
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
              Section I
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-on-light)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              The Discovery
            </h2>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              In 1786, a British judge in Calcutta named <strong>Sir William Jones</strong> made
              a startling observation. Sanskrit, the ancient language of India, bore an uncanny
              resemblance to Greek and Latin, not in a few scattered words, but in its very
              grammar and structure. He proposed that all three must have sprung from
              a common source, "which, perhaps, no longer exists."
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              He was right. That source is what we now call <em>Proto-Indo-European</em>: a
              language spoken by a single community of people, somewhere in Eurasia, more than
              six thousand years ago. We have no recordings of it, no written texts. And yet
              linguists have reconstructed thousands of its words.
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              How? By comparing the daughter languages and finding patterns too systematic to
              be coincidence.
            </p>
          </div>
        </FadeInSection>

        {/* Notation guide (collapsible) */}
        <FadeInSection delay={0.05}>
          <NotationGuide />
        </FadeInSection>

        {/* Cognate Explorer: dark card on light background */}
        <FadeInSection delay={0.1}>
          <div style={{
            marginBottom: '6rem',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
          }}>
            <CognateExplorer />
          </div>
        </FadeInSection>

        {/* Transition text */}
        <FadeInSection>
          <div style={{ marginBottom: '4rem', maxWidth: '65ch', margin: '0 auto 4rem' }}>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              The similarities aren't random. When you look carefully, <strong>the differences
              follow rules</strong>. Where Latin has a <em>p</em>, English has an <em>f</em>.
              Where Latin has a <em>d</em>, English has a <em>t</em>. Always. Systematically.
            </p>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              In 1822, <strong>Jacob Grimm</strong> (yes, the fairy tale collector) formalized
              these patterns into what is now called <em>Grimm's Law</em>. It describes how an
              entire set of consonants shifted when Proto-Indo-European evolved into the
              Germanic languages.
            </p>
          </div>
        </FadeInSection>

        {/* Grimm's Law Machine: dark card on light background */}
        <FadeInSection delay={0.1}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
          }}>
            <SoundShiftMachine />
          </div>
        </FadeInSection>

        {/* Closing thought */}
        <FadeInSection>
          <div style={{
            marginTop: '5rem',
            padding: '2rem',
            borderLeft: '3px solid var(--ochre)',
            maxWidth: '65ch',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              color: 'var(--text-on-light)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              marginBottom: 0,
            }}>
              These sound laws proved that languages evolve with the regularity of natural
              laws, and that all these languages, from Icelandic to Hindi, trace back to a
              single ancestral tongue. But who spoke it? And where did they live?
            </p>
          </div>
        </FadeInSection>
      </div>
    </section>
  )
}
