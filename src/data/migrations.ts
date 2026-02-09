export interface MigrationRoute {
  id: string;
  name: string;
  startDate: number; // negative = BCE
  endDate: number;
  path: [number, number][]; // Array of [lat, lng] waypoints
  color: string;
  branch?: string; // IE branch this led to
  description: string;
}

export const migrations: MigrationRoute[] = [
  {
    id: "clv-west",
    name: "CLV Westward Expansion",
    startDate: -4500,
    endDate: -3500,
    path: [
      [44.0, 46.0], // Lower Volga / Dagestan foothills
      [44.8, 44.5], // North Caucasus piedmont (east)
      [45.5, 43.0], // North Caucasus piedmont (central)
      [46.0, 41.0], // Kuban steppe / eastern Sea of Azov
      [46.5, 39.5], // Eastern Sea of Azov steppe
      [47.0, 38.0], // Don River crossing
      [47.5, 37.0], // Lower Don valley
      [48.0, 36.0], // Dnieper-Don interfluve
      [48.5, 35.5], // Dnieper-Don steppe (Serednii Stih territory)
    ],
    color: "#9B59B6",
    branch: "Pre-Proto-Indo-European",
    description:
      "The westward expansion of CLV (Caucasus-Lower Volga) cline populations from the Lower Volga and Dagestan region across the North Caucasus piedmont to the Dnieper-Don steppe. This movement followed the open steppe corridor north of the Greater Caucasus mountains, avoiding the mountainous terrain by staying on the flat grasslands. This expansion brought CLV ancestry to the Dnieper region, contributing to cultures like Serednii Stih and ultimately feeding into the Yamnaya gene pool. The route follows the natural east-west steppe corridor that has been a major migration pathway throughout Eurasian history.",
  },
  {
    id: "clv-south",
    name: "CLV Southward Expansion (Anatolian Branch)",
    startDate: -4500,
    endDate: -4000,
    path: [
      [42.0, 45.0], // South Caucasus foothills
      [41.8, 44.5], // Eastern Georgia / Kura valley
      [41.5, 44.0], // Kura River middle course
      [41.0, 43.5], // Armenian Highland approach
      [40.5, 43.0], // Kars Plateau region
      [40.0, 41.5], // Upper Euphrates headwaters
      [39.8, 39.5], // Eastern Anatolian plateau
      [39.5, 37.5], // Central-eastern Anatolia
      [39.5, 36.0], // Cappadocia approach
      [40.0, 34.5], // Hattusa region (Hittite heartland, Bogazkoy)
    ],
    color: "#8E44AD",
    branch: "Anatolian (Hittite, Luwian, Palaic)",
    description:
      "The southward expansion of CLV-related populations from the southern Caucasus foothills through the Kura River valley, across the Armenian Highland, and into central Anatolia. This route follows the natural corridor from the South Caucasus via the upper Euphrates headwaters and across the Anatolian plateau to the region around Hattusa (Bogazkoy). This movement is proposed to explain how the Anatolian branch of Indo-European (Hittite, Luwian, Palaic, Lydian) reached Anatolia, potentially representing the earliest split in the IE family tree. The Anatolian branch preserves archaic features absent in all other IE branches, consistent with an early separation from the core PIE community.",
  },
  {
    id: "yamnaya-europe",
    name: "Yamnaya into Europe (Corded Ware Formation)",
    startDate: -3000,
    endDate: -2500,
    path: [
      [47.5, 38.0], // Pontic steppe (Yamnaya core)
      [47.2, 36.0], // Western Pontic steppe
      [47.0, 34.5], // Dnieper region approach
      [46.5, 32.0], // Lower Dnieper region
      [46.0, 30.0], // Northwest Black Sea coast
      [45.5, 28.5], // Lower Danube delta region
      [45.2, 27.0], // Wallachian Plain approach
      [45.5, 25.5], // Wallachian Plain (Romania)
      [46.0, 23.5], // Transylvanian Plateau approach
      [47.0, 21.0], // Hungarian Plain (Great Alfold)
      [47.8, 19.5], // Central Hungarian Plain
      [48.5, 18.0], // Carpathian Basin northern edge
      [49.5, 17.0], // Moravian Gate corridor
      [50.5, 17.0], // Silesia / Oder River region
      [51.5, 17.5], // Central-Northern European Plain
      [52.0, 18.0], // Corded Ware core territory
    ],
    color: "#E67E22",
    branch: "Proto-Balto-Slavic, Proto-Germanic",
    description:
      "The massive westward and northwestward migration of Yamnaya-related populations into Central and Northern Europe, resulting in the formation of the Corded Ware culture around 2900 BCE. This expansion likely followed multiple corridors: a southern route via the Lower Danube and Carpathian Basin (supported by Yamnaya kurgans documented in Romania, Bulgaria, and eastern Hungary by Heyd 2021), and a northern route through Volhynia into Lesser Poland, where the earliest Corded Ware radiocarbon dates (~2900 BCE) are found (Furholt 2021). The map shows one representative southern path, but both corridors contributed to the rapid spread of steppe ancestry across Europe. Ancient DNA demonstrates that this migration caused one of the most dramatic population turnovers in European prehistory, with Corded Ware individuals carrying ~75% steppe ancestry. This migration is the primary vector for the introduction of most European IE languages.",
  },
  {
    id: "yamnaya-afanasievo",
    name: "Yamnaya to Afanasievo (Eastward Expansion)",
    startDate: -3300,
    endDate: -2800,
    path: [
      [50.5, 55.0], // Eastern Yamnaya territory (Orenburg region)
      [51.0, 57.5], // Southern Urals eastern slope
      [50.8, 60.0], // Turgai Depression entrance
      [50.5, 63.0], // Turgai Gate
      [50.2, 66.0], // Central Kazakh steppe (Kostanay)
      [49.8, 69.0], // Northern Kazakh steppe
      [49.5, 72.5], // Irtysh River approach
      [49.8, 76.0], // Eastern Kazakhstan steppe
      [50.0, 79.5], // Approaching Altai foothills
      [50.2, 82.5], // Western Altai
      [50.0, 85.0], // Central Altai
      [50.0, 88.0], // Altai Mountains (Afanasievo core)
    ],
    color: "#F39C12",
    branch: "Proto-Tocharian",
    description:
      "The remarkable eastward migration of Yamnaya-related populations across more than 3,000 kilometers of open Kazakh steppe to the Altai Mountains, giving rise to the Afanasievo culture. This route traversed the flat, treeless steppe of Kazakhstan through the Turgai Depression (a natural low-lying corridor between the Urals and the Kazakh uplands), then continued eastward past the Irtysh River to the Altai. The genetic near-identity of Afanasievo with western Yamnaya indicates this was a rapid, large-scale migration with little admixture from intervening populations. This migration likely carried the ancestor of the Tocharian languages to eastern Central Asia.",
  },
  // Corded Ware backflow: explains how Sintashta formed
  {
    id: "corded-ware-sintashta",
    name: "Corded Ware Backflow to Sintashta",
    startDate: -2800,
    endDate: -2100,
    path: [
      [52.0, 18.0], // Corded Ware core (Poland)
      [52.5, 21.0], // Eastern Poland / Bug River
      [53.0, 25.0], // Belarus / upper Neman
      [53.5, 29.0], // Upper Dnieper region
      [54.0, 33.0], // Smolensk region
      [55.0, 37.0], // Moscow basin / upper Volga approach
      [56.0, 40.0], // Upper Volga (Fatyanovo culture zone)
      [56.0, 43.0], // Volga-Oka confluence (Fatyanovo-Balanovo)
      [55.5, 46.0], // Middle Volga (Balanovo)
      [55.0, 49.0], // Kama River approach
      [54.5, 52.0], // Western Urals approach (Abashevo)
      [54.0, 55.0], // Ural foothills (Abashevo culture)
      [53.5, 57.5], // Southeastern Urals approach
      [52.5, 59.5], // Sintashta (Southern Urals)
    ],
    color: "#3498DB",
    branch: "Proto-Indo-Iranian (via Fatyanovo-Abashevo)",
    description:
      "The eastward backflow of Corded Ware-related populations from Central Europe to the Southern Urals, ultimately giving rise to the Sintashta culture. This migration passed through the Fatyanovo-Balanovo culture (an eastern Corded Ware offshoot in the upper Volga, c. 2900-2300 BCE) and the Abashevo culture in the western Urals before crystallizing as Sintashta around 2100 BCE. Genetic evidence (Narasimhan et al. 2019) shows Sintashta individuals carry ~67% steppe ancestry plus ~33% European farmer ancestry absent in Yamnaya but present in Corded Ware, confirming this western origin rather than a direct Yamnaya derivation.",
  },
  // Sintashta expansion into Andronovo
  {
    id: "sintashta-andronovo",
    name: "Sintashta to Andronovo Expansion",
    startDate: -2000,
    endDate: -1500,
    path: [
      [52.5, 59.5], // Sintashta (Southern Urals)
      [51.5, 61.0], // Eastern Urals steppe
      [50.5, 63.0], // Turgai region
      [49.5, 65.5], // Northern Kazakh steppe
      [49.0, 68.0], // Central Kazakh steppe (Andronovo core)
      [48.5, 71.0], // Eastern Kazakhstan
      [48.0, 74.0], // Irtysh River region
      [48.5, 77.0], // Upper Irtysh / eastern steppe
    ],
    color: "#D35400",
    branch: "Proto-Indo-Iranian expansion",
    description:
      "The expansion of the Sintashta tradition eastward across the Central Asian steppes, forming the vast Andronovo cultural horizon. Andronovo (c. 2000-900 BCE) spread from the Urals to the Yenisei River, carrying chariot technology, tin-bronze metallurgy, and the Indo-Iranian language across the steppes. Andronovo populations are ancestral to later Iranian-speaking groups (Scythians, Persians, Medes) and, through southward migration via the BMAC contact zone, to the Indo-Aryan speakers who entered South Asia.",
  },
  // Armenian migration via Caucasus
  {
    id: "armenian-migration",
    name: "Armenian Migration via the Caucasus",
    startDate: -2800,
    endDate: -2000,
    path: [
      [47.0, 40.0], // Northern Caucasus steppe (Yamnaya zone)
      [46.0, 41.0], // Kuban steppe
      [45.0, 41.5], // North Caucasus piedmont
      [44.0, 42.0], // Greater Caucasus passes
      [43.0, 43.0], // South Caucasus (Kura-Araxes zone)
      [42.0, 43.5], // Eastern Georgia / Kura valley
      [41.0, 43.5], // Armenian Highland (north)
      [40.0, 44.0], // Lake Sevan / Ararat foothills
      [39.5, 44.5], // Armenian Highland core (Ararat plain)
    ],
    color: "#8E44AD",
    branch: "Proto-Armenian",
    description:
      "The migration of Proto-Armenian speakers from the Yamnaya-era Pontic-Caspian steppe southward through the Caucasus mountains into the Armenian Highland. Lazaridis et al. (2022, 2025) demonstrated that by ~2000 BCE, Armenia had become a zone of persistent low-level steppe ancestry, with patrilineal descendants of Yamnaya men. This is a distinct, later movement from the earlier CLV southward expansion that brought Anatolian languages; the Armenian branch is genetically tied to Yamnaya-era steppe populations, not the earlier CLV cline. Armenian preserves some archaic IE features while sharing innovations with Greek, consistent with a Greco-Armenian proximity hypothesis.",
  },
  // Bell Beaker: Split into two branches from a common origin
  {
    id: "bell-beaker-iberia",
    name: "Bell Beaker Spread to Iberia",
    startDate: -2800,
    endDate: -2200,
    path: [
      [50.5, 6.0],  // Lower Rhine / Low Countries (origin)
      [49.5, 4.5],  // Paris Basin / Marne region
      [48.5, 3.0],  // Ile-de-France
      [47.5, 1.5],  // Loire Valley approach
      [46.5, 0.5],  // Poitou region
      [45.5, -0.2], // Bordeaux / Garonne approach
      [44.5, -1.0], // Garonne region / SW France
      [43.5, -1.5], // Basque Country / Pyrenean passes
      [42.5, -2.0], // Northern Iberian Meseta
      [41.0, -3.0], // Central Iberian Meseta
      [40.0, -3.5], // Central Spain
    ],
    color: "#2ECC71",
    branch: "Proto-Celtic, Proto-Italic (debated)",
    description:
      "The southwestern spread of the Bell Beaker phenomenon from the Lower Rhine region through France to Iberia. From the Rhine-Meuse delta area, this route followed the major French river corridors (Seine, Loire, Garonne) southwestward through the Paris Basin, across the Aquitaine plains, through the Pyrenean passes, and into the Iberian Peninsula. In Iberia, the Bell Beaker expansion around 2500-2200 BCE resulted in significant population replacement, with Olalde et al. (2018) showing ~40% steppe ancestry replacing Iberian Neolithic populations. The route carried steppe ancestry (via Corded Ware-related populations) into southwestern Europe.",
  },
  {
    id: "bell-beaker-britain",
    name: "Bell Beaker Spread to Britain",
    startDate: -2600,
    endDate: -2200,
    path: [
      [50.5, 6.0],  // Lower Rhine / Low Countries (same origin)
      [50.5, 3.5],  // Flanders / Pas-de-Calais approach
      [50.8, 2.0],  // Strait of Dover approach
      [51.0, 1.0],  // English Channel crossing
      [51.2, 0.0],  // Kent / Southeast England
      [51.3, -1.0], // Wessex approach (Stonehenge region)
      [51.5, -1.8], // Wessex (center of British Beaker)
      [52.0, -1.5], // English Midlands
    ],
    color: "#2ECC71",
    branch: "Proto-Celtic, Proto-Italic (debated)",
    description:
      "The northwestern spread of the Bell Beaker phenomenon across the English Channel to Britain. From the Lower Rhine / Low Countries area, this route crossed the narrow Strait of Dover to southeastern England, reaching the Wessex region (home of Stonehenge) which became the center of the British Beaker culture. In Britain, the Bell Beaker migration around 2400 BCE resulted in approximately 90% population replacement within a few centuries, one of the most complete population turnovers documented by ancient DNA (Olalde et al. 2018). The incoming population carried substantial steppe ancestry.",
  },
  // Indo-Iranian: Split into trunk + two branches
  {
    id: "indo-iranian-trunk",
    name: "Indo-Iranian Migration (Sintashta to BMAC)",
    startDate: -2100,
    endDate: -1700,
    path: [
      [52.5, 59.5], // Sintashta (Southern Urals)
      [51.5, 60.0], // Southern Urals steppe
      [50.0, 61.0], // Turgai / Northern Aral steppe
      [48.5, 62.0], // Kazakh-Aral steppe
      [46.5, 62.5], // Kyzylkum desert northern margins
      [44.5, 62.5], // Amu Darya delta approaches (Khorezm)
      [42.5, 62.5], // Southern Karakum
      [41.0, 62.5], // Northern Margiana
      [39.5, 63.0], // BMAC core (Gonur Tepe area)
      [38.0, 64.0], // Bactria / northern Afghan border
      [37.5, 64.5], // Branch point in Bactria
    ],
    color: "#E74C3C",
    branch: "Proto-Indo-Iranian",
    description:
      "The southward migration of Indo-Iranian-speaking populations from the Sintashta culture in the Southern Urals through Central Asia to the BMAC (Bactria-Margiana) contact zone. The route went south from Sintashta through the Kazakh-Aral steppe, passing the Kyzylkum desert margins and the Amu Darya delta, entering BMAC territory around Gonur Tepe where steppe pastoralists interacted with settled oasis agriculturalists. Archaeological evidence includes Andronovo-type pottery at BMAC sites. The linguistic split between the Indo-Aryan and Iranian branches likely occurred in this Bactrian region before either group reached its historical homeland.",
  },
  {
    id: "indo-aryan",
    name: "Indo-Aryan Migration to South Asia",
    startDate: -1700,
    endDate: -1500,
    path: [
      [37.5, 64.5], // Branch point in Bactria
      [37.0, 65.5], // Northern Afghanistan (Balkh/Bactra)
      [36.2, 67.0], // Hindu Kush northern foothills
      [35.5, 68.5], // Hindu Kush approach
      [35.0, 69.5], // Kabul River valley
      [34.5, 70.5], // Khyber Pass approach
      [33.8, 71.5], // Peshawar basin / Swat Valley
      [32.5, 72.0], // Taxila area (Gandhara)
      [31.0, 73.0], // Punjab plains
      [30.0, 74.0], // Central Punjab
      [29.0, 76.0], // Upper Ganges-Yamuna Doab (Vedic heartland)
    ],
    color: "#E74C3C",
    branch: "Proto-Indo-Aryan",
    description:
      "The southeastern migration of the Indo-Aryan branch from the Bactrian region through the Hindu Kush mountain passes into the Indian subcontinent. From the branch point in Bactria, this route followed the Kabul River valley through the Khyber Pass corridor into the Peshawar basin and Swat Valley (where the earliest South Asian evidence of steppe ancestry appears in the Gandhara Grave Culture, per Narasimhan et al. 2019), then continued into the Punjab plains and eventually to the Ganges-Yamuna Doab, the heartland of early Vedic civilization.",
  },
  {
    id: "iranian",
    name: "Iranian Migration to the Iranian Plateau",
    startDate: -1700,
    endDate: -1300,
    path: [
      [37.5, 64.5], // Branch point in Bactria
      [37.0, 62.5], // Western Bactria / Margiana
      [36.5, 60.0], // Khorasan approach (NE Iran)
      [36.0, 58.0], // Khorasan / Mashhad region
      [35.5, 56.0], // Central NE Iranian Plateau
      [35.0, 54.0], // Dasht-e Kavir northern rim
      [34.5, 51.5], // Western Iran approach
      [34.5, 49.0], // Zagros foothills (Median territory, Ecbatana/Hamadan)
    ],
    color: "#C0392B",
    branch: "Proto-Iranian (Medes, Persians)",
    description:
      "The westward migration of the Iranian branch from the Bactrian region across the Iranian Plateau. From the branch point in Bactria, this route headed west through Khorasan (northeastern Iran), along the northern rim of the Dasht-e Kavir desert, and into western Iran, reaching the Zagros foothills that would become the heartland of the Median and later Persian empires. The Iranian branch is less archaeologically visible than the Indo-Aryan one, but is associated with the spread of post-BMAC material culture westward. Old Iranian languages are first attested in the Bisitun inscription of Darius I (522 BCE), but the migration itself occurred over a millennium earlier.",
  },
  {
    id: "greek-migration",
    name: "Greek Migration into the Aegean",
    startDate: -2000,
    endDate: -1600,
    path: [
      [44.0, 21.0], // Northern Balkans / Serbia (Morava valley, Nis area)
      [43.0, 21.5], // Central Morava valley
      [42.5, 21.5], // Upper Vardar / Skopje area
      [41.5, 22.0], // Lower Vardar corridor
      [40.8, 22.5], // Thessaloniki area / Thermaic Gulf
      [40.2, 22.2], // Southern Macedonia / Olympus approaches
      [39.6, 22.3], // Thessalian Plain (major early Greek settlement)
      [39.0, 22.5], // Thermopylae region
      [38.5, 23.2], // Boeotia (Thebes area)
      [38.0, 23.5], // Attica approach
      [37.7, 22.8], // Argolid / Mycenae
    ],
    color: "#1ABC9C",
    branch: "Proto-Greek (Hellenic)",
    description:
      "The southward migration of Proto-Greek-speaking populations from the central Balkans into mainland Greece via the Vardar-Morava corridor, ultimately giving rise to the Mycenaean civilization. The route followed the Morava River valley in modern Serbia southward, then the Vardar (Axios) River corridor through North Macedonia into the Thessalian plain, continuing through the mountain passes of central Greece (Thermopylae region) into Boeotia and the Peloponnese. Ancient DNA from Mycenaean burials shows a clear steppe ancestry component not present in earlier Neolithic Aegean populations, confirming an intrusion from the north. This migration brought Greek to the Aegean world, where it would develop into Mycenaean Greek (attested in Linear B from ~1400 BCE).",
  },
  {
    id: "tocharian-route",
    name: "Tocharian Route (Afanasievo to Tarim Basin)",
    startDate: -2500,
    endDate: -1500,
    path: [
      [50.0, 88.0], // Altai Mountains (Afanasievo core)
      [49.2, 87.0], // Southern Altai foothills
      [48.0, 86.5], // Dzungarian steppe
      [47.0, 86.0], // Dzungarian Basin approach
      [46.0, 85.5], // Dzungarian Basin
      [45.0, 85.0], // Tian Shan northern foothills
      [43.5, 84.0], // Dzungarian Gate approach
      [42.5, 83.0], // Western Tarim Basin rim
      [41.5, 82.5], // Kucha area approach (later Tocharian B)
      [40.5, 82.0], // Tarim Basin oases
    ],
    color: "#F39C12",
    branch: "Proto-Tocharian",
    description:
      "The southward movement from the Altai region into the Tarim Basin of western China, carrying the ancestor of the Tocharian languages. This route followed the natural corridor from the Altai through the Dzungarian Basin, skirting the northern foothills of the Tian Shan range, and entering the Tarim Basin through the Dzungarian Gate or adjacent mountain passes. Note: Zhang et al. (2021, Nature) showed that the Tarim Basin mummies (Xiaohe, c. 2000-1500 BCE) are genetically distinct from Afanasievo, descending instead from an Ancient North Eurasian (ANE) population. This suggests the Tocharian languages may have spread through cultural contact rather than direct population replacement. The Tocharian languages (A and B), attested in Buddhist manuscripts from the 5th-8th centuries CE, represent the easternmost branch of Indo-European.",
  },
];
