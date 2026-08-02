/**
 * Archaeological cultures relevant to Indo-European dispersal.
 *
 * ANCESTRY VOCABULARY
 * -------------------
 * `geneticProfile` uses the same component names as `genetics.ts` (see the long
 * comment at the top of that file for the full definitions and for the
 * EEF/ANF equivalence). Every profile below sums to exactly 100.
 *
 * Two different — and NOT directly comparable — codings are in use, because the
 * literature models source populations and their descendants differently. Each
 * row declares which one it uses via `ancestryCoding`:
 *
 *   "deep"             WHG / EHG / CHG / EEF / Other only. Used for populations
 *                      that predate or constitute the steppe gene pool (CLV,
 *                      Khvalynsk, Serednii Stih, Yamnaya, Afanasievo) and for
 *                      populations outside it entirely (BMAC). These groups did
 *                      not receive steppe ancestry from anyone, so a "Steppe"
 *                      component would be meaningless for them.
 *
 *   "steppe-collapsed" A single Steppe (Yamnaya-related) component alongside
 *                      the deep sources. Used for post-Yamnaya descendants
 *                      (Corded Ware, Bell Beaker, Sintashta, Andronovo,
 *                      Mycenaean), matching how these populations are actually
 *                      modeled in the published literature.
 *
 * To compare across the two codings, expand Steppe using the Yamnaya row below:
 * Steppe is approximately 50% CHG + 45% EHG + 5% WHG. So Corded Ware's
 * "Steppe 75" is roughly CHG 38 / EHG 34 / WHG 4 in deep-source terms.
 */

