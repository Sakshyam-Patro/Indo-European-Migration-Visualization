/**
 * Ancient DNA data: ancestry profiles for individual reference populations and
 * summaries of the published studies they come from.
 *
 * ---------------------------------------------------------------------------
 * SHARED ANCESTRY VOCABULARY (this file and `cultures.ts` use the same one)
 * ---------------------------------------------------------------------------
 * Deep ("distal") source components — the populations everything else is built
 * out of:
 *
 *   whg / WHG   Western Hunter-Gatherer   Europe's pre-Neolithic foragers
 *   ehg / EHG   Eastern Hunter-Gatherer   Russian / east Baltic foragers
 *   chg / CHG   Caucasus Hunter-Gatherer  southern Caucasus foragers; also used
 *                                         here as the nearest available proxy
 *                                         for Iranian-Neolithic-related ancestry
 *   anf / EEF   Anatolian Neolithic Farmer. `cultures.ts` calls this EEF
 *                                         ("Early European Farmer"). The two are
 *                                         not identical — EEF is ANF plus a few
 *                                         percent of absorbed WHG — but they are
 *                                         the same lineage and are treated as
 *                                         interchangeable across these files.
 *
 * Collapsed ("proximal") component:
 *
 *   steppe / Steppe   Yamnaya-related steppe ancestry. This is NOT an
 *                     independent deep source: Yamnaya themselves are roughly
 *                     50% CHG-rich CLV + 45% EHG + 5% WHG (see the
 *                     `yamnaya-samara` row below). To compare a steppe-collapsed
 *                     profile against a deep-source profile, split the Steppe
 *                     figure in roughly that ratio.
 *
 *   other             Region-specific ancestry with no slot above — AASI
 *                     (Ancient Ancestral South Indian), Levantine, West Siberian
 *                     hunter-gatherer, and for the source populations the
 *                     unmodelled remainder.
 *
 * Every `components` object below sums to exactly 100.
 */

/**
 * What the `steppe` slice of a `GeneticSample` actually stands for.
 *
 * - "yamnaya-related": the normal reading — ancestry a later population
 *   inherited FROM the Yamnaya/steppe gene pool.
 * - "chg-clv-source": used only for the steppe source population itself.
 *   Yamnaya did not inherit steppe ancestry from anyone; they are the source.
 *   For that row the slice stands for the southern CHG / Caucasus-Lower Volga
 *   half of their own ancestry, so it must not be compared like-for-like with
 *   the "yamnaya-related" rows.
 *
 * Rows with `steppe: 0` leave this undefined.
 */
export type SteppeComponentMeaning = "yamnaya-related" | "chg-clv-source";

export interface GeneticSample {
  id: string;
  label: string;
  culture: string;
  date: string;
  location: string;
  components: {
    whg: number;
    ehg: number;
    anf: number;
    steppe: number;
    other?: number;
  };
  note: string;
  /** How to read this row's `steppe` value. See SteppeComponentMeaning. */
  steppeComponent?: SteppeComponentMeaning;
  /** Publications the figures in this row are drawn from. */
  sources?: string[];
}

export interface DNAFinding {
  title: string;
  year: number;
  description: string;
  significance: string;
  /** Full citation(s) for the study this entry describes. */
  sources?: string[];
}

