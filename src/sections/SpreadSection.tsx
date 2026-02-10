import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import LanguagePathways from '../components/interactive/LanguagePathways'

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

const spreadCards = [
  {
    title: 'Elite Dominance vs. Mass Migration',
    content: `For decades, scholars debated how a single language could have spread across such a vast area. One camp argued for elite dominance: a small ruling class (warriors, priests, chieftains) imposed their language on conquered populations, much as Norman French overlaid English after 1066. The local people survived, but their children grew up speaking the newcomers' tongue.

The alternative was mass migration: entire populations moving into new territories, replacing or absorbing the previous inhabitants. For a long time, elite dominance was the fashionable theory. Then came ancient DNA.

Starting around 2015, paleogenomic studies revealed a dramatic genetic turnover across Europe around 3000 BCE. In many regions, 70-100% of male lineages were replaced within just a few centuries. The Yamnaya and their descendants didn't just rule; they moved in enormous numbers. The debate isn't fully settled, and both mechanisms likely operated in different places and times, but the DNA evidence has shifted the balance decisively toward mass migration as the primary driver in Europe.`,
  },
  {
    title: 'The Steppe Package',
    content: `What made steppe pastoralists so extraordinarily successful? The answer lies in a suite of innovations, a "steppe package," that gave them decisive advantages over settled farming communities.

First, the horse. Early horse management began on the Pontic-Caspian steppe by around 4200 BCE, though genomic evidence (Librado et al. 2021) shows the modern domestic lineage (DOM2) expanded from the lower Volga-Don region only around 2200 BCE. Regardless of the exact timeline, horses gave steppe peoples speed, range, and military advantage that foot soldiers could not match.

Second, wheeled vehicles. Heavy ox-drawn wagons allowed families to carry their entire household across the open grasslands, turning the vast steppe from barrier into highway.

Third, a pastoral diet built on dairy products. Ancient DNA shows that steppe populations carried lactase persistence mutations at higher rates. The ability to digest milk into adulthood provided a portable, renewable food source that didn't require staying in one place.

Fourth, bronze metallurgy gave them superior weapons and tools. And finally, their social organization, flexible, clan-based, and adapted to mobile life, allowed rapid expansion and the incorporation of new peoples into their kinship networks.`,
  },
  {
    title: 'Language Shift',
    content: `Why would an entire community abandon its own language? This question is central to understanding how Indo-European languages replaced hundreds of earlier tongues across Eurasia.

Prestige is one powerful driver. When the newcomers control trade, military power, or religious authority, their language becomes the language of advancement. Parents raise their children in the dominant tongue because that's where opportunity lies. Within two or three generations, the old language can vanish.

Trade networks also play a role. When commerce is conducted in one language, bilingualism spreads, and gradually the economically dominant language wins out. Intermarriage between steppe migrants and local populations created bilingual households where the socially prestigious language (typically the father's, in patrilocal societies) tended to prevail.

Conquest doesn't always lead to language shift (the Normans in England eventually adopted English), but when combined with demographic weight, economic dominance, and sustained migration over centuries, the result was the wholesale replacement of Europe's pre-Indo-European linguistic landscape.`,
  },
  {
    title: 'Multiple Waves',
    content: `The Indo-European expansion wasn't a single dramatic event but a series of migrations unfolding over more than two thousand years, each with its own character and destination.

The earliest split was Anatolian. By around 4000 BCE, the ancestors of the Hittites had already separated and moved south into what is now Turkey, carrying the most archaic form of any recorded Indo-European language.

Tocharian, the mysterious IE branch found in western China's Tarim Basin, likely split off next, representing an early eastward movement across Central Asia.

Then came the massive Yamnaya expansion around 3000 BCE, the big one. The Yamnaya horizon spread explosively in two directions: westward into Europe (giving rise to the Corded Ware and later Bell Beaker cultures, ancestors of the Celtic, Germanic, Italic, and Balto-Slavic speakers) and eastward into Central Asia (the Afanasievo culture).

Finally, around 2000-1500 BCE, the Indo-Iranian branch pushed south through Central Asia and into Iran and the Indian subcontinent, carrying Vedic Sanskrit and Old Avestan to their historical homelands. Each wave built on the previous one, and the intervals between them explain why the daughter languages differ so dramatically from one another.`,
  },
]

export default function SpreadSection() {
  return (
    <section
      id="spread"
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
              Section III.b
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              color: 'var(--text-on-light)',
              fontWeight: 300,
              marginBottom: '1.5rem',
              lineHeight: 1.15,
            }}>
              How Languages Spread
            </h2>
            <p style={{
              color: 'var(--text-on-light-secondary)',
              fontSize: '1.125rem',
              lineHeight: 1.7,
            }}>
              Knowing <em>where</em> the Proto-Indo-Europeans lived is only half the story. The
              deeper mystery is <em>how</em> a single language spoken on the steppe came to dominate
              half of Eurasia. The answer involves horses, wagons, milk, bronze, and an
              extraordinary series of migrations that played out over millennia.
            </p>
          </div>
        </FadeIn>

        {/* Interactive: Language Pathways */}
        <FadeIn delay={0.1}>
          <div style={{
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--bg-surface)',
            borderRadius: 20,
            border: '1px solid rgba(200, 169, 110, 0.1)',
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
            marginBottom: '4rem',
          }}>
            <LanguagePathways />
          </div>
        </FadeIn>

        {/* Content cards */}
        {spreadCards.map((card, i) => (
          <FadeIn key={card.title} delay={0.1 + i * 0.05}>
            <div style={{
              marginBottom: '2rem',
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
                {card.title}
              </h4>
              {card.content.split('\n\n').map((paragraph, pi) => (
                <p key={pi} style={{
                  color: 'var(--text-on-light-secondary)',
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  marginBottom: pi < card.content.split('\n\n').length - 1 ? '1em' : 0,
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        ))}

        {/* Closing thought */}
        <FadeIn delay={0.3}>
          <div style={{
            marginTop: '3rem',
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
              From a single community on the steppe, through wave after wave of migration and
              contact, one language became many, and those many languages now live on the tongues
              of nearly half the people on Earth.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
