import FadeIn from '../components/ui/FadeIn'
import SectionHeading from '../components/ui/SectionHeading'
import { VizCard, SectionDivider } from '../components/ui/VizCard'
import AncestryChart from '../components/interactive/AncestryChart'

export default function DNASection() {
  return (
    <section
      id="dna"
      className="section-light"
      style={{ padding: '8rem 0', position: 'relative' }}
    >
      <SectionDivider />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <FadeIn>
          <SectionHeading eyebrow="Section VII" title="The DNA Revolution">
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              For over two centuries, the Indo-European question belonged to linguists and
              archaeologists alone. Then, beginning around 2010, advances in ancient DNA
              sequencing transformed the field. By extracting genetic material from human
              remains thousands of years old, researchers could finally track the movements of
              people across prehistoric Eurasia: not only their pots, their words, and their
              burial customs, but their genomes.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              The results reshaped the debate. Ancient DNA showed that a large migration from
              the Pontic-Caspian steppe around 3000 BCE altered the genetic landscape of Europe
              and, some centuries later, South Asia. The Yamnaya-related ancestry that appears
              in Corded Ware, Bell Beaker, and Sintashta populations maps closely onto regions
              where Indo-European languages are spoken today. Linguistics, archaeology, and
              genetics converged on broadly the same story.
            </p>
            <p style={{ fontSize: '1.125rem', lineHeight: 1.7 }}>
              The pattern is consistent: where steppe-related ancestry appears in the record,
              Indo-European languages tend to follow. In Britain, Bell Beaker-associated
              migrants are estimated to have replaced a large majority of the local Neolithic
              gene pool (Olalde et al. 2018). In the Aegean, a modest steppe-related component
              distinguishes Mycenaean from earlier Minoan samples (Lazaridis et al. 2017,
              2022). In South Asia, steppe ancestry appears after the decline of the Indus
              Valley Civilization, broadly coinciding with the earliest Vedic Sanskrit
              tradition (Narasimhan et al. 2019). DNA does not record what language a person
              spoke, but it does reveal the migrations that carried those languages.
            </p>
          </SectionHeading>
        </FadeIn>

        <FadeIn delay={0.1}>
          <VizCard>
            <AncestryChart />
          </VizCard>
        </FadeIn>
      </div>
    </section>
  )
}