export const geneticSamples: GeneticSample[] = [
  {
    id: "ehg-karelia",
    label: "Karelian Hunter-Gatherer",
    culture: "Eastern Hunter-Gatherers (EHG)",
    date: "c. 7000 BCE",
    location: "Yuzhnyy Oleniy Ostrov, Karelia, Russia",
    components: {
      whg: 25,
      ehg: 64,
      anf: 0,
      steppe: 0,
      other: 11,
    },
    note:
      "Pre-agricultural Eastern European foragers. High EHG ancestry with some WHG admixture. " +
      "These populations contributed substantially to later Yamnaya steppe pastoralists via " +
      "admixture with Caucasus Hunter-Gatherer (CHG) groups.",
    sources: ["Haak et al. 2015, Nature", "Mathieson et al. 2015, Nature"],
  },
  {
    id: "anf-barcin",
    label: "Barcin Neolithic Farmer",
    culture: "Anatolian Neolithic",
    date: "c. 6500 BCE",
    location: "Barcin Hoyuk, northwestern Anatolia",
    components: {
      whg: 0,
      ehg: 0,
      anf: 90,
      steppe: 0,
      other: 10,
    },
    note:
      "Anatolian Neolithic Farmers (ANF) who carried agriculture into Europe. Nearly pure " +
      "Anatolian farmer ancestry with minor Levantine/Iranian-related input. This population " +
      "spread farming across Europe via both the Danubian and Mediterranean routes.",
    sources: ["Mathieson et al. 2015, Nature", "Lazaridis et al. 2016, Nature"],
  },
  {
    id: "lbk-stuttgart",
    label: "LBK Farmer (Stuttgart)",
    culture: "Linearbandkeramik (LBK)",
    date: "c. 5000 BCE",
    location: "Stuttgart, Germany",
    components: {
      whg: 5,
      ehg: 0,
      anf: 92,
      steppe: 0,
      other: 3,
    },
    note:
      "Early European Farmer from the LBK culture. Overwhelmingly Anatolian Neolithic farmer " +
      "ancestry with only minor WHG admixture, indicating limited gene flow with local hunter-" +
      "gatherers during the initial Neolithic expansion into central Europe.",
    sources: ["Lazaridis et al. 2014, Nature"],
  },
  {
    id: "mid-neo-europe",
    label: "Middle Neolithic European",
    culture: "Middle Neolithic / TRB",
    date: "c. 3500 BCE",
    location: "Scandinavia / Northern Europe",
    components: {
      whg: 20,
      ehg: 5,
      anf: 72,
      steppe: 0,
      other: 3,
    },
    note:
      "By the Middle Neolithic, European farming populations had absorbed significantly more " +
      "local hunter-gatherer ancestry compared to early LBK farmers. This WHG resurgence is " +
      "well documented across multiple studies, though the exact proportions vary by region " +
      "and by the reference set used.",
    sources: [
      "Lazaridis et al. 2014, Nature",
      "Haak et al. 2015, Nature",
      "Mathieson et al. 2015, Nature",
    ],
  },
  {
    id: "yamnaya-samara",
    label: "Yamnaya (Samara)",
    culture: "Yamnaya Horizon",
    date: "c. 3000 BCE",
    location: "Samara region, Russia",
    components: {
      whg: 2,
      ehg: 43,
      anf: 0,
      steppe: 50,
      other: 5,
    },
    steppeComponent: "chg-clv-source",
    note:
      "Yamnaya steppe pastoralists are modeled as roughly half EHG and half CHG-rich southern " +
      "ancestry from the Caucasus-Lower Volga (CLV) cline. Because Yamnaya are the steppe " +
      "source rather than a recipient of it, the slice shown here as 'steppe' stands for that " +
      "CHG/CLV half of their own ancestry, not for ancestry received from anyone else. " +
      "Essentially no Anatolian farmer ancestry is present in core Yamnaya, and that near-zero " +
      "value is exactly what distinguishes them from every contemporary European population " +
      "(a few percent does appear in some western Yamnaya individuals).",
    sources: ["Haak et al. 2015, Nature", "Lazaridis et al. 2025, Nature"],
  },
  {
    id: "corded-ware",
    label: "Corded Ware (Esperstedt)",
    culture: "Corded Ware",
    date: "c. 2900 BCE",
    location: "Esperstedt, Saxony-Anhalt, Germany",
    components: {
      whg: 5,
      ehg: 7,
      anf: 20,
      steppe: 65,
      other: 3,
    },
    steppeComponent: "yamnaya-related",
    note:
      "Corded Ware individuals show approximately 75% steppe-derived ancestry (EHG + steppe " +
      "component) and roughly 20% Anatolian farmer ancestry. This dramatic shift from the " +
      "preceding Neolithic populations documents the massive Yamnaya-related migration into " +
      "northern Europe around 3000-2900 BCE.",
    sources: ["Haak et al. 2015, Nature", "Allentoft et al. 2015, Nature"],
  },
  {
    id: "sintashta",
    label: "Sintashta Warrior",
    culture: "Sintashta",
    date: "c. 2100 BCE",
    location: "Kamennyi Ambar, southern Urals, Russia",
    components: {
      whg: 3,
      ehg: 15,
      anf: 17,
      steppe: 60,
      other: 5,
    },
    steppeComponent: "yamnaya-related",
    note:
      "Sintashta people, likely proto-Indo-Iranian speakers, derived from a back-migration of " +
      "Corded Ware-related groups mixing with additional steppe populations. Known for chariot " +
      "warfare and the earliest spoke-wheeled vehicles. Their descendants are associated with " +
      "the Andronovo horizon and the spread of Indo-Iranian languages.",
    sources: ["Allentoft et al. 2015, Nature", "Narasimhan et al. 2019, Science"],
  },
  {
    id: "bell-beaker-britain",
    label: "Bell Beaker (Britain)",
    culture: "Bell Beaker",
    date: "c. 2500 BCE",
    location: "Amesbury, Wiltshire, England",
    components: {
      whg: 7,
      ehg: 6,
      anf: 27,
      steppe: 57,
      other: 3,
    },
    steppeComponent: "yamnaya-related",
    note:
      "British Bell Beaker individuals show a higher proportion of steppe ancestry than their " +
      "continental counterparts, reflecting the near-complete population replacement of " +
      "Neolithic Britons. Olalde et al. (2018) estimated that roughly 90% of Britain's " +
      "Neolithic gene pool was replaced within a few centuries.",
    sources: ["Olalde et al. 2018, Nature"],
  },
  {
    id: "ba-britain",
    label: "Bronze Age Briton",
    culture: "Wessex / British Bronze Age",
    date: "c. 2000 BCE",
    location: "Southern England",
    components: {
      whg: 10,
      ehg: 5,
      anf: 30,
      steppe: 52,
      other: 3,
    },
    steppeComponent: "yamnaya-related",
    note:
      "By the Bronze Age, British populations had stabilized with a mix of steppe-derived and " +
      "Neolithic farmer ancestry. The slight increase in ANF relative to Bell Beaker reflects " +
      "some admixture with surviving Neolithic-descended groups. A further influx of " +
      "continental (farmer-richer) ancestry followed in the Middle to Late Bronze Age.",
    sources: ["Olalde et al. 2018, Nature", "Patterson et al. 2022, Nature"],
  },
  {
    id: "mycenaean",
    label: "Mycenaean Greek",
    culture: "Mycenaean Greece",
    date: "c. 1500 BCE",
    location: "Peloponnese, Greece",
    components: {
      whg: 4,
      ehg: 3,
      anf: 62,
      steppe: 15,
      other: 16,
    },
    steppeComponent: "yamnaya-related",
    note:
      "Mycenaeans carried a moderate steppe component (estimated at 13-18%) alongside a " +
      "predominantly Anatolian/Early European Farmer base. They also show significant " +
      "Minoan-like ancestry (captured partly in the other category, reflecting " +
      "Levantine/Iranian Neolithic input). Lazaridis et al. (2017) showed Mycenaeans differed " +
      "from Minoans primarily in this additional steppe-derived ancestry.",
    sources: ["Lazaridis et al. 2017, Nature"],
  },
  {
    id: "modern-european",
    label: "Modern Northern European (average)",
    culture: "Modern",
    date: "Present",
    location: "Northern Europe",
    components: {
      whg: 12,
      ehg: 5,
      anf: 33,
      steppe: 47,
      other: 3,
    },
    steppeComponent: "yamnaya-related",
    note:
      "Modern northern Europeans retain substantial steppe ancestry from Bronze Age migrations, " +
      "blended with Neolithic farmer and resurgent hunter-gatherer components. Exact figures " +
      "depend heavily on the reference populations chosen, but the geographic cline is robust: " +
      "southern Europeans carry less steppe ancestry (roughly 20-30%) and more Anatolian farmer " +
      "ancestry.",
    sources: ["Lazaridis et al. 2014, Nature", "Haak et al. 2015, Nature"],
  },
  {
    id: "modern-south-asian",
    label: "Modern South Asian (average)",
    culture: "Modern",
    date: "Present",
    location: "South Asia",
    components: {
      whg: 0,
      ehg: 3,
      anf: 10,
      steppe: 20,
      other: 67,
    },
    steppeComponent: "yamnaya-related",
    note:
      "South Asians carry steppe ancestry introduced via the Sintashta/Andronovo-related " +
      "migrations of roughly 2000-1500 BCE. The large other component reflects Ancient " +
      "Ancestral South Indian (AASI) and Iranian farmer-related ancestry (Indus Periphery). " +
      "The figure shown is a rough average: steppe ancestry varies considerably, running higher " +
      "in northern and traditionally priestly groups (roughly 25-35%) and lower in southern and " +
      "tribal populations (roughly 5-15%).",
    sources: ["Narasimhan et al. 2019, Science"],
  },
];

