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
      [44.5, 46.0], // Lower Volga / Dagestan foothills
      [45.2, 44.0], // North Caucasus piedmont
      [45.8, 42.0], // Kuban steppe region
      [46.5, 40.0], // Eastern Sea of Azov steppe
      [47.0, 38.5], // Don River crossing
      [47.5, 37.0], // Lower Don valley
      [48.0, 36.5], // Approaching Dnieper-Don interfluve
      [48.5, 36.0], // Dnieper-Don steppe (Serednii Stih territory)
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
      [42.0, 45.0], // Caucasus foothills (southern slope)
      [41.5, 44.0], // Eastern Georgia / Kura valley
      [40.8, 43.5], // Armenian Highland approach
      [40.0, 43.0], // Kars Plateau region
      [39.5, 41.0], // Upper Euphrates headwaters
      [39.2, 39.0], // Eastern Anatolian plateau
      [39.0, 37.0], // Central-eastern Anatolia
      [39.0, 35.0], // Cappadocia region
      [39.0, 33.0], // Central Anatolia (later Hittite heartland)
    ],
    color: "#8E44AD",
    branch: "Anatolian (Hittite, Luwian, Palaic)",
    description:
      "The southward expansion of CLV-related populations from the southern Caucasus foothills through the Kura River valley, across the Armenian Highland, and into central Anatolia. This route follows the natural corridor from the South Caucasus via the upper Euphrates headwaters and across the Anatolian plateau. This movement is proposed to explain how the Anatolian branch of Indo-European (Hittite, Luwian, Palaic, Lydian) reached Anatolia, potentially representing the earliest split in the IE family tree. The Anatolian branch preserves archaic features absent in all other IE branches, consistent with an early separation from the core PIE community.",
  },
  {
    id: "yamnaya-europe",
    name: "Yamnaya into Europe (Corded Ware Formation)",
    startDate: -3000,
    endDate: -2500,
    path: [
      [47.5, 38.0], // Pontic steppe (Yamnaya core)
      [47.0, 35.0], // Western Pontic steppe
      [46.5, 32.0], // Lower Dnieper region
      [46.0, 30.0], // Northwest Black Sea coast
      [45.5, 28.0], // Lower Danube delta region
      [45.0, 26.0], // Wallachian Plain (Romania)
      [46.5, 23.0], // Transylvanian Plateau approach
      [47.5, 20.0], // Hungarian Plain (Great Alfoeld)
      [48.5, 18.5], // Carpathian Basin northern edge
      [49.5, 17.0], // Moravian corridor
      [51.0, 17.5], // Silesia / Oder River region
      [52.0, 18.0], // Central-Northern European Plain (Corded Ware core)
    ],
    color: "#E67E22",
    branch: "Proto-Balto-Slavic, Proto-Germanic, Proto-Celtic/Italic",
    description:
      "The massive westward and northwestward migration of Yamnaya-related populations into Central and Northern Europe, resulting in the formation of the Corded Ware culture around 2900 BCE. This route followed the Dnieper downstream, skirted the northwest Black Sea coast, crossed into the Lower Danube region, traversed the Hungarian Plain via the Carpathian Basin, and continued north through the Moravian corridor into the North European Plain. Ancient DNA demonstrates that this migration caused one of the most dramatic population turnovers in European prehistory, with Corded Ware individuals carrying ~75% steppe ancestry. This migration is the primary vector for the introduction of most European IE languages.",
  },
  {
    id: "yamnaya-afanasievo",
    name: "Yamnaya to Afanasievo (Eastward Expansion)",
    startDate: -3300,
    endDate: -2800,
    path: [
      [50.0, 55.0], // Volga-Ural steppe (eastern Yamnaya)
      [50.5, 58.0], // Southern Urals foothills
      [50.5, 61.0], // Turgai steppe (Kazakhstan)
      [50.0, 65.0], // Central Kazakh steppe
      [49.5, 69.0], // Eastern Kazakh steppe
      [49.5, 73.0], // Irtysh River region
      [49.8, 77.0], // Eastern Kazakhstan
      [50.0, 81.0], // Approaching Altai foothills
      [50.0, 84.0], // Western Altai
      [50.0, 88.0], // Altai Mountains (Afanasievo core)
    ],
    color: "#F39C12",
    branch: "Proto-Tocharian",
    description:
      "The remarkable eastward migration of Yamnaya-related populations across more than 3,000 kilometers of open Kazakh steppe to the Altai Mountains, giving rise to the Afanasievo culture. This route traversed the flat, treeless steppe of Kazakhstan following a corridor between the southern Urals and the Altai, passing through the Turgai depression and along the Irtysh River valley. The genetic near-identity of Afanasievo with western Yamnaya indicates this was a rapid, large-scale migration with little admixture from intervening populations. This migration likely carried the ancestor of the Tocharian languages to eastern Central Asia, where Tocharian A and B are attested over two millennia later in the Tarim Basin.",
  },
  {
    id: "bell-beaker",
    name: "Bell Beaker Spread",
    startDate: -2800,
    endDate: -2200,
    path: [
      [48.0, 10.0], // Central Europe (Upper Rhine / Bavaria)
      [48.5, 7.0], // Upper Rhine valley
      [48.0, 3.0], // Paris Basin / northern France
      [47.0, 0.0], // Loire valley
      [45.5, -1.0], // Atlantic coast of France
      [43.0, -2.0], // Pyrenees foothills / Basque Country
      [41.0, -3.5], // Central Iberian Meseta
      [40.0, -4.0], // Central Spain (Iberian terminus)
      [48.0, 3.0], // (Branch point: back to northern France)
      [49.5, 0.5], // Normandy coast
      [50.5, -1.0], // English Channel crossing
      [51.0, -1.0], // Wessex (southern England)
      [52.0, -1.0], // British Midlands
    ],
    color: "#2ECC71",
    branch: "Proto-Celtic, Proto-Italic (debated)",
    description:
      "The spread of the Bell Beaker phenomenon from Central Europe westward to Iberia and northwestward to the British Isles. From the upper Rhine region, one branch followed the Rhine and major French river valleys (Seine, Loire) south and southwest to reach Iberia via the Atlantic coast and Pyrenean passes. A second branch went northwest through the Paris Basin to the English Channel, crossing to southern Britain. In Britain, the Bell Beaker migration around 2400 BCE resulted in approximately 90% population replacement within a few centuries. The Bell Beaker spread carried steppe ancestry (via Corded Ware-related populations) into Western Europe and the British Isles.",
  },
  {
    id: "indo-iranian",
    name: "Indo-Iranian Migration",
    startDate: -2100,
    endDate: -1500,
    path: [
      [52.5, 59.5], // Sintashta (Southern Urals)
      [51.0, 61.0], // Turgai steppe
      [49.0, 63.0], // Northern Aral region
      [46.0, 63.0], // Kyzylkum desert margins
      [43.0, 63.0], // Amu Darya delta approaches
      [40.0, 63.0], // BMAC contact zone (Margiana)
      [38.0, 63.0], // Deep BMAC territory (Gonur Tepe region)
      [36.0, 65.0], // Northern Afghanistan / Bactria
      [34.0, 68.0], // Hindu Kush approaches (branch point)
      [32.0, 70.0], // Khyber/mountain passes corridor
      [30.0, 71.0], // Indus valley (Punjab) - Indo-Aryan branch
      [28.0, 72.0], // Upper Ganges-Yamuna Doab
      [34.0, 68.0], // (Branch point: Iranian Plateau westward)
      [35.0, 63.0], // Western Afghanistan
      [34.5, 58.0], // Eastern Iranian Plateau (Khorasan)
      [33.5, 55.0], // Central Iranian Plateau
      [33.0, 52.0], // Western Iran (later Median/Persian territory)
    ],
    color: "#E74C3C",
    branch: "Proto-Indo-Iranian (Indo-Aryan + Iranian)",
    description:
      "The southward migration of Indo-Iranian-speaking populations from the Sintashta culture in the Southern Urals through Central Asia to South Asia and the Iranian Plateau. The route went south from Sintashta through the Kazakh-Aral steppe, entering the BMAC (Bactria-Margiana) contact zone where steppe pastoralists interacted with settled oasis agriculturalists. From BMAC territory, the route split: the Indo-Aryan branch continued southeast through Bactria and the Hindu Kush mountain passes into the Indus valley and the Punjab; the Iranian branch turned west across the Iranian Plateau toward Media and Persia. Archaeological evidence of this migration includes Andronovo-type pottery at BMAC sites and steppe-type burials appearing in the Swat Valley of Pakistan.",
  },
  {
    id: "greek-migration",
    name: "Greek Migration into the Aegean",
    startDate: -2000,
    endDate: -1600,
    path: [
      [42.0, 24.0], // Thracian plain / steppe fringe (Balkans)
      [41.5, 23.5], // Struma-Maritsa corridor
      [41.0, 23.0], // Upper Maritsa valley
      [40.5, 23.0], // Central Macedonia approach
      [40.0, 22.5], // Thessaly approach via Axios/Vardar corridor
      [39.5, 22.5], // Thessalian plain
      [39.0, 22.5], // Pass of Thermopylae region
      [38.5, 23.0], // Boeotia / Central Greece
      [38.0, 23.0], // Attica approach
      [37.7, 22.8], // Peloponnese / Mycenae region
    ],
    color: "#1ABC9C",
    branch: "Proto-Greek (Hellenic)",
    description:
      "The southward migration of Proto-Greek-speaking populations from the Balkan steppe fringe and Thracian plain into mainland Greece, ultimately giving rise to the Mycenaean civilization. The route followed natural corridors through the Balkans: the Struma and Maritsa river valleys, then south through the Axios (Vardar) corridor into the Thessalian plain, and continuing through the mountain passes of central Greece (Thermopylae region) into the Peloponnese. Ancient DNA from Mycenaean burials shows a clear steppe ancestry component not present in earlier Neolithic Aegean populations, confirming an intrusion from the north. This migration brought Greek to the Aegean world, where it would develop into Mycenaean Greek (attested in Linear B from ~1400 BCE).",
  },
  {
    id: "tocharian-route",
    name: "Tocharian Route (Afanasievo to Tarim Basin)",
    startDate: -2500,
    endDate: -1500,
    path: [
      [50.0, 88.0], // Altai Mountains (Afanasievo core)
      [49.0, 87.0], // Southern Altai foothills
      [47.5, 86.5], // Dzungarian steppe
      [46.0, 86.0], // Dzungarian Basin
      [44.5, 85.0], // Tian Shan northern foothills
      [43.0, 84.0], // Dzungarian Gate approach
      [42.0, 83.0], // Western Tarim Basin rim
      [41.0, 82.5], // Kucha area approach (later Tocharian B)
      [40.0, 82.0], // Tarim Basin oases (later Tocharian attestation)
    ],
    color: "#F39C12",
    branch: "Proto-Tocharian",
    description:
      "The migration of Afanasievo-descended populations from the Altai Mountains southward into the Tarim Basin of western China, carrying the ancestor of the Tocharian languages. This route followed the natural corridor from the Altai through the Dzungarian Basin, skirting the northern foothills of the Tian Shan range, and entering the Tarim Basin through the Dzungarian Gate or adjacent mountain passes. The Tarim Basin mummies (Xiaohe/Small River Cemetery, c. 2000-1500 BCE) show Western Eurasian physical features and ancient DNA connections to Afanasievo/steppe populations. The Tocharian languages (A and B), attested in Buddhist manuscripts from the 5th-8th centuries CE in the Kucha and Turfan oases, represent the easternmost branch of Indo-European.",
  },
];
