import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { VizCard, ContentCard, SectionDivider } from '../components/ui/VizCard'
import PIEForm from '../components/ui/PIEForm'
import Timeline from '../components/interactive/Timeline'

export default function DatingSection() {
  return (
    <section
      id="dating"
      className="section-light"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section II" title="When and Where?">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              If Proto-Indo-European was a real language spoken by real people, when did they
              live? Linguists found the answer hidden in the vocabulary they reconstructed.
            </p>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1} margin="-80px">
          <ContentCard title="The Wheel Argument" style={{ marginBottom: '3rem' }}>
            <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              PIE has a reconstructed word for "wheel": <PIEForm root="kʷékʷlos" />, derived
              from the verb "to turn" (<PIEForm root="kʷel-" />) using a rare reduplication
              pattern. This same word appears in Greek <em>kúklos</em>, Sanskrit <em>cakrá</em>,
              and English <em>wheel</em>.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              Here's the key: <strong>wheeled vehicles are not attested archaeologically before
              roughly 3500 BCE</strong>. The word's unusual derivation pattern is too specific to
              have been invented independently in nine or more language branches. It is most
              plausibly inherited from a single source.
            </p>
            <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>
              PIE also has words for <em>axle</em> (<PIEForm root="h₂eḱs-" />),
              <em> yoke</em> (<PIEForm root="yugóm" />), <em>horse</em>, <em>wool</em>, and
              <em> honey/mead</em>. Combined with the earliest written IE language (Hittite,
              ~1650 BCE), this brackets PIE to roughly <strong>4500 to 2500 BCE</strong>.
            </p>
          </ContentCard>
        </FadeIn>

        <FadeIn delay={0.1} margin="-80px">
          <VizCard>
            <Timeline />
          </VizCard>
        </FadeIn>
      </div>
    </section>
  )
}