export const dnaFindings: DNAFinding[] = [
  {
    title:
      "Massive migration from the steppe was a source for Indo-European languages in Europe",
    year: 2015,
    description:
      "Haak et al. analyzed genome-wide data from 69 ancient Europeans, revealing that " +
      "a massive migration from the Pontic-Caspian steppe around 3000 BCE introduced " +
      "Yamnaya-related ancestry into central and northern Europe. Corded Ware individuals " +
      "derived approximately 75% of their ancestry from this steppe source, representing " +
      "one of the largest population turnovers in European prehistory.",
    significance:
      "Provided the first large-scale ancient DNA evidence directly linking steppe " +
      "pastoralist migrations to the spread of Indo-European languages into Europe, " +
      "strongly supporting the Steppe Hypothesis over the Anatolian Hypothesis for " +
      "Indo-European origins.",
    sources: ["Haak et al. 2015, Nature"],
  },
  {
    title:
      "Population genomics of Bronze Age Eurasia",
    year: 2015,
    description:
      "Allentoft et al. sequenced 101 ancient human genomes spanning the European Bronze " +
      "Age, revealing that the Yamnaya-related migration was not confined to Europe alone. " +
      "The Afanasievo culture in the Altai region showed nearly identical genetic profiles " +
      "to the European Yamnaya, demonstrating a simultaneous eastward steppe expansion. " +
      "Sintashta and Andronovo populations showed Corded Ware-like profiles with additional " +
      "European farmer admixture.",
    significance:
      "Demonstrated that steppe-derived ancestry spread in multiple directions from the " +
      "Pontic-Caspian region, connecting the European Corded Ware, Central Asian Afanasievo, " +
      "and later Sintashta/Andronovo cultures into a single migration framework consistent " +
      "with the early divergence of Tocharian and Indo-Iranian branches.",
    sources: ["Allentoft et al. 2015, Nature"],
  },
  {
    title:
      "The formation of human populations in South and Central Asia",
    year: 2019,
    description:
      "Narasimhan et al. analyzed more than 500 ancient individuals from Central and South " +
      "Asia, showing that steppe pastoralist ancestry (Sintashta/Andronovo-related) reached " +
      "South Asia during the 2nd millennium BCE. Individuals associated with the Indus Valley " +
      "Civilization carried no detectable steppe ancestry, instead showing a mix of Iranian " +
      "farmer-related and South Asian hunter-gatherer (AASI) ancestry. Steppe ancestry " +
      "appeared in the subcontinent only after the decline of the Indus Civilization.",
    significance:
      "Reframed a long-standing debate about Indo-Aryan migrations into South Asia. The " +
      "temporal pattern of steppe ancestry arrival, coinciding with the post-Harappan period, " +
      "supports a migration rather than indigenous origin for Indo-European languages in " +
      "the subcontinent.",
    sources: ["Narasimhan et al. 2019, Science"],
  },
  {
    title:
      "Genetic origins of the Minoans and Mycenaeans",
    year: 2017,
    description:
      "Lazaridis et al. sequenced genomes from Bronze Age individuals from Mycenae and " +
      "Crete, finding that both Minoans and Mycenaeans derived most of their ancestry from " +
      "Anatolian Neolithic-like farmers, with additional input from eastern (Caucasus/Iran) " +
      "sources. Crucially, Mycenaeans carried an additional 13-18% ancestry from a steppe " +
      "or Armenian-related source that was absent in the Minoan individuals sampled.",
    significance:
      "The steppe component unique to Mycenaeans (and absent in Minoans) provided a genetic " +
      "correlate for the arrival of Greek speakers. This supported the hypothesis that the " +
      "Greek language was introduced to the Aegean by populations carrying steppe-derived " +
      "ancestry, distinct from the pre-existing Minoan civilization.",
    sources: ["Lazaridis et al. 2017, Nature"],
  },
  {
    title:
      "Genome-wide patterns of selection in 230 ancient Eurasians",
    year: 2015,
    description:
      "Mathieson et al. identified strong signals of natural selection in ancient European " +
      "genomes across multiple time periods. Key selected traits included lactase persistence, " +
      "lighter skin pigmentation (selected in multiple waves), and immune-related genes. The " +
      "steppe migrants contributed alleles for taller stature that were subsequently selected " +
      "in northern European populations. Notably, lactase persistence was still rare in Bronze " +
      "Age Europe and on the steppe: later work using pottery lipid residues (Evershed et al. " +
      "2022) showed dairying began thousands of years before the allele became common, which " +
      "only happened within roughly the last 3,000 years.",
    significance:
      "Demonstrated that many traits considered characteristic of modern Europeans (lactose " +
      "tolerance, light skin, tall stature) were not fixed in early populations but were " +
      "actively shaped by natural selection during and after the major migration events. " +
      "This connected genetic migration evidence to observable phenotypic changes.",
    sources: [
      "Mathieson et al. 2015, Nature",
      "Evershed et al. 2022, Nature",
    ],
  },
  {
    title:
      "The origins and spread of domestic horses from the Western Eurasian steppes",
    year: 2021,
    description:
      "Librado et al. sequenced 273 ancient horse genomes and showed that modern domestic " +
      "horses (the DOM2 lineage) originated in the lower Volga-Don region around 2200 BCE, " +
      "then spread across Eurasia within a few centuries. Horses managed by the earlier Botai " +
      "culture in Kazakhstan (long cited as the first domesticators) belong to a separate " +
      "lineage that contributed almost nothing to later domestic horses.",
    significance:
      "Overturned the longstanding assumption that the Botai horses represent the origin of " +
      "modern domestic horses. The DOM2 expansion aligns with the late Yamnaya and early " +
      "Sintashta period, suggesting that the true horse revolution coincided with spoke-wheeled " +
      "chariot technology rather than with the earliest steppe migrations.",
    sources: ["Librado et al. 2021, Nature"],
  },
  {
    title:
      "The genetic history of the Southern Arc: a bridge between West Asia and Europe",
    year: 2022,
    description:
      "Lazaridis et al. analyzed ancient DNA from over 700 individuals spanning the Southern " +
      "Arc region (Anatolia, the Caucasus, and the Levant) across several millennia. The study " +
      "showed that Yamnaya ancestry is best modeled with a substantial contribution from " +
      "populations of the Caucasus and Lower Volga rather than from Eastern Hunter-Gatherers " +
      "alone, and traced how steppe ancestry entered Anatolia and South Asia through distinct " +
      "migration routes. Notably, the Bronze Age Anatolian individuals sampled showed no " +
      "detectable steppe ancestry, which remains a problem for any simple steppe-only account " +
      "of the Anatolian IE branch.",
    significance:
      "Provided the most detailed genetic picture then available of the populations surrounding " +
      "the Indo-European homeland, and set up the finer-grained Caucasus-Lower Volga model " +
      "formalized three years later.",
    sources: ["Lazaridis et al. 2022, Science"],
  },
  {
    title:
      "Language trees with sampled ancestors support a hybrid model for the origin of Indo-European languages",
    year: 2023,
    description:
      "Heggarty et al. applied Bayesian phylogenetic methods to a large dataset of " +
      "Indo-European languages and proposed a hybrid model for IE origins. Their analysis " +
      "dated the root of the family to roughly 8,100 years ago (about 6100 BCE) — considerably " +
      "earlier than most steppe-only models — and placed the earliest divergence south of the " +
      "Caucasus, with later steppe expansions driving the spread of the core IE branches.",
    significance:
      "Introduced a major new computational framework for dating language divergence and " +
      "suggested that the IE family may have deeper roots than the Yamnaya horizon alone. " +
      "The hybrid model attempts to reconcile the Anatolian and steppe hypotheses by proposing " +
      "an earlier southern origin with a later steppe-mediated expansion phase. The dating " +
      "remains contested: linguists working from the shared wheeled-vehicle vocabulary argue " +
      "for a substantially later break-up.",
    sources: ["Heggarty et al. 2023, Science"],
  },
  {
    title:
      "The genetic origin of the Indo-Europeans",
    year: 2025,
    description:
      "Lazaridis et al. assembled a large panel of Eneolithic and Bronze Age genomes from the " +
      "steppe and the Caucasus and defined a Caucasus-Lower Volga (CLV) cline: a genetic " +
      "gradient running from Caucasus Hunter-Gatherer-related populations in the south to " +
      "Eastern Hunter-Gatherers in the north. Yamnaya are modeled as deriving the large " +
      "majority of their ancestry from this cline, and CLV-derived populations are also found " +
      "in Bronze Age Anatolia, offering a possible common source for the Anatolian branch and " +
      "for the rest of Indo-European.",
    significance:
      "Replaced the simpler 'Eastern Hunter-Gatherer + Caucasus Hunter-Gatherer' formula with " +
      "a specific ancestral population, and proposed a candidate source shared by the Anatolian " +
      "branch and the steppe branches — the single biggest open problem left by the earlier " +
      "steppe model.",
    sources: ["Lazaridis et al. 2025, Nature"],
  },
];
