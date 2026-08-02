/**
 * The Indo-European family tree rendered by `components/interactive/LanguageTree`.
 *
 * ─── `period` CONVENTION (read this before editing any node) ────────────────
 *
 * `period` is a display string, but it carries ONE consistent meaning per kind
 * of node:
 *
 *   - Language (leaf) nodes — the ATTESTATION SPAN. From the earliest direct
 *     evidence for the language (inscription, manuscript, or first systematic
 *     documentation) to the date its last native speakers died, or `present`
 *     if it is still spoken natively today.
 *   - Reconstructed (proto) nodes — the inferred span linguists place the
 *     proto-stage in. Nothing is attested, so these dates are estimates.
 *   - Internal branch nodes — from the branch's inferred emergence to the end
 *     of its last surviving member (`present` if any member survives).
 *
 * Format: `~<start>-<end>` using BCE/CE, e.g. `~700 BCE-600 CE` or
 * `~1200 CE-present`. Revived languages use
 * `~<start>-<death> CE; revived from ~<date> CE`.
 *
 * `period` MUST agree with `status`:
 *   - 'extinct'  — the span NEVER ends in `present`. Continued liturgical,
 *                  literary or scholarly use after the last native speakers
 *                  belongs in `note`, not in `period`.
 *   - 'living'   — the span ALWAYS ends in `present`.
 *   - 'revived'  — the span ends at the loss of native transmission, followed
 *                  by the revival date.
 *   - 'reconstructed' — an inferred span; it never reaches `present`.
 *
 * ─── `speakers` CONVENTION ──────────────────────────────────────────────────
 *
 * A display string in which the figure and its parenthetical label MUST agree:
 *
 *   `(native)`      — L1 speakers only.
 *   `(total)`       — L1 + L2 combined.
 *   `(L1+L2)`       — where sources do not separate the two (census "can speak"
 *                     questions, for example).
 *   `(L2, revived)` — revived languages with no native transmission.
 *
 * Never label an L1+L2 total as `(native)`. Figures here are deliberately
 * conservative; where estimates are contested or vary widely by source, the
 * spread is stated in `note` and the disagreement recorded in `sources`.
 *
 * ─── SCOPE ─────────────────────────────────────────────────────────────────
 *
 * This is a CURATED tree, not a census. Indo-European has roughly 450 living
 * languages; this file charts a representative selection chosen to show the
 * shape of every branch. Counts for the UI are derived at runtime by
 * `data/treeStats.ts` — never hardcode a total in prose.
 */
export interface LanguageNode {
  name: string;
  /** See the `period` convention documented at the top of this file. */
  period?: string;
  status?: 'reconstructed' | 'extinct' | 'living' | 'revived';
  /** See the `speakers` convention documented at the top of this file. */
  speakers?: string;
  region?: string;
  note?: string;
  /**
   * Optional short citations, used where a classification, a date, or a
   * speaker figure is genuinely contested among specialists.
   */
  sources?: string[];
  children?: LanguageNode[];
}

