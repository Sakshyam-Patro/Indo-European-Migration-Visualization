/**
 * Explanatory essays for the "How Languages Spread" section: the mechanisms
 * and waves by which Indo-European languages came to dominate Eurasia.
 */

export interface SpreadCard {
  title: string
  /** Body paragraphs, split on blank lines when rendered. */
  content: string
  sources?: string[]
}

export const spreadCards: SpreadCard[] = [
  {
    title: 'Elite Dominance vs. Mass Migration',
    content: `For decades, scholars debated how a single language could have spread across such a vast area. One camp argued for elite dominance: a small ruling class (warriors, priests, chieftains) imposed their language on conquered populations, much as Norman French overlaid English after 1066. The local people survived, but their children grew up speaking the newcomers' tongue.

The alternative was mass migration: entire populations moving into new territories, replacing or absorbing the previous inhabitants. For a long time, elite dominance was the fashionable theory. Then came ancient DNA.

Starting around 2015, paleogenomic studies revealed a substantial genetic turnover across parts of Europe around 3000 BCE. In some regions, a large majority of male lineages were replaced within a few centuries. The Yamnaya and their descendants did not only rule; they moved in significant numbers. The debate is not fully settled, and both mechanisms likely operated in different places and times, but the DNA evidence has shifted the balance toward mass migration as a major driver in Europe.`,
    sources: ['Haak et al. 2015, Nature', 'Olalde et al. 2018, Nature', 'Furholt 2021, Journal of Archaeological Research'],
  },
  {
    title: 'The Steppe Package',
    content: `What made steppe pastoralists so successful? Much of the answer lies in a suite of innovations, a "steppe package," that gave them advantages over settled farming communities.

First, the horse. Early horse management may have begun on the Pontic-Caspian steppe by around 4200-3500 BCE, though this is debated; genomic evidence (Librado et al. 2021) shows the modern domestic lineage (DOM2) expanded from the lower Volga-Don region only around 2200 BCE. Once established, horses gave steppe peoples speed, range, and a military edge that foot soldiers could not match.

Second, wheeled vehicles. Heavy ox-drawn wagons allowed families to carry their entire household across the open grasslands, turning the steppe from barrier into corridor.

Third, a pastoral diet built partly on dairy. Ancient DNA shows lactase-persistence alleles rising in frequency over time in these populations, and dairying provided a portable, renewable food source that did not require staying in one place.

Fourth, bronze metallurgy gave better weapons and tools. And finally, a flexible, clan-based social organisation suited to mobile life allowed rapid expansion and the incorporation of new peoples into existing kinship networks.`,
    sources: ['Anthony 2007, The Horse, the Wheel, and Language', 'Librado et al. 2021, Nature'],
  },
  {
    title: 'Language Shift',
    content: `Why would an entire community abandon its own language? This question is central to understanding how Indo-European languages replaced earlier tongues across Eurasia.

Prestige is one powerful driver. When newcomers control trade, military power, or religious authority, their language becomes the language of advancement. Parents raise their children in the dominant tongue because that is where opportunity lies. Within two or three generations, the old language can fade.

Trade networks also play a role. When commerce is conducted in one language, bilingualism spreads, and gradually the economically dominant language tends to win out. Intermarriage between steppe migrants and local populations created bilingual households where the socially prestigious language often prevailed.

Conquest does not always lead to language shift (the Normans in England eventually adopted English), but combined with demographic weight, economic dominance, and sustained migration over centuries, the result across much of Europe was the replacement of the earlier, pre-Indo-European linguistic landscape.`,
    sources: ['Anthony 2007, The Horse, the Wheel, and Language', 'Mallory & Adams 2006, The Oxford Introduction to PIE'],
  },
  {
    title: 'Multiple Waves',
    content: `The Indo-European expansion was not a single event but a series of migrations unfolding over more than two thousand years, each with its own character and destination.

The earliest split was Anatolian. By around 4000 BCE, the ancestors of the Hittites had likely already separated and moved into what is now Turkey, carrying the most archaic recorded form of Indo-European.

Tocharian, the branch later found in the Tarim Basin of western China, probably split off early as well, representing an eastward movement across Central Asia.

Then came the major Yamnaya expansion around 3000 BCE. The Yamnaya horizon spread in two broad directions: westward into Europe (associated with the Corded Ware and later Bell Beaker cultures, connected to Celtic, Germanic, Italic, and Balto-Slavic speakers) and eastward into Central Asia (the Afanasievo culture).

Finally, around 2000-1500 BCE, the Indo-Iranian branch moved south through Central Asia into Iran and the Indian subcontinent, carrying early forms of Avestan and Vedic Sanskrit toward their historical homelands. Each wave built on the previous one, and the intervals between them help explain why the daughter languages differ so much from one another.`,
    sources: ['Anthony 2007, The Horse, the Wheel, and Language', 'Narasimhan et al. 2019, Science'],
  },
]
