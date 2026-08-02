import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { SectionDivider } from '../components/ui/VizCard'
import MigrationMap from '../components/interactive/MigrationMap'

export default function HomelandSection() {
  return (
    <section
      id="homeland"
      className="section-dark"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section III" title="The Homeland">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              The Pontic-Caspian steppe, the vast grasslands stretching from modern Ukraine to
              Kazakhstan, is where most scholars now locate the Proto-Indo-European homeland.
              From here, over two thousand years, their descendants carried the language across
              much of Eurasia.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Watch the story unfold: from early steppe pastoralists to the Yamnaya horizon,
              and the migrations that followed into Europe, Central Asia, and beyond.
            </p>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1} margin="-80px">
          <MigrationMap />
        </FadeIn>
      </div>
    </section>
  )
}