export const languageTree: LanguageNode = {
  name: 'Proto-Indo-European',
  period: '~4500-2500 BCE',
  status: 'reconstructed',
  speakers: 'none (reconstructed)',
  region: 'Pontic-Caspian steppe',
  note: 'Reconstructed ancestor of nearly half the world\'s population\'s native languages. No written records exist; the language is inferred through the comparative method.',
  children: [
    // ── Anatolian (earliest attested branch) ──
    {
      name: 'Anatolian',
      period: '~2500-100 BCE',
      status: 'extinct',
      region: 'Anatolia (modern Turkey)',
      note: 'Earliest attested Indo-European branch; Anatolian personal names appear in Old Assyrian trade records from around 1900 BCE. Its early split led some scholars to propose the "Indo-Hittite" hypothesis, in which Anatolian separated before the rest of the family had finished forming.',
      sources: [
        'Melchert, "The Position of Anatolian" (2020), in The Cambridge Handbook of Indo-European Linguistics',
      ],
      children: [
        {
          name: 'Hittite',
          period: '~1650-1178 BCE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Central Anatolia',
          note: 'Oldest extensively attested Indo-European language, written in cuneiform. Language of the powerful Hittite Empire.',
        },
        {
          name: 'Luwian',
          period: '~1400-600 BCE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Western and southern Anatolia',
          note: 'Written in both cuneiform and Anatolian hieroglyphs. May have been more widely spoken than Hittite.',
        },
        {
          name: 'Palaic',
          period: '~1500-1300 BCE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Northern Anatolia (Paphlagonia)',
          note: 'Known only from Hittite religious texts. One of the earliest Indo-European languages to go extinct.',
        },
        {
          name: 'Lycian',
          period: '~500-200 BCE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Southwestern Anatolia (Lycia)',
          note: 'Descended from Luwian. Features a unique alphabet derived from Greek. Known from tomb inscriptions.',
        },
        {
          name: 'Lydian',
          period: '~700-200 BCE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Western Anatolia (Lydia)',
          note: 'Language of the wealthy kingdom of Croesus. Lydians are credited with inventing coinage.',
        },
        {
          name: 'Carian',
          period: '~700-300 BCE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Southwestern Anatolia (Caria)',
          note: 'Deciphered only in the 1980s, largely thanks to graffiti left by Carian mercenaries serving in Egypt. Closely related to Luwian and Lycian.',
        },
      ],
    },

    // ── Tocharian ──
    {
      name: 'Tocharian',
      period: '~500-1000 CE',
      status: 'extinct',
      region: 'Tarim Basin (modern Xinjiang, China)',
      note: 'Easternmost Indo-European branch. Its discovery in the early 1900s revolutionized understanding of IE migration: a centum language spoken thousands of kilometres east of any other.',
      children: [
        {
          name: 'Tocharian A (Agnean)',
          period: '~600-800 CE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Turfan and Karasahr (eastern Tarim Basin)',
          note: 'Primarily a literary and religious language, used in Buddhist monastic texts.',
        },
        {
          name: 'Tocharian B (Kuchean)',
          period: '~500-1000 CE',
          status: 'extinct',
          speakers: 'none (extinct)',
          region: 'Kucha (western Tarim Basin)',
          note: 'More widely attested than Tocharian A, with both religious and secular texts including business documents.',
        },
      ],
    },

    // ── Hellenic ──
    {
      name: 'Hellenic',
      period: '~2000 BCE-present',
      status: 'living',
      region: 'Greece, Cyprus, Anatolia',
      note: 'One of the longest continuously documented language families, with over 3,400 years of written records.',
      children: [
        {
          name: 'Proto-Greek',
          period: '~2000-1600 BCE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Southern Balkans',
          note: 'Ancestral to all Greek dialects. Likely arrived in Greece with migrations from the north around 2000 BCE.',
          children: [
            {
              name: 'Mycenaean Greek',
              period: '~1400-1200 BCE',
              status: 'extinct',
              speakers: 'none (extinct)',
              region: 'Peloponnese, Crete',
              note: 'Earliest attested form of Greek, written in the Linear B syllabary. Deciphered by Michael Ventris in 1952. The palace archives date from roughly 1400 to 1200 BCE.',
              children: [
                {
                  name: 'Ancient Greek',
                  period: '~800-300 BCE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Greece, western Anatolia, southern Italy, colonies',
                  note: 'A cluster of dialects rather than one language: Attic-Ionic, Doric, Aeolic and Arcadocypriot. Language of Homer, Plato and Aristotle, and the source of vast scientific and philosophical vocabulary in modern languages.',
                  children: [
                    {
                      name: 'Koine Greek',
                      period: '~300 BCE-300 CE',
                      status: 'extinct',
                      speakers: 'none (extinct)',
                      region: 'Eastern Mediterranean, Near East',
                      note: 'Lingua franca of the Hellenistic world and the Roman East, built mainly on the Attic-Ionic dialect. Language of the New Testament.',
                      children: [
                        {
                          name: 'Medieval Greek',
                          period: '~300-1453 CE',
                          status: 'extinct',
                          speakers: 'none (extinct)',
                          region: 'Byzantine Empire',
                          note: 'Language of the Byzantine Empire, bridging ancient and modern Greek.',
                          children: [
                            {
                              name: 'Modern Greek',
                              period: '~1453 CE-present',
                              status: 'living',
                              speakers: '~13.5 million (native)',
                              region: 'Greece, Cyprus',
                              note: 'Official language of Greece and Cyprus. Has both Demotic (popular) and Katharevousa (archaizing) registers.',
                            },
                            {
                              name: 'Pontic Greek',
                              period: '~1200 CE-present',
                              status: 'living',
                              speakers: '~300,000 (native)',
                              region: 'Greece, Turkey, Georgia, Russia (originally the Black Sea coast)',
                              note: 'Separated from mainstream Greek early enough to be only partly intelligible with it. Estimates range from about 200,000 to 800,000 speakers depending on whether heritage speakers in the Greek diaspora are counted; UNESCO classifies it as definitely endangered.',
                              sources: [
                                'UNESCO Atlas of the World\'s Languages in Danger (2010)',
                                'Ethnologue (27th ed., 2024), entry "Greek, Pontic"',
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: 'Doric Greek',
                      period: '~700-200 BCE',
                      status: 'extinct',
                      speakers: 'none (extinct)',
                      region: 'Peloponnese, Crete, Rhodes, Sicily, southern Italy',
                      note: 'Dialect group of Sparta, Corinth and the Dorian colonies. Displaced almost everywhere by Koine, but one descendant survived in the mountains of the eastern Peloponnese.',
                      children: [
                        {
                          name: 'Tsakonian',
                          period: '~1800 CE-present',
                          status: 'living',
                          speakers: '~2,000 (native, mostly elderly)',
                          region: 'Eastern Peloponnese (Arcadia), Greece',
                          note: 'The only living descendant of Doric rather than of Koine, which makes it the odd branch of the Greek family and not mutually intelligible with Modern Greek. Classified as severely endangered by UNESCO.',
                          sources: [
                            'UNESCO Atlas of the World\'s Languages in Danger (2010)',
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Armenian ──
    {
      name: 'Armenian',
      period: '~600 BCE-present',
      status: 'living',
      region: 'Armenian Highlands, South Caucasus',
      note: 'Long misclassified as an Iranian language until Heinrich Hubschmann demonstrated its independence in 1875; its huge stock of Iranian loanwords had disguised its own inherited vocabulary.',
      children: [
        {
          name: 'Proto-Armenian',
          period: '~600 BCE-400 CE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Armenian Highlands',
          note: 'Contains many Iranian loanwords due to centuries of contact with Median, Parthian, and Persian.',
          children: [
            {
              name: 'Classical Armenian (Grabar)',
              period: '~405-1100 CE',
              status: 'extinct',
              speakers: 'none (extinct)',
              region: 'Historic Armenia',
              note: 'Created alongside the Armenian alphabet by Mesrop Mashtots in 405 CE. No longer has native speakers, but remains in use as the liturgical language of the Armenian Apostolic Church.',
              children: [
                {
                  name: 'Eastern Armenian',
                  period: '~1700 CE-present',
                  status: 'living',
                  speakers: '~3.3 million (native)',
                  region: 'Armenia, Iran, Georgia',
                  note: 'Official language of the Republic of Armenia. Features a seven-vowel system.',
                },
                {
                  name: 'Western Armenian',
                  period: '~1700 CE-present',
                  status: 'living',
                  speakers: '~1 million (native)',
                  region: 'Diaspora (originally Ottoman Empire)',
                  note: 'Classified as definitely endangered by UNESCO. Spoken primarily in the diaspora after the Armenian genocide.',
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Albanian ──
    {
      name: 'Albanian',
      period: '~500 BCE-present',
      status: 'living',
      region: 'Western Balkans',
      note: 'Sole surviving member of its branch, and the hardest branch to place inside Indo-European. Descent from Illyrian is the traditional guess; Thracian, Dacian, or a lost Palaeo-Balkan language are all live alternatives, and no proposal commands consensus.',
      sources: [
        'Hyllested & Joseph, "Albanian" (2022), in The Indo-European Language Family: A Phylogenetic Perspective (Cambridge)',
        'Matzinger, "Der lateinisch-albanische Sprachkontakt" (2016)',
      ],
      children: [
        {
          name: 'Proto-Albanian',
          period: '~500 BCE-500 CE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Western Balkans',
          note: 'Development from PIE is heavily debated. Contains very old Latin loanwords showing early contact with Roman settlers, which helps date the branch even though its ancestry is unresolved.',
          sources: [
            'Hyllested & Joseph, "Albanian" (2022), in The Indo-European Language Family: A Phylogenetic Perspective (Cambridge)',
          ],
          children: [
            {
              name: 'Gheg Albanian',
              period: '~1400 CE-present',
              status: 'living',
              speakers: '~4.2 million (native)',
              region: 'Northern Albania, Kosovo, North Macedonia, Montenegro',
              note: 'Features nasal vowels, a trait rare among Balkan languages. Dominant dialect in Kosovo.',
            },
            {
              name: 'Tosk Albanian',
              period: '~1400 CE-present',
              status: 'living',
              speakers: '~3.4 million (native)',
              region: 'Southern Albania, Greece, Italy',
              note: 'Forms the basis of Standard Albanian. Rhotacism (n > r) distinguishes it from Gheg.',
            },
          ],
        },
      ],
    },

    // ── Celtic ──
    {
      name: 'Celtic',
      period: '~800 BCE-present',
      status: 'living',
      region: 'Western and Central Europe',
      note: 'Once spoken across a vast area from Iberia to Anatolia (Galatia). Now confined to the northwestern fringe of Europe.',
      children: [
        {
          name: 'Proto-Celtic',
          period: '~800-500 BCE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Central Europe (Hallstatt/La Tene culture)',
          note: 'Developed the characteristic loss of PIE *p, one of the most striking sound changes in Indo-European.',
          children: [
            {
              name: 'Continental Celtic',
              period: '~600 BCE-500 CE',
              status: 'extinct',
              region: 'Gaul, Iberia, northern Italy, central Europe, Anatolia',
              note: 'A geographic label rather than a proven genetic subgroup: all it certainly means is "Celtic outside the British Isles". Every language in it is extinct, and all are known primarily from inscriptions and place names.',
              sources: [
                'Eska, "Continental Celtic" (2008), in The Ancient Languages of Europe (Cambridge)',
              ],
              children: [
                {
                  name: 'Lepontic',
                  period: '~550-100 BCE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Cisalpine Gaul (the Italian lakes, around Lugano and Como)',
                  note: 'Earliest attested Celtic language of all, written in a north Italic alphabet borrowed from Etruscan. Its inscriptions predate the first Gaulish texts by centuries.',
                },
                {
                  name: 'Gaulish',
                  period: '~300 BCE-500 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Gaul (modern France, Belgium, northern Italy)',
                  note: 'Most extensively attested Continental Celtic language. Several hundred inscriptions survive, including the Coligny calendar.',
                },
                {
                  name: 'Celtiberian',
                  period: '~200 BCE-100 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Central Iberia (modern Spain)',
                  note: 'Written in a modified Iberian script. Known from the Botorrita bronze plaques.',
                },
                {
                  name: 'Galatian',
                  period: '~300 BCE-400 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Central Anatolia (modern Turkey)',
                  note: 'Brought to Asia Minor by Celtic tribes in the 3rd century BCE. St. Jerome reported it was still spoken in the 4th century CE.',
                },
              ],
            },
            {
              name: 'Goidelic (Q-Celtic)',
              period: '~400 CE-present',
              status: 'living',
              region: 'Ireland, Scotland, Isle of Man',
              note: 'Retained the PIE *kw as /k/ (written "c" or "q"), unlike the Brythonic languages which shifted it to /p/.',
              children: [
                {
                  name: 'Irish (Gaeilge)',
                  period: '~400 CE-present',
                  status: 'living',
                  speakers: '~1.9 million (L1+L2), ~70,000 (daily native use)',
                  region: 'Ireland',
                  note: 'First official language of the Republic of Ireland. The large figure is the census question "can you speak Irish?"; daily use outside the education system is far smaller. Ogham inscriptions are the earliest Irish texts (~4th century).',
                  sources: [
                    'Central Statistics Office Ireland, Census 2022 Profile 8',
                    'NISRA, Northern Ireland Census 2021',
                  ],
                },
                {
                  name: 'Scottish Gaelic (Gaidhlig)',
                  period: '~1000 CE-present',
                  status: 'living',
                  speakers: '~57,000 (L1+L2)',
                  region: 'Scotland (Highlands and Islands)',
                  note: 'Classified as definitely endangered by UNESCO. Historically the dominant language of the Scottish Highlands.',
                  sources: [
                    'National Records of Scotland, Scotland\'s Census 2011 and 2022',
                  ],
                },
                {
                  name: 'Manx (Gaelg)',
                  period: '~1400-1974 CE; revived from ~1970s CE',
                  status: 'revived',
                  speakers: '~2,200 (L2, revived)',
                  region: 'Isle of Man',
                  note: 'Native transmission ended with Ned Maddrell, who died in 1974. Revival began before his death and succeeded: Manx is now taught in Isle of Man schools and there are again children raised in it.',
                },
              ],
            },
            {
              name: 'Brythonic (P-Celtic)',
              period: '~500 CE-present',
              status: 'living',
              region: 'Wales, Brittany, Cornwall',
              note: 'Shifted PIE *kw to /p/. Once spoken across most of Britain south of the Forth-Clyde line.',
              children: [
                {
                  name: 'Welsh (Cymraeg)',
                  period: '~600 CE-present',
                  status: 'living',
                  speakers: '~540,000 (L1+L2, 2021 census)',
                  region: 'Wales',
                  note: 'Most vital Celtic language today, with official status in Wales alongside English. Survey-based estimates run higher (around 880,000 claiming some ability); the census figure is the conservative one. Features initial consonant mutation.',
                  sources: [
                    'Office for National Statistics, Census 2021 (Wales)',
                    'Welsh Government / ONS Annual Population Survey',
                  ],
                },
                {
                  name: 'Breton (Brezhoneg)',
                  period: '~600 CE-present',
                  status: 'living',
                  speakers: '~210,000 (L1+L2)',
                  region: 'Brittany (northwestern France)',
                  note: 'Only Celtic language spoken on the European continent today. Brought to Brittany by migrants from Britain in the 5th-6th centuries. Speaker numbers have fallen by roughly 80 per cent since 1950.',
                },
                {
                  name: 'Cornish (Kernewek)',
                  period: '~800-1777 CE; revived from ~1904 CE',
                  status: 'revived',
                  speakers: '~600 (fluent L2, revived)',
                  region: 'Cornwall, England',
                  note: 'Traditional transmission ended in the late 18th century; Dolly Pentreath, who died in 1777, is the speaker usually named as the last. Revived from the manuscripts by Henry Jenner and successors. Several thousand more people claim some ability beyond the few hundred fluent speakers.',
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Italic ──
    {
      name: 'Italic',
      period: '~1000 BCE-present',
      status: 'living',
      region: 'Italian Peninsula, later worldwide',
      note: 'Through Latin and its Romance descendants, this is one of the most widely spoken branches of Indo-European.',
      children: [
        {
          name: 'Proto-Italic',
          period: '~1000-700 BCE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Italian Peninsula',
          note: 'Ancestor of both Latin and the Osco-Umbrian languages. Likely arrived in Italy around 1000 BCE.',
          children: [
            {
              name: 'Osco-Umbrian (Sabellic)',
              period: '~600 BCE-100 CE',
              status: 'extinct',
              region: 'Central and southern Italy',
              note: 'Sister branch to Latin. Differed notably in treating PIE *kw as /p/ rather than Latin\'s /kw/.',
              children: [
                {
                  name: 'Oscan',
                  period: '~500-100 BCE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Southern Italy (Campania, Samnium)',
                  note: 'Widely spoken in pre-Roman southern Italy. Written in a native alphabet derived from Etruscan. Graffiti at Pompeii show it still in use when Vesuvius erupted.',
                },
                {
                  name: 'Umbrian',
                  period: '~400-100 BCE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Umbria (central Italy)',
                  note: 'Known primarily from the Iguvine Tablets, a set of seven bronze tablets detailing religious rituals.',
                },
              ],
            },
            {
              name: 'Faliscan',
              period: '~700-150 BCE',
              status: 'extinct',
              speakers: 'none (extinct)',
              region: 'Falerii, southern Etruria (north of Rome)',
              note: 'Closest known relative of Latin, forming the Latino-Faliscan subgroup with it. Absorbed by Latin after Rome destroyed Falerii Veteres in 241 BCE.',
            },
            {
              name: 'Latin',
              period: '~700 BCE-600 CE',
              status: 'extinct',
              region: 'Latium, later Roman Empire',
              note: 'Originally a small regional dialect; Roman expansion spread it across Europe, North Africa and the Near East. It has had no native speakers since its spoken form diverged into the Romance languages around the 6th-9th centuries, but it continued as a written, scholarly and liturgical language, and survives today through its Romance descendants.',
              children: [
                {
                  name: 'Vulgar Latin',
                  period: '~200 BCE-800 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Roman Empire',
                  note: 'Spoken Latin of ordinary people, as opposed to literary Classical Latin. Direct ancestor of all Romance languages; it did not die so much as fragment into them.',
                  children: [
                    {
                      name: 'Spanish (Espanol)',
                      period: '~900 CE-present',
                      status: 'living',
                      speakers: '~485 million (native), ~560 million (total)',
                      region: 'Spain, Latin America, USA',
                      note: 'Second most spoken language in the world by native speakers. Features Arabic influence from centuries of Muslim rule in Iberia.',
                      sources: [
                        'Ethnologue (27th ed., 2024)',
                        'Instituto Cervantes, El espanol en el mundo (2023)',
                      ],
                    },
                    {
                      name: 'Portuguese (Portugues)',
                      period: '~900 CE-present',
                      status: 'living',
                      speakers: '~236 million (native), ~265 million (total)',
                      region: 'Portugal, Brazil, Angola, Mozambique',
                      note: 'Most spoken language in the Southern Hemisphere (via Brazil). Features nasal vowels unusual among Romance languages.',
                      sources: ['Ethnologue (27th ed., 2024)'],
                    },
                    {
                      name: 'French (Francais)',
                      period: '~900 CE-present',
                      status: 'living',
                      speakers: '~75 million (native), ~310 million (total)',
                      region: 'France, Belgium, Switzerland, Canada, West Africa',
                      note: 'Historically the international language of diplomacy, and the Indo-European language with the widest gap between native and total speakers thanks to West and Central Africa. Significant Frankish (Germanic) influence on pronunciation and vocabulary.',
                      sources: ['Ethnologue (27th ed., 2024)'],
                    },
                    {
                      name: 'Italian (Italiano)',
                      period: '~900 CE-present',
                      status: 'living',
                      speakers: '~65 million (native)',
                      region: 'Italy, Switzerland, San Marino',
                      note: 'Closest major Romance language to Latin. Standardized largely on the Tuscan dialect of Dante and Petrarch.',
                    },
                    {
                      name: 'Romanian (Romana)',
                      period: '~1500 CE-present',
                      status: 'living',
                      speakers: '~24 million (native)',
                      region: 'Romania, Moldova',
                      note: 'Only major Romance language in Eastern Europe, and the last to be written down: the earliest surviving Romanian text dates from 1521. Retains a case system and the postposed definite article, unique among Romance.',
                    },
                    {
                      name: 'Catalan (Catala)',
                      period: '~900 CE-present',
                      status: 'living',
                      speakers: '~4.1 million (native), ~9 million (total)',
                      region: 'Catalonia, Valencia, Balearic Islands, Andorra',
                      note: 'Official language of Andorra. Has a rich medieval literary tradition dating back to the 12th century.',
                    },
                    {
                      name: 'Galician (Galego)',
                      period: '~1200 CE-present',
                      status: 'living',
                      speakers: '~2.4 million (native)',
                      region: 'Galicia (northwestern Spain)',
                      note: 'Shares an ancestor with Portuguese in medieval Galician-Portuguese, the prestige language of lyric poetry across Iberia in the 13th century.',
                    },
                    {
                      name: 'Sardinian (Sardu)',
                      period: '~1100 CE-present',
                      status: 'living',
                      speakers: '~1 million (native)',
                      region: 'Sardinia (Italy)',
                      note: 'The most conservative Romance language, keeping Latin sounds that everywhere else shifted. Classified as definitely endangered by UNESCO.',
                      sources: ['UNESCO Atlas of the World\'s Languages in Danger (2010)'],
                    },
                    {
                      name: 'Occitan',
                      period: '~1000 CE-present',
                      status: 'living',
                      speakers: '~200,000 (native)',
                      region: 'Southern France, Val d\'Aran (Spain), Occitan Valleys (Italy)',
                      note: 'Language of the medieval troubadours, once the literary standard of southern Europe. Now severely endangered, with most remaining speakers elderly.',
                      sources: ['UNESCO Atlas of the World\'s Languages in Danger (2010)'],
                    },
                    {
                      name: 'Romansh (Rumantsch)',
                      period: '~1500 CE-present',
                      status: 'living',
                      speakers: '~40,000 (native)',
                      region: 'Graubunden (Switzerland)',
                      note: 'One of the four national languages of Switzerland despite its small speaker base. Descends from the Latin of the Roman province of Raetia.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Germanic ──
    {
      name: 'Germanic',
      period: '~500 BCE-present',
      status: 'living',
      region: 'Northern Europe, later worldwide',
      note: 'Defined by Grimm\'s Law (the First Germanic Sound Shift), which systematically changed PIE stop consonants.',
      children: [
        {
          name: 'Proto-Germanic',
          period: '~500 BCE-200 CE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Southern Scandinavia, northern Germany',
          note: 'Developed a strong stress accent on the first syllable, leading to reduction of unstressed syllables in daughter languages.',
          children: [
            {
              name: 'East Germanic',
              period: '~200-900 CE',
              status: 'extinct',
              region: 'Eastern Europe, later Mediterranean',
              note: 'All East Germanic languages are extinct. Gothic is by far the best attested; a relict variety, Crimean Gothic, was still being recorded in the Crimea in the 16th century.',
              children: [
                {
                  name: 'Gothic',
                  period: '~350-800 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Eastern Europe, Iberia, Italy',
                  note: 'Earliest extensively attested Germanic language, via Wulfila\'s 4th-century Bible translation. Invaluable for comparative linguistics because it predates the other branches by centuries.',
                },
              ],
            },
            {
              name: 'North Germanic (Scandinavian)',
              period: '~200 CE-present',
              status: 'living',
              region: 'Scandinavia, Iceland, Faroe Islands',
              note: 'Attested first in runic inscriptions from the 2nd century CE, then continuously through Old Norse and its descendants.',
              children: [
                {
                  name: 'Old Norse',
                  period: '~800-1300 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Scandinavia, Iceland, Viking settlements from Greenland to Kyiv',
                  note: 'Language of the Vikings and of the Icelandic sagas. Its contact with Old English left English with everyday words such as "they", "sky", "egg" and "window".',
                  children: [
                    {
                      name: 'Swedish (Svenska)',
                      period: '~1200 CE-present',
                      status: 'living',
                      speakers: '~10 million (native)',
                      region: 'Sweden, Finland',
                      note: 'Most widely spoken North Germanic language. Has a distinctive pitch accent system.',
                    },
                    {
                      name: 'Norwegian (Norsk)',
                      period: '~1200 CE-present',
                      status: 'living',
                      speakers: '~5.3 million (native)',
                      region: 'Norway',
                      note: 'Unique among European languages in having two official written standards: Bokmal and Nynorsk.',
                    },
                    {
                      name: 'Danish (Dansk)',
                      period: '~1200 CE-present',
                      status: 'living',
                      speakers: '~5.5 million (native)',
                      region: 'Denmark, Greenland, Faroe Islands',
                      note: 'Underwent dramatic sound changes making spoken Danish famously difficult for other Scandinavians to understand.',
                    },
                    {
                      name: 'Icelandic (Islenska)',
                      period: '~1200 CE-present',
                      status: 'living',
                      speakers: '~350,000 (native)',
                      region: 'Iceland',
                      note: 'Most conservative North Germanic language. Modern Icelanders can still read the medieval sagas with relatively little difficulty.',
                    },
                    {
                      name: 'Faroese (Foroyskt)',
                      period: '~1300 CE-present',
                      status: 'living',
                      speakers: '~72,000 (native)',
                      region: 'Faroe Islands, Denmark',
                      note: 'Closely related to Icelandic but with significant Danish influence. Standardized writing system established in 1854.',
                    },
                  ],
                },
              ],
            },
            {
              name: 'West Germanic',
              period: '~200 CE-present',
              status: 'living',
              region: 'Western and Central Europe, later worldwide',
              note: 'Most widely spoken Germanic sub-branch, including the global lingua franca English.',
              children: [
                {
                  name: 'English',
                  period: '~700 CE-present',
                  status: 'living',
                  speakers: '~380 million (native), ~1.5 billion (total)',
                  region: 'Worldwide',
                  note: 'Anglo-Saxon settlement began around 450 CE but the earliest substantial manuscripts date from the 8th century. Has an unusually large vocabulary, heavily influenced by Old Norse, Norman French, Latin and Greek.',
                  sources: ['Ethnologue (27th ed., 2024)'],
                },
                {
                  name: 'Scots',
                  period: '~1375 CE-present',
                  status: 'living',
                  speakers: '~1.5 million (L1+L2)',
                  region: 'Lowland Scotland, Ulster',
                  note: 'A sister of English descended from Northumbrian Old English, not a dialect of it, though the boundary is politically contested. Barbour\'s Brus (1375) is the first major literary text.',
                  sources: [
                    'National Records of Scotland, Scotland\'s Census 2011 and 2022',
                  ],
                },
                {
                  name: 'German (Deutsch)',
                  period: '~750 CE-present',
                  status: 'living',
                  speakers: '~95 million (native), ~135 million (total)',
                  region: 'Germany, Austria, Switzerland',
                  note: 'Underwent the High German consonant shift separating it from other West Germanic languages. Retains three grammatical genders and four cases.',
                  sources: ['Ethnologue (27th ed., 2024)'],
                },
                {
                  name: 'Low German (Plattdeutsch)',
                  period: '~800 CE-present',
                  status: 'living',
                  speakers: '~2 million (native)',
                  region: 'Northern Germany, eastern Netherlands',
                  note: 'Did not undergo the High German consonant shift, which is why it sounds closer to Dutch and English than to standard German. Was the lingua franca of the Hanseatic League; now classified as vulnerable.',
                  sources: ['UNESCO Atlas of the World\'s Languages in Danger (2010)'],
                },
                {
                  name: 'Dutch (Nederlands)',
                  period: '~1150 CE-present',
                  status: 'living',
                  speakers: '~24 million (native)',
                  region: 'Netherlands, Belgium (Flanders), Suriname',
                  note: 'Linguistically between English and German. Seventeenth-century Dutch settler dialects in the Cape gave rise to Afrikaans, which is shown here as a sister rather than a daughter of modern Dutch.',
                },
                {
                  name: 'Afrikaans',
                  period: '~1700 CE-present',
                  status: 'living',
                  speakers: '~7.2 million (native)',
                  region: 'South Africa, Namibia',
                  note: 'Developed from the Dutch of 17th-century settlers in contact with Khoekhoe, Malay and Portuguese creole. Has undergone dramatic grammatical simplification: it has lost verb conjugation and grammatical gender almost entirely.',
                },
                {
                  name: 'Frisian',
                  period: '~1200 CE-present',
                  status: 'living',
                  speakers: '~470,000 (native)',
                  region: 'Netherlands (Friesland), Germany',
                  note: 'Closest living relative to English. The old saying "bread, butter, and green cheese" sounds nearly identical in both.',
                },
                {
                  name: 'Luxembourgish (Letzebuergesch)',
                  period: '~1800 CE-present',
                  status: 'living',
                  speakers: '~400,000 (native)',
                  region: 'Luxembourg, neighbouring Belgium, France and Germany',
                  note: 'A Moselle Franconian variety that became a national language in 1984. Written Luxembourgish only develops from the early 19th century.',
                },
                {
                  name: 'Yiddish',
                  period: '~1250 CE-present',
                  status: 'living',
                  speakers: '~600,000 (native)',
                  region: 'Worldwide (diaspora)',
                  note: 'Germanic language written in Hebrew script with significant Hebrew, Aramaic and Slavic vocabulary. Its speaker base collapsed in the Holocaust; it now grows again mainly in Haredi communities.',
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Balto-Slavic ──
    {
      name: 'Balto-Slavic',
      period: '~1500 BCE-present',
      status: 'living',
      region: 'Eastern Europe, Northern Asia',
      note: 'Baltic and Slavic share deep innovations in accentuation and case endings. Whether that means a real Proto-Balto-Slavic node, or an early dialect continuum that stayed in contact, is one of the oldest open questions in the field.',
      sources: [
        'Olander, Proto-Indo-European Accent and Ablaut (2009)',
        'Kortlandt, "Baltic and Slavic" (2009), in Baltica & Balto-Slavica',
        'Petit, "Balto-Slavic" (2022), in The Indo-European Language Family (Cambridge)',
      ],
      children: [
        {
          name: 'Proto-Balto-Slavic',
          period: '~1500-1000 BCE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Northeastern Europe',
          note: 'Most specialists now accept a common Balto-Slavic stage, but a minority still argue the similarities are the result of prolonged contact between neighbouring branches rather than shared descent.',
          sources: [
            'Kortlandt, "Baltic and Slavic" (2009), in Baltica & Balto-Slavica',
          ],
          children: [
            {
              name: 'Baltic',
              period: '~1000 BCE-present',
              status: 'living',
              region: 'Eastern coast of the Baltic Sea',
              note: 'Baltic languages are remarkably archaic, preserving many features lost elsewhere. The traditional split into East and West Baltic is itself disputed.',
              sources: [
                'Petit, "Balto-Slavic" (2022), in The Indo-European Language Family (Cambridge)',
              ],
              children: [
                {
                  name: 'Lithuanian (Lietuviu)',
                  period: '~1500 CE-present',
                  status: 'living',
                  speakers: '~2.8 million (native)',
                  region: 'Lithuania',
                  note: 'Often called the most archaic living Indo-European language. Retains features reminiscent of Sanskrit and Ancient Greek, though it is first written down only in 1503.',
                },
                {
                  name: 'Latvian (Latviesu)',
                  period: '~1500 CE-present',
                  status: 'living',
                  speakers: '~1.5 million (native)',
                  region: 'Latvia',
                  note: 'More innovative than Lithuanian, having lost some archaic features. Features a distinctive tonal accent system.',
                },
                {
                  name: 'Old Prussian',
                  period: '~1350-1700 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Prussia (modern Kaliningrad Oblast, northeastern Poland)',
                  note: 'The only West Baltic language with real texts. Went extinct in the early 18th century as speakers were Germanized. Known from catechism translations and the Elbing vocabulary.',
                },
              ],
            },
            {
              name: 'Slavic',
              period: '~500 BCE-present',
              status: 'living',
              region: 'Eastern Europe, Balkans, Central Asia, Northern Asia',
              note: 'Rapidly diversified after the Slavic expansion of the 6th-7th centuries CE. Over 300 million native speakers today.',
              children: [
                {
                  name: 'Proto-Slavic',
                  period: '~500 BCE-500 CE',
                  status: 'reconstructed',
                  speakers: 'none (reconstructed)',
                  region: 'Northeastern Europe',
                  note: 'Remained relatively uniform until about 600 CE, allowing mutual intelligibility among early Slavic peoples.',
                  children: [
                    {
                      name: 'East Slavic',
                      period: '~900 CE-present',
                      status: 'living',
                      region: 'Russia, Ukraine, Belarus',
                      note: 'Descends from Old East Slavic (the language of Kievan Rus). Largest Slavic sub-group by speaker count.',
                      children: [
                        {
                          name: 'Russian (Russkiy)',
                          period: '~1300 CE-present',
                          status: 'living',
                          speakers: '~150 million (native), ~255 million (total)',
                          region: 'Russia, Central Asia, Eastern Europe',
                          note: 'Most widely spoken Slavic language. Has a rich literary tradition including Tolstoy, Dostoevsky, and Chekhov.',
                          sources: ['Ethnologue (27th ed., 2024)'],
                        },
                        {
                          name: 'Ukrainian (Ukrainska)',
                          period: '~1300 CE-present',
                          status: 'living',
                          speakers: '~33 million (native)',
                          region: 'Ukraine',
                          note: 'Second most spoken Slavic language. Features phonemic vowel contrasts absent in Russian.',
                        },
                        {
                          name: 'Belarusian (Belaruskaya)',
                          period: '~1300 CE-present',
                          status: 'living',
                          speakers: '~5 million (native)',
                          region: 'Belarus',
                          note: 'Classified as vulnerable by UNESCO despite being an official language: far more people name it as their native language than use it daily. Shares features with both Russian and Ukrainian.',
                          sources: ['UNESCO Atlas of the World\'s Languages in Danger (2010)'],
                        },
                      ],
                    },
                    {
                      name: 'West Slavic',
                      period: '~900 CE-present',
                      status: 'living',
                      region: 'Central Europe (Poland, Czech Republic, Slovakia)',
                      note: 'Distinguished from other Slavic branches by fixed stress (in Polish, on the penultimate syllable).',
                      children: [
                        {
                          name: 'Polish (Polski)',
                          period: '~1000 CE-present',
                          status: 'living',
                          speakers: '~40 million (native)',
                          region: 'Poland, diaspora',
                          note: 'Largest West Slavic language. Retains nasal vowels inherited from Proto-Slavic, unique among modern Slavic languages.',
                        },
                        {
                          name: 'Czech (Cestina)',
                          period: '~1000 CE-present',
                          status: 'living',
                          speakers: '~10.5 million (native)',
                          region: 'Czech Republic',
                          note: 'Features the rare raised alveolar trill written "r" with a hacek, found in almost no other language. Jan Hus reformed its orthography.',
                        },
                        {
                          name: 'Slovak (Slovencina)',
                          period: '~1000 CE-present',
                          status: 'living',
                          speakers: '~5.2 million (native)',
                          region: 'Slovakia',
                          note: 'Highly mutually intelligible with Czech. Codified in the 19th century based on central Slovak dialects.',
                        },
                        {
                          name: 'Kashubian (Kaszebsczi)',
                          period: '~1400 CE-present',
                          status: 'living',
                          speakers: '~87,000 (native)',
                          region: 'Pomerania (northern Poland)',
                          note: 'Closest living relative of the extinct Polabian, and the last survivor of the Pomeranian group. Recognized as a regional language in Poland since 2005.',
                        },
                        {
                          name: 'Polabian',
                          period: '~1700-1756 CE',
                          status: 'extinct',
                          speakers: 'none (extinct)',
                          region: 'Lower Elbe (northeastern Germany)',
                          note: 'Westernmost Slavic language, spoken around Luneburg until the 18th century. Recorded only at the very end, by an amateur who wrote down his grandmother\'s speech.',
                        },
                        {
                          name: 'Sorbian',
                          period: '~1500 CE-present',
                          status: 'living',
                          speakers: '~30,000 (L1+L2)',
                          region: 'Eastern Germany (Lusatia)',
                          note: 'Smallest surviving West Slavic language, with Upper and Lower varieties. Lower Sorbian is severely endangered; Upper Sorbian is still transmitted in Catholic villages.',
                          sources: ['UNESCO Atlas of the World\'s Languages in Danger (2010)'],
                        },
                      ],
                    },
                    {
                      name: 'South Slavic',
                      period: '~860 CE-present',
                      status: 'living',
                      region: 'Balkans',
                      note: 'Geographically cut off from the rest of Slavic by the Hungarian and Romanian-speaking lands. The first literary Slavic language was written in a South Slavic dialect from around Thessaloniki.',
                      children: [
                        {
                          name: 'Old Church Slavonic',
                          period: '~860-1100 CE',
                          status: 'extinct',
                          speakers: 'none (extinct)',
                          region: 'Great Moravia, Bulgaria, the Orthodox Slavic world',
                          note: 'First written Slavic language, created by Cyril and Methodius in the 860s along with the Glagolitic alphabet. It has had no native speakers for a thousand years but continues in Orthodox liturgy as Church Slavonic.',
                        },
                        {
                          name: 'Serbian (Srpski)',
                          period: '~1100 CE-present',
                          status: 'living',
                          speakers: '~8 million (native)',
                          region: 'Serbia, Bosnia and Herzegovina, Montenegro',
                          note: 'Can be written in both Cyrillic and Latin scripts, the only European standard language to officially use both.',
                        },
                        {
                          name: 'Croatian (Hrvatski)',
                          period: '~1100 CE-present',
                          status: 'living',
                          speakers: '~5.5 million (native)',
                          region: 'Croatia, Bosnia and Herzegovina',
                          note: 'Mutually intelligible with Serbian, Bosnian and Montenegrin; linguists usually treat the four as standard varieties of one pluricentric language, formerly called Serbo-Croatian.',
                        },
                        {
                          name: 'Bulgarian (Bulgarski)',
                          period: '~900 CE-present',
                          status: 'living',
                          speakers: '~6 million (native)',
                          region: 'Bulgaria',
                          note: 'Lost the case system found in other Slavic languages and developed a postposed definite article, similar to Romanian.',
                        },
                        {
                          name: 'Slovenian (Slovenscina)',
                          period: '~1000 CE-present',
                          status: 'living',
                          speakers: '~2.5 million (native)',
                          region: 'Slovenia',
                          note: 'Preserves the dual grammatical number (alongside singular and plural), a rarity among modern Slavic languages.',
                        },
                        {
                          name: 'Macedonian (Makedonski)',
                          period: '~1900 CE-present',
                          status: 'living',
                          speakers: '~1.4 million (native)',
                          region: 'North Macedonia',
                          note: 'Most recently codified Slavic language: standardized in 1945, though written in the vernacular well before that. Shares the postposed definite article with Bulgarian.',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    // ── Indo-Iranian ──
    {
      name: 'Indo-Iranian',
      period: '~2000 BCE-present',
      status: 'living',
      region: 'South Asia, Central Asia, Iran, Kurdistan',
      note: 'Largest branch of Indo-European by number of speakers (over 1.5 billion). Its speakers called themselves *arya-, which is why 19th-century scholars used "Aryan" for the branch.',
      children: [
        {
          name: 'Proto-Indo-Iranian',
          period: '~2000-1500 BCE',
          status: 'reconstructed',
          speakers: 'none (reconstructed)',
          region: 'Central Asian steppes (Sintashta-Andronovo culture)',
          note: 'Merged PIE *a, *e, *o into a single vowel *a, a defining shared innovation of the branch.',
          children: [
            {
              name: 'Indo-Aryan',
              period: '~1500 BCE-present',
              status: 'living',
              region: 'South Asia',
              note: 'Largest sub-branch of Indo-European by speakers. Includes some of the world\'s most spoken languages.',
              children: [
                {
                  name: 'Old Indo-Aryan',
                  period: '~1500-600 BCE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Northwestern Indian subcontinent',
                  note: 'The earliest stage of Indo-Aryan, known from the Vedic corpus. It was already dialectally varied: Sanskrit is the standardized literary register that was fixed out of it, while the ordinary spoken dialects went on to become the Prakrits. That is why the two appear here as sisters rather than as a chain.',
                  sources: [
                    'Masica, The Indo-Aryan Languages (1991)',
                    'Cardona & Jain (eds.), The Indo-Aryan Languages (2003)',
                  ],
                  children: [
                    {
                      name: 'Sanskrit',
                      period: '~1500 BCE-1100 CE',
                      status: 'extinct',
                      speakers: '~25,000 (claimed L1, disputed)',
                      region: 'Indian subcontinent',
                      note: 'Sacred language of Hinduism, and the standardized literary form of Old Indo-Aryan rather than the ancestor of the modern languages. Panini\'s grammar (~400 BCE) is one of the greatest intellectual achievements of the ancient world. It has had no ordinary native-speaking community for centuries, though it continues in liturgy and scholarship; the census figure is widely regarded as aspirational.',
                      sources: [
                        'Census of India 2011, Language Atlas',
                        'Masica, The Indo-Aryan Languages (1991)',
                      ],
                    },
                    {
                      name: 'Middle Indo-Aryan (Prakrits)',
                      period: '~600 BCE-1000 CE',
                      status: 'extinct',
                      speakers: 'none (extinct)',
                      region: 'Indian subcontinent',
                      note: 'The everyday vernaculars of the Middle Indo-Aryan period, descended from Old Indo-Aryan dialects alongside Sanskrit rather than from Sanskrit itself. Some Prakrit forms preserve Vedic features that Classical Sanskrit had already lost. The modern Indo-Aryan languages descend from this line, most of them through the late stage known as Apabhramsa.',
                      sources: [
                        'Masica, The Indo-Aryan Languages (1991)',
                      ],
                      children: [
                        {
                          name: 'Pali',
                          period: '~250 BCE-500 CE',
                          status: 'extinct',
                          speakers: 'none (extinct)',
                          region: 'Indian subcontinent, Sri Lanka, Southeast Asia',
                          note: 'The best-known Prakrit, and the canonical language of Theravada Buddhism. Still chanted and studied across Sri Lanka, Myanmar and Thailand, but with no native speakers.',
                        },
                        {
                          name: 'Hindi (Hindi)',
                          period: '~1400 CE-present',
                          status: 'living',
                          speakers: '~345 million (native), ~610 million (total)',
                          region: 'Northern and Central India',
                          note: 'Largest Indo-European language by total speakers. Written in Devanagari script. As spoken, it is largely the same language as Urdu.',
                          sources: [
                            'Ethnologue (27th ed., 2024)',
                            'Census of India 2011, Language Atlas',
                          ],
                        },
                        {
                          name: 'Bengali (Bangla)',
                          period: '~1000 CE-present',
                          status: 'living',
                          speakers: '~235 million (native), ~275 million (total)',
                          region: 'Bangladesh, West Bengal (India)',
                          note: 'Among the five most spoken languages globally. Has a rich literary tradition; Rabindranath Tagore won the Nobel Prize in Literature in 1913.',
                          sources: ['Ethnologue (27th ed., 2024)'],
                        },
                        {
                          name: 'Punjabi (Panjabi)',
                          period: '~1100 CE-present',
                          status: 'living',
                          speakers: '~113 million (native)',
                          region: 'Punjab (Pakistan and India)',
                          note: 'Among the ten most spoken languages in the world, and tonal, which is unusual for Indo-European. The figure aggregates Eastern Punjabi with the Western (Lahnda) varieties of Pakistan, which some classifications count separately.',
                          sources: ['Ethnologue (27th ed., 2024)'],
                        },
                        {
                          name: 'Marathi',
                          period: '~1000 CE-present',
                          status: 'living',
                          speakers: '~83 million (native)',
                          region: 'Maharashtra (India)',
                          note: 'Third most spoken language in India. Has a literary tradition dating to the 13th century.',
                          sources: ['Census of India 2011, Language Atlas'],
                        },
                        {
                          name: 'Urdu',
                          period: '~1200 CE-present',
                          status: 'living',
                          speakers: '~70 million (native), ~230 million (total)',
                          region: 'Pakistan, India',
                          note: 'National language of Pakistan. Essentially the same spoken language as Hindi, but written in Perso-Arabic script and drawing its learned vocabulary from Persian and Arabic rather than Sanskrit.',
                          sources: ['Ethnologue (27th ed., 2024)'],
                        },
                        {
                          name: 'Gujarati',
                          period: '~1100 CE-present',
                          status: 'living',
                          speakers: '~57 million (native)',
                          region: 'Gujarat (India)',
                          note: 'Native language of Mahatma Gandhi. Has a large diaspora community, especially in East Africa and the UK.',
                          sources: ['Census of India 2011, Language Atlas'],
                        },
                        {
                          name: 'Odia (Oriya)',
                          period: '~1000 CE-present',
                          status: 'living',
                          speakers: '~35 million (native)',
                          region: 'Odisha (India)',
                          note: 'Among the earliest Indo-Aryan languages to be granted classical status in India, on the strength of a literary record reaching back a thousand years.',
                          sources: ['Census of India 2011, Language Atlas'],
                        },
                        {
                          name: 'Sindhi',
                          period: '~1100 CE-present',
                          status: 'living',
                          speakers: '~33 million (native)',
                          region: 'Sindh (Pakistan), Gujarat and Rajasthan (India)',
                          note: 'Written in Perso-Arabic script in Pakistan and Devanagari in India. Preserves implosive consonants that are rare elsewhere in Indo-European.',
                        },
                        {
                          name: 'Sinhala',
                          period: '~300 BCE-present',
                          status: 'living',
                          speakers: '~17 million (native)',
                          region: 'Sri Lanka',
                          note: 'Reached Sri Lanka with settlers from northern India and then developed in isolation from every other Indo-Aryan language, surrounded by Dravidian. Its earliest inscriptions are among the oldest Indo-Aryan records outside the Vedic corpus.',
                        },
                        {
                          name: 'Nepali',
                          period: '~1200 CE-present',
                          status: 'living',
                          speakers: '~16 million (native)',
                          region: 'Nepal, Sikkim and Darjeeling (India), Bhutan',
                          note: 'Official language of Nepal, written in Devanagari script. An Indo-European language whose speakers live surrounded by Sino-Tibetan ones.',
                        },
                        {
                          name: 'Assamese (Asamiya)',
                          period: '~1300 CE-present',
                          status: 'living',
                          speakers: '~15 million (native)',
                          region: 'Assam (India)',
                          note: 'Easternmost Indo-European language, spoken at the far end of the Brahmaputra valley. Closely related to Bengali but with distinct phonology.',
                          sources: ['Census of India 2011, Language Atlas'],
                        },
                        {
                          name: 'Maithili',
                          period: '~1300 CE-present',
                          status: 'living',
                          speakers: '~14 million (native)',
                          region: 'Bihar (India), eastern Nepal',
                          note: 'Long treated as a dialect of Hindi; recognized as a separate language in the Indian constitution only in 2003. Has its own Tirhuta script and a medieval literary tradition.',
                          sources: ['Census of India 2011, Language Atlas'],
                        },
                        {
                          name: 'Romani',
                          period: '~1500 CE-present',
                          status: 'living',
                          speakers: '~3.5 million (native)',
                          region: 'Europe (diaspora)',
                          note: 'Language of the Romani people. Recognizing it as Indo-Aryan in the 18th century proved that the Roma had come out of India, a conclusion no historical record had preserved.',
                        },
                        {
                          name: 'Dhivehi',
                          period: '~1200 CE-present',
                          status: 'living',
                          speakers: '~340,000 (native)',
                          region: 'Maldives, Minicoy (India)',
                          note: 'Closest relative of Sinhala, from which it separated around the 10th century. Written in Thaana, a script read right to left with numerals repurposed as letters.',
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'Dardic',
                  period: '~1200 CE-present',
                  status: 'living',
                  region: 'Kashmir, Gilgit-Baltistan, eastern Afghanistan',
                  note: 'A cluster of mountain languages whose status is contested: many specialists treat "Dardic" as a geographic label for conservative Indo-Aryan varieties rather than a genuine subgroup with a shared ancestor.',
                  sources: [
                    'Bashir, "Dardic" (2003), in Cardona & Jain (eds.), The Indo-Aryan Languages',
                  ],
                  children: [
                    {
                      name: 'Kashmiri (Koshur)',
                      period: '~1200 CE-present',
                      status: 'living',
                      speakers: '~7 million (native)',
                      region: 'Kashmir Valley (India and Pakistan)',
                      note: 'Largest Dardic language and the only one with a long literary tradition. Unusual within Indo-Aryan for its verb-second word order, a pattern otherwise associated with Germanic.',
                      sources: ['Census of India 2011, Language Atlas'],
                    },
                  ],
                },
              ],
            },
            {
              name: 'Iranian',
              period: '~1000 BCE-present',
              status: 'living',
              region: 'Iran, Afghanistan, Central Asia, Kurdistan',
              note: 'Second largest sub-branch of Indo-Iranian. Spans from Kurdistan in the west to western China in the east.',
              children: [
                {
                  name: 'Avestan',
                  period: '~1000-400 BCE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Central Asia / eastern Iran',
                  note: 'Sacred language of Zoroastrianism. Old Avestan (Gathic) is nearly as archaic as Vedic Sanskrit. It has had no speakers for well over two millennia but is still recited liturgically by Zoroastrian priests.',
                },
                {
                  name: 'Old Persian',
                  period: '~600-300 BCE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Persia (southwestern Iran)',
                  note: 'Language of the Achaemenid Empire. Known from royal inscriptions, especially the Behistun inscription of Darius I. Middle Persian descends from a closely related southwestern dialect rather than from the inscriptional language itself.',
                  children: [
                    {
                      name: 'Middle Persian (Pahlavi)',
                      period: '~300 BCE-800 CE',
                      status: 'extinct',
                      speakers: 'none (extinct)',
                      region: 'Sassanid Empire',
                      note: 'Language of the Sassanid Empire and Zoroastrian religious texts. Bridge between Old and New Persian.',
                      children: [
                        {
                          name: 'Persian (Farsi)',
                          period: '~800 CE-present',
                          status: 'living',
                          speakers: '~77 million (native), ~130 million (total)',
                          region: 'Iran, Afghanistan (as Dari), Tajikistan (as Tajik)',
                          note: 'One of the world\'s great literary languages (Rumi, Hafez, Ferdowsi). Written in Perso-Arabic script in Iran and Afghanistan, and in Cyrillic in Tajikistan. The figure covers all three national varieties.',
                          sources: ['Ethnologue (27th ed., 2024)'],
                        },
                      ],
                    },
                  ],
                },
                {
                  name: 'Sogdian',
                  period: '~100-1000 CE',
                  status: 'extinct',
                  speakers: 'none (extinct)',
                  region: 'Sogdiana (modern Uzbekistan and Tajikistan) and Silk Road colonies',
                  note: 'Lingua franca of the Silk Road for centuries, carried east as far as China by Sogdian merchants. Displaced by Persian and Turkic after the Arab conquests.',
                },
                {
                  name: 'Yaghnobi',
                  period: '~1800 CE-present',
                  status: 'living',
                  speakers: '~12,000 (native)',
                  region: 'Yaghnob valley (Tajikistan)',
                  note: 'Descends from a dialect closely related to Sogdian rather than from the attested Sogdian texts. The last living Eastern Iranian language of Central Asia outside the Pamirs; severely endangered.',
                  sources: ['UNESCO Atlas of the World\'s Languages in Danger (2010)'],
                },
                {
                  name: 'Pashto',
                  period: '~1500 CE-present',
                  status: 'living',
                  speakers: '~50 million (native)',
                  region: 'Afghanistan, Pakistan (Khyber Pakhtunkhwa)',
                  note: 'National language of Afghanistan alongside Dari. Retains archaic Iranian features lost in Persian, including grammatical gender and split ergativity.',
                },
                {
                  name: 'Kurdish',
                  period: '~1000 CE-present',
                  status: 'living',
                  speakers: '~25 million (native)',
                  region: 'Kurdistan (Turkey, Iraq, Iran, Syria)',
                  note: 'Spoken across four countries but lacking a unified standard; Kurmanji, Sorani and Southern Kurdish are not fully mutually intelligible. Speaker estimates range from about 20 to 30 million.',
                  sources: ['Ethnologue (27th ed., 2024)'],
                },
                {
                  name: 'Balochi',
                  period: '~1800 CE-present',
                  status: 'living',
                  speakers: '~8 million (native)',
                  region: 'Pakistan (Balochistan), Iran, Afghanistan',
                  note: 'A Northwestern Iranian language geographically displaced to the southeast. Preserves archaic features lost in Persian, and was written down only in the modern period.',
                },
                {
                  name: 'Ossetic',
                  period: '~1400 CE-present',
                  status: 'living',
                  speakers: '~500,000 (native)',
                  region: 'North Ossetia (Russia), South Ossetia (Georgia)',
                  note: 'Descended from the language of the medieval Alans and so the last survivor of the Scythian-Sarmatian group that once covered the whole Eurasian steppe. Its earliest record is the 12th-century Zelenchuk inscription.',
                },
              ],
            },
            {
              name: 'Nuristani',
              period: '~1000 BCE-present',
              status: 'living',
              region: 'Nuristan (northeastern Afghanistan)',
              note: 'Usually classified as a third branch of Indo-Iranian, coordinate with Indo-Aryan and Iranian, though some scholars group it with one or the other. None of its languages was written before the 20th century.',
              sources: [
                'Strand, "Nuristani Languages" (1973), Journal of the American Oriental Society',
                'Degener, "Nuristani" (2002), in The Iranian Languages',
              ],
              children: [
                {
                  name: 'Kati (Bashgali)',
                  period: '~1900 CE-present',
                  status: 'living',
                  speakers: '~40,000 (native)',
                  region: 'Nuristan, Afghanistan',
                  note: 'Largest Nuristani language, first documented by European travellers around 1900. Speakers were forcibly converted to Islam in the 1890s; before that they practised a form of Indo-European paganism with striking parallels to Vedic religion.',
                },
                {
                  name: 'Kamviri',
                  period: '~1900 CE-present',
                  status: 'living',
                  speakers: '~5,000 (native)',
                  region: 'Nuristan, Afghanistan',
                  note: 'Endangered language spoken in remote mountain valleys. Preserves archaic features of great interest to historical linguists.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
