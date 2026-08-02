import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { VizCard, ContentCard, SectionDivider, ClosingNote } from '../components/ui/VizCard'
import LanguagePathways from '../components/interactive/LanguagePathways'
import { spreadCards } from '../data/spreadCards'

export default function SpreadSection() {
  return (
    <section
      id="spread"
      className="section-light"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section V" title="How Languages Spread">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Knowing <em>where</em> the Proto-Indo-Europeans lived is only half the story. The
              deeper question is <em>how</em> a single language spoken on the steppe came to be
              spoken across so much of Eurasia. The answer involves horses, wagons, dairying,
              bronze, and a long series of migrations.
            </p>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <VizCard style={{ marginBottom: '4rem' }}>
            <LanguagePathways />
          </VizCard>
        </FadeIn>

        {spreadCards.map((card, i) => {
          const paragraphs = card.content.split('\n\n')
          return (
            <FadeIn key={card.title} delay={0.1 + i * 0.05}>
              <ContentCard title={card.title} style={{ marginBottom: '2rem' }}>
                {paragraphs.map((paragraph, pi) => (
                  <p
                    key={pi}
                    style={{
                      fontSize: '1rem',
                      lineHeight: 1.7,
                      marginBottom: pi < paragraphs.length - 1 ? '1em' : 0,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
                {card.sources && (
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-on-light-muted)',
                      marginTop: '1rem',
                      marginBottom: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    Sources: {card.sources.join('; ')}
                  </p>
                )}
              </ContentCard>
            </FadeIn>
          )
        })}

        <FadeIn delay={0.3}>
          <div style={{ marginTop: '3rem' }}>
            <ClosingNote>
              From a single community on the steppe, through wave after wave of migration and
              contact, one language became many, and those many languages are now spoken by
              close to half the people on Earth.
            </ClosingNote>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
