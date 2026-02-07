export interface CognateEntry {
  pieRoot: string;
  meaning: string;
  forms: Record<string, string>;
  soundNotes?: string;
}

export const cognates: CognateEntry[] = [
  {
    pieRoot: "*ph₂tḗr",
    meaning: "father",
    forms: {
      English: "father",
      Latin: "pater",
      Greek: "patḗr",
      Sanskrit: "pitṛ́",
      Russian: "(no direct Slavic cognate; compare OCS otĭcĭ from different root)",
      Irish: "athair",
      Persian: "pedar",
      Lithuanian: "(not attested as direct cognate)",
    },
    soundNotes:
      "PIE *p → Germanic f (Grimm's Law); Latin and Greek preserve original *p. Sanskrit shows *a > i in the first syllable (reduction in pretonic position). Irish lost initial p- entirely (characteristic Celtic development).",
  },
  {
    pieRoot: "*méh₂tēr",
    meaning: "mother",
    forms: {
      English: "mother",
      Latin: "māter",
      Greek: "mḗtēr",
      Sanskrit: "mātṛ́",
      Russian: "mat'",
      Irish: "máthair",
      Persian: "mādar",
      Lithuanian: "motina (compare archaic motė)",
    },
    soundNotes:
      "PIE *t → Germanic þ (Grimm's Law), later > ð > English th. The laryngeal *h₂ colors and lengthens the preceding vowel to *ā in most branches. One of the most stable PIE kinship terms across all branches.",
  },
  {
    pieRoot: "*bʰréh₂tēr",
    meaning: "brother",
    forms: {
      English: "brother",
      Latin: "frāter",
      Greek: "phrā́tēr (clansman; Greek later shifted to adelphós for 'brother')",
      Sanskrit: "bhrā́tṛ",
      Russian: "brat",
      Irish: "bráthair",
      Persian: "barādar",
      Lithuanian: "brolis (remodeled stem)",
    },
    soundNotes:
      "PIE *bʰ → Germanic b (Grimm's Law); Latin bʰ → f word-initially; Greek bʰ → pʰ (written φ). The PIE aspirated voiced stops show distinct reflexes in each branch, making this an excellent diagnostic cognate.",
  },
  {
    pieRoot: "*tréyes",
    meaning: "three",
    forms: {
      English: "three",
      Latin: "trēs",
      Greek: "treîs",
      Sanskrit: "tráyas",
      Russian: "tri",
      Irish: "trí",
      Persian: "se (from *θr- with loss of initial cluster)",
      Lithuanian: "trỹs",
    },
    soundNotes:
      "PIE *t → Germanic þ (> English th). Persian underwent *tr- > θr- > s- (characteristic Iranian simplification of initial clusters). Otherwise remarkably stable across branches.",
  },
  {
    pieRoot: "*néwos",
    meaning: "new",
    forms: {
      English: "new",
      Latin: "novus",
      Greek: "néos",
      Sanskrit: "návas",
      Russian: "novyj",
      Irish: "nua (Old Irish núe)",
      Persian: "now (نو), also nau",
      Lithuanian: "naũjas",
    },
    soundNotes:
      "PIE *-w- is preserved in most branches but lost in Greek (néos < *néwos). The vowel grades vary: English shows *ew > ēow > OE nīewe > new. Latin o-grade *now- > novus.",
  },
  {
    pieRoot: "*nókʷts",
    meaning: "night",
    forms: {
      English: "night",
      Latin: "nox (stem noct-)",
      Greek: "núx (stem nukt-)",
      Sanskrit: "nákti- (Vedic nákt-)",
      Russian: "noč'",
      Irish: "oíche (from different formation *h₂ep-okʷ-tih₂, not a direct cognate)",
      Persian: "šab (from different root *kšap-, not a direct cognate)",
      Lithuanian: "naktìs",
    },
    soundNotes:
      "PIE *kʷ → Germanic hw (> OE niht with velar before t). The labiovelar *kʷ merges with plain *k before *t in most branches. Irish and Persian replaced this inherited word with forms from unrelated roots.",
  },
  {
    pieRoot: "*h₁éḱwos",
    meaning: "horse",
    forms: {
      English: "eoh (Old English; lost in Modern English, replaced by 'horse')",
      Latin: "equus",
      Greek: "híppos (from *h₁éḱwos via *ikkʷos with assimilation)",
      Sanskrit: "áśva",
      Russian: "(not attested; Slavic lost this root)",
      Irish: "each (Old Irish ech)",
      Persian: "asb (Old Persian asa-)",
      Lithuanian: "ašvà (archaic/poetic, replaced by arklỹs)",
    },
    soundNotes:
      "PIE palatovelar *ḱ → Sanskrit ś, Avestan/Persian s, Lithuanian š (satem reflexes); → Latin qu, Greek pp (< *kʷ by assimilation, centum reflexes). This is a key isogloss word for the centum-satem division.",
  },
  {
    pieRoot: "*kʷékʷlos",
    meaning: "wheel, circle",
    forms: {
      English: "wheel (from *kʷékʷlom via Grimm's Law *kʷ > hw)",
      Latin: "(no direct reflex; compare colō 'I cultivate' from related *kʷel- 'to turn')",
      Greek: "kúklos (circle)",
      Sanskrit: "cakrá (with dissimilation *kʷ...kʷ > c...kr)",
      Russian: "koleso (from *kʷel- 'to turn', not direct *kʷékʷlos cognate)",
      Irish: "(not attested from this root)",
      Persian: "čarx (borrowed from or influenced by Sanskrit cakra-)",
      Lithuanian: "(not attested as direct cognate; compare kelias 'road' from *kʷel-)",
    },
    soundNotes:
      "PIE reduplicated *kʷe-kʷl-o-. Sanskrit shows dissimilation of the two labiovelars: *kʷ...kʷ > c...k (cakra-). Greek preserves both as plain velars k...k (kúklos). English wheel reflects *kʷ > hw (Grimm's Law).",
  },
  {
    pieRoot: "*kʷón",
    meaning: "dog, hound",
    forms: {
      English: "hound (< *kʷón- via Grimm's Law *kʷ > hw > h; 'dog' is from a different root)",
      Latin: "canis (from oblique stem *kʷn- with different vowel grade)",
      Greek: "kúōn (stem kun-)",
      Sanskrit: "śván (stem śun-)",
      Russian: "(not attested; Slavic uses *pĭsъ > pes from different root)",
      Irish: "cú (Old Irish cú, genitive con)",
      Persian: "sag (from different root, not a cognate of *kʷón)",
      Lithuanian: "šuõ (stem šun-)",
    },
    soundNotes:
      "PIE *kʷ → Sanskrit ś, Lithuanian š (satem); → Greek k, Latin c/k, Irish c (centum). The stem alternation *kʷwón / *kʷun- (nominative/oblique) is an archaic pattern preserved in Greek, Sanskrit, and Lithuanian.",
  },
  {
    pieRoot: "*wódr̥",
    meaning: "water",
    forms: {
      English: "water (from extended form *wód-ōr with Grimm's Law *d > t)",
      Latin: "unda (wave, from *und- < *wr̥d-néh₂, a nasal-infix derivative)",
      Greek: "húdōr (stem hudat-)",
      Sanskrit: "udán (genitive udnás)",
      Russian: "voda",
      Irish: "uisce (from a different derivative *ud-skio-; compare whiskey)",
      Persian: "āb (from *H₂ep-, a different PIE root for water)",
      Lithuanian: "vanduõ (stem vanden-)",
    },
    soundNotes:
      "PIE *w lost in Greek (húdōr < *wúdōr). Russian voda preserves *w- as v-. Lithuanian vanduõ shows nasal infix. Persian āb is from an entirely different PIE root *h₂ep- 'water, river'. Irish uisce is the source of English 'whiskey'.",
  },
  {
    pieRoot: "*h₂wĺ̥h₁neh₂",
    meaning: "wool",
    forms: {
      English: "wool",
      Latin: "lāna (with loss of initial *w-)",
      Greek: "lênos (λῆνος, with loss of initial *w- as in Latin)",
      Sanskrit: "ū́rṇā (with *l > r, characteristic Sanskrit rhotacism)",
      Russian: "volna (вóлна)",
      Irish: "olann",
      Persian: "(not attested as a direct cognate)",
      Lithuanian: "vìlna",
    },
    soundNotes:
      "PIE *w- lost in Latin and Greek (both had earlier *wlāna > lāna). Sanskrit *l > r (ūrṇā). The syllabic *l̥ is reflected as English wool (wu-), Russian/Lithuanian vil-/vol-, Irish ol-. An important isogloss for tracking *w- loss in Italic and Greek.",
  },
  {
    pieRoot: "*médʰu",
    meaning: "mead, honey, sweet drink",
    forms: {
      English: "mead",
      Latin: "(not attested as a direct cognate; Latin uses mel 'honey' from different root *mélit)",
      Greek: "méthu (μέθυ, wine; compare methúskō 'to intoxicate')",
      Sanskrit: "mádhu (honey, sweet drink)",
      Russian: "mjod (мёд, also med in older form)",
      Irish: "meá (mead, whey)",
      Persian: "may (مَی, wine; semantic shift from mead to wine)",
      Lithuanian: "medùs (honey)",
    },
    soundNotes:
      "PIE *dʰ → Germanic d (Grimm's Law: aspirated voiced stop > voiced stop). Semantic range shifts from 'honey/sweet drink' to 'mead' (Germanic, Slavic, Celtic) or 'wine' (Persian, Greek). Latin lacks a cognate, using mel from *mélit instead.",
  },
  {
    pieRoot: "*ḱḗr",
    meaning: "heart",
    forms: {
      English: "heart (Old English heorte, with Grimm's Law *ḱ > h)",
      Latin: "cor (stem cord-)",
      Greek: "kardía (καρδία)",
      Sanskrit: "hṛ́d (stem hṛday-)",
      Russian: "serdce (сердце)",
      Irish: "cride (Old Irish cride, modern croi)",
      Persian: "del (دل, from different formation *dʰol-; not a direct cognate)",
      Lithuanian: "sirdis (širdis)",
    },
    soundNotes:
      "PIE *ḱ shows the satem/centum split clearly: > Sanskrit h, Russian/Lithuanian s/s (satem); > Latin c, Greek k, Irish c (centum). English heart reflects the Germanic shift *ḱ > *k > h (Grimm's Law). Persian del is from a different root and is not cognate.",
  },
  {
    pieRoot: "*h₁nómn̥",
    meaning: "name",
    forms: {
      English: "name (Old English nama)",
      Latin: "nomen",
      Greek: "ónoma (with metathesis of initial *n- and vowel prothesis)",
      Sanskrit: "nama (नाम)",
      Russian: "(not attested from this root directly; Slavic uses imja from *h₁n̥h₃mn̥)",
      Irish: "ainm",
      Persian: "nam (نام)",
      Lithuanian: "vardas (from different root *h₁uordʰo-; not a cognate)",
    },
    soundNotes:
      "PIE *h₁nómn̥ with syllabic *n̥. Greek ónoma shows metathesis (*nómn̥ > *onomn > ónoma). Latin nomen is the most transparent reflex. English name, Sanskrit nama, and Persian nam all show remarkable stability. Lithuanian vardas is from a completely different root.",
  },
  {
    pieRoot: "*h₂stḗr",
    meaning: "star",
    forms: {
      English: "star (Old English steorra, with Grimm's Law *t > Ø in cluster)",
      Latin: "stella (from *stēr-lā, with diminutive suffix and dissimilation)",
      Greek: "astḗr (ἀστήρ, preserved nearly unchanged)",
      Sanskrit: "stṛ (तारा, tara in later forms)",
      Russian: "(not attested from this root; Slavic uses zvezda from *gʷʰwoiǵdʰ-)",
      Irish: "(not attested from this root; Irish uses reithlean or realt from Latin)",
      Persian: "setare (ستاره, with regular *st > st)",
      Lithuanian: "(not attested from this root; uses zvaigzde, cognate with Slavic zvezda)",
    },
    soundNotes:
      "Greek astḗr is the most conservative reflex, preserving the initial laryngeal as a prothetic vowel. Latin stella is from *stēr-lā with l-dissimilation. English star and Persian setare both preserve the *st- cluster. Slavic and Baltic replaced this root entirely with *gʷʰwoiǵdʰ-.",
  },
  {
    pieRoot: "*h₂ŕ̥tḱos",
    meaning: "bear",
    forms: {
      English: "bear (from *bʰer- 'the brown one'; original root replaced by taboo avoidance)",
      Latin: "ursus (from *h₂ŕ̥tḱos with regular sound changes)",
      Greek: "árktos (ἄρκτος, preserved almost unchanged; compare Arctic)",
      Sanskrit: "ṛkṣa (ऋक्ष)",
      Russian: "medved (медведь, 'honey-knower'; taboo replacement like Germanic)",
      Irish: "art (Old Irish art; preserved in names like Arthur)",
      Persian: "xers (خرس)",
      Lithuanian: "(not attested from this root; uses lokys, possibly taboo replacement)",
    },
    soundNotes:
      "One of the most famous examples of taboo replacement in linguistics. The PIE word is preserved in Latin, Greek, Sanskrit, Irish, and Persian. But Germanic (English bear 'brown one') and Slavic (Russian medved 'honey-knower') replaced it, likely because naming the bear was considered dangerous.",
  },
  {
    pieRoot: "*snígʷʰs",
    meaning: "snow",
    forms: {
      English: "snow (Old English snaw, with Grimm's Law *gʷʰ > w)",
      Latin: "nix (stem niv-, from zero-grade *snigʷʰ- with loss of initial *s-)",
      Greek: "nípha (acc. νίφα, from *snigʷʰ-; also neípho 'to snow')",
      Sanskrit: "sneha (स्नेह, shifted meaning to 'oil, affection'; related by moisture semantics)",
      Russian: "sneg (снег)",
      Irish: "sneachta (from *snigʷʰ-to-)",
      Persian: "(not attested as a direct cognate; Persian uses barf from different root)",
      Lithuanian: "sniegas",
    },
    soundNotes:
      "PIE initial *sn- is preserved in Germanic, Slavic, Baltic, and Celtic. Latin and Greek lost the initial *s- before *n- (nix, nípha). The labiovelar *gʷʰ became w in Germanic (snow), v in Latin (nivis), and g in Slavic/Baltic (sneg, sniegas). Sanskrit sneha shifted semantically from 'moisture' to 'oil, affection'.",
  },
];
