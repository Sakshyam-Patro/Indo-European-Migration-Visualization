import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PathwayStep {
  date: string
  label: string
  detail: string
}

interface LanguagePathway {
  language: string
  flag: string
  region: string
  mechanism: 'mass_migration' | 'elite_dominance' | 'mixed'
  mechanismLabel: string
  summary: string
  steppeAncestry: string
  steps: PathwayStep[]
  modernSpeakers: string
}

const MECHANISM_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  mass_migration: { bg: 'rgba(231, 76, 60, 0.12)', border: 'rgba(231, 76, 60, 0.35)', text: '#E74C3C' },
  elite_dominance: { bg: 'rgba(52, 152, 219, 0.12)', border: 'rgba(52, 152, 219, 0.35)', text: '#3498DB' },
  mixed: { bg: 'rgba(243, 156, 18, 0.12)', border: 'rgba(243, 156, 18, 0.35)', text: '#F39C12' },
}

const pathways: LanguagePathway[] = [
  {
    language: 'English',
    flag: '\ud83c\uddec\ud83c\udde7',
    region: 'Britain',
    mechanism: 'mass_migration',
    mechanismLabel: 'Mass Migration',
    summary: 'Bell Beaker migrants from the continent replaced roughly 90% of Neolithic Britain\'s gene pool within a few centuries, bringing an early Indo-European language. Later, Anglo-Saxon migrants brought Germanic speech.',
    steppeAncestry: '~47% in modern Britons',
    modernSpeakers: '~1.5 billion (incl. L2)',
    steps: [
      { date: '~3000 BCE', label: 'Yamnaya expand west', detail: 'Steppe pastoralists pour into central Europe, forming the Corded Ware culture. They carry roughly 75% steppe ancestry and speak an early Indo-European language. (Haak et al. 2015)' },
      { date: '~2800 BCE', label: 'Corded Ware meets farmers', detail: 'In central Europe, Corded Ware people mix with Neolithic farmers. The resulting Bell Beaker culture retains substantial steppe ancestry and Indo-European speech.' },
      { date: '~2500 BCE', label: 'Bell Beaker crosses the Channel', detail: 'Bell Beaker people reach Britain. Ancient DNA shows they replaced about 90% of the existing Neolithic population within a few centuries. Britain becomes Indo-European-speaking. (Olalde et al. 2018)' },
      { date: '~400\u2013600 CE', label: 'Anglo-Saxons arrive', detail: 'Germanic-speaking Angles, Saxons, and Jutes migrate to Britain from what is now Denmark and northern Germany, layering a second Indo-European language (Old English) over the existing Celtic tongues.' },
      { date: 'Today', label: 'English emerges', detail: 'Through Norman French influence, Norse contact, and global colonial expansion, Old English evolves into Modern English, now spoken by roughly 1.5 billion people worldwide as a first or second language.' },
    ],
  },
  {
    language: 'Hindi',
    flag: '\ud83c\uddee\ud83c\uddf3',
    region: 'South Asia',
    mechanism: 'mass_migration',
    mechanismLabel: 'Mass Migration',
    summary: 'Steppe ancestry entered South Asia via Sintashta/Andronovo-related migrations around 2000\u20131500 BCE, after the decline of the Indus Valley Civilization. Ancient DNA confirms a substantial demographic influx, not just a small elite.',
    steppeAncestry: '~5\u201335% (varies by region and community)',
    modernSpeakers: '~600 million (incl. Urdu)',
    steps: [
      { date: '~2100 BCE', label: 'Sintashta develops on the Urals', detail: 'On the southern Urals, Corded Ware descendants develop chariot warfare and the Sintashta culture. They are likely proto-Indo-Iranian speakers. (Allentoft et al. 2015)' },
      { date: '~1800 BCE', label: 'Andronovo spreads across Central Asia', detail: 'Sintashta evolves into the Andronovo horizon, covering a vast area from the Urals to the Altai. They herd cattle, forge bronze, and build spoke-wheeled chariots.' },
      { date: '~1500 BCE', label: 'Steppe migrants enter South Asia', detail: 'Groups related to Andronovo move south through the BMAC (Bactria\u2013Margiana) region and into the Indian subcontinent. The Indus Valley Civilization has already declined. Steppe ancestry appears in the archaeological record for the first time. (Narasimhan et al. 2019)' },
      { date: '~1500\u20131200 BCE', label: 'Old Indo-Aryan takes root', detail: 'The newcomers speak Old Indo-Aryan, the earliest form of the Indo-Aryan branch. The Rigveda is composed in Vedic Sanskrit, a literary register of this language, describing a pastoral, horse-centered culture with clear steppe parallels.' },
      { date: '~600 BCE\u2013500 CE', label: 'Sanskrit and Prakrits diverge', detail: 'Old Indo-Aryan dialects split into two parallel tracks: Sanskrit becomes the refined literary and ritual language (codified by Panini ~400 BCE), while the Prakrits (everyday spoken vernaculars) evolve independently. The Prakrits are not descended from Sanskrit; both are sibling branches of Old Indo-Aryan.' },
      { date: 'Today', label: 'Hindi and its relatives', detail: 'Modern Indo-Aryan languages like Hindi, Bengali, Marathi, and Punjabi descend from the Prakrits, not from Sanskrit. Hindi-Urdu alone is spoken by roughly 600 million people, making this branch one of the most successful IE expansions.' },
    ],
  },
  {
    language: 'Greek',
    flag: '\ud83c\uddec\ud83c\uddf7',
    region: 'Aegean',
    mechanism: 'elite_dominance',
    mechanismLabel: 'Elite Dominance',
    summary: 'Mycenaean Greeks carried only ~15% steppe ancestry, yet Greek completely replaced the pre-existing Minoan language. A relatively small but socially dominant group imposed their language on the Aegean.',
    steppeAncestry: '~13\u201318% in Mycenaeans',
    modernSpeakers: '~13 million',
    steps: [
      { date: '~2500\u20132200 BCE', label: 'Steppe-descended groups enter the Balkans', detail: 'Small groups carrying steppe ancestry move southward through the Balkans toward the Aegean world. Unlike in northern Europe, they remain a minority among the local Neolithic and Minoan-related populations.' },
      { date: '~2000 BCE', label: 'Proto-Greeks reach the Aegean', detail: 'Steppe-descended groups settle in mainland Greece. Lazaridis et al. (2017) showed Mycenaeans had ~15% steppe ancestry absent in Minoans, a genetic fingerprint of the arriving Greek speakers.' },
      { date: '~1600 BCE', label: 'Mycenaean civilization rises', detail: 'The Mycenaeans build a palace civilization speaking Greek, recorded in Linear B tablets from ~1400 BCE onward. Despite being a genetic minority, their language and culture dominate the mainland.' },
      { date: '~1450\u20131100 BCE', label: 'Minoan language fades', detail: 'Minoan civilization declines after ~1450 BCE (likely linked to the Thera eruption and Mycenaean takeover of Crete). Linear A, the undeciphered Minoan script, disappears. By the end of the Bronze Age, Greek is the sole language of the Aegean.' },
      { date: 'Today', label: 'Modern Greek endures', detail: 'Greek has been spoken continuously in the Aegean for nearly 4,000 years. It is one of the oldest attested Indo-European languages, with an unbroken literary tradition from the Mycenaean tablets to the present.' },
    ],
  },
  {
    language: 'Persian',
    flag: '\ud83c\uddee\ud83c\uddf7',
    region: 'Iran',
    mechanism: 'mixed',
    mechanismLabel: 'Migration + Elite Dominance',
    summary: 'Iranian-speaking groups descended from the same Indo-Iranian expansion as Vedic speakers, but moved westward and southward into the Iranian plateau. Elamite and other local languages were gradually replaced over centuries.',
    steppeAncestry: '~15\u201325% in modern Iranians',
    modernSpeakers: '~110 million (Persian, Dari, Tajik)',
    steps: [
      { date: '~2100 BCE', label: 'Indo-Iranian unity on the steppe', detail: 'Proto-Indo-Iranian is spoken by Sintashta-related groups on the southern Urals. Iranian and Indo-Aryan have not yet split; the Rigveda and Avesta share remarkable vocabulary, mythology, and ritual terminology.' },
      { date: '~1500 BCE', label: 'Iranian speakers enter the plateau', detail: 'While one branch heads south into India, Iranian-speaking groups move westward and southward into the Iranian plateau, arriving in a region previously home to Elamite, Hurrian, and other non-IE languages.' },
      { date: '~1200\u20131000 BCE', label: 'Old Avestan composed', detail: 'The Gathas of Zarathustra are composed in Old Avestan, an archaic Iranian language so close to Vedic Sanskrit that individual hymns can be nearly mechanically transposed between the two.' },
      { date: '~550 BCE', label: 'Old Persian and the Achaemenid Empire', detail: 'Cyrus the Great founds the Achaemenid Empire in 559 BCE. Old Persian becomes the language of the largest empire the world had yet seen, spreading Iranian speech and administration across the Near East.' },
      { date: 'Today', label: 'Modern Persian (Farsi)', detail: 'Persian evolves through Middle Persian (Pahlavi) into Modern Farsi, Dari, and Tajik. Despite heavy Arabic lexical influence after the 7th-century Islamic conquest, Persian remains unmistakably Indo-European in grammar and core vocabulary.' },
    ],
  },
  {
    language: 'Spanish',
    flag: '\ud83c\uddea\ud83c\uddf8',
    region: 'Iberia',
    mechanism: 'mass_migration',
    mechanismLabel: 'Mass Migration',
    summary: 'Bell Beaker migrations brought steppe ancestry and early IE speech to Iberia. Later, Roman conquest imposed Latin, which evolved into Spanish, a second layer of IE language replacement over earlier Celtic and non-IE tongues.',
    steppeAncestry: '~20\u201330% in modern Iberians',
    modernSpeakers: '~560 million',
    steps: [
      { date: '~2500 BCE', label: 'Bell Beaker reaches Iberia', detail: 'Bell Beaker people carrying steppe ancestry arrive in the Iberian Peninsula. Unlike in Britain, the population replacement is less extreme. Significant Neolithic ancestry persists, but Indo-European speech takes hold.' },
      { date: '~1000 BCE', label: 'Celtic languages dominate the interior', detail: 'The interior of Iberia speaks Celtiberian and other Celtic languages. Coastal areas retain non-IE languages like Iberian and Tartessian. Basque, the sole pre-IE survivor, persists in the Pyrenees.' },
      { date: '~200 BCE', label: 'Roman conquest begins', detail: 'Rome conquers Iberia over two centuries of campaigning. Latin replaces both Celtic and non-IE languages through colonization, urbanization, and prestige, marking a second wave of IE language replacement on the same soil.' },
      { date: '~500\u2013700 CE', label: 'Vulgar Latin diversifies', detail: 'After the fall of Rome, Vulgar Latin in Iberia begins diverging into distinct Romance varieties. Arabic-speaking Moors rule much of the peninsula from 711 CE, contributing loanwords but not displacing Romance speech.' },
      { date: 'Today', label: 'Spanish goes global', detail: 'Castilian Spanish, carried to the Americas by colonization, becomes the world\'s second most-spoken native language. The chain from PIE to steppe migrants to Celtic to Latin to Spanish spans over 6,000 years.' },
    ],
  },
  {
    language: 'Russian',
    flag: '\ud83c\uddf7\ud83c\uddfa',
    region: 'Eastern Europe',
    mechanism: 'mass_migration',
    mechanismLabel: 'Mass Migration',
    summary: 'The Corded Ware expansion brought IE speech to the Baltic and Slavic world. Balto-Slavic languages emerged from this stock, and East Slavic eventually became Russian.',
    steppeAncestry: '~40\u201350% in modern Russians',
    modernSpeakers: '~255 million',
    steps: [
      { date: '~2900 BCE', label: 'Corded Ware expands north and east', detail: 'Yamnaya-derived Corded Ware groups spread across northern and eastern Europe. Their descendants form the ancestral population for the Balto-Slavic language branch.' },
      { date: '~1500 BCE', label: 'Balto-Slavic unity', detail: 'A Balto-Slavic proto-language is spoken across a wide area of eastern Europe. Baltic and Slavic share exclusive innovations not found in other IE branches, pointing to a period of common development.' },
      { date: '~500\u2013700 CE', label: 'Slavic expansion', detail: 'Slavic-speaking groups expand rapidly across eastern and southeastern Europe during the Migration Period. Within a few centuries, Slavic languages cover a vast territory from the Elbe River to the Dnieper and beyond.' },
      { date: '~900 CE', label: 'Old East Slavic emerges', detail: 'Kievan Rus\' is founded. Old East Slavic becomes the common language of a vast territory from Novgorod to Kyiv. The Cyrillic alphabet is adapted from Greek missionary work for Slavic use.' },
      { date: 'Today', label: 'Modern Russian', detail: 'Russian is the most widely spoken Slavic language and a lingua franca across northern Eurasia. Among all IE languages, its heartland lies geographically closest to the original PIE steppe homeland.' },
    ],
  },
  {
    language: 'Italian',
    flag: '\ud83c\uddee\ud83c\uddf9',
    region: 'Italy',
    mechanism: 'mass_migration',
    mechanismLabel: 'Mass Migration',
    summary: 'Steppe-derived groups entered Italy during the Bronze Age, bringing Italic languages that eventually included Latin. Rome\'s dominance then spread Latin across the peninsula, absorbing Etruscan and other pre-IE languages.',
    steppeAncestry: '~25\u201335% in modern Italians (higher in the north)',
    modernSpeakers: '~85 million',
    steps: [
      { date: '~2200 BCE', label: 'Bell Beaker and early Bronze Age Italy', detail: 'Bell Beaker-influenced groups carrying steppe ancestry enter the Italian peninsula from the north. Ancient DNA from Bronze Age Italy shows a clear influx of steppe-related ancestry during this period.' },
      { date: '~1200 BCE', label: 'Italic languages diversify', detail: 'Multiple Italic languages emerge across the peninsula: Latin, Oscan, Umbrian, and others. Meanwhile, non-IE languages like Etruscan and Rhaetic persist in parts of central and northern Italy.' },
      { date: '~500 BCE', label: 'Latin rises with Rome', detail: 'Latin begins as the language of a small city-state on the Tiber. As Rome expands across Italy, Latin gradually replaces Oscan, Umbrian, Etruscan, and Messapic through conquest, colonization, and cultural prestige.' },
      { date: '~200 BCE\u2013400 CE', label: 'Latin dominates the Mediterranean', detail: 'Rome\'s empire spreads Latin across western Europe, North Africa, and the Balkans. Vulgar Latin, the spoken everyday form, diverges regionally over centuries.' },
      { date: 'Today', label: 'Modern Italian', detail: 'Italian descends primarily from the Tuscan dialect of Vulgar Latin, standardized through literature (Dante, Petrarch). It preserves remarkably transparent connections to its Latin ancestor and, through it, to Proto-Indo-European.' },
    ],
  },
  {
    language: 'German',
    flag: '\ud83c\udde9\ud83c\uddea',
    region: 'Central Europe',
    mechanism: 'mass_migration',
    mechanismLabel: 'Mass Migration',
    summary: 'The Corded Ware expansion brought steppe ancestry and IE speech into central and northern Europe. Germanic languages developed in Scandinavia and the North European Plain, then spread south with migrations during the Roman and post-Roman periods.',
    steppeAncestry: '~45\u201350% in modern Germans',
    modernSpeakers: '~130 million',
    steps: [
      { date: '~2900 BCE', label: 'Corded Ware dominates northern Europe', detail: 'Yamnaya-derived Corded Ware groups establish themselves across the North European Plain and Scandinavia, bringing steppe ancestry and Indo-European speech to a region previously populated by Neolithic farmers and hunter-gatherers.' },
      { date: '~1500 BCE', label: 'Proto-Germanic begins to diverge', detail: 'In southern Scandinavia and the western Baltic, a distinct proto-Germanic language develops. Grimm\'s Law, the systematic consonant shift (p\u2192f, t\u2192\u00fe, k\u2192h), sets Germanic apart from all other IE branches.' },
      { date: '~500 BCE\u2013100 CE', label: 'Germanic tribes expand', detail: 'Germanic-speaking peoples spread south and east from Scandinavia. Roman writers (Caesar, Tacitus) describe them as distinct from the Celtic-speaking Gauls to their west.' },
      { date: '~500\u2013800 CE', label: 'Old High German emerges', detail: 'After the fall of Rome, the High German consonant shift (a second sound shift, e.g., p\u2192pf, t\u2192ts) differentiates the southern Germanic dialects that become German from the northern dialects that become English and Dutch.' },
      { date: 'Today', label: 'Modern German', detail: 'Standard German, shaped by Luther\'s Bible translation and subsequent literary tradition, is the most widely spoken native language in Europe. It retains a rich case system and compound-word morphology from its IE heritage.' },
    ],
  },
  {
    language: 'Irish',
    flag: '\ud83c\uddee\ud83c\uddea',
    region: 'Ireland',
    mechanism: 'mass_migration',
    mechanismLabel: 'Mass Migration',
    summary: 'Bell Beaker migrants brought Indo-European speech to Ireland around 2500\u20132000 BCE, with a near-total genetic replacement of the island\'s Neolithic population. The Celtic language that took root eventually became Irish Gaelic.',
    steppeAncestry: '~40\u201345% in modern Irish',
    modernSpeakers: '~1.7 million (some fluency)',
    steps: [
      { date: '~2500 BCE', label: 'Bell Beaker reaches Ireland', detail: 'Bell Beaker migrants cross from Britain to Ireland, carrying substantial steppe ancestry. Ancient DNA from Rathlin Island (~2000 BCE) shows these newcomers largely replaced the island\'s Neolithic megalith-building population. (Cassidy et al. 2016)' },
      { date: '~1200 BCE', label: 'Celtic speech takes root', detail: 'A form of Celtic develops in the British Isles. Ireland, geographically isolated, preserves archaic features. The island develops a distinctive insular Celtic culture connected to but distinct from Continental Celtic.' },
      { date: '~400 CE', label: 'Ogham and early Irish', detail: 'The oldest Irish inscriptions appear in the Ogham script, carved on standing stones. Old Irish emerges as one of the earliest attested Celtic languages, preserving archaic IE features like a dual number.' },
      { date: '~1600\u20131800 CE', label: 'English encroaches', detail: 'Under English colonial rule, Irish declines sharply. The Great Famine (1845\u20131852) devastates Irish-speaking western regions most severely, accelerating the shift to English.' },
      { date: 'Today', label: 'Irish survives and revives', detail: 'Irish is an official language of Ireland and the EU. Despite centuries of decline, revival efforts have sustained the language in Gaeltacht regions and urban communities. It remains a living link to Europe\'s Celtic past.' },
    ],
  },
  {
    language: 'Armenian',
    flag: '\ud83c\udde6\ud83c\uddf2',
    region: 'Caucasus',
    mechanism: 'mixed',
    mechanismLabel: 'Migration + Elite Dominance',
    summary: 'Armenian\'s origins are debated, but steppe-derived ancestry is present in ancient and modern Armenian populations. The language likely arrived via the Balkans or through the Caucasus, replacing earlier Hurro-Urartian languages.',
    steppeAncestry: '~15\u201325% in modern Armenians',
    modernSpeakers: '~6 million',
    steps: [
      { date: '~3000\u20132500 BCE', label: 'Steppe ancestry enters the South Caucasus', detail: 'Groups carrying Yamnaya-related ancestry appear in the South Caucasus region. The 2022 Southern Arc study (Lazaridis et al.) documented steppe admixture in Bronze Age Caucasus populations, though the exact route (via the Balkans or across the Caucasus) remains debated.' },
      { date: '~1500\u20131200 BCE', label: 'Proto-Armenian develops', detail: 'A proto-Armenian language develops in or near the Armenian Highland, in contact with Hurrian and Urartian languages. Armenian absorbs significant vocabulary from these non-IE neighbors, obscuring its IE identity for centuries.' },
      { date: '~860\u2013585 BCE', label: 'Urartu and language contact', detail: 'The Kingdom of Urartu dominates the Armenian Highland, using Urartian (a non-IE language related to Hurrian). Armenian speakers coexist with and gradually absorb the Urartian-speaking population after Urartu\'s fall.' },
      { date: '~405 CE', label: 'Armenian alphabet and literature', detail: 'Mesrop Mashtots creates the Armenian alphabet. The Bible is translated into Classical Armenian (Grabar), launching one of the world\'s oldest continuous literary traditions and preserving the language through centuries of foreign rule.' },
      { date: 'Today', label: 'Modern Armenian', detail: 'Armenian constitutes its own independent branch of the IE family tree. Long misclassified as Iranian due to heavy Persian loanwords, it was recognized as a separate branch by Heinrich H\u00fcbschmann in 1875. Its unique position makes it invaluable for IE reconstruction.' },
    ],
  },
  {
    language: 'French',
    flag: '\ud83c\uddeb\ud83c\uddf7',
    region: 'Gaul',
    mechanism: 'elite_dominance',
    mechanismLabel: 'Elite Dominance',
    summary: 'Gaul was Celtic-speaking before Roman conquest imposed Latin through urbanization, roads, and prestige. French descends from the Gallo-Romance variety of Vulgar Latin, shaped further by Frankish (Germanic) influence after the fall of Rome.',
    steppeAncestry: '~40\u201350% in modern French',
    modernSpeakers: '~320 million (incl. L2)',
    steps: [
      { date: '~2500 BCE', label: 'Bell Beaker and steppe ancestry reach France', detail: 'Bell Beaker-influenced groups carrying steppe ancestry arrive in what is now France. Ancient DNA shows substantial population turnover during the late Neolithic and early Bronze Age, introducing Indo-European speech to the region.' },
      { date: '~800 BCE', label: 'Celtic Gaul', detail: 'By the Iron Age, Gaul is overwhelmingly Celtic-speaking. The Gauls build oppida (fortified towns), mint coins, and develop a vibrant culture described by Greek and Roman observers. Gaulish is a Continental Celtic language related to Celtiberian and Lepontic.' },
      { date: '~50 BCE', label: 'Roman conquest', detail: 'Julius Caesar conquers Gaul (58\u201350 BCE). Latin is imposed through colonization, Roman roads, urban centers, and administrative prestige. Gaulish fades over the next few centuries, an IE language replacing another IE language.' },
      { date: '~400\u2013800 CE', label: 'Frankish influence', detail: 'After the fall of Rome, the Franks (a Germanic-speaking people) conquer Gaul but adopt the local Gallo-Romance speech rather than imposing their own language. However, Frankish contributes hundreds of loanwords and influences pronunciation, giving French its distinctive character among Romance languages.' },
      { date: 'Today', label: 'Modern French', detail: 'French spreads globally through colonialism and diplomacy, becoming a lingua franca of international relations. With ~320 million speakers, it is the fifth most-spoken language in the world, carrying three layers of IE heritage: steppe, Celtic, and Latin.' },
    ],
  },
  {
    language: 'Turkish',
    flag: '\ud83c\uddf9\ud83c\uddf7',
    region: 'Anatolia',
    mechanism: 'elite_dominance',
    mechanismLabel: 'Elite Dominance (reversal)',
    summary: 'Turkish is not Indo-European; it belongs to the Turkic family. But Anatolia was the home of the oldest attested IE language (Hittite). Turkish represents the dramatic reversal: a non-IE language replacing IE speech in the very region where IE was first written down.',
    steppeAncestry: 'N/A (non-IE language)',
    modernSpeakers: '~85 million',
    steps: [
      { date: '~2000 BCE', label: 'Hittite: the first written IE language', detail: 'Anatolia is home to Hittite, the oldest attested Indo-European language. The Hittites build a powerful empire and leave thousands of cuneiform tablets. Luwian and Palaic, related Anatolian IE languages, are also spoken across the region.' },
      { date: '~1200 BCE', label: 'Bronze Age collapse', detail: 'The Hittite Empire falls during the Bronze Age collapse (~1180 BCE). Successor states continue using Luwian, and Anatolia remains IE-speaking for centuries, later passing through Phrygian, Lydian, Greek, and eventually Latin (under Rome).' },
      { date: '~1071 CE', label: 'Turkic peoples enter Anatolia', detail: 'After the Battle of Manzikert (1071), Seljuk Turks begin settling Anatolia en masse. Turkic-speaking pastoralists from Central Asia gradually displace or absorb the Greek and Armenian-speaking Christian population.' },
      { date: '~1299\u20131453 CE', label: 'Ottoman Turkish rises', detail: 'The Ottoman Empire expands across Anatolia and the Balkans. Ottoman Turkish, heavily influenced by Persian and Arabic, becomes the prestige language. Greek and Armenian survive as minority languages but lose their majority status in most of Anatolia.' },
      { date: 'Today', label: 'A non-IE land that was once IE\'s cradle', detail: 'Modern Turkish replaced Indo-European languages in the very region where the oldest IE language was first recorded. This reversal shows that language spread is not a one-way process, and that no language family holds any territory permanently.' },
    ],
  },
]

