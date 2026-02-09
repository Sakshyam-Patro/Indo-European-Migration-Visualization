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
}

export interface DNAFinding {
  title: string;
  year: number;
  description: string;
  significance: string;
}

export const geneticSamples: GeneticSample[] = [
  {
    id: "ehg-karelia",
    label: "Karelian Hunter-Gatherer",
    culture: "Eastern Hunter-Gatherers (EHG)",
    date: "~7000 BCE",
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
  },
  {
    id: "anf-barcin",
    label: "Barcin Neolithic Farmer",
    culture: "Anatolian Neolithic",
    date: "~6500 BCE",
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
  },
  {
    id: "lbk-stuttgart",
    label: "LBK Farmer (Stuttgart)",
    culture: "Linearbandkeramik (LBK)",
    date: "~5000 BCE",
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
  },
  {
    id: "mid-neo-europe",
    label: "Middle Neolithic European",
    culture: "Middle Neolithic / TRB",
    date: "~3500 BCE",
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
      "local hunter-gatherer ancestry compared to early LBK farmers. WHG resurgence is well " +
      "documented across multiple studies (Lazaridis et al. 2014, Mathieson et al. 2015).",
  },
  {
    id: "yamnaya-samara",
    label: "Yamnaya (Samara)",
    culture: "Yamnaya Horizon",
    date: "~3000 BCE",
    location: "Samara region, Russia",
    components: {
      whg: 2,
      ehg: 43,
      anf: 0,
      steppe: 50,
      other: 5,
    },
    note:
      "Yamnaya steppe pastoralists modeled as roughly half EHG and half CHG/Iran Neolithic " +
      "(represented here as steppe component). This population expanded massively into both " +
      "Europe and Central/South Asia. Near-zero Anatolian farmer ancestry distinguishes them " +
      "from all contemporary European populations. (Haak et al. 2015)",
  },
  {
    id: "corded-ware",
    label: "Corded Ware (Esperstedt)",
    culture: "Corded Ware",
    date: "~2900 BCE",
    location: "Esperstedt, Saxony-Anhalt, Germany",
    components: {
      whg: 5,
      ehg: 7,
      anf: 20,
      steppe: 65,
      other: 3,
    },
    note:
      "Corded Ware individuals show approximately 75% steppe-derived ancestry (EHG + steppe " +
      "component) and roughly 20% Anatolian farmer ancestry. This dramatic shift from the " +
      "preceding Neolithic populations documents the massive Yamnaya-related migration into " +
      "northern Europe around 3000-2900 BCE. (Haak et al. 2015)",
  },
  {
    id: "sintashta",
    label: "Sintashta Warrior",
    culture: "Sintashta",
    date: "~2100 BCE",
    location: "Kamennyi Ambar, southern Urals, Russia",
    components: {
      whg: 3,
      ehg: 15,
      anf: 17,
      steppe: 60,
      other: 5,
    },
    note:
      "Sintashta people, likely proto-Indo-Iranian speakers, derived from a back-migration of " +
      "Corded Ware-related groups mixing with additional steppe populations. Known for chariot " +
      "warfare and the earliest spoke-wheeled vehicles. Their descendants are associated with " +
      "the Andronovo horizon and the spread of Indo-Iranian languages. (Allentoft et al. 2015)",
  },
  {
    id: "bell-beaker-britain",
    label: "Bell Beaker (Britain)",
    culture: "Bell Beaker",
    date: "~2500 BCE",
    location: "Amesbury, Wiltshire, England",
    components: {
      whg: 7,
      ehg: 6,
      anf: 27,
      steppe: 57,
      other: 3,
    },
    note:
      "British Bell Beaker individuals show a higher proportion of steppe ancestry than their " +
      "continental counterparts, reflecting the near-complete population replacement of " +
      "Neolithic Britons. Olalde et al. (2018) demonstrated that over 90% of Britain's " +
      "Neolithic gene pool was replaced within a few centuries.",
  },
  {
    id: "ba-britain",
    label: "Bronze Age Briton",
    culture: "Wessex / British Bronze Age",
    date: "~2000 BCE",
    location: "Southern England",
    components: {
      whg: 10,
      ehg: 5,
      anf: 30,
      steppe: 52,
      other: 3,
    },
    note:
      "By the Bronze Age, British populations had stabilized with a mix of steppe-derived and " +
      "Neolithic farmer ancestry. The slight increase in ANF relative to Bell Beaker reflects " +
      "some admixture with surviving Neolithic-descended groups. This profile persisted as the " +
      "baseline for later British populations.",
  },
  {
    id: "mycenaean",
    label: "Mycenaean Greek",
    culture: "Mycenaean Greece",
    date: "~1500 BCE",
    location: "Peloponnese, Greece",
    components: {
      whg: 4,
      ehg: 3,
      anf: 62,
      steppe: 15,
      other: 16,
    },
    note:
      "Mycenaeans carried a moderate steppe component (~13-18%) alongside a predominantly " +
      "Anatolian/Early European Farmer base. They also show significant Minoan-like ancestry " +
      "(captured partly in the other category, reflecting Levantine/Iranian Neolithic input). " +
      "Lazaridis et al. (2017) showed Mycenaeans differed from Minoans primarily in their " +
      "additional steppe-derived ancestry.",
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
    note:
      "Modern northern Europeans retain substantial steppe ancestry from Bronze Age migrations, " +
      "blended with Neolithic farmer and resurgent hunter-gatherer components. There is a " +
      "geographic cline: southern Europeans carry less steppe ancestry (~20-30%) and more " +
      "Anatolian farmer ancestry.",
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
    note:
      "South Asians carry steppe ancestry introduced via the Sintashta/Andronovo-related " +
      "migrations (~2000-1500 BCE). The large other component reflects Ancient Ancestral " +
      "South Indian (AASI) and Iranian farmer-related ancestry (Indus Periphery). Steppe " +
      "ancestry varies considerably: higher in northern and upper-caste groups (~25-35%), " +
      "lower in southern and tribal populations (~5-15%). (Narasimhan et al. 2019)",
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
  },
  {
    title:
      "The formation of human populations in South and Central Asia",
    year: 2019,
    description:
      "Narasimhan et al. analyzed 524 ancient individuals from Central and South Asia, " +
      "showing that steppe pastoralist ancestry (Sintashta/Andronovo-related) reached South " +
      "Asia during the 2nd millennium BCE. Indus Valley Civilization individuals carried zero " +
      "steppe ancestry, instead showing a mix of Iranian farmer-related and South Asian " +
      "hunter-gatherer (AASI) ancestry. Steppe ancestry appeared in the subcontinent only " +
      "after the decline of the Indus Civilization.",
    significance:
      "Resolved a long-standing debate about Indo-Aryan migrations into South Asia. The " +
      "temporal pattern of steppe ancestry arrival, coinciding with the post-Harappan period, " +
      "supports a migration rather than indigenous origin for Indo-European languages in " +
      "the subcontinent.",
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
      "or Armenian-related source that was absent in Minoans.",
    significance:
      "The steppe component unique to Mycenaeans (and absent in Minoans) provided a genetic " +
      "correlate for the arrival of Greek speakers. This supported the hypothesis that the " +
      "Greek language was introduced to the Aegean by populations carrying steppe-derived " +
      "ancestry, distinct from the pre-existing Minoan civilization.",
  },
  {
    title:
      "Genome-wide patterns of selection in 230 ancient Eurasians",
    year: 2015,
    description:
      "Mathieson et al. identified strong signals of natural selection in ancient European " +
      "genomes across multiple time periods. Key selected traits included lactase persistence " +
      "(reaching high frequency only in the Bronze Age, well after the adoption of dairying), " +
      "lighter skin pigmentation (selected in multiple waves), and immune-related genes. The " +
      "steppe migrants contributed alleles for taller stature that were subsequently selected " +
      "in northern European populations.",
    significance:
      "Demonstrated that many traits considered characteristic of modern Europeans (lactose " +
      "tolerance, light skin, tall stature) were not fixed in early populations but were " +
      "actively shaped by natural selection during and after the major migration events. " +
      "This connected genetic migration evidence to observable phenotypic changes.",
  },
  {
    title:
      "The origins and spread of domestic horses from the Western Eurasian steppes",
    year: 2021,
    description:
      "Librado et al. sequenced 273 ancient horse genomes and showed that modern domestic " +
      "horses (the DOM2 lineage) originated in the lower Volga-Don region around 2200 BCE, " +
      "then spread across Eurasia within a few centuries. Horses managed by the earlier Botai " +
      "culture in Kazakhstan (often cited as the first domesticators) belong to a separate " +
      "lineage that contributed almost nothing to later domestic horses.",
    significance:
      "Overturned the longstanding assumption that the Botai horses represent the origin of " +
      "modern domestic horses. The DOM2 expansion aligns with the late Yamnaya and early " +
      "Sintashta period, suggesting that the true horse revolution coincided with spoke-wheeled " +
      "chariot technology rather than with the earliest steppe migrations.",
  },
  {
    title:
      "The genetic history of the Southern Arc: a bridge between West Asia and Europe",
    year: 2022,
    description:
      "Lazaridis et al. analyzed ancient DNA from over 700 individuals spanning the Southern " +
      "Arc region (Anatolia, the Caucasus, and the Levant) across several millennia. The study " +
      "identified a Caucasus-Lowland-Volga (CLV) ancestry component as a key ingredient of " +
      "Yamnaya ancestry, refining the genetic model of steppe population formation. It also " +
      "traced how steppe ancestry entered Anatolia and South Asia through distinct migration routes.",
    significance:
      "Provided the most detailed genetic picture of the populations surrounding the " +
      "Indo-European homeland. The CLV ancestry model replaced the simpler 'Eastern Hunter-Gatherer " +
      "+ Caucasus Hunter-Gatherer' formula, offering a more nuanced understanding of how " +
      "Yamnaya genetics came together before the great expansions.",
  },
  {
    title:
      "Language trees with sampled ancestors support a hybrid model for the origin of Indo-European languages",
    year: 2023,
    description:
      "Heggarty et al. applied Bayesian phylogenetic methods to a large dataset of " +
      "Indo-European languages and proposed a hybrid model for IE origins. Their analysis " +
      "supported an initial divergence in or near the Caucasus region around 8100 BCE (earlier " +
      "than most steppe-only models), with later steppe expansions driving the spread of the " +
      "core IE branches. This challenges purely steppe or purely Anatolian origin models.",
    significance:
      "Introduced a major new computational framework for dating language divergence and " +
      "suggested that the IE family may have deeper roots than the Yamnaya horizon alone. " +
      "The hybrid model attempts to reconcile the Anatolian and steppe hypotheses by proposing " +
      "an earlier southern origin with a later steppe-mediated expansion phase.",
  },
  {
    title:
      "Consolidation: ancient DNA and the Indo-European question by 2024",
    year: 2024,
    description:
      "By 2024, thousands of published ancient genomes have been integrated into comprehensive " +
      "models of IE dispersal. Key results include: confirmation of massive steppe gene flow " +
      "into both Europe and South Asia, refined timelines for each branch's separation, " +
      "identification of sex-biased migration patterns (predominantly male steppe ancestry), " +
      "and growing evidence that language shift involved both population replacement and " +
      "elite dominance in different regions.",
    significance:
      "The field has reached a mature phase where genetics, linguistics, and archaeology " +
      "converge on a broadly consistent narrative: steppe pastoralists played a central role " +
      "in spreading IE languages, but the details of how language and genes co-traveled " +
      "varied by region and period. Open questions remain about the Anatolian branch, " +
      "the Tocharians, and the precise role of pre-Yamnaya populations.",
  },
];
