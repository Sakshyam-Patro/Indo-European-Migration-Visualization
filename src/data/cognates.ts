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
  {
    pieRoot: "*sóh₂wl̥",
    meaning: "sun",
    forms: {
      English: "sun (Old English sunne)",
      Latin: "sol",
      Greek: "hḗlios (ἥλιος, with *s > h)",
      Sanskrit: "surya (सूर्य, from *suh₂l-yo-)",
      Russian: "solnce (солнце, diminutive of *sol-)",
      Irish: "(not attested directly; Irish uses grian from different root)",
      Persian: "xoršid (خورشید, from *hvar- 'sun')",
      Lithuanian: "saule (saulė)",
    },
    soundNotes:
      "PIE *s > Greek h (hēlios). Latin sol and Lithuanian saulė are conservative reflexes. Sanskrit surya derives from a suffixed form. The feminine *seh₂ul in Baltic and the masculine *soh₂wl in Latin show different gender assignments across branches.",
  },
  {
    pieRoot: "*méh₁n̥s",
    meaning: "moon, month",
    forms: {
      English: "moon, month (both from *méh₁n̥s via different formations)",
      Latin: "mensis (month)",
      Greek: "mḗn (μήν, month)",
      Sanskrit: "mas (मास, month; also candramā 'moon')",
      Russian: "mesjac (месяц, both moon and month)",
      Irish: "mi (month, Old Irish mí)",
      Persian: "mah (ماه, both moon and month)",
      Lithuanian: "menuo (moon/month; compare menesis 'month')",
    },
    soundNotes:
      "Derived from PIE *meh₁- 'to measure', reflecting how the moon measures time. Nearly all branches preserve both meanings 'moon' and 'month'. English split the two meanings into separate words: moon (from *meh₁n-ōn) and month (from *meh₁n-ot-).",
  },
  {
    pieRoot: "*h₁ésh₂r̥",
    meaning: "blood",
    forms: {
      English: "(not attested; English uses 'blood' from *bʰleh₃-to-)",
      Latin: "sanguis (from different root *sh₂eng-)",
      Greek: "éar (ἔαρ, blood, poetic/archaic)",
      Sanskrit: "asṛj (असृज्)",
      Russian: "(not attested; uses krov' from different root *krewh₂-)",
      Irish: "(not attested from this root)",
      Persian: "(not attested; uses xun from *krewh₂-)",
      Lithuanian: "asarai (tears, semantic shift from 'body fluid')",
    },
    soundNotes:
      "One of the rarer PIE words, preserved mainly in Sanskrit and archaic Greek. Most branches replaced it: Germanic uses *blōd- (blood), Slavic and Persian use *krewh₂- (raw/bloody). Lithuanian asarai 'tears' may reflect a semantic broadening to 'body fluid'.",
  },
  {
    pieRoot: "*pṓds",
    meaning: "foot",
    forms: {
      English: "foot (Old English fōt, with Grimm's Law *p > f)",
      Latin: "pes (stem ped-)",
      Greek: "poús (πούς, stem pod-)",
      Sanskrit: "pad (पद्)",
      Russian: "(not attested directly; pod 'under, floor' may be related)",
      Irish: "(not attested from this root; uses cos from *koḱs-)",
      Persian: "pa (پا, from pad-)",
      Lithuanian: "padas (sole of foot)",
    },
    soundNotes:
      "PIE *p > Germanic f (Grimm's Law), giving English foot. Latin pes/ped- and Greek poús/pod- preserve the original *p-. Sanskrit pad shows the root clearly. Persian pā is a shortened form. The alternation between nominative *pōds and oblique *ped- is an ancient ablaut pattern.",
  },
  {
    pieRoot: "*dóru",
    meaning: "tree, wood",
    forms: {
      English: "tree (Old English trēo, from *dóru via Grimm's Law *d > t)",
      Latin: "(not attested directly; compare durus 'hard' from same root)",
      Greek: "dóru (δόρυ, spear/wood, also drûs 'oak')",
      Sanskrit: "daru (दारु, wood, timber)",
      Russian: "derevo (дерево, tree)",
      Irish: "dair (oak; modern Irish doire 'grove')",
      Persian: "deraxt (درخت, tree)",
      Lithuanian: "(not attested from this root directly)",
    },
    soundNotes:
      "PIE *d > Germanic t (Grimm's Law), yielding English tree. Greek preserves both dóru (wood/spear) and drûs (oak/tree). The semantic range covers 'wood, tree, oak, spear (as wooden weapon)'. Russian derevo and Persian deraxt both show the original *d- preserved.",
  },
  {
    pieRoot: "*h₁ed-",
    meaning: "eat",
    forms: {
      English: "eat (Old English etan)",
      Latin: "edere (also est 'eats')",
      Greek: "édmenai (ἔδμεναι, to eat; also esthíō)",
      Sanskrit: "admi (अद्मि, I eat)",
      Russian: "est' (есть, to eat)",
      Irish: "ithim (I eat, Old Irish ithid)",
      Persian: "(not attested directly; replaced by xordan)",
      Lithuanian: "esti (to eat; edmi 'I eat')",
    },
    soundNotes:
      "One of the most basic PIE verbs, with remarkably stable reflexes. English eat, Latin edere, Greek ed-, Sanskrit ad-, Russian est', Lithuanian esti all transparently derive from *h₁ed-. The laryngeal *h₁ is reflected as e-coloring in the initial vowel.",
  },
  {
    pieRoot: "*gʷīw-",
    meaning: "live, alive",
    forms: {
      English: "quick (originally 'living', Old English cwic; also 'alive' via Latin)",
      Latin: "vivus (alive, with *gʷ > v)",
      Greek: "bíos (βίος, life)",
      Sanskrit: "jiva (जीव, alive, living)",
      Russian: "zhivoj (живой, alive)",
      Irish: "beo (alive, living)",
      Persian: "zende (زنده, from *gʷih₃-wen-to-)",
      Lithuanian: "gyvas (alive)",
    },
    soundNotes:
      "PIE *gʷ shows divergent reflexes: > Germanic kw (English quick), > Latin v (vivus), > Greek b (bíos), > Sanskrit j (jīva), > Slavic zh (zhivoj), > Irish b (beo), > Lithuanian g (gyvas). English quick originally meant 'living' (compare 'quicksilver' and 'the quick and the dead').",
  },
  {
    pieRoot: "*dʰeh₁-",
    meaning: "do, put, place",
    forms: {
      English: "do (Old English dōn, 'to do, to make')",
      Latin: "facere (from *dʰeh₁-k-, to do/make; fēcī 'I did')",
      Greek: "títhēmi (τίθημι, I place/put; reduplicated form)",
      Sanskrit: "dadhati (दधाति, places; reduplicated present)",
      Russian: "det' (деть, to put)",
      Irish: "(related forms in compound verbs)",
      Persian: "(not attested directly from this root)",
      Lithuanian: "deti (to put, place)",
    },
    soundNotes:
      "PIE *dʰ > Germanic d (English do). Latin facere shows *dʰ > f word-initially. Greek and Sanskrit both preserve the ancient reduplicated present (ti-the-mi, da-dha-ti). Russian det' and Lithuanian deti preserve the simple root form. This root also gives English 'deed'.",
  },
  {
    pieRoot: "*steh₂-",
    meaning: "stand",
    forms: {
      English: "stand (Old English standan)",
      Latin: "stare (to stand; also sistere, status)",
      Greek: "hístēmi (ἵστημι, I make stand; reduplicated)",
      Sanskrit: "tisthati (तिष्ठति, stands; reduplicated present)",
      Russian: "stojat' (стоять, to stand)",
      Irish: "(related in compound forms; sessam 'standing')",
      Persian: "istadan (ایستادن, to stand)",
      Lithuanian: "stoti (to stand up)",
    },
    soundNotes:
      "The *st- cluster is preserved in most branches. Greek and Sanskrit show the reduplicated present (hi-stē-mi, ti-ṣṭha-ti). English stand has an n-infix extension *st(h₂)-n-d-. This root is extremely productive, giving English: stand, state, stay, stable, station, static, status, statue, stature, and many more via Latin.",
  },
  {
    pieRoot: "*h₂ékʷeh₂",
    meaning: "water (flowing)",
    forms: {
      English: "(not attested directly; compare Latin-derived 'aquatic')",
      Latin: "aqua (water)",
      Greek: "(not attested from this root)",
      Sanskrit: "(not attested from this root)",
      Russian: "(not attested from this root)",
      Irish: "(not attested from this root)",
      Persian: "ab (آب, water; from *h₂ep-)",
      Lithuanian: "(not attested from this root)",
    },
    soundNotes:
      "This root has a limited distribution, appearing most clearly in Latin aqua and possibly in some Italic and Celtic hydronyms (river names). It is distinct from *wódr̥ (see 'water' entry). The restricted distribution suggests it may have been a dialectal or technical term in late PIE.",
  },
  {
    pieRoot: "*h₂ner",
    meaning: "man, vital force",
    forms: {
      English: "(not attested directly; borrowed in 'android' via Greek anēr)",
      Latin: "nero (Sabine form meaning 'strong'; compare Nero)",
      Greek: "anḗr (ἀνήρ, man, stem andr-)",
      Sanskrit: "nar (नर, man, hero)",
      Russian: "(not attested directly from this root)",
      Irish: "(not attested from this root; compare ner- in names)",
      Persian: "nar (نر, male)",
      Lithuanian: "(not attested directly from this root)",
    },
    soundNotes:
      "Greek anēr (stem andr-) is the most recognizable reflex, giving English words like 'android' and 'androgen'. Sanskrit nar and Persian nar preserve the meaning 'man/male'. The initial *h₂ appears as a prothetic vowel in Greek (a-nēr).",
  },
  {
    pieRoot: "*ǵneh₃-",
    meaning: "know",
    forms: {
      English: "know (Old English cnāwan; also 'can' from same root)",
      Latin: "gnoscere (later noscere; also cognosco 'I recognize')",
      Greek: "gignṓskō (γιγνώσκω, I know; reduplicated present)",
      Sanskrit: "janati (जानाति, knows)",
      Russian: "znat' (знать, to know)",
      Irish: "(not attested directly; compare ad-gnin 'recognizes')",
      Persian: "(related forms in danestan 'to know' from different PIE root *dens-)",
      Lithuanian: "zinoti (to know)",
    },
    soundNotes:
      "PIE *ǵ > Germanic k (English know, with silent k before n). > Latin g (gnoscere > noscere). > Greek g (gignōskō). > Sanskrit j (jānāti). > Russian z (znat'). > Lithuanian z (žinoti). This root gives English: know, can, cunning, gnosis, cognition, recognize, noble, and note (via Latin).",
  },
  {
    pieRoot: "*dʰwer-",
    meaning: "door, gate",
    forms: {
      English: "door (Old English duru, dor)",
      Latin: "foris (door; also fores 'double doors')",
      Greek: "thúra (θύρα, door)",
      Sanskrit: "dvar (द्वार, door, gate)",
      Russian: "dver' (дверь, door)",
      Irish: "doras (door, from *dʰwor-o-sto-)",
      Persian: "dar (در, door; from *dwar-)",
      Lithuanian: "durys (doors, plural)",
    },
    soundNotes:
      "PIE *dʰ > Germanic d (door), > Latin f (foris), > Greek th (thúra). The original *dʰwer- cluster simplifies differently in each branch. English door, Greek thúra, Sanskrit dvār, Russian dver', and Lithuanian durys all clearly reflect the same root. Latin foris also gives English 'forum' (originally an outdoor space).",
  },
  {
    pieRoot: "*pewH-",
    meaning: "fire, purify",
    forms: {
      English: "fire (Old English fȳr, from *puH-r-)",
      Latin: "purus (pure, clean; from the 'purify' sense)",
      Greek: "pûr (πῦρ, fire)",
      Sanskrit: "pu (पू, to purify; also pavaka 'fire, purifier')",
      Russian: "(not attested directly from this root)",
      Irish: "(not attested directly; uses tine from different root)",
      Persian: "(related to pur 'full' is debated; uses atash from different root)",
      Lithuanian: "(not attested from this root directly)",
    },
    soundNotes:
      "English fire and Greek pûr are the clearest reflexes. PIE *p > Germanic f (Grimm's Law). The semantic range spans 'fire' and 'purify' (fire as purifying agent). Latin purus 'pure' reflects the purification sense. This root also gives English 'pyre' and 'pyro-' via Greek.",
  },
  {
    pieRoot: "*h₂ews-",
    meaning: "dawn, east",
    forms: {
      English: "east (Old English east, from *h₂ews- 'dawn direction')",
      Latin: "aurora (dawn, from *h₂ews-os with rhotacism *s > r)",
      Greek: "eos (Ἠώς, goddess of dawn)",
      Sanskrit: "usas (उषस्, dawn; Vedic goddess Usas)",
      Russian: "(not attested directly; uses vostok from *steh₂- 'to stand')",
      Irish: "(not attested from this root)",
      Persian: "(not attested directly from this root)",
      Lithuanian: "ausra (dawn, from *h₂ews-r-eh₂)",
    },
    soundNotes:
      "This root gives both concrete ('dawn') and directional ('east') meanings. Greek Eos and Sanskrit Usas are cognate dawn goddesses. Latin aurora shows rhotacism (*s > r). English east derives from the 'dawn direction' sense. Lithuanian ausra preserves the root clearly.",
  },
  {
    pieRoot: "*mr̥tós",
    meaning: "dead, mortal",
    forms: {
      English: "murder (Old English morþor; also 'mortal' via Latin)",
      Latin: "mors (death, stem mort-; also mortalis 'mortal')",
      Greek: "brotós (βροτός, mortal; from *mr̥tós with *m > b before r)",
      Sanskrit: "mrta (मृत, dead; also Mara 'death personified')",
      Russian: "mjortvyj (мёртвый, dead)",
      Irish: "marb (dead)",
      Persian: "morde (مرده, dead)",
      Lithuanian: "mirtis (death)",
    },
    soundNotes:
      "From PIE *mer- 'to die'. PIE *mr̥tós (past participle 'died' > 'dead'). Greek brotós shows an unusual *m > b shift before *r. Sanskrit mrta and Persian morde preserve the root transparently. English has both native murder and Latin-borrowed mortal, immortal, mortgage ('death pledge').",
  },
];
