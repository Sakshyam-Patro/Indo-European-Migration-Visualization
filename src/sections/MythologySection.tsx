import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { VizCard, SectionDivider } from '../components/ui/VizCard'
import PIEForm from '../components/ui/PIEForm'
import MythWeb from '../components/interactive/MythWeb'

export default function MythologySection() {
  return (
    <section
      id="mythology"
      className="section-dark"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section VI" title="Shared Mythology">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Beyond words and grammar, Indo-European peoples appear to have shared elements of
              their religion: their gods, their creation stories, and their rituals. When the
              same sky father is invoked from Iceland to India, or a similar serpent-slaying
              myth is told in Sanskrit hymns and Norse sagas, we glimpse the spiritual world of
              people who lived five thousand years ago.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              These shared myths are among the more compelling strands of evidence for a common
              Indo-European origin. Linguists can reconstruct words; comparative mythology tries
              to recover the stories those words were used to tell, from the divine twins who
              rescued sailors to the sacred fire that carried offerings to the heavens.
            </p>
            <p
              style={{
                color: 'var(--text-on-dark-muted)',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                fontStyle: 'italic',
              }}
            >
              A note on method: the strongest Indo-European mythological reconstructions rest on
              shared linguistic evidence, such as cognate divine names like{' '}
              <PIEForm root="Dyḗus ph₂tḗr" /> and formulaic poetic phrases spanning Vedic,
              Avestan, Greek, and Norse traditions (Watkins 1995). Broader parallels such as
              flood narratives and divine succession myths may instead reflect Bronze Age
              cultural contact with Near Eastern and other traditions (West 1997; Witzel 2012)
              rather than inheritance from PIE. Several reconstructions below remain contested.
            </p>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <VizCard>
            <MythWeb />
          </VizCard>
        </FadeIn>
      </div>
    </section>
  )
}
