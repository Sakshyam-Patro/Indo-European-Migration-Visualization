import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { VizCard, SectionDivider } from '../components/ui/VizCard'
import LanguageTree from '../components/interactive/LanguageTree'
import { treeStats } from '../data/treeStats'

export default function FamilyTreeSection() {
  return (
    <section
      id="family-tree"
      className="section-light"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section IV" title="The Language Family">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Over thousands of years, Proto-Indo-European fractured into roughly ten major
              branches, from Celtic in the west to Tocharian in the deserts of western China.
              Each branch split further, producing the diversity of languages spoken across
              Europe, Iran, and South Asia today.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              Roughly 400 living languages belong to the family worldwide. The tree below charts
              a curated selection of {treeStats.total} of them, chosen to show the shape of each
              branch rather than to list every descendant. Click any node to expand a branch and
              trace how a single prehistoric tongue gave rise to Hindi, English, Farsi, and Greek
              alike.
            </p>
          </SectionHeading>
        </FadeIn>
      </div>

      <div style={{ maxWidth: 1800, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn delay={0.1}>
          <VizCard>
            <LanguageTree />
          </VizCard>
        </FadeIn>
      </div>
    </section>
  )
}