export default function LanguagePathways() {
  const [selected, setSelected] = useState<string | null>(null)
  const [activeStep, setActiveStep] = useState(0)

  const pathway = pathways.find(p => p.language === selected)

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.3rem 0.8rem',
        background: 'rgba(13, 115, 119, 0.15)',
        border: '1px solid rgba(13, 115, 119, 0.3)',
        borderRadius: 20,
        marginBottom: '1rem',
        fontSize: '0.75rem',
        color: 'var(--teal-light)',
        fontFamily: 'var(--font-body)',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--teal-light)', display: 'inline-block' }} />
        Interactive
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        color: 'var(--text-bright)',
        marginBottom: '0.5rem',
      }}>
        How Did Your Language Get Here?
      </h3>
      <p style={{
        color: 'var(--text-on-dark-secondary)',
        fontSize: '1rem',
        marginBottom: '1.5rem',
      }}>
        Pick a modern language to trace its journey from the Pontic-Caspian steppe to the present day.
      </p>

      {/* Language selector buttons */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.6rem',
        marginBottom: '2rem',
      }}>
        {pathways.map(p => {
          const isActive = selected === p.language
          return (
            <button
              key={p.language}
              onClick={() => {
                setSelected(isActive ? null : p.language)
                setActiveStep(0)
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.1rem',
                borderRadius: 10,
                border: `1px solid ${isActive ? 'rgba(200, 169, 110, 0.4)' : 'rgba(200, 169, 110, 0.15)'}`,
                background: isActive ? 'rgba(200, 169, 110, 0.12)' : 'rgba(20, 24, 32, 0.5)',
                color: isActive ? 'var(--ochre-light)' : 'var(--text-on-dark-secondary)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: '1.15rem' }}>{p.flag}</span>
              {p.language}
            </button>
          )
        })}
      </div>

      {/* Pathway detail */}
      <AnimatePresence mode="wait">
        {pathway && (
          <motion.div
            key={pathway.language}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            {/* Summary card */}
            <div style={{
              padding: '1.25rem 1.5rem',
              background: 'rgba(20, 24, 32, 0.6)',
              borderRadius: 12,
              border: '1px solid rgba(200, 169, 110, 0.1)',
              marginBottom: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'flex-start',
            }}>
              <div style={{ flex: 1, minWidth: 250 }}>
                <p style={{
                  color: '#E8E2D6',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.65,
                  marginBottom: '0.75rem',
                }}>
                  {pathway.summary}
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
                  <span style={{
                    padding: '0.25rem 0.6rem',
                    borderRadius: 6,
                    background: MECHANISM_COLORS[pathway.mechanism].bg,
                    border: `1px solid ${MECHANISM_COLORS[pathway.mechanism].border}`,
                    color: MECHANISM_COLORS[pathway.mechanism].text,
                    fontWeight: 600,
                  }}>
                    {pathway.mechanismLabel}
                  </span>
                  <span style={{ color: 'var(--text-on-dark-muted)' }}>
                    Steppe DNA: <strong style={{ color: 'var(--text-on-dark)' }}>{pathway.steppeAncestry}</strong>
                  </span>
                  <span style={{ color: 'var(--text-on-dark-muted)' }}>
                    Speakers: <strong style={{ color: 'var(--text-on-dark)' }}>{pathway.modernSpeakers}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline steps */}
            <div style={{ position: 'relative', paddingLeft: 32 }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: 11,
                top: 8,
                bottom: 8,
                width: 2,
                background: 'rgba(200, 169, 110, 0.15)',
              }} />

              {/* Hint */}
              <p style={{
                fontSize: '0.8rem',
                color: 'var(--text-on-dark-muted)',
                fontFamily: 'var(--font-body)',
                marginBottom: '0.75rem',
                fontStyle: 'italic',
              }}>
                Click any step to expand it, or use the buttons below.
              </p>

              {pathway.steps.map((step, i) => {
                const isStepActive = activeStep === i
                const mechColor = MECHANISM_COLORS[pathway.mechanism].text
                return (
                  <div key={i} style={{ marginBottom: i < pathway.steps.length - 1 ? '0.5rem' : 0 }}>
                    <button
                      onClick={() => setActiveStep(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        width: '100%',
                        textAlign: 'left',
                        background: isStepActive ? 'rgba(200, 169, 110, 0.06)' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.6rem 0.6rem 0.6rem 0',
                        borderRadius: 8,
                        position: 'relative',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => { if (!isStepActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(200, 169, 110, 0.04)' }}
                      onMouseLeave={(e) => { if (!isStepActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                    >
                      {/* Dot on the timeline */}
                      <span style={{
                        position: 'absolute',
                        left: -26,
                        top: 13,
                        width: isStepActive ? 14 : 10,
                        height: isStepActive ? 14 : 10,
                        borderRadius: '50%',
                        background: isStepActive ? mechColor : 'rgba(200, 169, 110, 0.3)',
                        border: isStepActive ? `2px solid ${mechColor}44` : 'none',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                      }} />

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '0.8rem',
                            color: isStepActive ? mechColor : '#B0A898',
                            fontWeight: 600,
                            letterSpacing: '0.02em',
                            flexShrink: 0,
                          }}>
                            {step.date}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: isStepActive ? '1.1rem' : '1rem',
                            color: isStepActive ? 'var(--text-bright)' : '#D5CFC3',
                            fontWeight: isStepActive ? 600 : 400,
                            transition: 'all 0.2s ease',
                          }}>
                            {step.label}
                          </span>
                        </div>

                        <AnimatePresence>
                          {isStepActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              style={{
                                color: '#D5CFC3',
                                fontSize: '0.92rem',
                                fontFamily: 'var(--font-body)',
                                lineHeight: 1.65,
                                marginTop: '0.4rem',
                                marginBottom: 0,
                                overflow: 'hidden',
                              }}
                            >
                              {step.detail}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Step navigation */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '1.25rem',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(200, 169, 110, 0.08)',
            }}>
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                style={{
                  background: activeStep === 0 ? 'rgba(13, 115, 119, 0.05)' : 'rgba(13, 115, 119, 0.15)',
                  border: `1px solid ${activeStep === 0 ? 'rgba(13, 115, 119, 0.15)' : 'rgba(13, 115, 119, 0.4)'}`,
                  borderRadius: 8,
                  color: activeStep === 0 ? 'var(--text-on-dark-muted)' : '#E8E2D6',
                  cursor: activeStep === 0 ? 'default' : 'pointer',
                  padding: '0.5rem 1.1rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  opacity: activeStep === 0 ? 0.4 : 1,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                <span style={{ fontSize: '1rem' }}>&larr;</span> Previous
              </button>

              <span style={{
                fontSize: '0.85rem',
                color: '#B0A898',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
              }}>
                {activeStep + 1} / {pathway.steps.length}
              </span>

              <button
                onClick={() => setActiveStep(Math.min(pathway.steps.length - 1, activeStep + 1))}
                disabled={activeStep === pathway.steps.length - 1}
                style={{
                  background: activeStep === pathway.steps.length - 1 ? 'rgba(13, 115, 119, 0.05)' : 'rgba(13, 115, 119, 0.15)',
                  border: `1px solid ${activeStep === pathway.steps.length - 1 ? 'rgba(13, 115, 119, 0.15)' : 'rgba(13, 115, 119, 0.4)'}`,
                  borderRadius: 8,
                  color: activeStep === pathway.steps.length - 1 ? 'var(--text-on-dark-muted)' : '#E8E2D6',
                  cursor: activeStep === pathway.steps.length - 1 ? 'default' : 'pointer',
                  padding: '0.5rem 1.1rem',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  opacity: activeStep === pathway.steps.length - 1 ? 0.4 : 1,
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                }}
              >
                Next <span style={{ fontSize: '1rem' }}>&rarr;</span>
              </button>
            </div>

            {/* Mechanism legend */}
            <div style={{
              marginTop: '1.25rem',
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-on-dark-muted)',
            }}>
              {Object.entries(MECHANISM_COLORS).map(([key, colors]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: 2,
                    background: colors.text, display: 'inline-block',
                  }} />
                  {key === 'mass_migration' ? 'Mass Migration' : key === 'elite_dominance' ? 'Elite Dominance' : 'Mixed'}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state prompt */}
      {!selected && (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem 1rem',
          color: 'var(--text-on-dark-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
        }}>
          Select a language above to trace its 6,000-year journey from the steppe.
        </div>
      )}
    </div>
  )
}
