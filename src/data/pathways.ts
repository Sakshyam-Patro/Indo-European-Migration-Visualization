/**
 * Per-language narratives tracing a modern language back to the Pontic-Caspian
 * steppe, consumed by `components/interactive/LanguagePathways`.
 *
 * NO FLAG EMOJI. Regional flag emoji are surrogate pairs that fail to render on
 * most Windows browsers, carry nothing for screen readers, and equate a
 * language with a modern nation state. Use `language` and `region` instead.
 */

/** How Indo-European speech reached the region, in demographic terms. */
export type PathwayMechanism = "mass_migration" | "elite_dominance" | "mixed";

export interface PathwayStep {
  date: string;
  label: string;
  detail: string;
}

export interface LanguagePathway {
  language: string;
  /** Historical region the pathway runs through, not a modern country. */
  region: string;
  mechanism: PathwayMechanism;
  /**
   * Pathway-specific gloss on the mechanism, e.g. Turkish is elite dominance
   * but in reverse. For the plain name of the category itself, use
   * `MECHANISM_LABELS` — that is the single source for the legend.
   */
  mechanismLabel: string;
  summary: string;
  steppeAncestry: string;
  steps: PathwayStep[];
  modernSpeakers: string;
}

/** Canonical name of each mechanism category. */
export const MECHANISM_LABELS: Record<PathwayMechanism, string> = {
  mass_migration: "Mass Migration",
  elite_dominance: "Elite Dominance",
  mixed: "Migration + Elite Dominance",
};

