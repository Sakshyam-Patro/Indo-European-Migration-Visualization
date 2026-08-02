/**
 * Timeline of events relevant to Indo-European origins and dispersal.
 *
 * DATES: `date` is a single integer for plotting only (negative = BCE). For
 * prehistoric entries it is a conventional midpoint, not a precise year — the
 * real uncertainty is stated in each `description`. Where a date is genuinely
 * contested rather than merely approximate, the `label` says so.
 *
 * `cultureId` joins an event to the matching row in `cultures.ts` (and, where
 * one exists, to `territories.ts`), so the two datasets can be linked without
 * matching on names or on the event's own id.
 */

export interface TimelineEvent {
  id: string;
  date: number; // negative = BCE
  label: string;
  category: "innovation" | "culture" | "language" | "genetic";
  description: string;
  /** id of the related culture in `cultures.ts`, when there is one. */
  cultureId?: string;
  /** Key publications behind the dating or the claims made here. */
  sources?: string[];
  color: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "khvalynsk-culture",
    date: -4700,
    label: "Khvalynsk Culture Emerges",
    category: "culture",
    description:
      "The Khvalynsk culture appears on the Middle Volga near modern Samara, conventionally dated c. 4700-3800 BCE, representing an early stage in the formation of steppe pastoralist societies. Khvalynsk cemeteries show evidence of social hierarchy, copper artifacts, and ritual animal sacrifice. Genetically, Khvalynsk people carry a mixture of CHG-rich CLV ancestry and northern EHG ancestry, prefiguring the later Yamnaya genetic profile.",
    cultureId: "khvalynsk",
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Lazaridis et al. 2025, Nature",
    ],
    color: "#8E44AD",
  },
  {
    id: "clv-expansion",
    date: -4500,
    label: "CLV Cline Expansion Begins",
    category: "genetic",
    description:
      "Populations from the Caucasus-Lower Volga genetic cline begin expanding both westward across the Pontic steppe and southward through the Caucasus. This expansion carries the CLV genetic signature (mixed CHG + EHG) into new territories, and on the current reading of the evidence carries Proto-Indo-European speech with it. The westward branch contributes to steppe cultures like Serednii Stih; the southward branch may carry the ancestor of the Anatolian IE languages toward Anatolia. The date is a rough start point for a gradual process, not an event, and the link between the genetic cline and the language is an inference rather than something the DNA shows directly.",
    cultureId: "clv",
    sources: ["Lazaridis et al. 2025, Nature", "Lazaridis et al. 2022, Science"],
    color: "#9B59B6",
  },
  {
    id: "sredny-stog",
    date: -4400,
    label: "Serednii Stih (Sredny Stog) Culture",
    category: "culture",
    description:
      "The Serednii Stih culture develops in the Dnieper-Don steppe of modern Ukraine, c. 4400-3300 BCE, showing early evidence of horse management. This culture represents a westward extension of steppe populations carrying CLV-related ancestry, mixed with local Dnieper-region hunter-gatherers and with a small farmer component from contact with the neighbouring Trypillia world. It is considered a precursor to the Yamnaya horizon and a possible vector for early horse-management practices. Serednii Stih is the Ukrainian name for the culture; Sredny Stog is the older Russian transliteration of the same site.",
    cultureId: "sredny-stog",
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Lazaridis et al. 2025, Nature",
    ],
    color: "#E74C3C",
  },
  {
    id: "horse-management",
    date: -4200,
    label: "Early Horse Management (contested)",
    category: "innovation",
    description:
      "Horses begin to be managed rather than simply hunted on the Eurasian steppes, from roughly 4200 BCE onward. The evidence is indirect and contested: concentrations of horse bones and ritual horse deposits in Serednii Stih and Khvalynsk contexts on the Pontic-Caspian steppe, and later, further east, the Botai culture of northern Kazakhstan (c. 3500-3000 BCE) with its mare's-milk residues and possible corrals. What this stage was NOT is the domestication of the modern horse. The bit-wear argument for a ridden Dereivka stallion collapsed when the animal was redated to the Iron Age, and the Botai horses turned out to belong to the Przewalski lineage rather than to the ancestors of modern domestic horses. Skeletal 'horsemanship syndrome' reported in some Yamnaya individuals has been offered as evidence for riding by c. 3000 BCE, and is itself debated.",
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Gaunitz et al. 2018, Science",
      "Trautmann et al. 2023, Science Advances",
    ],
    color: "#F39C12",
  },
  {
    id: "wheel-invention",
    date: -3500,
    label: "Invention of the Wheel and Wheeled Vehicles",
    category: "innovation",
    description:
      "The wheel and heavy solid-wheeled wagons appear across the Pontic-Caspian steppe, Mesopotamia, and Central Europe within a few centuries of one another around 3500 BCE — close enough in time that the place of origin is still argued over. Proto-Indo-European vocabulary for wheel technology (*kwekwlos 'wheel', *h2eks- 'axle', *wegh- 'to convey in a vehicle') is shared across all major IE branches, indicating the wheel was known to the PIE community before its breakup; this is one of the main linguistic arguments against very early dates for that breakup. Wheeled wagons enabled true mobile pastoralism, allowing families to carry food, water, and shelter across the open steppe and catalyzing the Yamnaya expansion.",
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Fortson 2010, Indo-European Language and Culture",
    ],
    color: "#F39C12",
  },
  {
    id: "yamnaya-culture",
    date: -3300,
    label: "Yamnaya Culture Begins",
    category: "culture",
    description:
      "The Yamnaya (Pit Grave) cultural horizon emerges across the Pontic-Caspian steppe, from the Danube to the Ural rivers, c. 3300-2600 BCE. Characterized by individual burials under kurgans, the use of heavy ox-drawn wagons, and a mobile pastoralist economy based on cattle, sheep, and goats. Yamnaya represents the archaeological culture most closely associated with late Proto-Indo-European and the primary source of the massive steppe migrations that brought IE languages to Europe and Central Asia.",
    cultureId: "yamnaya",
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Haak et al. 2015, Nature",
    ],
    color: "#E67E22",
  },
  {
    id: "afanasievo-altai",
    date: -3300,
    label: "Afanasievo Culture Reaches the Altai",
    category: "culture",
    description:
      "Yamnaya-related populations migrate over 3,000 kilometers eastward across the Kazakh steppe to reach the Altai-Sayan region, establishing the Afanasievo culture. Ancient DNA confirms Afanasievo individuals are genetically nearly identical to western Yamnaya, indicating a rapid large-scale migration. This culture is the most likely ancestor of the Tocharian-speaking peoples, representing the earliest Indo-European presence in eastern Central Asia — though the Tarim Basin mummies later found in that region carry local Ancient North Eurasian rather than Afanasievo ancestry, so the connection to Tocharian is linguistic and archaeological rather than a demonstrated line of descent.",
    cultureId: "afanasievo",
    sources: [
      "Allentoft et al. 2015, Nature",
      "Narasimhan et al. 2019, Science",
      "Zhang et al. 2021, Nature",
    ],
    color: "#F39C12",
  },
  {
    id: "corded-ware",
    date: -2900,
    label: "Corded Ware Culture Begins",
    category: "culture",
    description:
      "The Corded Ware culture rapidly spreads across Northern and Central Europe, from the Rhine to the Volga, representing one of the most dramatic population turnovers in European prehistory. Individuals carry approximately 75% steppe (Yamnaya-related) ancestry. The culture is characterized by cord-impressed pottery, polished stone battle axes, and gender-differentiated individual burials. Corded Ware is ancestral to later Germanic and Balto-Slavic populations, and possibly to Celtic and Italic ones, though those two branches are more often tied to the later Bell Beaker expansion.",
    cultureId: "corded-ware",
    sources: ["Haak et al. 2015, Nature", "Allentoft et al. 2015, Nature"],
    color: "#3498DB",
  },
  {
    id: "bell-beaker",
    date: -2800,
    label: "Bell Beaker Phenomenon Begins",
    category: "culture",
    description:
      "The Bell Beaker cultural complex emerges in Western and Central Europe, characterized by distinctive bell-shaped drinking vessels, copper daggers, and archery equipment. Its genetic signature varies sharply by region: the earliest Iberian Beaker individuals carry little or no steppe ancestry, indicating the style spread there by contact, while the spread into Britain around 2400 BCE involved substantial population replacement by groups carrying steppe ancestry. Bell Beaker is associated with the spread of IE languages into Western Europe and the British Isles.",
    cultureId: "bell-beaker",
    sources: ["Olalde et al. 2018, Nature", "Olalde et al. 2019, Science"],
    color: "#2ECC71",
  },
  {
    id: "dom2-horse-expansion",
    date: -2200,
    label: "Modern Domestic Horse (DOM2) Spreads",
    category: "innovation",
    description:
      "The lineage that all modern domestic horses descend from — DOM2 — expands out of the lower Volga-Don region and replaces other horse populations across Eurasia within a few centuries. Librado et al. (2021) established this from 273 ancient horse genomes, and it, rather than the earlier managed horses of the steppe or of Botai, is the origin of the domestic horse. The timing matters: DOM2 spreads alongside the spoke-wheeled chariot and the Sintashta horizon, roughly a thousand years after the first Yamnaya migrations, which means the great westward expansion into Europe happened without the horse in its familiar transport role.",
    sources: ["Librado et al. 2021, Nature"],
    color: "#F39C12",
  },
  {
    id: "sintashta-chariot",
    date: -2100,
    label: "Chariot Invented at Sintashta",
    category: "innovation",
    description:
      "The Sintashta culture of the Southern Urals produces the earliest known spoke-wheeled chariots, a revolutionary military technology. Chariot burials at Sintashta and Krivoe Ozero contain paired horse skeletons, bronze weapons, and cheek pieces for horse control. The chariot transforms warfare across Eurasia over the following centuries. Sintashta also shows striking parallels to Rigvedic descriptions: chariot combat, horse sacrifice, fire rituals, and fortified circular settlements. This culture is the direct ancestor of the Indo-Iranian language branch.",
    cultureId: "sintashta",
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Narasimhan et al. 2019, Science",
    ],
    color: "#E74C3C",
  },
  {
    id: "andronovo-expansion",
    date: -1900,
    label: "Andronovo Horizon Expansion",
    category: "culture",
    description:
      "The Andronovo cultural horizon expands across the vast Central Asian steppes from the Urals to the Yenisei, developing out of the Sintashta tradition. Andronovo represents the primary archaeological correlate for the spread of Indo-Iranian languages. Characterized by tin-bronze metallurgy, chariot use, and pastoral economies, Andronovo populations are the ancestors of later Iranian-speaking peoples (Scythians, Persians, Medes) and, through southward migration, of the Indo-Aryan speakers who enter South Asia.",
    cultureId: "andronovo",
    sources: ["Narasimhan et al. 2019, Science"],
    color: "#D35400",
  },
  {
    id: "hittite-tablets",
    date: -1650,
    label: "Hittite Tablets: Earliest IE Texts",
    category: "language",
    description:
      "The earliest surviving texts in any Indo-European language are Old Hittite cuneiform tablets from Hattusa (modern Bogazkoy, Turkey), conventionally dated c. 1650 BCE — though most copies we have are later New Hittite transcriptions, so the dating is of the composition rather than of the physical tablet. Isolated Anatolian personal names appear even earlier, in Old Assyrian merchant records from Kanesh in the 20th-19th centuries BCE, but those are names in an unrelated language's documents rather than IE texts. The Hittite language, belonging to the Anatolian branch of IE, preserves archaic features including a two-gender system (common/neuter) and laryngeal consonants whose existence Saussure had predicted in 1879, decades before Hittite was deciphered. These tablets include royal edicts, laws, treaties, and mythological texts, providing crucial evidence for reconstructing Proto-Indo-European.",
    sources: ["Fortson 2010, Indo-European Language and Culture"],
    color: "#16A085",
  },
  {
    id: "indo-aryan-south-asia",
    date: -1500,
    label: "Indo-Aryan Migration to South Asia",
    category: "genetic",
    description:
      "Indo-Aryan-speaking populations migrate from Central Asia through the Hindu Kush mountain passes into the Indus Valley and the Punjab, marking the arrival of Indo-European languages in South Asia, over a period centred on roughly 1500 BCE rather than in a single year. This migration follows the collapse of the BMAC and the late Harappan phase of the Indus Valley Civilization. Ancient DNA from the Swat Valley (Pakistan) shows the appearance of steppe ancestry in South Asian populations during this period. The migrants carry the traditions that will develop into Vedic culture, including chariot warfare, horse sacrifice, and the fire ritual.",
    sources: ["Narasimhan et al. 2019, Science"],
    color: "#E74C3C",
  },
  {
    id: "mycenaean-greek",
    date: -1400,
    label: "Mycenaean Greek (Linear B Attestation)",
    category: "language",
    description:
      "The earliest attestation of the Greek language appears in Linear B tablets from Knossos (Crete) and later from Pylos and other mainland sites. The Knossos tablets are conventionally dated to c. 1400 BCE, but that date rests on the stratigraphy of Evans's excavation and has been disputed for decades, with some scholars placing them as much as two centuries later; the Pylos tablets are securely dated to c. 1200 BCE. Deciphered by Michael Ventris in 1952, Linear B reveals an early form of Greek used for palatial administrative records: inventories of goods, livestock, military equipment, and religious offerings. The tablets confirm the Indo-European identity of Mycenaean civilization and show Greek already differentiated from other IE branches by the mid-2nd millennium BCE.",
    cultureId: "mycenaean",
    sources: ["Fortson 2010, Indo-European Language and Culture"],
    color: "#1ABC9C",
  },
  {
    id: "rigveda-composed",
    date: -1200,
    label: "Rigveda Composed",
    category: "language",
    description:
      "The Rigveda, the oldest and most important of the four Vedas, is composed in Vedic Sanskrit by Indo-Aryan priestly families in the Punjab and upper Ganges-Yamuna region of northern India. Composition spanned centuries — usually placed c. 1500-1000 BCE, with the family books at the older end — and the text was transmitted orally with remarkable fidelity for a further millennium before being written down, so no single date can be given. Comprising 1,028 hymns (suktas) organized in 10 books (mandalas), the Rigveda preserves archaic Indo-European poetic formulas, mythological narratives, and ritual language that closely parallel Old Avestan (Zoroastrian) texts. It contains references to chariots, horse sacrifice (ashvamedha), the Soma ritual, and a society organized by priestly, warrior, and commoner classes. The Rigveda is one of the most important texts for comparative Indo-European linguistics and mythology.",
    sources: ["Fortson 2010, Indo-European Language and Culture"],
    color: "#E74C3C",
  },
];
