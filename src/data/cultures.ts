export interface Culture {
  id: string;
  name: string;
  startDate: number; // negative = BCE
  endDate: number;
  center: [number, number]; // [lat, lng]
  region: string;
  description: string;
  geneticProfile?: {
    WHG?: number; // Western Hunter-Gatherer
    EHG?: number; // Eastern Hunter-Gatherer
    CHG?: number; // Caucasus Hunter-Gatherer
    EEF?: number; // Early European Farmer
    Steppe?: number; // Yamnaya-related
  };
  innovations?: string[];
  color: string;
}

export const cultures: Culture[] = [
  {
    id: "clv",
    name: "CLV (Caucasus-Lower Volga) Cline",
    startDate: -4500,
    endDate: -3500,
    center: [44.5, 47.0],
    region: "Dagestan / Lower Volga",
    description:
      "The Caucasus-Lower Volga genetic cline, identified by Lazaridis et al. (2022/2025) as the ancestral population most closely associated with the Proto-Indo-European homeland. This population formed a genetic gradient between Caucasus Hunter-Gatherers (CHG) in the south and Eastern Hunter-Gatherers (EHG) to the north, spanning from the highlands of Dagestan through the lower Volga steppe. The CLV cline is now considered the source population from which later steppe cultures like Khvalynsk and Yamnaya derived the majority of their ancestry, making it the strongest candidate for the original PIE-speaking community.",
    geneticProfile: {
      CHG: 70,
      EHG: 30,
    },
    innovations: [
      "Proto-Indo-European language",
      "Early pastoralism",
      "Sheep and goat herding",
    ],
    color: "#9B59B6",
  },
  {
    id: "khvalynsk",
    name: "Khvalynsk",
    startDate: -4700,
    endDate: -3800,
    center: [52.5, 49.5],
    region: "Middle Volga (near Samara, Russia)",
    description:
      "An Eneolithic culture of the Middle Volga region, centered near modern Samara. Khvalynsk represents a critical bridge between the southern CLV ancestry and later steppe populations. Cemetery sites reveal early social stratification with some individuals buried with copper artifacts, polished stone maces, and sacrificial animal remains (cattle, sheep, horse). Genetically, Khvalynsk individuals show a mixture of CHG-rich southern ancestry (from the CLV cline) with additional EHG input from northern foragers, prefiguring the genetic profile that would characterize the later Yamnaya horizon.",
    geneticProfile: {
      CHG: 50,
      EHG: 45,
      WHG: 5,
    },
    innovations: [
      "Copper metallurgy adoption",
      "Ritual animal sacrifice",
      "Social stratification",
      "Stone mace production",
    ],
    color: "#8E44AD",
  },
  {
    id: "sredny-stog",
    name: "Serednii Stih (Sredny Stog)",
    startDate: -4400,
    endDate: -3300,
    center: [48.5, 36.0],
    region: "Dnieper-Don steppe, Ukraine",
    description:
      "A Copper Age culture of the Pontic steppe between the Dnieper and Don rivers in modern Ukraine. Serednii Stih (Ukrainian name) is significant for showing early evidence of horse management, including possible riding, and represents a westward extension of steppe pastoralist populations. The culture shows connections to both eastern steppe groups (CLV-related) and local Dnieper-region hunter-gatherer populations. It is often considered a precursor or parallel development to the Yamnaya horizon, contributing to the spread of steppe ancestry into southeastern Europe.",
    geneticProfile: {
      CHG: 30,
      EHG: 40,
      WHG: 20,
      EEF: 10,
    },
    innovations: [
      "Early horse domestication/management",
      "Horseback riding (debated)",
      "Steppe pastoralism",
    ],
    color: "#E74C3C",
  },
  {
    id: "yamnaya",
    name: "Yamnaya",
    startDate: -3300,
    endDate: -2600,
    center: [49.0, 46.0],
    region: "Pontic-Caspian steppe",
    description:
      "The Yamnaya (Pit Grave) culture is the single most important archaeological horizon for understanding Indo-European expansion. Spanning the vast Pontic-Caspian steppe from the Danube to the Ural rivers, Yamnaya people were mobile pastoralists who buried their dead in individual pit graves beneath earthen mounds (kurgans). They used heavy wooden wagons pulled by oxen, herded cattle, sheep, and goats, and subsisted primarily on meat and dairy products with minimal agriculture. Genetically, Yamnaya derive approximately 80% of their ancestry from the CLV cline (mixed CHG+EHG) with additional EHG input. Ancient DNA has demonstrated massive Yamnaya-related population movements into both Central/Northern Europe (giving rise to Corded Ware) and eastward into the Altai (Afanasievo), making this the primary vector of Indo-European language dispersal.",
    geneticProfile: {
      CHG: 40,
      EHG: 45,
      WHG: 5,
      EEF: 10,
    },
    innovations: [
      "Kurgan burial tradition",
      "Wheeled wagons",
      "Mobile pastoralism across vast distances",
      "Dairy consumption (lactase persistence selection)",
      "Wool exploitation",
    ],
    color: "#E67E22",
  },
  {
    id: "corded-ware",
    name: "Corded Ware",
    startDate: -2900,
    endDate: -2350,
    center: [52.0, 18.0],
    region: "Northern and Central Europe",
    description:
      "The Corded Ware culture (also called Battle Axe culture) rapidly spread across Northern and Central Europe around 2900 BCE, representing one of the most dramatic population turnovers in European prehistory. Named for the distinctive cord-impressed pottery decoration and polished stone battle axes found in graves, the culture is characterized by individual burials under small mounds with gender-differentiated burial positions (men on right side facing east, women on left facing west). Genetic studies have shown that Corded Ware individuals carried approximately 75% steppe (Yamnaya-related) ancestry, indicating a massive migration rather than mere cultural diffusion. This culture is most directly ancestral to later Germanic and Balto-Slavic populations. The relationship to Celtic and Italic speakers is debated; many scholars associate those branches primarily with the subsequent Bell Beaker expansion into western Europe.",
    geneticProfile: {
      Steppe: 75,
      EEF: 20,
      WHG: 5,
    },
    innovations: [
      "Cord-decorated pottery",
      "Battle axe production",
      "Gender-differentiated burial rites",
      "Mixed farming and pastoralism in temperate Europe",
    ],
    color: "#3498DB",
  },
  {
    id: "bell-beaker",
    name: "Bell Beaker",
    startDate: -2800,
    endDate: -1800,
    center: [48.0, 2.0],
    region: "Western Europe",
    description:
      "The Bell Beaker phenomenon spread across Western and Central Europe beginning around 2800 BCE, characterized by distinctive bell-shaped drinking vessels, copper daggers, stone wrist guards, and V-perforated buttons. Unlike Corded Ware, Bell Beaker represents a more complex interaction between incoming steppe-derived populations and existing Neolithic farming communities. In some regions (notably Britain and Iberia), the Bell Beaker expansion involved near-complete population replacement carrying substantial steppe ancestry; in others, it was adopted by local populations with less genetic turnover. The culture is associated with the ancestors of Celtic, Italic, and possibly pre-Celtic Western European IE-speaking groups.",
    geneticProfile: {
      Steppe: 50,
      EEF: 35,
      WHG: 15,
    },
    innovations: [
      "Bell-shaped pottery beakers",
      "Copper and gold metallurgy",
      "Archery tradition (wrist guards)",
      "Maritime and river navigation",
    ],
    color: "#2ECC71",
  },
  {
    id: "afanasievo",
    name: "Afanasievo",
    startDate: -3300,
    endDate: -2500,
    center: [50.0, 88.0],
    region: "Altai Mountains / Central Asia",
    description:
      "The Afanasievo culture of the Altai-Sayan region and western Mongolia represents the earliest eastward expansion of Yamnaya-related populations, separated from the Pontic steppe by over 3,000 kilometers of open Kazakh steppe. Remarkably, ancient DNA shows that Afanasievo individuals are genetically nearly identical to western Yamnaya, indicating a rapid, long-distance migration with little admixture en route. This culture is the strongest candidate for the ancestors of the Tocharian-speaking peoples, whose languages (Tocharian A and B) were attested in the Tarim Basin of western China in the first millennium CE. Afanasievo practiced pastoralism, used copper tools, and buried their dead under kurgans in a manner strikingly similar to Yamnaya.",
    geneticProfile: {
      CHG: 40,
      EHG: 45,
      WHG: 5,
      EEF: 10,
    },
    innovations: [
      "Long-distance steppe migration",
      "Pastoralism in montane environments",
      "Copper metallurgy in eastern steppe",
    ],
    color: "#F39C12",
  },
  {
    id: "sintashta",
    name: "Sintashta",
    startDate: -2100,
    endDate: -1800,
    center: [52.5, 59.5],
    region: "Southern Urals (Chelyabinsk Oblast, Russia)",
    description:
      "The Sintashta culture of the Southern Urals (c. 2100-1800 BCE) is one of the most remarkable Bronze Age cultures, notable for the invention of the lightweight spoke-wheeled chariot, intensive bronze metallurgy, and fortified settlements. The site of Sintashta and related sites like Arkaim contain chariot burials with paired horses, bronze weapons, and cheek pieces for horse control. The culture shows striking parallels with descriptions in the Rigveda: chariot warfare, horse sacrifice (ashvamedha), and fire rituals. The soma/haoma ritual, central to both Vedic and Avestan religion, is widely thought to have been adopted later through contact with the BMAC (Bactria-Margiana) agricultural civilization to the south, rather than originating on the steppe. Genetically, Sintashta people derive from a mixture of Corded Ware-related populations with additional Central European farmer ancestry. This culture is the direct ancestor of the Andronovo horizon and ultimately of the Indo-Iranian language branch.",
    geneticProfile: {
      Steppe: 65,
      EEF: 25,
      WHG: 10,
    },
    innovations: [
      "Spoke-wheeled chariot (earliest known)",
      "Intensive bronze metallurgy",
      "Fortified circular settlements",
      "Horse-drawn chariot warfare",
      "Cheek pieces for horse control",
      "Fire altars and ritual deposits",
    ],
    color: "#E74C3C",
  },
  {
    id: "andronovo",
    name: "Andronovo",
    startDate: -2000,
    endDate: -900,
    center: [48.0, 68.0],
    region: "Central Asian steppes (Kazakhstan, Siberia)",
    description:
      "The Andronovo cultural horizon encompasses a vast territory across the Central Asian steppes, from the Urals to the Yenisei River and south to the Amu Darya. Developing out of the Sintashta tradition, Andronovo represents the primary archaeological correlate for the expansion of Indo-Iranian languages across Central and South Asia. The culture is characterized by timber-framed dwellings, tin-bronze metallurgy, chariot use, and pastoral economies focused on cattle and horse herding. Andronovo populations are ancestral to later Iranian-speaking groups (Scythians, Persians, Medes) and, through southward migration, to the Indo-Aryan speakers who entered South Asia.",
    geneticProfile: {
      Steppe: 60,
      EEF: 20,
      WHG: 5,
      EHG: 15,
    },
    innovations: [
      "Tin-bronze metallurgy",
      "Large-scale pastoral economy",
      "Chariot warfare across steppe",
      "Timber-framed architecture",
    ],
    color: "#D35400",
  },
  {
    id: "mycenaean",
    name: "Mycenaean Greece",
    startDate: -1600,
    endDate: -1100,
    center: [37.7, 22.8],
    region: "Mainland Greece (Peloponnese)",
    description:
      "Mycenaean civilization represents the earliest well-documented Greek-speaking culture, centered on palatial complexes at Mycenae, Tiryns, Pylos, and other sites in the Peloponnese and central Greece. The decipherment of Linear B script by Michael Ventris in 1952 revealed the tablets to contain an early form of Greek, confirming the Indo-European identity of the Mycenaeans. Ancient DNA studies show that Mycenaean individuals carried a mixture of Neolithic Aegean (Anatolian farmer) ancestry with a minority but significant component of steppe-related ancestry, consistent with an arrival of Greek speakers from the north during the early 2nd millennium BCE. The civilization is famed for its tholos tombs, Cyclopean masonry, palatial bureaucracy, and legendary association with the Trojan War.",
    geneticProfile: {
      EEF: 60,
      Steppe: 15,
      CHG: 15,
      WHG: 10,
    },
    innovations: [
      "Linear B script",
      "Palatial administration",
      "Tholos (beehive) tombs",
      "Cyclopean masonry",
      "Advanced bronze armor and weapons",
    ],
    color: "#1ABC9C",
  },
  {
    id: "bmac",
    name: "BMAC (Bactria-Margiana Archaeological Complex)",
    startDate: -2300,
    endDate: -1700,
    center: [38.0, 63.0],
    region: "Southern Turkmenistan / Northern Afghanistan",
    description:
      "The Bactria-Margiana Archaeological Complex (BMAC), also known as the Oxus civilization, was a sophisticated Bronze Age urban culture in the oases of southern Central Asia (modern Turkmenistan, Uzbekistan, and northern Afghanistan). While not Indo-European in origin, BMAC served as a critical contact zone through which migrating Indo-Iranian pastoralists from the Andronovo/Sintashta tradition interacted with settled agricultural populations. Archaeological evidence shows Andronovo-type ceramics and steppe burial practices appearing at BMAC peripheral sites. This interaction likely shaped Indo-Iranian religious and cultural vocabulary, with BMAC possibly contributing elements later found in Vedic and Avestan traditions. BMAC itself had impressive mudbrick architecture, stamp seals, and connections to the Indus Valley and Mesopotamia.",
    geneticProfile: {
      EEF: 40,
      CHG: 35,
      EHG: 10,
      WHG: 5,
      Steppe: 10,
    },
    innovations: [
      "Mudbrick monumental architecture",
      "Oasis irrigation agriculture",
      "Stamp seals and administrative systems",
      "Long-distance trade networks (Indus, Mesopotamia)",
    ],
    color: "#95A5A6",
  },
];
