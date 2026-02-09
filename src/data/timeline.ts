export interface TimelineEvent {
  id: string;
  date: number; // negative = BCE
  label: string;
  category: "innovation" | "culture" | "language" | "genetic";
  description: string;
  color: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "khvalynsk-culture",
    date: -4700,
    label: "Khvalynsk Culture Emerges",
    category: "culture",
    description:
      "The Khvalynsk culture appears on the Middle Volga near modern Samara, representing an early stage in the formation of steppe pastoralist societies. Khvalynsk cemeteries show evidence of social hierarchy, copper artifacts, and ritual animal sacrifice. Genetically, Khvalynsk people carry a mixture of CHG-rich CLV ancestry and northern EHG ancestry, prefiguring the later Yamnaya genetic profile.",
    color: "#8E44AD",
  },
  {
    id: "clv-expansion",
    date: -4500,
    label: "CLV Cline Expansion Begins",
    category: "genetic",
    description:
      "Populations from the Caucasus-Lower Volga genetic cline begin expanding both westward across the Pontic steppe and southward through the Caucasus. This expansion carries Proto-Indo-European speech and the CLV genetic signature (mixed CHG + EHG) into new territories. The westward branch contributes to steppe cultures like Serednii Stih; the southward branch may carry the ancestor of the Anatolian IE languages toward Anatolia.",
    color: "#9B59B6",
  },
  {
    id: "serednii-stih",
    date: -4400,
    label: "Serednii Stih (Sredny Stog) Culture",
    category: "culture",
    description:
      "The Serednii Stih culture develops in the Dnieper-Don steppe of modern Ukraine, showing early evidence of horse management and possible riding. This culture represents a westward extension of steppe populations carrying CLV-related ancestry, mixed with local Dnieper-region hunter-gatherers. It is considered a precursor to the Yamnaya horizon and a possible vector for early horse domestication practices.",
    color: "#E74C3C",
  },
  {
    id: "horse-domestication",
    date: -4200,
    label: "Horse Domestication on the Steppe",
    category: "innovation",
    description:
      "Early horse management begins on the Pontic-Caspian steppe by around 4200 BCE, with cultures like Botai (northern Kazakhstan) keeping horses for meat and milk. However, modern genomic evidence (Librado et al. 2021) shows that today's domestic horses descend from a single DOM2 lineage that expanded rapidly from the lower Volga-Don region only around 2200 BCE, coinciding with late Yamnaya and early Sintashta cultures. The earlier managed horses, including those at Botai, contributed little to the modern domestic gene pool. Horses nonetheless played a growing role in steppe mobility, herd management, and eventually military technology, becoming central to Indo-European culture and mythology.",
    color: "#F39C12",
  },
  {
    id: "wheel-invention",
    date: -3500,
    label: "Invention of the Wheel and Wheeled Vehicles",
    category: "innovation",
    description:
      "The wheel and heavy solid-wheeled wagons appear almost simultaneously across the Pontic-Caspian steppe and neighboring regions. Proto-Indo-European vocabulary for wheel technology (*kwekwlos 'wheel', *h2eks- 'axle', *wegh- 'to convey in a vehicle') is shared across all major IE branches, indicating the wheel was known to the PIE community before its breakup. Wheeled wagons enabled true mobile pastoralism, allowing families to carry food, water, and shelter across the open steppe and catalyzing the Yamnaya expansion.",
    color: "#F39C12",
  },
  {
    id: "yamnaya-culture",
    date: -3300,
    label: "Yamnaya Culture Begins",
    category: "culture",
    description:
      "The Yamnaya (Pit Grave) cultural horizon emerges across the Pontic-Caspian steppe, from the Danube to the Ural rivers. Characterized by individual burials under kurgans, the use of heavy ox-drawn wagons, and a mobile pastoralist economy based on cattle, sheep, and goats. Yamnaya represents the archaeological culture most closely associated with late Proto-Indo-European and the primary source of the massive steppe migrations that brought IE languages to Europe and Central Asia.",
    color: "#E67E22",
  },
  {
    id: "afanasievo-altai",
    date: -3300,
    label: "Afanasievo Culture Reaches the Altai",
    category: "culture",
    description:
      "Yamnaya-related populations migrate over 3,000 kilometers eastward across the Kazakh steppe to reach the Altai-Sayan region, establishing the Afanasievo culture. Ancient DNA confirms Afanasievo individuals are genetically nearly identical to western Yamnaya, indicating a rapid large-scale migration. This culture is the most likely ancestor of the Tocharian-speaking peoples, representing the earliest Indo-European presence in eastern Central Asia.",
    color: "#F39C12",
  },
  {
    id: "corded-ware",
    date: -2900,
    label: "Corded Ware Culture Begins",
    category: "culture",
    description:
      "The Corded Ware culture rapidly spreads across Northern and Central Europe, from the Rhine to the Volga, representing one of the most dramatic population turnovers in European prehistory. Individuals carry approximately 75% steppe (Yamnaya-related) ancestry. The culture is characterized by cord-impressed pottery, polished stone battle axes, and gender-differentiated individual burials. Corded Ware is ancestral to later Germanic, Balto-Slavic, and possibly Celtic/Italic populations.",
    color: "#3498DB",
  },
  {
    id: "bell-beaker",
    date: -2800,
    label: "Bell Beaker Phenomenon Begins",
    category: "culture",
    description:
      "The Bell Beaker cultural complex emerges in Western and Central Europe, characterized by distinctive bell-shaped drinking vessels, copper daggers, and archery equipment. While initially spreading partly through cultural diffusion, later phases (especially into Britain around 2400 BCE) involve substantial population replacement carrying steppe ancestry. Bell Beaker is associated with the spread of IE languages into Western Europe and the British Isles.",
    color: "#2ECC71",
  },
  {
    id: "bmac-sintashta-contact",
    date: -2100,
    label: "Chariot Invented at Sintashta",
    category: "innovation",
    description:
      "The Sintashta culture of the Southern Urals produces the earliest known spoke-wheeled chariots, a revolutionary military technology. Chariot burials at Sintashta and Krivoe Ozero contain paired horse skeletons, bronze weapons, and cheek pieces for horse control. The chariot transforms warfare across Eurasia over the following centuries. Sintashta also shows striking parallels to Rigvedic descriptions: chariot combat, horse sacrifice, fire rituals, and fortified circular settlements. This culture is the direct ancestor of the Indo-Iranian language branch.",
    color: "#E74C3C",
  },
  {
    id: "andronovo-expansion",
    date: -1900,
    label: "Andronovo Horizon Expansion",
    category: "culture",
    description:
      "The Andronovo cultural horizon expands across the vast Central Asian steppes from the Urals to the Yenisei, developing out of the Sintashta tradition. Andronovo represents the primary archaeological correlate for the spread of Indo-Iranian languages. Characterized by tin-bronze metallurgy, chariot use, and pastoral economies, Andronovo populations are the ancestors of later Iranian-speaking peoples (Scythians, Persians, Medes) and, through southward migration, of the Indo-Aryan speakers who enter South Asia.",
    color: "#D35400",
  },
  {
    id: "hittite-tablets",
    date: -1650,
    label: "Hittite Tablets: Earliest IE Writing",
    category: "language",
    description:
      "The earliest written attestation of any Indo-European language appears in Old Hittite cuneiform tablets from Hattusa (modern Bogazkoy, Turkey). The Hittite language, belonging to the Anatolian branch of IE, preserves archaic features including a two-gender system (common/neuter) and laryngeal consonants whose existence was predicted by Saussure in 1879 before their discovery in Hittite. These tablets include royal edicts, laws, treaties, and mythological texts, providing crucial evidence for reconstructing Proto-Indo-European.",
    color: "#16A085",
  },
  {
    id: "indo-aryan-south-asia",
    date: -1500,
    label: "Indo-Aryan Migration to South Asia",
    category: "genetic",
    description:
      "Indo-Aryan-speaking populations migrate from Central Asia through the Hindu Kush mountain passes into the Indus Valley and the Punjab, marking the arrival of Indo-European languages in South Asia. This migration follows the collapse of the BMAC and the late Harappan phase of the Indus Valley Civilization. Ancient DNA from the Swat Valley (Pakistan) shows the appearance of steppe ancestry in South Asian populations during this period. The migrants carry the traditions that will develop into Vedic culture, including chariot warfare, horse sacrifice, and the fire ritual.",
    color: "#E74C3C",
  },
  {
    id: "mycenaean-greek",
    date: -1400,
    label: "Mycenaean Greek (Linear B Attestation)",
    category: "language",
    description:
      "The earliest attestation of the Greek language appears in Linear B tablets from Knossos (Crete) and later from Pylos and other mainland sites. Deciphered by Michael Ventris in 1952, Linear B reveals an early form of Greek used for palatial administrative records: inventories of goods, livestock, military equipment, and religious offerings. The tablets confirm the Indo-European identity of Mycenaean civilization and provide invaluable data for the history of the Greek language, showing it already differentiated from other IE branches by the mid-2nd millennium BCE.",
    color: "#1ABC9C",
  },
  {
    id: "rigveda-composed",
    date: -1200,
    label: "Rigveda Composed",
    category: "language",
    description:
      "The Rigveda, the oldest and most important of the four Vedas, is composed in Vedic Sanskrit by Indo-Aryan priestly families in the Punjab and upper Ganges-Yamuna region of northern India. Comprising 1,028 hymns (suktas) organized in 10 books (mandalas), the Rigveda preserves archaic Indo-European poetic formulas, mythological narratives, and ritual language that closely parallel Old Avestan (Zoroastrian) texts. It contains references to chariots, horse sacrifice (ashvamedha), the Soma ritual, and a society organized by priestly, warrior, and commoner classes. The Rigveda is one of the most important texts for comparative Indo-European linguistics and mythology.",
    color: "#E74C3C",
  },
];