/** Which ancestry vocabulary a `geneticProfile` is expressed in. */
export type AncestryCoding = "deep" | "steppe-collapsed";

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
    CHG?: number; // Caucasus Hunter-Gatherer (also proxies Iranian-Neolithic-related)
    EEF?: number; // Early European Farmer (= Anatolian Neolithic Farmer lineage)
    Steppe?: number; // Yamnaya-related
    Other?: number; // Region-specific ancestry with no slot above (AASI, West Siberian, Levantine)
  };
  /**
   * Which coding `geneticProfile` uses. Profiles with different codings cannot
   * be compared component by component without expanding Steppe first.
   */
  ancestryCoding?: AncestryCoding;
  innovations?: string[];
  /** Key publications behind the dates and ancestry figures given here. */
  sources?: string[];
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
      "The Caucasus-Lower Volga genetic cline, defined by Lazaridis et al. (2025) as the ancestral population most closely associated with the Proto-Indo-European homeland. This population formed a genetic gradient between Caucasus Hunter-Gatherers (CHG) in the south and Eastern Hunter-Gatherers (EHG) to the north, spanning from the highlands of Dagestan through the lower Volga steppe. The CLV cline is currently the best candidate for the source population from which later steppe cultures like Khvalynsk and Yamnaya derived the majority of their ancestry, and therefore the strongest candidate for the original PIE-speaking community. Note that this is a genetic cline reconstructed from scattered burials rather than a single named archaeological culture, so its date range is approximate and its position along the CHG-EHG gradient varies from site to site.",
    geneticProfile: {
      // Position shown is the CHG-rich southern end of the cline; northern
      // individuals sit closer to EHG. Sums to 100.
      CHG: 70,
      EHG: 30,
    },
    ancestryCoding: "deep",
    innovations: [
      "Proto-Indo-European language",
      "Early pastoralism",
      "Sheep and goat herding",
    ],
    sources: [
      "Lazaridis et al. 2025, Nature",
      "Lazaridis et al. 2022, Science",
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
      "An Eneolithic culture of the Middle Volga region, centered near modern Samara and dated to roughly 4700-3800 BCE. Khvalynsk represents a critical bridge between the southern CLV ancestry and later steppe populations. Cemetery sites reveal early social stratification with some individuals buried with copper artifacts, polished stone maces, and sacrificial animal remains (cattle, sheep, horse). Genetically, Khvalynsk individuals show a mixture of CHG-rich southern ancestry (from the CLV cline) with additional EHG input from northern foragers, prefiguring the genetic profile that would characterize the later Yamnaya horizon. Note that the horse bones in Khvalynsk sacrificial deposits show that horses were being herded or hunted and eaten, not that they were ridden.",
    geneticProfile: {
      // Sums to 100.
      CHG: 50,
      EHG: 45,
      WHG: 5,
    },
    ancestryCoding: "deep",
    innovations: [
      "Copper metallurgy adoption",
      "Ritual animal sacrifice",
      "Social stratification",
      "Stone mace production",
    ],
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Lazaridis et al. 2025, Nature",
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
      "A Copper Age culture of the Pontic steppe between the Dnieper and Don rivers in modern Ukraine, conventionally dated c. 4400-3300 BCE. Serednii Stih (Ukrainian name; Sredny Stog is the older Russian transliteration) is significant for early evidence of horse management, and represents a westward extension of steppe pastoralist populations. The culture shows connections to both eastern steppe groups (CLV-related) and local Dnieper-region hunter-gatherer populations, and unlike core Yamnaya it carries a small but real Early European Farmer component reflecting contact with the neighbouring Trypillia farming world. It is often considered a precursor or parallel development to the Yamnaya horizon. Claims that Serednii Stih people rode horses rest largely on the bit-wear argument for the Dereivka stallion, which was withdrawn once that horse was radiocarbon-dated to the Iron Age; early riding on the steppe remains genuinely contested.",
    geneticProfile: {
      // Sums to 100.
      CHG: 30,
      EHG: 40,
      WHG: 20,
      EEF: 10,
    },
    ancestryCoding: "deep",
    innovations: [
      "Horse management and herding",
      "Horseback riding (contested)",
      "Steppe pastoralism",
    ],
    sources: [
      "Anthony 2007, The Horse, the Wheel, and Language",
      "Lazaridis et al. 2025, Nature",
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
      "The Yamnaya (Pit Grave) culture is the single most important archaeological horizon for understanding Indo-European expansion. Spanning the vast Pontic-Caspian steppe from the Danube to the Ural rivers c. 3300-2600 BCE, Yamnaya people were mobile pastoralists who buried their dead in individual pit graves beneath earthen mounds (kurgans). They used heavy wooden wagons pulled by oxen, herded cattle, sheep, and goats, and subsisted primarily on meat and dairy products with minimal agriculture. Genetically, Yamnaya derive the large majority of their ancestry from the CLV cline (mixed CHG + EHG) with additional EHG input. The diagnostic feature is what is missing: core Yamnaya carry essentially no Anatolian farmer (EEF) ancestry, which sets them apart from every contemporary European population. A few percent does turn up in some western Yamnaya individuals, but the near-zero baseline is what makes steppe ancestry traceable in later populations. Ancient DNA has demonstrated massive Yamnaya-related population movements into both Central/Northern Europe (giving rise to Corded Ware) and eastward into the Altai (Afanasievo), making this the primary vector of Indo-European language dispersal.",
    geneticProfile: {
      // Sums to 100. EEF is stated explicitly as 0 because the near-absence of
      // Anatolian farmer ancestry is the diagnostic feature of core Yamnaya,
      // and is what makes steppe ancestry detectable downstream.
      CHG: 50,
      EHG: 45,
      WHG: 5,
      EEF: 0,
    },
    ancestryCoding: "deep",
    innovations: [
      "Kurgan burial tradition",
      "Wheeled wagons",
      "Mobile pastoralism across vast distances",
      "Dairy pastoralism (lactase persistence itself spread far later)",
      "Wool exploitation",
    ],
    sources: [
      "Haak et al. 2015, Nature",
      "Lazaridis et al. 2025, Nature",
      "Anthony 2007, The Horse, the Wheel, and Language",
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
      // Sums to 100. Steppe here means Yamnaya-related ancestry (see the file
      // header): expanded into deep sources it is roughly CHG 38 / EHG 34 / WHG 4.
      Steppe: 75,
      EEF: 20,
      WHG: 5,
    },
    ancestryCoding: "steppe-collapsed",
    innovations: [
      "Cord-decorated pottery",
      "Battle axe production",
      "Gender-differentiated burial rites",
      "Mixed farming and pastoralism in temperate Europe",
    ],
    sources: [
      "Haak et al. 2015, Nature",
      "Allentoft et al. 2015, Nature",
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
      "The Bell Beaker phenomenon spread across Western and Central Europe beginning around 2800 BCE, characterized by distinctive bell-shaped drinking vessels, copper daggers, stone wrist guards, and V-perforated buttons. Unlike Corded Ware, Bell Beaker represents a more complex interaction between incoming steppe-derived populations and existing Neolithic farming communities. In Britain the Bell Beaker expansion involved near-complete population replacement by groups carrying substantial steppe ancestry; in Iberia the same material culture was largely adopted by local populations who carried little or no steppe ancestry at first. The figure below is therefore an average across a genetically very heterogeneous phenomenon. The culture is associated with the ancestors of Celtic, Italic, and possibly other Western European IE-speaking groups.",
    geneticProfile: {
      // Sums to 100. Average across a wide range: British Beaker individuals
      // sit near Steppe 50-60, early Iberian Beaker individuals near Steppe 0.
      Steppe: 50,
      EEF: 35,
      WHG: 15,
    },
    ancestryCoding: "steppe-collapsed",
    innovations: [
      "Bell-shaped pottery beakers",
      "Copper and gold metallurgy",
      "Archery tradition (wrist guards)",
      "Maritime and river navigation",
    ],
    sources: ["Olalde et al. 2018, Nature", "Olalde et al. 2019, Science"],
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
      "The Afanasievo culture of the Altai-Sayan region and western Mongolia represents the earliest eastward expansion of Yamnaya-related populations, separated from the Pontic steppe by over 3,000 kilometers of open Kazakh steppe. Remarkably, ancient DNA shows that Afanasievo individuals are genetically nearly identical to western Yamnaya — including the same near-total absence of Anatolian farmer ancestry — indicating a rapid, long-distance migration with little admixture en route. This culture is the strongest candidate for the ancestors of the Tocharian-speaking peoples, whose languages (Tocharian A and B) were attested in the Tarim Basin of western China in the first millennium CE; note that the Bronze Age Tarim Basin mummies themselves turned out to carry local Ancient North Eurasian rather than Afanasievo ancestry, so the link is linguistic and archaeological rather than a direct genetic descent. Afanasievo practiced pastoralism, used copper tools, and buried their dead under kurgans in a manner strikingly similar to Yamnaya.",
    geneticProfile: {
      // Deliberately identical to Yamnaya: the published finding is that the
      // two are genetically almost indistinguishable. Sums to 100.
      CHG: 50,
      EHG: 45,
      WHG: 5,
      EEF: 0,
    },
    ancestryCoding: "deep",
    innovations: [
      "Long-distance steppe migration",
      "Pastoralism in montane environments",
      "Copper metallurgy in eastern steppe",
    ],
    sources: [
      "Allentoft et al. 2015, Nature",
      "Narasimhan et al. 2019, Science",
      "Zhang et al. 2021, Nature",
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
      "The Sintashta culture of the Southern Urals (c. 2100-1800 BCE) is one of the most remarkable Bronze Age cultures, notable for the earliest known lightweight spoke-wheeled chariots, intensive bronze metallurgy, and fortified settlements. The site of Sintashta and related sites like Krivoe Ozero contain chariot burials with paired horses, bronze weapons, and cheek pieces for horse control. The culture shows striking parallels with descriptions in the Rigveda: chariot warfare, horse sacrifice (ashvamedha), and fire rituals. The soma/haoma ritual, central to both Vedic and Avestan religion, is often argued to have been adopted through later contact with the BMAC (Bactria-Margiana) agricultural civilization to the south rather than originating on the steppe, though this remains a hypothesis rather than a settled result. Genetically, Sintashta people derive from a mixture of Corded Ware-related populations with additional Central European farmer ancestry. This culture is the direct ancestor of the Andronovo horizon and ultimately of the Indo-Iranian language branch.",
    geneticProfile: {
      // Sums to 100. Matches the ~67% steppe / ~33% European farmer split
      // reported for Sintashta, with the farmer share divided between its EEF
      // and WHG parts.
      Steppe: 67,
      EEF: 26,
      WHG: 7,
    },
    ancestryCoding: "steppe-collapsed",
    innovations: [
      "Spoke-wheeled chariot (earliest known)",
      "Intensive bronze metallurgy",
      "Fortified circular settlements",
      "Horse-drawn chariot warfare",
      "Cheek pieces for horse control",
      "Fire altars and ritual deposits",
    ],
    sources: [
      "Narasimhan et al. 2019, Science",
      "Allentoft et al. 2015, Nature",
      "Anthony 2007, The Horse, the Wheel, and Language",
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
      "The Andronovo cultural horizon encompasses a vast territory across the Central Asian steppes, from the Urals to the Yenisei River and south to the Amu Darya. Developing out of the Sintashta tradition, Andronovo represents the primary archaeological correlate for the expansion of Indo-Iranian languages across Central and South Asia. The culture is characterized by timber-framed dwellings, tin-bronze metallurgy, chariot use, and pastoral economies focused on cattle and horse herding. Andronovo populations are ancestral to later Iranian-speaking groups (Scythians, Persians, Medes) and, through southward migration, to the Indo-Aryan speakers who entered South Asia. Genetically Andronovo is essentially continuous with Sintashta, which is why the profile below is close to identical; the eastern and later phases additionally pick up local Siberian ancestry not captured by these five components.",
    geneticProfile: {
      // Sums to 100. Previously this row mixed the two codings by listing both
      // Steppe and EHG, which double-counts (EHG is already inside Steppe).
      Steppe: 65,
      EEF: 27,
      WHG: 8,
    },
    ancestryCoding: "steppe-collapsed",
    innovations: [
      "Tin-bronze metallurgy",
      "Large-scale pastoral economy",
      "Chariot warfare across steppe",
      "Timber-framed architecture",
    ],
    sources: [
      "Narasimhan et al. 2019, Science",
      "Allentoft et al. 2015, Nature",
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
      "Mycenaean civilization represents the earliest well-documented Greek-speaking culture, centered on palatial complexes at Mycenae, Tiryns, Pylos, and other sites in the Peloponnese and central Greece. The decipherment of Linear B script by Michael Ventris in 1952 revealed the tablets to contain an early form of Greek, confirming the Indo-European identity of the Mycenaeans. Ancient DNA studies show that Mycenaean individuals carried a mixture of Neolithic Aegean (Anatolian farmer) ancestry with a minority but significant steppe-related component, estimated at 13-18%, consistent with an arrival of Greek speakers from the north during the early 2nd millennium BCE; the sample sizes involved are small, so the exact figure should be treated as provisional. The civilization is famed for its tholos tombs, Cyclopean masonry, palatial bureaucracy, and legendary association with the Trojan War.",
    geneticProfile: {
      // Sums to 100, and matches the `mycenaean` row in genetics.ts. CHG here
      // stands for the eastern (Caucasus/Iranian-Neolithic-related) input that
      // Mycenaeans share with Minoans and did NOT get from the steppe, so it is
      // listed separately from the Steppe component rather than inside it.
      EEF: 62,
      Steppe: 15,
      CHG: 18,
      WHG: 5,
    },
    ancestryCoding: "steppe-collapsed",
    innovations: [
      "Linear B script",
      "Palatial administration",
      "Tholos (beehive) tombs",
      "Cyclopean masonry",
      "Advanced bronze armor and weapons",
    ],
    sources: ["Lazaridis et al. 2017, Nature"],
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
      "The Bactria-Margiana Archaeological Complex (BMAC), also known as the Oxus civilization, was a sophisticated Bronze Age urban culture in the oases of southern Central Asia (modern Turkmenistan, Uzbekistan, and northern Afghanistan). While not Indo-European in origin, BMAC served as a critical contact zone through which migrating Indo-Iranian pastoralists from the Andronovo/Sintashta tradition interacted with settled agricultural populations. Archaeological evidence shows Andronovo-type ceramics and steppe burial practices appearing at BMAC peripheral sites. Crucially, the BMAC population itself carried no detectable steppe ancestry: Narasimhan et al. (2019) found steppe ancestry only in a handful of later outlier individuals at BMAC-periphery sites, which is what makes BMAC a contact zone rather than a stage of the migration. This interaction likely shaped Indo-Iranian religious and cultural vocabulary, with BMAC possibly contributing elements later found in Vedic and Avestan traditions. BMAC itself had impressive mudbrick architecture, stamp seals, and connections to the Indus Valley and Mesopotamia.",
    geneticProfile: {
      // Sums to 100. BMAC ancestry is Iranian-Neolithic-related (shown here as
      // CHG, the nearest available proxy) plus Anatolian-farmer-related (EEF),
      // with an AASI and West Siberian remainder in Other. Steppe is stated
      // explicitly as 0 because its absence is the substantive finding.
      CHG: 55,
      EEF: 30,
      Other: 15,
      Steppe: 0,
    },
    ancestryCoding: "deep",
    innovations: [
      "Mudbrick monumental architecture",
      "Oasis irrigation agriculture",
      "Stamp seals and administrative systems",
      "Long-distance trade networks (Indus, Mesopotamia)",
    ],
    sources: ["Narasimhan et al. 2019, Science"],
    color: "#95A5A6",
  },
];