export const pathways: LanguagePathway[] = [
  {
    language: "English",
    region: "Britain",
    mechanism: "mass_migration",
    mechanismLabel: "Mass Migration",
    summary:
      "Bell Beaker migrants from the continent replaced roughly 90% of Neolithic Britain's gene pool within a few centuries, bringing an early Indo-European language. Later, Anglo-Saxon migrants brought Germanic speech.",
    steppeAncestry: "~47% in modern Britons",
    modernSpeakers: "~1.5 billion (incl. L2)",
    steps: [
      {
        date: "~3000 BCE",
        label: "Yamnaya expand west",
        detail:
          "Steppe pastoralists pour into central Europe, forming the Corded Ware culture. They carry roughly 75% steppe ancestry and speak an early Indo-European language. (Haak et al. 2015)",
      },
      {
        date: "~2800 BCE",
        label: "Corded Ware meets farmers",
        detail:
          "In central Europe, Corded Ware people mix with Neolithic farmers. The resulting Bell Beaker culture retains substantial steppe ancestry and Indo-European speech.",
      },
      {
        date: "~2500 BCE",
        label: "Bell Beaker crosses the Channel",
        detail:
          "Bell Beaker people reach Britain. Ancient DNA shows they replaced about 90% of the existing Neolithic population within a few centuries. Britain becomes Indo-European-speaking. (Olalde et al. 2018)",
      },
      {
        date: "~400–600 CE",
        label: "Anglo-Saxons arrive",
        detail:
          "Germanic-speaking Angles, Saxons, and Jutes migrate to Britain from what is now Denmark and northern Germany, layering a second Indo-European language (Old English) over the existing Celtic tongues.",
      },
      {
        date: "Today",
        label: "English emerges",
        detail:
          "Through Norman French influence, Norse contact, and global colonial expansion, Old English evolves into Modern English, now spoken by roughly 1.5 billion people worldwide as a first or second language.",
      },
    ],
  },
  {
    language: "Hindi",
    region: "South Asia",
    mechanism: "mass_migration",
    mechanismLabel: "Mass Migration",
    summary:
      "Steppe ancestry entered South Asia via Sintashta/Andronovo-related migrations around 2000–1500 BCE, after the decline of the Indus Valley Civilization. Ancient DNA confirms a substantial demographic influx, not just a small elite.",
    steppeAncestry: "~5–35% (varies by region and community)",
    modernSpeakers: "~600 million (incl. Urdu)",
    steps: [
      {
        date: "~2100 BCE",
        label: "Sintashta develops on the Urals",
        detail:
          "On the southern Urals, Corded Ware descendants develop chariot warfare and the Sintashta culture. They are likely proto-Indo-Iranian speakers. (Allentoft et al. 2015)",
      },
      {
        date: "~1800 BCE",
        label: "Andronovo spreads across Central Asia",
        detail:
          "Sintashta evolves into the Andronovo horizon, covering a vast area from the Urals to the Altai. They herd cattle, forge bronze, and build spoke-wheeled chariots.",
      },
      {
        date: "~1500 BCE",
        label: "Steppe migrants enter South Asia",
        detail:
          "Groups related to Andronovo move south through the BMAC (Bactria–Margiana) region and into the Indian subcontinent. The Indus Valley Civilization has already declined. Steppe ancestry appears in the archaeological record for the first time. (Narasimhan et al. 2019)",
      },
      {
        date: "~1500–1200 BCE",
        label: "Old Indo-Aryan takes root",
        detail:
          "The newcomers speak Old Indo-Aryan, the earliest form of the Indo-Aryan branch. The Rigveda is composed in Vedic Sanskrit, a literary register of this language, describing a pastoral, horse-centered culture with clear steppe parallels.",
      },
      {
        date: "~600 BCE–500 CE",
        label: "Sanskrit and Prakrits diverge",
        detail:
          "Old Indo-Aryan dialects split into two parallel tracks: Sanskrit becomes the refined literary and ritual language (codified by Panini ~400 BCE), while the Prakrits (everyday spoken vernaculars) evolve independently. The Prakrits are not descended from Sanskrit; both are sibling branches of Old Indo-Aryan.",
      },
      {
        date: "Today",
        label: "Hindi and its relatives",
        detail:
          "Modern Indo-Aryan languages like Hindi, Bengali, Marathi, and Punjabi descend from the Prakrits, not from Sanskrit. Hindi-Urdu alone is spoken by roughly 600 million people, making this branch one of the most successful IE expansions.",
      },
    ],
  },
  {
    language: "Greek",
    region: "Aegean",
    mechanism: "elite_dominance",
    mechanismLabel: "Elite Dominance",
    summary:
      "Mycenaean Greeks carried only ~15% steppe ancestry, yet Greek completely replaced the pre-existing Minoan language. A relatively small but socially dominant group imposed their language on the Aegean.",
    steppeAncestry: "~13–18% in Mycenaeans",
    modernSpeakers: "~13 million",
    steps: [
      {
        date: "~2500–2200 BCE",
        label: "Steppe-descended groups enter the Balkans",
        detail:
          "Small groups carrying steppe ancestry move southward through the Balkans toward the Aegean world. Unlike in northern Europe, they remain a minority among the local Neolithic and Minoan-related populations.",
      },
      {
        date: "~2000 BCE",
        label: "Proto-Greeks reach the Aegean",
        detail:
          "Steppe-descended groups settle in mainland Greece. Lazaridis et al. (2017) showed Mycenaeans had ~15% steppe ancestry absent in Minoans, a genetic fingerprint of the arriving Greek speakers.",
      },
      {
        date: "~1600 BCE",
        label: "Mycenaean civilization rises",
        detail:
          "The Mycenaeans build a palace civilization speaking Greek, recorded in Linear B tablets from ~1400 BCE onward. Despite being a genetic minority, their language and culture dominate the mainland.",
      },
      {
        date: "~1450–1100 BCE",
        label: "Minoan language fades",
        detail:
          "Minoan civilization declines after ~1450 BCE (likely linked to the Thera eruption and Mycenaean takeover of Crete). Linear A, the undeciphered Minoan script, disappears. By the end of the Bronze Age, Greek is the sole language of the Aegean.",
      },
      {
        date: "Today",
        label: "Modern Greek endures",
        detail:
          "Greek has been spoken continuously in the Aegean for nearly 4,000 years. It is one of the oldest attested Indo-European languages, with an unbroken literary tradition from the Mycenaean tablets to the present.",
      },
    ],
  },
  {
    language: "Persian",
    region: "Iran",
    mechanism: "mixed",
    mechanismLabel: "Migration + Elite Dominance",
    summary:
      "Iranian-speaking groups descended from the same Indo-Iranian expansion as Vedic speakers, but moved westward and southward into the Iranian plateau. Elamite and other local languages were gradually replaced over centuries.",
    steppeAncestry: "~15–25% in modern Iranians",
    modernSpeakers: "~110 million (Persian, Dari, Tajik)",
    steps: [
      {
        date: "~2100 BCE",
        label: "Indo-Iranian unity on the steppe",
        detail:
          "Proto-Indo-Iranian is spoken by Sintashta-related groups on the southern Urals. Iranian and Indo-Aryan have not yet split; the Rigveda and Avesta share remarkable vocabulary, mythology, and ritual terminology.",
      },
      {
        date: "~1500 BCE",
        label: "Iranian speakers enter the plateau",
        detail:
          "While one branch heads south into India, Iranian-speaking groups move westward and southward into the Iranian plateau, arriving in a region previously home to Elamite, Hurrian, and other non-IE languages.",
      },
      {
        date: "~1200–1000 BCE",
        label: "Old Avestan composed",
        detail:
          "The Gathas of Zarathustra are composed in Old Avestan, an archaic Iranian language so close to Vedic Sanskrit that individual hymns can be nearly mechanically transposed between the two.",
      },
      {
        date: "~550 BCE",
        label: "Old Persian and the Achaemenid Empire",
        detail:
          "Cyrus the Great founds the Achaemenid Empire in 559 BCE. Old Persian becomes the language of the largest empire the world had yet seen, spreading Iranian speech and administration across the Near East.",
      },
      {
        date: "Today",
        label: "Modern Persian (Farsi)",
        detail:
          "Persian evolves through Middle Persian (Pahlavi) into Modern Farsi, Dari, and Tajik. Despite heavy Arabic lexical influence after the 7th-century Islamic conquest, Persian remains unmistakably Indo-European in grammar and core vocabulary.",
      },
    ],
  },
  {
    language: "Spanish",
    region: "Iberia",
    mechanism: "mass_migration",
    mechanismLabel: "Mass Migration",
    summary:
      "Bell Beaker migrations brought steppe ancestry and early IE speech to Iberia. Later, Roman conquest imposed Latin, which evolved into Spanish, a second layer of IE language replacement over earlier Celtic and non-IE tongues.",
    steppeAncestry: "~20–30% in modern Iberians",
    modernSpeakers: "~560 million",
    steps: [
      {
        date: "~2500 BCE",
        label: "Bell Beaker reaches Iberia",
        detail:
          "Bell Beaker people carrying steppe ancestry arrive in the Iberian Peninsula. Unlike in Britain, the population replacement is less extreme. Significant Neolithic ancestry persists, but Indo-European speech takes hold.",
      },
      {
        date: "~1000 BCE",
        label: "Celtic languages dominate the interior",
        detail:
          "The interior of Iberia speaks Celtiberian and other Celtic languages. Coastal areas retain non-IE languages like Iberian and Tartessian. Basque, the sole pre-IE survivor, persists in the Pyrenees.",
      },
      {
        date: "~200 BCE",
        label: "Roman conquest begins",
        detail:
          "Rome conquers Iberia over two centuries of campaigning. Latin replaces both Celtic and non-IE languages through colonization, urbanization, and prestige, marking a second wave of IE language replacement on the same soil.",
      },
      {
        date: "~500–700 CE",
        label: "Vulgar Latin diversifies",
        detail:
          "After the fall of Rome, Vulgar Latin in Iberia begins diverging into distinct Romance varieties. Arabic-speaking Moors rule much of the peninsula from 711 CE, contributing loanwords but not displacing Romance speech.",
      },
      {
        date: "Today",
        label: "Spanish goes global",
        detail:
          "Castilian Spanish, carried to the Americas by colonization, becomes the world's second most-spoken native language. The chain from PIE to steppe migrants to Celtic to Latin to Spanish spans over 6,000 years.",
      },
    ],
  },
  {
    language: "Russian",
    region: "Eastern Europe",
    mechanism: "mass_migration",
    mechanismLabel: "Mass Migration",
    summary:
      "The Corded Ware expansion brought IE speech to the Baltic and Slavic world. Balto-Slavic languages emerged from this stock, and East Slavic eventually became Russian.",
    steppeAncestry: "~40–50% in modern Russians",
    modernSpeakers: "~255 million",
    steps: [
      {
        date: "~2900 BCE",
        label: "Corded Ware expands north and east",
        detail:
          "Yamnaya-derived Corded Ware groups spread across northern and eastern Europe. Their descendants form the ancestral population for the Balto-Slavic language branch.",
      },
      {
        date: "~1500 BCE",
        label: "Balto-Slavic unity",
        detail:
          "A Balto-Slavic proto-language is spoken across a wide area of eastern Europe. Baltic and Slavic share exclusive innovations not found in other IE branches, pointing to a period of common development.",
      },
      {
        date: "~500–700 CE",
        label: "Slavic expansion",
        detail:
          "Slavic-speaking groups expand rapidly across eastern and southeastern Europe during the Migration Period. Within a few centuries, Slavic languages cover a vast territory from the Elbe River to the Dnieper and beyond.",
      },
      {
        date: "~900 CE",
        label: "Old East Slavic emerges",
        detail:
          "Kievan Rus' is founded. Old East Slavic becomes the common language of a vast territory from Novgorod to Kyiv. The Cyrillic alphabet is adapted from Greek missionary work for Slavic use.",
      },
      {
        date: "Today",
        label: "Modern Russian",
        detail:
          "Russian is the most widely spoken Slavic language and a lingua franca across northern Eurasia. Among all IE languages, its heartland lies geographically closest to the original PIE steppe homeland.",
      },
    ],
  },
  {
    language: "Italian",
    region: "Italy",
    mechanism: "mass_migration",
    mechanismLabel: "Mass Migration",
    summary:
      "Steppe-derived groups entered Italy during the Bronze Age, bringing Italic languages that eventually included Latin. Rome's dominance then spread Latin across the peninsula, absorbing Etruscan and other pre-IE languages.",
    steppeAncestry: "~25–35% in modern Italians (higher in the north)",
    modernSpeakers: "~85 million",
    steps: [
      {
        date: "~2200 BCE",
        label: "Bell Beaker and early Bronze Age Italy",
        detail:
          "Bell Beaker-influenced groups carrying steppe ancestry enter the Italian peninsula from the north. Ancient DNA from Bronze Age Italy shows a clear influx of steppe-related ancestry during this period.",
      },
      {
        date: "~1200 BCE",
        label: "Italic languages diversify",
        detail:
          "Multiple Italic languages emerge across the peninsula: Latin, Oscan, Umbrian, and others. Meanwhile, non-IE languages like Etruscan and Rhaetic persist in parts of central and northern Italy.",
      },
      {
        date: "~500 BCE",
        label: "Latin rises with Rome",
        detail:
          "Latin begins as the language of a small city-state on the Tiber. As Rome expands across Italy, Latin gradually replaces Oscan, Umbrian, Etruscan, and Messapic through conquest, colonization, and cultural prestige.",
      },
      {
        date: "~200 BCE–400 CE",
        label: "Latin dominates the Mediterranean",
        detail:
          "Rome's empire spreads Latin across western Europe, North Africa, and the Balkans. Vulgar Latin, the spoken everyday form, diverges regionally over centuries.",
      },
      {
        date: "Today",
        label: "Modern Italian",
        detail:
          "Italian descends primarily from the Tuscan dialect of Vulgar Latin, standardized through literature (Dante, Petrarch). It preserves remarkably transparent connections to its Latin ancestor and, through it, to Proto-Indo-European.",
      },
    ],
  },
  {
    language: "German",
    region: "Central Europe",
    mechanism: "mass_migration",
    mechanismLabel: "Mass Migration",
    summary:
      "The Corded Ware expansion brought steppe ancestry and IE speech into central and northern Europe. Germanic languages developed in Scandinavia and the North European Plain, then spread south with migrations during the Roman and post-Roman periods.",
    steppeAncestry: "~45–50% in modern Germans",
    modernSpeakers: "~130 million",
    steps: [
      {
        date: "~2900 BCE",
        label: "Corded Ware dominates northern Europe",
        detail:
          "Yamnaya-derived Corded Ware groups establish themselves across the North European Plain and Scandinavia, bringing steppe ancestry and Indo-European speech to a region previously populated by Neolithic farmers and hunter-gatherers.",
      },
      {
        date: "~1500 BCE",
        label: "Proto-Germanic begins to diverge",
        detail:
          "In southern Scandinavia and the western Baltic, a distinct proto-Germanic language develops. Grimm's Law, the systematic consonant shift (p→f, t→þ, k→h), sets Germanic apart from all other IE branches.",
      },
      {
        date: "~500 BCE–100 CE",
        label: "Germanic tribes expand",
        detail:
          "Germanic-speaking peoples spread south and east from Scandinavia. Roman writers (Caesar, Tacitus) describe them as distinct from the Celtic-speaking Gauls to their west.",
      },
      {
        date: "~500–800 CE",
        label: "Old High German emerges",
        detail:
          "After the fall of Rome, the High German consonant shift (a second sound shift, e.g., p→pf, t→ts) differentiates the southern Germanic dialects that become German from the northern dialects that become English and Dutch.",
      },
      {
        date: "Today",
        label: "Modern German",
        detail:
          "Standard German, shaped by Luther's Bible translation and subsequent literary tradition, is the most widely spoken native language in Europe. It retains a rich case system and compound-word morphology from its IE heritage.",
      },
    ],
  },
  {
    language: "Irish",
    region: "Ireland",
    mechanism: "mass_migration",
    mechanismLabel: "Mass Migration",
    summary:
      "Bell Beaker migrants brought Indo-European speech to Ireland around 2500–2000 BCE, with a near-total genetic replacement of the island's Neolithic population. The Celtic language that took root eventually became Irish Gaelic.",
    steppeAncestry: "~40–45% in modern Irish",
    modernSpeakers: "~1.7 million (some fluency)",
    steps: [
      {
        date: "~2500 BCE",
        label: "Bell Beaker reaches Ireland",
        detail:
          "Bell Beaker migrants cross from Britain to Ireland, carrying substantial steppe ancestry. Ancient DNA from Rathlin Island (~2000 BCE) shows these newcomers largely replaced the island's Neolithic megalith-building population. (Cassidy et al. 2016)",
      },
      {
        date: "~1200 BCE",
        label: "Celtic speech takes root",
        detail:
          "A form of Celtic develops in the British Isles. Ireland, geographically isolated, preserves archaic features. The island develops a distinctive insular Celtic culture connected to but distinct from Continental Celtic.",
      },
      {
        date: "~400 CE",
        label: "Ogham and early Irish",
        detail:
          "The oldest Irish inscriptions appear in the Ogham script, carved on standing stones. Old Irish emerges as one of the earliest attested Celtic languages, preserving archaic IE features like a dual number.",
      },
      {
        date: "~1600–1800 CE",
        label: "English encroaches",
        detail:
          "Under English colonial rule, Irish declines sharply. The Great Famine (1845–1852) devastates Irish-speaking western regions most severely, accelerating the shift to English.",
      },
      {
        date: "Today",
        label: "Irish survives and revives",
        detail:
          "Irish is an official language of Ireland and the EU. Despite centuries of decline, revival efforts have sustained the language in Gaeltacht regions and urban communities. It remains a living link to Europe's Celtic past.",
      },
    ],
  },
  {
    language: "Armenian",
    region: "Caucasus",
    mechanism: "mixed",
    mechanismLabel: "Migration + Elite Dominance",
    summary:
      "Armenian's origins are debated, but steppe-derived ancestry is present in ancient and modern Armenian populations. The language likely arrived via the Balkans or through the Caucasus, replacing earlier Hurro-Urartian languages.",
    steppeAncestry: "~15–25% in modern Armenians",
    modernSpeakers: "~6 million",
    steps: [
      {
        date: "~3000–2500 BCE",
        label: "Steppe ancestry enters the South Caucasus",
        detail:
          "Groups carrying Yamnaya-related ancestry appear in the South Caucasus region. The 2022 Southern Arc study (Lazaridis et al.) documented steppe admixture in Bronze Age Caucasus populations, though the exact route (via the Balkans or across the Caucasus) remains debated.",
      },
      {
        date: "~1500–1200 BCE",
        label: "Proto-Armenian develops",
        detail:
          "A proto-Armenian language develops in or near the Armenian Highland, in contact with Hurrian and Urartian languages. Armenian absorbs significant vocabulary from these non-IE neighbors, obscuring its IE identity for centuries.",
      },
      {
        date: "~860–585 BCE",
        label: "Urartu and language contact",
        detail:
          "The Kingdom of Urartu dominates the Armenian Highland, using Urartian (a non-IE language related to Hurrian). Armenian speakers coexist with and gradually absorb the Urartian-speaking population after Urartu's fall.",
      },
      {
        date: "~405 CE",
        label: "Armenian alphabet and literature",
        detail:
          "Mesrop Mashtots creates the Armenian alphabet. The Bible is translated into Classical Armenian (Grabar), launching one of the world's oldest continuous literary traditions and preserving the language through centuries of foreign rule.",
      },
      {
        date: "Today",
        label: "Modern Armenian",
        detail:
          "Armenian constitutes its own independent branch of the IE family tree. Long misclassified as Iranian due to heavy Persian loanwords, it was recognized as a separate branch by Heinrich Hübschmann in 1875. Its unique position makes it invaluable for IE reconstruction.",
      },
    ],
  },
  {
    language: "French",
    region: "Gaul",
    mechanism: "elite_dominance",
    mechanismLabel: "Elite Dominance",
    summary:
      "Gaul was Celtic-speaking before Roman conquest imposed Latin through urbanization, roads, and prestige. French descends from the Gallo-Romance variety of Vulgar Latin, shaped further by Frankish (Germanic) influence after the fall of Rome.",
    steppeAncestry: "~40–50% in modern French",
    modernSpeakers: "~320 million (incl. L2)",
    steps: [
      {
        date: "~2500 BCE",
        label: "Bell Beaker and steppe ancestry reach France",
        detail:
          "Bell Beaker-influenced groups carrying steppe ancestry arrive in what is now France. Ancient DNA shows substantial population turnover during the late Neolithic and early Bronze Age, introducing Indo-European speech to the region.",
      },
      {
        date: "~800 BCE",
        label: "Celtic Gaul",
        detail:
          "By the Iron Age, Gaul is overwhelmingly Celtic-speaking. The Gauls build oppida (fortified towns), mint coins, and develop a vibrant culture described by Greek and Roman observers. Gaulish is a Continental Celtic language related to Celtiberian and Lepontic.",
      },
      {
        date: "~50 BCE",
        label: "Roman conquest",
        detail:
          "Julius Caesar conquers Gaul (58–50 BCE). Latin is imposed through colonization, Roman roads, urban centers, and administrative prestige. Gaulish fades over the next few centuries, an IE language replacing another IE language.",
      },
      {
        date: "~400–800 CE",
        label: "Frankish influence",
        detail:
          "After the fall of Rome, the Franks (a Germanic-speaking people) conquer Gaul but adopt the local Gallo-Romance speech rather than imposing their own language. However, Frankish contributes hundreds of loanwords and influences pronunciation, giving French its distinctive character among Romance languages.",
      },
      {
        date: "Today",
        label: "Modern French",
        detail:
          "French spreads globally through colonialism and diplomacy, becoming a lingua franca of international relations. With ~320 million speakers, it is the fifth most-spoken language in the world, carrying three layers of IE heritage: steppe, Celtic, and Latin.",
      },
    ],
  },
  {
    language: "Turkish",
    region: "Anatolia",
    mechanism: "elite_dominance",
    mechanismLabel: "Elite Dominance (reversal)",
    summary:
      "Turkish is not Indo-European; it belongs to the Turkic family. But Anatolia was the home of the oldest attested IE language (Hittite). Turkish represents the dramatic reversal: a non-IE language replacing IE speech in the very region where IE was first written down.",
    steppeAncestry: "N/A (non-IE language)",
    modernSpeakers: "~85 million",
    steps: [
      {
        date: "~2000 BCE",
        label: "Hittite: the first written IE language",
        detail:
          "Anatolia is home to Hittite, the oldest attested Indo-European language. The Hittites build a powerful empire and leave thousands of cuneiform tablets. Luwian and Palaic, related Anatolian IE languages, are also spoken across the region.",
      },
      {
        date: "~1200 BCE",
        label: "Bronze Age collapse",
        detail:
          "The Hittite Empire falls during the Bronze Age collapse (~1180 BCE). Successor states continue using Luwian, and Anatolia remains IE-speaking for centuries, later passing through Phrygian, Lydian, Greek, and eventually Latin (under Rome).",
      },
      {
        date: "~1071 CE",
        label: "Turkic peoples enter Anatolia",
        detail:
          "After the Battle of Manzikert (1071), Seljuk Turks begin settling Anatolia en masse. Turkic-speaking pastoralists from Central Asia gradually displace or absorb the Greek and Armenian-speaking Christian population.",
      },
      {
        date: "~1299–1453 CE",
        label: "Ottoman Turkish rises",
        detail:
          "The Ottoman Empire expands across Anatolia and the Balkans. Ottoman Turkish, heavily influenced by Persian and Arabic, becomes the prestige language. Greek and Armenian survive as minority languages but lose their majority status in most of Anatolia.",
      },
      {
        date: "Today",
        label: "A non-IE land that was once IE's cradle",
        detail:
          "Modern Turkish replaced Indo-European languages in the very region where the oldest IE language was first recorded. This reversal shows that language spread is not a one-way process, and that no language family holds any territory permanently.",
      },
    ],
  },
];
