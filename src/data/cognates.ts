/**
 * Comparative Indo-European cognate sets.
 *
 * CONVENTIONS USED THROUGHOUT THIS FILE
 *
 * 1. `forms` values are either a citable word form or a placeholder.
 *    A value is a PLACEHOLDER if and only if its first character is "(".
 *    Every placeholder uses the single fixed lead-in "(no cognate", i.e. it
 *    matches /^\(no cognate/ and takes one of two shapes:
 *        "(no cognate)"
 *        "(no cognate; <terse note>)"
 *    Real forms never begin with "(" — they may still *contain* a trailing
 *    parenthetical for script, gloss or stem information.
 *    A language that simply replaced the inherited word is recorded as a
 *    placeholder naming the replacement, e.g.
 *        "(no cognate; uses barf برف)"
 *    so that consuming code never renders a non-cognate as a cognate.
 *
 * 2. Native script is supplied for EVERY Sanskrit (Devanāgarī), Greek,
 *    Russian (Cyrillic) and Persian (Perso-Arabic) form, in the shape
 *    "romanisation (script, optional gloss)".
 *    Sanskrit uses IAST, Russian uses scholarly transliteration
 *    (ž, š, č, x, c, j, ë, ', y), Persian uses a light scholarly
 *    romanisation (ā, ī, ū, š, č, x, ɣ).
 *
 * 3. `sources` cites standard handbooks for entries whose claims are
 *    contested or where the reconstruction is disputed.
 */

export interface CognateEntry {
  pieRoot: string;
  meaning: string;
  forms: Record<string, string>;
  soundNotes?: string;
  /** Standard reference works supporting (or qualifying) this entry. */
  sources?: string[];
}

export const cognates: CognateEntry[] = [
  {
    pieRoot: "*ph₂tḗr",
    meaning: "father",
    forms: {
      English: "father (Old English fæder)",
      Latin: "pater",
      Greek: "patḗr (πατήρ)",
      Sanskrit: "pitṛ́ (पितृ)",
      Russian: "(no cognate; Slavic otĭcĭ is from the nursery word *atta)",
      Irish: "athair (Old Irish athair)",
      Persian: "pedar (پدر)",
      Lithuanian: "(no cognate; uses tėvas)",
    },
    soundNotes:
      "PIE *p → Germanic f (Grimm's Law); Latin and Greek preserve original *p. Sanskrit shows reduction of the first syllable to i in pretonic position. Irish lost initial *p- entirely (a defining Celtic development).",
  },
  {
    pieRoot: "*méh₂tēr",
    meaning: "mother",
    forms: {
      English: "mother (Old English mōdor)",
      Latin: "māter",
      Greek: "mḗtēr (μήτηρ)",
      Sanskrit: "mātṛ́ (मातृ)",
      Russian: "mat' (мать)",
      Irish: "máthair",
      Persian: "mādar (مادر)",
      Lithuanian: "mótina (mother; archaic mótė 'woman, wife')",
    },
    soundNotes:
      "PIE *t → Germanic þ (Grimm's Law), later > ð > English th. The laryngeal *h₂ colours and lengthens the preceding vowel to *ā in most branches. One of the most stable PIE kinship terms across all branches.",
  },
  {
    pieRoot: "*bʰréh₂tēr",
    meaning: "brother",
    forms: {
      English: "brother (Old English brōþor)",
      Latin: "frāter",
      Greek: "phrā́tēr (φράτηρ, 'clansman'; Greek uses adelphós for 'brother')",
      Sanskrit: "bhrā́tṛ (भ्रातृ)",
      Russian: "brat (брат)",
      Irish: "bráthair",
      Persian: "barādar (برادر)",
      Lithuanian: "brólis (remodelled stem; older broterėlis)",
    },
    soundNotes:
      "PIE *bʰ → Germanic b (Grimm's Law); Latin *bʰ → f word-initially; Greek *bʰ → pʰ (written φ). The PIE voiced aspirates show distinct reflexes in each branch, making this an excellent diagnostic cognate.",
  },
  {
    pieRoot: "*tréyes",
    meaning: "three",
    forms: {
      English: "three (Old English þrēo)",
      Latin: "trēs",
      Greek: "treîs (τρεῖς)",
      Sanskrit: "tráyas (त्रयस्)",
      Russian: "tri (три)",
      Irish: "trí",
      Persian: "se (سه, from *θrayah with cluster simplification)",
      Lithuanian: "trỹs",
    },
    soundNotes:
      "PIE *t → Germanic þ (> English th). Iranian simplified initial *θr- > s-, giving Persian se. Otherwise remarkably stable across branches.",
  },
  {
    pieRoot: "*néwos",
    meaning: "new",
    forms: {
      English: "new (Old English nīwe)",
      Latin: "novus",
      Greek: "néos (νέος, from *néwos with loss of *w)",
      Sanskrit: "náva- (नव)",
      Russian: "nóvyj (новый)",
      Irish: "nua (Old Irish núe)",
      Persian: "now (نو)",
      Lithuanian: "naũjas",
    },
    soundNotes:
      "PIE *-w- is preserved in most branches but lost in Greek (néos < *néwos). Latin novus reflects the o-grade *now-. Lithuanian naũjas shows a *-yo- suffix built on the same stem.",
  },
  {
    pieRoot: "*nókʷts",
    meaning: "night",
    forms: {
      English: "night (Old English niht)",
      Latin: "nox (stem noct-)",
      Greek: "núx (νύξ, stem nukt-)",
      Sanskrit: "nákt- (नक्त्, Vedic; also nákti-)",
      Russian: "noč' (ночь)",
      Irish:
        "(no cognate; oíche 'night' is of uncertain origin — a derivation from *h₂ep-okʷ- has been proposed but is not secure)",
      Persian: "(no cognate; uses šab شب, from Iranian xšap-)",
      Lithuanian: "naktìs",
    },
    soundNotes:
      "PIE *kʷ loses its labial element before *t in most branches, giving the -kt-/-ht- clusters seen in Latin noct-, Greek nukt- and Old English niht. Irish and Persian use words from other sources.",
    sources: ["Mallory & Adams 2006", "Matasović 2009"],
  },
  {
    pieRoot: "*h₁éḱwos",
    meaning: "horse",
    forms: {
      English: "eoh (Old English; lost in Modern English, replaced by 'horse')",
      Latin: "equus",
      Greek: "híppos (ἵππος; the -pp- and the h- are irregular)",
      Sanskrit: "áśva- (अश्व)",
      Russian: "(no cognate; Slavic lost this root)",
      Irish: "each (Old Irish ech)",
      Persian: "asb (اسب; Avestan aspa-, Old Persian asa-)",
      Lithuanian: "ašvà (archaic 'mare'; the everyday word is arklỹs)",
    },
    soundNotes:
      "PIE palatovelar *ḱ → Sanskrit ś, Iranian s, Lithuanian š (satem reflexes); → Latin qu, Greek pp (centum reflexes). A key diagnostic word for the centum–satem division, and cultural evidence for the place of the horse in PIE society.",
  },
  {
    pieRoot: "*kʷekʷlos",
    meaning: "wheel, circle",
    forms: {
      English: "wheel (Old English hwēol, from *kʷekʷlo- via Grimm's Law *kʷ > hw)",
      Latin: "(no cognate; cf. colō 'I till' from the simple root *kʷel- 'to turn')",
      Greek: "kúklos (κύκλος, 'circle, wheel')",
      Sanskrit: "cakrá- (चक्र)",
      Russian: "(no cognate; koleso колесо 'wheel' is built on the simple root *kʷel-)",
      Irish: "(no cognate; uses roth 'wheel', cognate with Latin rota)",
      Persian: "čarx (چرخ, 'wheel'; Avestan caxra-)",
      Lithuanian:
        "kãklas ('neck', from the same reduplicated *kʷokʷlo- — 'the thing that turns'; Finnish kaula is a loan from Baltic)",
    },
    soundNotes:
      "PIE reduplicated *kʷe-kʷl-o-. Sanskrit dissimilates the two labiovelars (*kʷ…kʷ > c…k, cakrá-). Greek keeps both as plain velars (kúklos). English wheel reflects *kʷ > hw by Grimm's Law. The wide spread of this reduplicated formation is one of the strongest arguments that PIE speakers knew wheeled vehicles.",
  },
  {
    pieRoot: "*ḱwṓ",
    meaning: "dog, hound",
    forms: {
      English: "hound (Old English hund, from *ḱun-tó-; 'dog' is of unknown origin)",
      Latin: "canis (irregular; the expected reflex would be *cuō)",
      Greek: "kúōn (κύων, stem kun-)",
      Sanskrit: "śván- (श्वन्, stem śun-)",
      Russian: "(no cognate; uses pës пёс, sobáka собака)",
      Irish: "cú (Old Irish cú, genitive con)",
      Persian: "(no cognate; cf. Avestan spā, spān-, the regular Iranian reflex)",
      Lithuanian: "šuõ (stem šun-)",
    },
    soundNotes:
      "The initial consonant is the palatovelar *ḱ, not a labiovelar: the satem sibilants of Sanskrit śván- and Lithuanian šuõ can only come from *ḱ. Centum branches give k (Greek kúōn, Old Irish cú). The nominative/oblique alternation *ḱwṓ / *ḱun-és is an archaic ablaut pattern preserved in Greek, Sanskrit and Lithuanian.",
    sources: ["Fortson 2010", "Mallory & Adams 2006"],
  },
  {
    pieRoot: "*wódr̥",
    meaning: "water",
    forms: {
      English: "water (Old English wæter, from the oblique stem *wed-ōr, with *d > t by Grimm's Law)",
      Latin: "unda ('wave', with nasal infix, from *ud-n-eh₂)",
      Greek: "húdōr (ὕδωρ, stem hudat-)",
      Sanskrit: "udán- (उदन्, oblique stem; also udaká- उदक)",
      Russian: "vodá (вода)",
      Irish: "uisce ('water', from the derivative *ud-skio-; the source of English 'whiskey')",
      Persian: "(no cognate; uses āb آب, from *h₂ep- 'water')",
      Lithuanian: "vanduõ (stem vanden-)",
    },
    soundNotes:
      "An animate/inanimate 'water' pair is reconstructed for PIE: *wódr̥ (inanimate substance) beside *h₂ep- (living, flowing water). Greek lost initial *w- (húdōr). Russian vodá keeps *w- as v-. Lithuanian vanduõ shows a nasal infix.",
  },
  {
    pieRoot: "*h₂wĺ̥h₁neh₂",
    meaning: "wool",
    forms: {
      English: "wool (Old English wull)",
      Latin: "lāna (with loss of initial *w-)",
      Greek: "lênos (λῆνος, with loss of initial *w- as in Latin)",
      Sanskrit: "ū́rṇā (ऊर्णा, with *l > r)",
      Russian:
        "volná (волна, archaic/dialectal 'wool'; standard modern Russian uses šerst' шерсть, but the cognate is the ordinary word in Ukrainian вовна and Polish wełna)",
      Irish: "olann",
      Persian: "(no cognate; uses pašm پشم)",
      Lithuanian: "vìlna",
    },
    soundNotes:
      "PIE *w- is lost in Latin and Greek (both from earlier *wlāna). Sanskrit shows the regular *l > r. The syllabic *l̥ appears as English wu-, Russian/Lithuanian vol-/vil-, Irish ol-. A useful isogloss for tracking *w- loss in Italic and Greek.",
  },
  {
    pieRoot: "*médʰu",
    meaning: "mead, honey, sweet drink",
    forms: {
      English: "mead (Old English medu)",
      Latin: "(no cognate; uses mel 'honey', from *mélit)",
      Greek: "méthu (μέθυ, 'wine'; cf. methúskō 'to intoxicate')",
      Sanskrit: "mádhu (मधु, 'honey, sweet drink')",
      Russian: "mëd (мёд, 'honey')",
      Irish: "mid (Old Irish, 'mead'; Modern Irish miodh)",
      Persian: "may (می, 'wine')",
      Lithuanian: "medùs ('honey')",
    },
    soundNotes:
      "PIE *dʰ → Germanic d (Grimm's Law: voiced aspirate > plain voiced stop). The meaning shifts from 'honey / sweet drink' to 'mead' (Germanic, Celtic), 'honey' (Slavic, Baltic, Indic) or 'wine' (Greek, Iranian). Latin lacks a reflex and uses mel instead.",
  },
  {
    pieRoot: "*ḱḗr",
    meaning: "heart",
    forms: {
      English: "heart (Old English heorte, with Grimm's Law *ḱ > *k > h)",
      Latin: "cor (stem cord-)",
      Greek: "kardía (καρδία); also kêr (κῆρ)",
      Sanskrit: "hṛ́d (हृद्, stem hṛday-)",
      Russian: "sérdce (сердце)",
      Irish: "cride (Old Irish; Modern Irish croí)",
      Persian:
        "del (دل; Avestan zərəd- is the regular Iranian reflex, and the d- of the Persian form is irregular)",
      Lithuanian: "širdìs",
    },
    soundNotes:
      "PIE *ḱ shows the satem/centum split clearly: > Sanskrit h (via ǰʰ), Russian s, Lithuanian š (satem); > Latin c, Greek k, Irish c (centum). English heart reflects the Germanic *ḱ > *k > h of Grimm's Law.",
  },
  {
    pieRoot: "*h₁nómn̥",
    meaning: "name",
    forms: {
      English: "name (Old English nama)",
      Latin: "nōmen",
      Greek: "ónoma (ὄνομα, with metathesis and a prothetic vowel)",
      Sanskrit: "nā́man- (नामन्)",
      Russian: "ímja (имя, from the zero grade *h₁n̥h₃mn̥)",
      Irish: "ainm",
      Persian: "nām (نام)",
      Lithuanian: "(no cognate; uses var̃das, which belongs with *wérdʰh₁om 'word' — see that entry)",
    },
    soundNotes:
      "PIE *h₁nómn̥ with syllabic *n̥. Greek ónoma shows metathesis (*nómn̥ > *onomn̥ > ónoma). Latin nōmen is the most transparent reflex. Russian ímja continues the zero grade of the same root, not a different one. Lithuanian replaced the word with var̃das.",
  },
  {
    pieRoot: "*h₂stḗr",
    meaning: "star",
    forms: {
      English: "star (Old English steorra)",
      Latin: "stēlla (from *stēr-lā, with assimilation of the suffix)",
      Greek: "astḗr (ἀστήρ, with a prothetic vowel from the initial laryngeal)",
      Sanskrit: "stṛ́- (स्तृ, Vedic; later tārā तारा)",
      Russian: "(no cognate; uses zvezdá звезда, matching Lithuanian žvaigždė)",
      Irish: "(no cognate; uses réalta, of uncertain origin)",
      Persian: "setāre (ستاره)",
      Lithuanian: "(no cognate; uses žvaigždė, matching Slavic zvezdá)",
    },
    soundNotes:
      "Greek astḗr is the most conservative reflex, keeping the initial laryngeal as a prothetic vowel. Latin stēlla is from *stēr-lā. English star and Persian setāre both keep the *st- cluster. Balto-Slavic replaced the word with an obscure form (zvezdá / žvaigždė) whose reconstruction is disputed.",
    sources: ["Mallory & Adams 2006", "Derksen 2008"],
  },
  {
    pieRoot: "*h₂ŕ̥tḱos",
    meaning: "bear",
    forms: {
      English: "(no cognate; 'bear' is from *bʰer- 'brown', a taboo replacement)",
      Latin: "ursus",
      Greek: "árktos (ἄρκτος; cf. 'Arctic')",
      Sanskrit: "ṛ́kṣa- (ऋक्ष)",
      Russian:
        "(no cognate; medvéd' медведь 'honey-eater' is a taboo replacement, from *medʰu- 'honey' + *h₁ed- 'eat')",
      Irish:
        "art (Old Irish, 'bear'; the name Arthur has been derived from it, though a derivation from Latin Artōrius is at least as widely held)",
      Persian: "xers (خرس)",
      Lithuanian: "(no cognate; uses lokys, probably a taboo replacement)",
    },
    soundNotes:
      "One of the classic examples of taboo replacement. The inherited word survives in Latin, Greek, Sanskrit, Old Irish and Persian, but Germanic substituted 'the brown one' (English bear) and Slavic 'the honey-eater' (Russian medvéd', from *medʰu- 'honey' plus the root of *h₁ed- 'to eat'), apparently because naming the animal was thought dangerous.",
    sources: ["Mallory & Adams 2006", "Watkins 2011"],
  },
  {
    pieRoot: "*snígʷʰs",
    meaning: "snow",
    forms: {
      English: "snow (Old English snāw)",
      Latin: "nix (stem niv-, from zero-grade *snigʷʰ- with loss of initial *s-)",
      Greek: "nípha (νίφα, accusative; also neíphei 'it snows')",
      Sanskrit: "sneha (स्नेह, 'moisture, oil, affection'; verb sníhyati 'becomes moist')",
      Russian: "sneg (снег)",
      Irish: "sneachta (from *snigʷʰ-to-)",
      Persian: "(no cognate; uses barf برف)",
      Lithuanian: "sniẽgas",
    },
    soundNotes:
      "Initial *sn- is kept in Germanic, Slavic, Baltic and Celtic. Latin and Greek lost *s- before *n- (nix, nípha). The labiovelar *gʷʰ gives w in Germanic (snow), v in Latin (nivis) and g in Balto-Slavic (sneg, sniẽgas). The Sanskrit branch of the family shifted the meaning to 'moisture, oiliness'.",
  },
  {
    pieRoot: "*sóh₂wl̥",
    meaning: "sun",
    forms: {
      English: "sun (Old English sunne)",
      Latin: "sōl",
      Greek: "hḗlios (ἥλιος, with *s > h)",
      Sanskrit: "sū́rya- (सूर्य, from *suh₂l-yo-)",
      Russian: "sólnce (солнце, a diminutive of *sъln-)",
      Irish: "(no cognate; uses grian 'sun')",
      Persian: "xoršid (خورشید, from Avestan huuarə xšaētəm 'radiant sun'; huuarə < *sóh₂wl̥)",
      Lithuanian: "sáulė",
    },
    soundNotes:
      "PIE *s > Greek h (hḗlios). Latin sōl and Lithuanian sáulė are conservative. Sanskrit sū́rya- is a suffixed derivative. The stem alternated between *sóh₂wl̥ and *sh₂un-, which is why the branches show both l- and n-forms (Latin sōl vs. English sun).",
  },
  {
    pieRoot: "*méh₁n̥s",
    meaning: "moon, month",
    forms: {
      English: "moon, month (Old English mōna, mōnaþ)",
      Latin: "mēnsis ('month')",
      Greek: "mḗn (μήν, 'month')",
      Sanskrit: "mā́s (मास्, 'moon, month'; also mā́sa- मास)",
      Russian: "mésjac (месяц, both 'moon' and 'month')",
      Irish: "mí ('month', Old Irish mí)",
      Persian: "māh (ماه, both 'moon' and 'month')",
      Lithuanian: "mė́nuo ('moon'; mė́nesis 'month')",
    },
    soundNotes:
      "Derived from PIE *meh₁- 'to measure' — the moon as the measurer of time. Most branches keep both senses. English split them into moon (*meh₁n-ōt-) and month (*meh₁n-s-).",
  },
  {
    pieRoot: "*h₁ésh₂r̥",
    meaning: "blood",
    forms: {
      English: "(no cognate; uses 'blood', from Germanic *blōþa-)",
      Latin: "(no cognate; uses sanguis, of uncertain origin)",
      Greek: "éar (ἔαρ, 'blood', poetic and archaic)",
      Sanskrit: "ásṛj (असृज्)",
      Russian: "(no cognate; uses krov' кровь, from *krewh₂-)",
      Irish: "(no cognate)",
      Persian: "(no cognate; uses xun خون, from *krewh₂-)",
      Lithuanian: "(no cognate; ašarà 'tear' has been compared, but the connection is speculative)",
    },
    soundNotes:
      "A rare and archaic word, best preserved in Hittite ēšḫar, Sanskrit ásṛj and poetic Greek éar. Most branches replaced it: Germanic with *blōþa-, Slavic and Iranian with *krewh₂- 'gore, raw flesh'.",
    sources: ["Mallory & Adams 2006", "Fortson 2010"],
  },
  {
    pieRoot: "*pṓds",
    meaning: "foot",
    forms: {
      English: "foot (Old English fōt, with Grimm's Law *p > f)",
      Latin: "pēs (stem ped-)",
      Greek: "poús (πούς, stem pod-)",
      Sanskrit: "pā́d- (पाद्, nominative pā́t; also páda- पद 'step')",
      Russian: "(no cognate; pod под 'floor, underneath' may belong here)",
      Irish: "(no cognate; uses cos 'foot, leg', from *koḱseh₂ 'hip')",
      Persian: "pā (پا)",
      Lithuanian: "pãdas ('sole of the foot')",
    },
    soundNotes:
      "PIE *p > Germanic f by Grimm's Law, giving English foot. Latin pēs/ped- and Greek poús/pod- keep the original *p-. The alternation between lengthened-grade nominative *pṓds and full-grade oblique *ped- is an ancient ablaut pattern.",
  },
  {
    pieRoot: "*dóru",
    meaning: "tree, wood",
    forms: {
      English: "tree (Old English trēo, with Grimm's Law *d > t)",
      Latin: "(no cognate; a connection with dūrus 'hard' is proposed but disputed)",
      Greek: "dóru (δόρυ, 'wood, spear'); also drûs (δρῦς, 'oak')",
      Sanskrit: "dā́ru (दारु, 'wood, timber')",
      Russian: "dérevo (дерево, 'tree')",
      Irish: "daur (Old Irish, 'oak'; Modern Irish dair)",
      Persian: "deraxt (درخت, 'tree')",
      Lithuanian: "dervà ('resin, tar'); drevė̃ ('hollow in a tree')",
    },
    soundNotes:
      "PIE *d > Germanic t by Grimm's Law, giving English tree. Greek keeps both dóru 'wood, spear' and drûs 'oak'. The semantic range runs 'wood — tree — oak — wooden weapon', with 'oak' as the prototypical tree in several branches. English 'true' and 'trust' belong to the same family ('firm as a tree').",
  },
  {
    pieRoot: "*h₁ed-",
    meaning: "eat",
    forms: {
      English: "eat (Old English etan)",
      Latin: "edere ('to eat'; est 'he eats')",
      Greek: "édmenai (ἔδμεναι, 'to eat'; also esthíō)",
      Sanskrit: "ádmi (अद्मि, 'I eat')",
      Russian: "est' (есть, 'to eat')",
      Irish: "ithid (Old Irish, 'eats')",
      Persian: "(no cognate; uses xordan خوردن)",
      Lithuanian: "ė́sti ('to eat', of animals; ė́du 'I eat')",
    },
    soundNotes:
      "One of the most stable PIE verbs. English eat, Latin edere, Greek ed-, Sanskrit ad-, Russian est' and Lithuanian ė́sti all derive transparently from *h₁ed-. The laryngeal *h₁ leaves e-colouring in the root vowel.",
  },
  {
    pieRoot: "*gʷih₃wós",
    meaning: "alive, living",
    forms: {
      English: "quick (Old English cwic, originally 'alive')",
      Latin: "vīvus ('alive', with *gʷ > v)",
      Greek: "bíos (βίος, 'life'); also zōós (ζωός, 'alive')",
      Sanskrit: "jīvá- (जीव, 'alive, living')",
      Russian: "živój (живой, 'alive')",
      Irish: "beo ('alive, living')",
      Persian: "zende (زنده, from *gʷih₃w-ent-)",
      Lithuanian: "gývas ('alive')",
    },
    soundNotes:
      "PIE *gʷ has strikingly different outcomes: > Germanic kw (English quick), > Latin v (vīvus), > Greek b (bíos), > Sanskrit j (jīvá-), > Slavic ž (živój), > Irish b (beo), > Lithuanian g (gývas). English quick kept its original sense in 'quicksilver' and 'the quick and the dead'.",
  },
  {
    pieRoot: "*dʰeh₁-",
    meaning: "do, put, place",
    forms: {
      English: "do (Old English dōn); also 'deed' (Old English dǣd)",
      Latin: "faciō ('I make', from *dʰh₁-k-; perfect fēcī)",
      Greek: "títhēmi (τίθημι, 'I place'; reduplicated present)",
      Sanskrit: "dádhāti (दधाति, 'places'; reduplicated present)",
      Russian: "det' (деть, 'to put')",
      Irish: "(no cognate as a simplex; the root survives only in compound verbs)",
      Persian: "(no cognate in the modern language; cf. Old Persian dā- 'to make, create')",
      Lithuanian: "dė́ti ('to put, place')",
    },
    soundNotes:
      "PIE *dʰ > Germanic d (English do). Latin shows *dʰ > f word-initially (faciō). Greek and Sanskrit both preserve the archaic reduplicated present (ti-thē-mi, da-dhā-ti). This root also gives English 'deed' and, via Latin, 'fact', 'factory' and 'affect'.",
  },
  {
    pieRoot: "*steh₂-",
    meaning: "stand",
    forms: {
      English: "stand (Old English standan, with an n-infix)",
      Latin: "stāre ('to stand'; also sistere, status)",
      Greek: "hístēmi (ἵστημι, 'I set up'; reduplicated)",
      Sanskrit: "tíṣṭhati (तिष्ठति, 'stands'; reduplicated present)",
      Russian: "stojat' (стоять, 'to stand')",
      Irish: "sessam (Old Irish, 'act of standing', from reduplicated *si-steh₂-)",
      Persian: "istādan (ایستادن, 'to stand')",
      Lithuanian: "stóti ('to stand up')",
    },
    soundNotes:
      "The *st- cluster is preserved almost everywhere. Greek and Sanskrit show the reduplicated present (hi-stē-mi, ti-ṣṭha-ti). English stand has an n-infix extension. The root is enormously productive: stand, state, stay, stable, station, static, status, statue and stature all trace back to it.",
  },
  {
    pieRoot: "*h₂ekʷeh₂",
    meaning: "water (flowing), river",
    forms: {
      English: "(no cognate in Modern English; Old English ēa 'river' continues Germanic *ahwō)",
      Latin: "aqua ('water')",
      Greek: "(no cognate)",
      Sanskrit: "(no cognate)",
      Russian: "(no cognate)",
      Irish: "(no cognate)",
      Persian: "(no cognate; āb آب 'water' belongs to *h₂ep-, a different root)",
      Lithuanian: "(no cognate)",
    },
    soundNotes:
      "This word is largely restricted to Italic and Germanic (Latin aqua, Gothic aƕa, Old English ēa), plus a scatter of river names. It is distinct from both *wódr̥ (the substance) and *h₂ep- (living water), and its status as an inherited PIE item rather than a western dialectal or substrate term is debated.",
    sources: ["Mallory & Adams 2006", "de Vaan 2008"],
  },
  {
    pieRoot: "*h₂nḗr",
    meaning: "man, vital force",
    forms: {
      English: "(no cognate; 'android', 'andro-' are Greek loans)",
      Latin: "Nerō (a Sabine name glossed 'strong'); cf. Umbrian nerf 'men, chiefs'",
      Greek: "anḗr (ἀνήρ, 'man', stem andr-)",
      Sanskrit: "nára- (नर, 'man, hero'; stem nṛ́- नृ)",
      Russian: "(no cognate)",
      Irish: "nert (Old Irish, 'strength', from *h₂ner-to-)",
      Persian: "nar (نر, 'male')",
      Lithuanian: "(no cognate)",
    },
    soundNotes:
      "Greek anḗr (stem andr-) is the most familiar reflex, behind English 'android' and 'philander'. Sanskrit nára- and Persian nar keep the sense 'man, male'. The initial *h₂ shows up as a prothetic vowel in Greek (a-nḗr). The word denotes man as a vigorous, capable being, in contrast to *dʰǵʰemōn 'earthling, human'.",
  },
  {
    pieRoot: "*ǵneh₃-",
    meaning: "know",
    forms: {
      English: "know (Old English cnāwan)",
      Latin: "gnōscere (later nōscere; also cognōscō 'I recognise')",
      Greek: "gignṓskō (γιγνώσκω, 'I come to know'; reduplicated present)",
      Sanskrit: "jānā́ti (जानाति, 'knows')",
      Russian: "znat' (знать, 'to know')",
      Irish: "ad·gnin (Old Irish, 'recognises')",
      Persian: "(no cognate; uses dānestan دانستن; Avestan zan- is the regular Iranian reflex)",
      Lithuanian: "žinóti ('to know')",
    },
    soundNotes:
      "PIE *ǵ shows the satem/centum split: > Germanic k (English know, with the k once pronounced), Latin g (gnōscere), Greek g (gignṓskō) in the centum branches; > Sanskrit j (jānā́ti), Russian z (znat'), Lithuanian ž (žinóti) in the satem branches. The root gives English know, can, cunning, gnosis, cognition, recognise and notice.",
  },
  {
    pieRoot: "*dʰwer-",
    meaning: "door, gate",
    forms: {
      English: "door (Old English duru, dor)",
      Latin: "forēs ('double doors'); foris",
      Greek: "thúra (θύρα, 'door')",
      Sanskrit: "dvā́r (द्वार्, 'door'; also dvā́ra- द्वार)",
      Russian: "dver' (дверь, 'door')",
      Irish: "doras ('door', from *dʰwor-esto-)",
      Persian: "dar (در, 'door')",
      Lithuanian: "dùrys ('door', plural)",
    },
    soundNotes:
      "PIE *dʰ > Germanic d (door), > Latin f (forēs), > Greek th (thúra). The *dʰw- cluster simplifies differently in each branch. The word is normally plural in the older languages, reflecting a double-leaved doorway. Latin foris also underlies English 'forum' and 'foreign' (what lies outside the door).",
  },
  {
    pieRoot: "*péh₂wr̥",
    meaning: "fire (as a substance)",
    forms: {
      English: "fire (Old English fȳr)",
      Latin: "(no cognate; pūrus 'clean' belongs to *pewH- 'to purify', a different root)",
      Greek: "pŷr (πῦρ, 'fire')",
      Sanskrit: "(no cognate; uses agní- अग्नि, matching Latin ignis)",
      Russian: "(no cognate; uses ogón' огонь, matching Latin ignis)",
      Irish: "(no cognate; uses tine)",
      Persian: "(no cognate; uses ātaš آتش)",
      Lithuanian: "(no cognate; uses ugnìs, matching Latin ignis)",
    },
    soundNotes:
      "PIE had two words for fire: inanimate *péh₂wr̥ (fire as stuff — Greek pŷr, English fire, Hittite paḫḫur, Umbrian pir) and animate *h₁n̥gʷnis (fire as a force or deity — Latin ignis, Sanskrit agní-, Russian ogón', Lithuanian ugnìs). Branches generalised one or the other. PIE *p > Germanic f by Grimm's Law, giving English fire; the same root gives 'pyre' and 'pyro-' through Greek.",
    sources: ["Mallory & Adams 2006", "Fortson 2010"],
  },
  {
    pieRoot: "*h₂ews-",
    meaning: "dawn, east",
    forms: {
      English: "east (Old English ēast); also Ēastre 'Easter'",
      Latin: "aurōra ('dawn', from *h₂ews-ōs-, with rhotacism *s > r)",
      Greek: "Ēṓs (Ἠώς, the dawn goddess)",
      Sanskrit: "uṣás- (उषस्, 'dawn'; the Vedic goddess Uṣas)",
      Russian: "(no cognate; útro утро 'morning' has been compared, but the derivation is uncertain)",
      Irish: "(no cognate)",
      Persian: "(no cognate; cf. Avestan ušah- 'dawn')",
      Lithuanian: "aušrà ('dawn', from *h₂ews-r-eh₂)",
    },
    soundNotes:
      "The root yields both the concrete sense 'dawn' and the directional sense 'east'. Greek Ēṓs, Sanskrit Uṣás and Latin Aurōra are cognate dawn goddesses, and the Vedic hymns to Uṣas are among the best evidence for a PIE dawn deity. Latin shows rhotacism (*s > r).",
  },
  {
    pieRoot: "*mr̥tós",
    meaning: "dead, mortal",
    forms: {
      English: "murder (Old English morþor, from *mr̥-tro-)",
      Latin: "mors ('death', stem mort-); mortuus 'dead'",
      Greek: "brotós (βροτός, 'mortal', from *mr̥tós with *mr- > br-)",
      Sanskrit: "mṛtá- (मृत, 'dead'); mṛtyú- (मृत्यु, 'death')",
      Russian: "mërtvyj (мёртвый, 'dead')",
      Irish: "marb ('dead')",
      Persian: "morde (مرده, 'dead')",
      Lithuanian: "mirtìs ('death')",
    },
    soundNotes:
      "From PIE *mer- 'to die', with the verbal adjective *mr̥tós 'having died'. Greek brotós shows the regular Greek development of word-initial *mr- to br-. English has both the inherited 'murder' and the Latin borrowings 'mortal', 'mortuary' and 'mortgage' (literally 'death pledge').",
  },
  {
    pieRoot: "*h₃ókʷ-",
    meaning: "eye, see",
    forms: {
      English: "eye (Old English ēage)",
      Latin: "oculus ('eye', a diminutive formation)",
      Greek: "ósse (ὄσσε, dual, 'the two eyes')",
      Sanskrit: "ákṣi (अक्षि, 'eye')",
      Russian: "óko (око, 'eye', archaic and poetic)",
      Irish: "(no cognate; uses súil 'eye')",
      Persian: "(no cognate; uses čašm چشم, from Iranian čaš- 'to see')",
      Lithuanian: "akìs ('eye')",
    },
    soundNotes:
      "The laryngeal *h₃ gives o-colouring in the root vowel. Latin oculus is a diminutive. Sanskrit ákṣi and Lithuanian akìs are the clearest reflexes. Russian óko survives in poetry, having been replaced by glaz in ordinary speech. The same root gives Greek ópsis 'sight' (behind English 'optic' and 'autopsy').",
  },
  {
    pieRoot: "*h₃dónts",
    meaning: "tooth",
    forms: {
      English: "tooth (Old English tōþ, with Grimm's Law *d > t)",
      Latin: "dēns (stem dent-)",
      Greek: "odoús (ὀδούς, stem odont-)",
      Sanskrit: "dán (दन्, nominative; also dánta- दन्त)",
      Russian: "(no cognate; uses zub зуб, from *ǵómbʰos 'peg, tooth')",
      Irish: "dét (Old Irish; Modern Irish déad)",
      Persian: "dandān (دندان)",
      Lithuanian: "dantìs ('tooth')",
    },
    soundNotes:
      "PIE *d > Germanic t by Grimm's Law, giving English tooth. Latin dēns/dent- and Lithuanian dantìs keep the dental stop. Greek odont- shows the prothetic vowel produced by the initial laryngeal. The word is probably a participle of *h₁ed- 'to eat' — 'the eating one'. Latin dēns gives English dental, dentist and indent.",
  },
  {
    pieRoot: "*dn̥ǵʰwéh₂s",
    meaning: "tongue, language",
    forms: {
      English: "tongue (Old English tunge)",
      Latin: "lingua (from older dingua, with d > l, probably by contamination with lingere 'to lick')",
      Greek: "(no cognate; uses glôssa γλῶσσα)",
      Sanskrit: "jihvā́ (जिह्वा)",
      Russian: "jazýk (язык, 'tongue, language'; the development is irregular)",
      Irish: "tengae (Old Irish; Modern Irish teanga)",
      Persian: "zabān (زبان)",
      Lithuanian: "liežùvis ('tongue')",
    },
    soundNotes:
      "This word is notoriously irregular in almost every branch — a common fate for body-part terms subject to taboo distortion and folk-etymology. Latin lingua preserves an older dingua. Sanskrit jihvā́ and Persian zabān reflect different simplifications of the initial cluster. Latin lingua underlies English language, linguistic and bilingual.",
    sources: ["de Vaan 2008", "Mallory & Adams 2006"],
  },
  {
    pieRoot: "*déḱm̥",
    meaning: "ten",
    forms: {
      English: "ten (Old English tīen, with Grimm's Law *d > t)",
      Latin: "decem",
      Greek: "déka (δέκα)",
      Sanskrit: "dáśa (दश)",
      Russian: "désjat' (десять)",
      Irish: "deich",
      Persian: "dah (ده)",
      Lithuanian: "dẽšimt",
    },
    soundNotes:
      "PIE *d > Germanic t (English ten). The palatovelar *ḱ shows the satem/centum split neatly: > Sanskrit ś (dáśa), Russian s (désjat'), Lithuanian š (dẽšimt) against Latin c (decem), Greek k (déka), Irish ch (deich). This word also gives English '-teen', 'ten' and, via Latin, 'decade' and 'December'.",
  },
  {
    pieRoot: "*septḿ̥",
    meaning: "seven",
    forms: {
      English: "seven (Old English seofon)",
      Latin: "septem",
      Greek: "heptá (ἑπτά, with *s > h)",
      Sanskrit: "saptá (सप्त)",
      Russian: "sem' (семь)",
      Irish: "secht (Old Irish secht)",
      Persian: "haft (هفت, with *s > h and *p > f)",
      Lithuanian: "septynì",
    },
    soundNotes:
      "Greek shows *s > h (heptá). Persian haft shows both *s > h and *p > f. Note that Germanic 'seven' does NOT show the expected Grimm's Law *p > f — Verner's Law and analogy intervened. The numerals are among the most stable vocabulary in the family.",
  },
  {
    pieRoot: "*h₁éḱweh₂",
    meaning: "mare (female horse)",
    forms: {
      English: "(no cognate)",
      Latin: "equa ('mare')",
      Greek: "(no cognate; híppos ἵππος serves for both sexes)",
      Sanskrit: "áśvā (अश्वा, 'mare')",
      Russian: "(no cognate)",
      Irish: "(no cognate)",
      Persian: "(no cognate)",
      Lithuanian: "ašvà ('mare', archaic)",
    },
    soundNotes:
      "The feminine counterpart of *h₁éḱwos 'horse', formed with the *-eh₂ suffix. Latin equa, Sanskrit áśvā and Lithuanian ašvà preserve it. That PIE distinguished stallion from mare at all is evidence for how closely its speakers managed horses.",
  },
  {
    pieRoot: "*yugóm",
    meaning: "yoke",
    forms: {
      English: "yoke (Old English geoc)",
      Latin: "iugum",
      Greek: "zugón (ζυγόν)",
      Sanskrit: "yugá- (युग)",
      Russian: "ígo (иго, 'yoke')",
      Irish: "cuing (Old Irish, 'yoke', from *kom-yung-i-)",
      Persian: "yuɣ (یوغ, 'yoke'; cf. Avestan yuxta- 'yoked')",
      Lithuanian: "jùngas ('yoke')",
    },
    soundNotes:
      "PIE *y- is kept in English yoke, Latin iugum and Sanskrit yugá-; Greek shows *y- > z- (zugón). Together with 'wheel' and 'axle', this term is part of the wagon vocabulary that dates late PIE no earlier than the spread of wheeled transport. Latin iugum gives English conjugal, subjugate and jugular.",
  },
  {
    pieRoot: "*ǵónu",
    meaning: "knee",
    forms: {
      English: "knee (Old English cnēo, with a once-pronounced k-)",
      Latin: "genū",
      Greek: "gónu (γόνυ)",
      Sanskrit: "jā́nu (जानु)",
      Russian: "(no cognate; uses koléno колено)",
      Irish: "glún ('knee', with l for n)",
      Persian: "zānū (زانو)",
      Lithuanian: "(no cognate; uses kelỹs)",
    },
    soundNotes:
      "PIE *ǵ > Germanic k (English knee), > Latin g (genū), > Greek g (gónu), > Sanskrit j (jā́nu), > Persian z (zānū) — the last two showing satem palatalisation. English knee still spells the old kn- cluster although the k has been silent since the seventeenth century. Latin genū gives 'genuflect'.",
  },
  {
    pieRoot: "*seh₂ls",
    meaning: "salt",
    forms: {
      English: "salt (Old English sealt)",
      Latin: "sāl",
      Greek: "háls (ἅλς, 'salt, sea')",
      Sanskrit: "(no cognate; uses lavaṇá- लवण)",
      Russian: "sol' (соль)",
      Irish: "salann ('salt')",
      Persian: "(no cognate; uses namak نمک)",
      Lithuanian: "sólymas ('brine'; the everyday word druskà is unrelated)",
    },
    soundNotes:
      "Well preserved in the western branches: English salt, Latin sāl, Greek háls (with *s- > h-), Russian sol', Irish salann. The Indo-Iranian branch replaced it. English 'salary' comes from Latin salārium, an allowance for buying salt.",
  },
  {
    pieRoot: "*h₂eḱ-",
    meaning: "sharp, pointed",
    forms: {
      English: "edge (Old English ecg); also acid, acme, acute via Latin and Greek",
      Latin: "ācer ('sharp'); also aciēs 'edge', acidus 'sour'",
      Greek: "akmḗ (ἀκμή, 'point, peak')",
      Sanskrit: "áśri- (अश्रि, 'edge, corner')",
      Russian: "óstryj (острый, 'sharp', from *h₂eḱ-ro-)",
      Irish: "(no cognate)",
      Persian: "(no cognate)",
      Lithuanian: "aštrùs ('sharp'); akmuõ ('stone')",
    },
    soundNotes:
      "Balto-Slavic is instructive here: Russian óstryj and Lithuanian aštrùs show the expected satem sibilant, but Lithuanian akmuõ 'stone' keeps a velar. Such doublets are one of the reasons the satem shift is now treated as an areal wave rather than a clean branch-defining split. The semantic range 'sharp — edge — stone' reflects stone-tool vocabulary.",
    sources: ["Fortson 2010", "Derksen 2015"],
  },
  {
    pieRoot: "*gʷṓws",
    meaning: "cow, ox, cattle",
    forms: {
      English: "cow (Old English cū)",
      Latin: "bōs (stem bov-)",
      Greek: "boûs (βοῦς)",
      Sanskrit: "gáuḥ (गौः, stem go- गो)",
      Russian: "govjádina (говядина, 'beef', from *gʷow-)",
      Irish: "bó ('cow')",
      Persian: "gāv (گاو)",
      Lithuanian: "(no cognate; Latvian gùovs preserves it, Lithuanian uses kárvė)",
    },
    soundNotes:
      "PIE *gʷ > Germanic k (cow), > Sanskrit and Iranian g (gáuḥ, gāv), > Irish b (bó). Latin bōs and Greek boûs both show b- where Latin should have had v-, which is usually taken as evidence of dialect borrowing from a rustic Italic form. Cattle were the PIE unit of wealth; the compound *gʷow-kʷolos 'cow-herd' gives Greek boukólos and English 'bucolic'.",
  },
  {
    pieRoot: "*h₃ewis",
    meaning: "sheep",
    forms: {
      English: "ewe (Old English ēowu)",
      Latin: "ovis ('sheep')",
      Greek: "óïs (ὄϊς, 'sheep')",
      Sanskrit: "ávi- (अवि, 'sheep')",
      Russian: "ovcá (овца, 'sheep', with a diminutive suffix)",
      Irish: "oi (Old Irish, 'sheep')",
      Persian: "(no cognate; uses gusfand گوسفند)",
      Lithuanian: "avìs ('sheep')",
    },
    soundNotes:
      "A core pastoral term, kept in nearly every branch: English ewe, Latin ovis, Greek óïs, Sanskrit ávi-, Russian ovcá, Old Irish oi and Lithuanian avìs. Together with words for wool, weaving and milking, it shows that PIE speakers were secondary-products pastoralists.",
  },
  {
    pieRoot: "*swépnos",
    meaning: "sleep, dream",
    forms: {
      English: "swefn (Old English, 'dream, sleep'; Modern English 'sleep' is from another root)",
      Latin: "somnus ('sleep', from *swepnos)",
      Greek: "húpnos (ὕπνος, 'sleep'; cf. 'hypnosis')",
      Sanskrit: "svápna- (स्वप्न, 'sleep, dream')",
      Russian: "son (сон, 'sleep, dream', genitive sna)",
      Irish: "suan ('sleep', from *swopno-)",
      Persian: "xāb (خواب, 'sleep, dream', from *xwabna-)",
      Lithuanian: "sãpnas ('dream')",
    },
    soundNotes:
      "PIE *sw- is kept intact in Sanskrit svápna-. Latin lost *w (somnus), Greek lost both *s- and *w- (húpnos). Persian shows *sw- > xw-. That the same word covers 'sleep' and 'dream' across the family suggests PIE did not lexically separate the two.",
  },
  {
    pieRoot: "*wĺ̥kʷos",
    meaning: "wolf",
    forms: {
      English: "wolf (Old English wulf)",
      Latin: "lupus (irregular; probably borrowed from a rustic Italic dialect)",
      Greek: "lúkos (λύκος, with *w- > l-)",
      Sanskrit: "vṛ́ka- (वृक)",
      Russian: "volk (волк)",
      Irish: "(no cognate; uses faolchú, mac tíre)",
      Persian: "gorg (گرگ, with metathesis of the root consonants)",
      Lithuanian: "vil̃kas",
    },
    soundNotes:
      "English wolf, Russian volk and Lithuanian vil̃kas keep the initial *w-. Latin lupus and Greek lúkos are both irregular — lupus should have given *lucus, and the l- of both forms is usually explained as dissimilation or taboo distortion, which fits a dangerous animal. Sanskrit vṛ́ka- shows *l̥ > ṛ.",
  },
  {
    pieRoot: "*mus-",
    meaning: "mouse",
    forms: {
      English: "mouse (Old English mūs)",
      Latin: "mūs ('mouse')",
      Greek: "mŷs (μῦς, 'mouse'; also 'muscle')",
      Sanskrit: "mū́ṣ (मूष्, 'mouse, rat')",
      Russian: "myš' (мышь)",
      Irish: "(no cognate; uses luch)",
      Persian: "mūš (موش)",
      Lithuanian: "(no cognate; uses pelė̃)",
    },
    soundNotes:
      "One of the most stable words in the family: English mouse, Latin mūs, Greek mŷs, Sanskrit mū́ṣ, Russian myš' and Persian mūš are nearly identical after six thousand years, because *s between vowels and word-finally was rarely disturbed. Greek mŷs also meant 'muscle' — a flexing muscle looks like a mouse under the skin — which is why Latin mūsculus gives English 'muscle'.",
  },
  {
    pieRoot: "*sem-",
    meaning: "one, together",
    forms: {
      English: "same, some (Old English sam-, sum)",
      Latin: "semel ('once'); also similis 'similar', simplex 'simple'",
      Greek: "heîs (εἷς, 'one', from *sems); homós (ὁμός, 'same')",
      Sanskrit: "samá- (सम, 'same, equal')",
      Russian: "sam (сам, 'self, -self')",
      Irish: "samail ('likeness')",
      Persian: "ham (هم, 'together, also', from *sm̥-)",
      Lithuanian: "są-/sam- (prefix 'with, together')",
    },
    soundNotes:
      "PIE *sem- covers 'one', 'same' and 'together'. The zero grade *sm̥- gives Greek ha- (as in hápax 'once') and Persian ham-. Enormously productive in English through Latin: simple ('one-fold'), similar, simultaneous, assemble and ensemble.",
  },
  {
    pieRoot: "*dʰugh₂tḗr",
    meaning: "daughter",
    forms: {
      English: "daughter (Old English dohtor)",
      Latin: "(no cognate; uses fīlia)",
      Greek: "thugátēr (θυγάτηρ)",
      Sanskrit: "duhitṛ́ (दुहितृ)",
      Russian: "doč' (дочь)",
      Irish: "(no cognate; uses iníon, Old Irish ingen)",
      Persian: "doxtar (دختر)",
      Lithuanian: "duktė̃",
    },
    soundNotes:
      "PIE *dʰ > Germanic d (daughter), > Greek th (thugátēr). Sanskrit duhitṛ́ and Persian doxtar are transparent. Latin replaced the word with fīlia. The *-ter suffix is the same kinship suffix found in father, mother and brother.",
  },
  {
    pieRoot: "*sweḱuros",
    meaning: "father-in-law",
    forms: {
      English: "swēor (Old English, 'father-in-law'; lost in Modern English)",
      Latin: "socer ('father-in-law')",
      Greek: "hekurós (ἑκυρός, 'father-in-law')",
      Sanskrit: "śváśura- (श्वशुर)",
      Russian: "svëkor (свёкор, 'husband's father')",
      Irish: "(no cognate)",
      Persian: "xosor (خسر, 'father-in-law', archaic)",
      Lithuanian: "šẽšuras ('father-in-law')",
    },
    soundNotes:
      "PIE had an elaborate set of in-law terms on the husband's side only — father-in-law, mother-in-law, husband's brother, husband's sister — and none for the wife's kin. This asymmetry is strong evidence for patrilocal marriage, in which the bride moved into her husband's household. English replaced the inherited swēor with a compound.",
    sources: ["Mallory & Adams 2006", "Fortson 2010"],
  },
  {
    pieRoot: "*h₂eǵ-",
    meaning: "drive, lead",
    forms: {
      English: "acre (Old English æcer, from *h₂éǵros 'pasture, driving-land')",
      Latin: "agere ('to drive, do, act')",
      Greek: "ágō (ἄγω, 'I lead, drive')",
      Sanskrit: "ájati (अजति, 'drives')",
      Russian: "(no cognate)",
      Irish: "ad·aig (Old Irish, 'drives, impels')",
      Persian: "(no cognate; cf. Avestan az- 'to drive')",
      Lithuanian: "(no cognate)",
    },
    soundNotes:
      "The basic sense is 'to drive livestock', which fits a herding society; the derivative *h₂éǵros 'the land you drive the herds onto' gives Latin ager, Greek agrós and English acre. Latin agere is one of the most productive Latin roots in English: act, agent, agile, agitate, exact, examine and navigate. Greek ágō gives pedagogue, demagogue and synagogue.",
  },
  {
    pieRoot: "*bʰer-",
    meaning: "carry, bear",
    forms: {
      English: "bear (Old English beran, 'to carry')",
      Latin: "ferre ('to carry, bear')",
      Greek: "phérō (φέρω, 'I carry')",
      Sanskrit: "bhárati (भरति, 'carries')",
      Russian: "brat' (брать, 'to take'); berú (беру, 'I take')",
      Irish: "beirid (Old Irish, 'bears, carries')",
      Persian: "bordan (بردن, 'to carry, take')",
      Lithuanian: "ber̃ti ('to strew, pour', with a shift from 'carry' to 'pour out')",
    },
    soundNotes:
      "PIE *bʰ > Germanic b (bear), > Latin f (ferre), > Greek ph (phérō), > Sanskrit bh (bhárati) — a textbook demonstration of the voiced-aspirate reflexes. The root gives English bear, birth, burden and bier, plus the whole Latin -fer family: transfer, confer, fertile, differ, offer, prefer, refer and suffer.",
  },
  {
    pieRoot: "*deh₃-",
    meaning: "give",
    forms: {
      English: "(no cognate; 'donate', 'data' are Latin loans)",
      Latin: "dare ('to give'); dōnum 'gift'",
      Greek: "dídōmi (δίδωμι, 'I give'; reduplicated present)",
      Sanskrit: "dádāti (ददाति, 'gives'; reduplicated present)",
      Russian: "dat' (дать, 'to give')",
      Irish: "dán (Old Irish, 'gift', from *deh₃-no-)",
      Persian: "dādan (دادن, 'to give')",
      Lithuanian: "dúoti ('to give')",
    },
    soundNotes:
      "Greek and Sanskrit both keep the archaic reduplicated present (dí-dō-mi, dá-dā-ti), one of the strongest pieces of evidence for the shape of the PIE verb. Germanic lost the root, so English borrowed from Latin instead: donate, data, date, edition, add, render, tradition and betray all descend from dare or its compounds.",
  },
  {
    pieRoot: "*dyḗws",
    meaning: "sky, daylight, sky god",
    forms: {
      English: "Tuesday (Old English Tīwesdæg, 'Tīw's day'; Tīw < *deywos 'god')",
      Latin: "deus ('god'); diēs 'day'; Iuppiter < *Dyēu-ph₂ter 'Sky Father'",
      Greek: "Zeús (Ζεύς, the sky god); dîos (δῖος, 'divine')",
      Sanskrit: "Dyáus (द्यौस्, the sky god); devá- (देव, 'god')",
      Russian: "den' (день, 'day', from the same root via *dьnь)",
      Irish: "día ('god', from *deywos)",
      Persian: "dīv (دیو, 'demon', from *daiwa- 'god')",
      Lithuanian: "diẽvas ('god')",
    },
    soundNotes:
      "The clearest surviving PIE theonym. Latin Iuppiter, Sanskrit Dyáuṣ Pitā́ and Greek Zeû Páter are the same vocative phrase, 'O Sky Father'. Persian dīv shows a spectacular semantic reversal: when Zoroastrianism rejected the older daiva- gods, the word for 'god' became the word for 'demon'.",
    sources: ["Mallory & Adams 2006", "West 2007"],
  },
  {
    pieRoot: "*wekʷ-",
    meaning: "speak, utter; voice",
    forms: {
      English: "(no cognate; 'voice', 'vocal' are Latin loans)",
      Latin: "vōx ('voice', stem vōc-); vocāre 'to call'",
      Greek: "épos (ἔπος, 'word, utterance', from *wékʷ-os); eîpon (εἶπον, 'I said')",
      Sanskrit: "vā́c (वाच्, 'voice, speech'); vákti (वक्ति, 'speaks')",
      Russian: "(no cognate)",
      Irish: "focal ('word', from *wokʷ-tlo-)",
      Persian: "(no cognate; cf. Avestan vac- 'to speak')",
      Lithuanian: "(no cognate)",
    },
    soundNotes:
      "The root consonant is the labiovelar *kʷ, not the palatovelar *ḱ: a palatal would have given a sibilant in Indo-Iranian, whereas Sanskrit has vā́c with a velar-derived c, exactly as expected from *kʷ before a front vowel. Greek épos < *wékʷ-os shows the regular Greek loss of *w- and the treatment *kʷ > p. Not to be confused with *wérdʰh₁om 'word' — see the separate entry.",
    sources: ["Fortson 2010", "de Vaan 2008"],
  },
  {
    pieRoot: "*h₂ŕ̥ǵn̥tom",
    meaning: "silver",
    forms: {
      English: "(no cognate; 'argent' is a French/Latin loan)",
      Latin: "argentum ('silver'; cf. Argentina, 'land of silver')",
      Greek: "árguros (ἄργυρος, 'silver')",
      Sanskrit: "rajatá- (रजत, 'silver; white, bright')",
      Russian: "(no cognate; uses serebró серебро)",
      Irish: "airgead ('silver, money')",
      Persian: "(no cognate; uses noqre نقره)",
      Lithuanian: "(no cognate; uses sidãbras, a Wanderwort shared with Slavic and Germanic)",
    },
    soundNotes:
      "From PIE *h₂erǵ- 'white, shining' — silver named as 'the shining metal'. The palatovelar *ǵ gives Latin g and Greek g (centum) against Sanskrit j (satem). Germanic, Balto-Slavic and Iranian all replaced the word, and the Germanic/Balto-Slavic 'silver' word (silver, sidãbras, serebró) has no accepted PIE etymology at all — a likely borrowing from a non-IE source.",
    sources: ["Mallory & Adams 2006"],
  },
  {
    pieRoot: "*néh₂s",
    meaning: "nose",
    forms: {
      English: "nose (Old English nosu)",
      Latin: "nāsus ('nose')",
      Greek: "(no cognate; uses rhís ῥίς, stem rhīn-)",
      Sanskrit: "nā́sā (नासा, 'nose', originally a dual 'the two nostrils')",
      Russian: "nos (нос)",
      Irish: "(no cognate; uses srón)",
      Persian: "(no cognate; uses bīnī بینی)",
      Lithuanian: "nósis ('nose')",
    },
    soundNotes:
      "English nose, Latin nāsus, Sanskrit nā́sā, Russian nos and Lithuanian nósis all derive transparently from *néh₂s, with the laryngeal lengthening the vowel. The Sanskrit form is originally a dual, 'the pair of nostrils'. English 'nostril' is nose-thirl, 'nose-hole'.",
  },
  {
    pieRoot: "*h₃nébʰos",
    meaning: "cloud, mist, sky",
    forms: {
      English: "(no cognate; 'nebula' is a Latin loan)",
      Latin: "nebula ('mist, cloud')",
      Greek: "néphos (νέφος, 'cloud')",
      Sanskrit: "nábhas- (नभस्, 'cloud, sky')",
      Russian: "nébo (небо, 'sky, heaven')",
      Irish: "nem (Old Irish, 'sky, heaven')",
      Persian: "abr (ابر, 'cloud'; Avestan aβra-, probably from this root)",
      Lithuanian: "debesìs ('cloud', with irregular d- for n-)",
    },
    soundNotes:
      "The meaning drifts between 'cloud' (Latin, Greek, Lithuanian) and 'sky, heaven' (Slavic, Celtic, Indic) — a reminder that PIE 'sky' was conceived as the cloud-cover rather than as empty space. PIE *bʰ > Latin b, Greek ph, Sanskrit bh.",
  },
  {
    pieRoot: "*weid-",
    meaning: "see; know (by having seen)",
    forms: {
      English: "wit, wise, witness (Old English witan, 'to know')",
      Latin: "vidēre ('to see'; vīsus 'seen')",
      Greek: "eîdon (εἶδον, 'I saw'); oîda (οἶδα, 'I know'); idéa (ἰδέα, 'form')",
      Sanskrit: "véda (वेद, 'I know; knowledge'); vidyā́ (विद्या, 'knowledge')",
      Russian: "vídet' (видеть, 'to see')",
      Irish: "fiss (Old Irish, 'knowledge', from *wid-tu-)",
      Persian: "dīdan (دیدن, 'to see')",
      Lithuanian: "véizdėti ('to look at'); véidas ('face', 'what is seen')",
    },
    soundNotes:
      "The perfect of this root literally means 'I have seen' and so 'I know' — Greek oîda and Sanskrit véda are the same form, and the Vedas are simply 'the knowledge'. Latin vidēre gives English video, evidence, provide and vision; Greek idéa gives idea and idol; the native Germanic side gives wit, wise, wisdom and guide.",
  },
  {
    pieRoot: "*peh₂-",
    meaning: "protect, feed, shepherd",
    forms: {
      English: "food, feed, foster (Old English fōda, fēdan)",
      Latin: "pāscō ('I feed, graze'); pāstor 'shepherd'; pānis 'bread'",
      Greek: "patéomai (πατέομαι, 'I eat, feed on')",
      Sanskrit: "pā́ti (पाति, 'protects, guards')",
      Russian: "pastí (пасти, 'to graze, to herd')",
      Irish: "(no cognate)",
      Persian: "(no cognate; cf. Old Persian pā- 'to protect')",
      Lithuanian: "piemuõ ('shepherd', from *poh₂i-men-, matching Greek poimḗn)",
    },
    soundNotes:
      "PIE *p > Germanic f (food, feed, foster). Latin keeps *p (pāscō, pāstor, pānis). The semantic bundle 'protect / feed / herd' is a single idea in a pastoral society: to guard the flock is to feed it. Latin pāstor gives English 'pastor', the shepherd of a congregation. (Sanskrit paśú- 'cattle' belongs to a different root, *peḱu-.)",
  },
  {
    pieRoot: "*h₂eḱs-",
    meaning: "axle",
    forms: {
      English: "axle (Old English eax)",
      Latin: "axis ('axle, axis')",
      Greek: "áxōn (ἄξων, 'axle')",
      Sanskrit: "ákṣa- (अक्ष, 'axle')",
      Russian: "os' (ось, 'axis, axle')",
      Irish: "ais ('axle', from *aksi-)",
      Persian: "(no cognate)",
      Lithuanian: "ašìs ('axle')",
    },
    soundNotes:
      "A key technological term. Cognates for 'axle', 'wheel', 'yoke' and 'to convey in a vehicle' are all reconstructible for PIE, which places the proto-language no earlier than the spread of wheeled vehicles around 3500 BCE. The palatovelar shows the satem/centum split again: Sanskrit kṣ and Lithuanian š against Latin and Greek ks.",
    sources: ["Anthony 2007", "Mallory & Adams 2006"],
  },
  {
    pieRoot: "*bʰeh₂ǵos",
    meaning: "beech (tree)",
    forms: {
      English: "beech (Old English bēce)",
      Latin: "fāgus ('beech')",
      Greek: "phēgós (φηγός, Doric phāgós, 'a kind of edible oak')",
      Sanskrit: "(no cognate)",
      Russian:
        "(no cognate; buziná бузина 'elder' has been equated with this root, but the comparison is phonologically and semantically doubtful and is not generally accepted)",
      Irish: "(no cognate)",
      Persian: "(no cognate)",
      Lithuanian: "(no cognate)",
    },
    soundNotes:
      "Famous for the 'beech argument': because the common beech does not grow east of a line through Poland and Ukraine, the presence of a PIE beech-word was once used to place the homeland west of that line. The argument is now regarded as unreliable, since tree names shift referent readily — the Greek reflex already denotes an oak, not a beech — and the eastern comparanda offered for the word are themselves disputed.",
    sources: ["Mallory & Adams 2006", "Fortson 2010", "Anthony 2007"],
  },
  {
    pieRoot: "*h₃reǵ-",
    meaning: "straighten, rule; king",
    forms: {
      English: "right (Old English riht, 'straight, correct'); 'rich' is from Germanic *rīkja-, probably a Celtic loan",
      Latin: "rēx ('king', stem rēg-); regere 'to rule'; regnum 'kingdom'",
      Greek: "(no cognate meaning 'king'; cf. orégō ὀρέγω 'I stretch out')",
      Sanskrit: "rā́j- (राज्, 'king'); rā́jan- (राजन्); rājá- (राज)",
      Russian: "(no cognate)",
      Irish: "rí ('king', Old Irish rí, genitive ríg)",
      Persian: "(no cognate; uses šāh شاه, from Old Persian xšāyaθiya-)",
      Lithuanian: "(no cognate)",
    },
    soundNotes:
      "The laryngeal is *h₃, as the o-vocalism of Greek orégō shows. Latin rēx, Sanskrit rā́j- and Old Irish rí are the classic 'Italo-Celtic and Indic' isogloss for kingship, and the shared archaism has been used to argue that the institution itself is inherited. The semantic path runs 'to move in a straight line' > 'to direct' > 'ruler'. Latin rēx gives regal, royal, reign, regulate, region, erect, correct and direct.",
    sources: ["Mallory & Adams 2006", "de Vaan 2008"],
  },
  {
    pieRoot: "*gʷʰer-",
    meaning: "warm, hot",
    forms: {
      English: "warm (Old English wearm, from *gʷʰer-mo-)",
      Latin: "formus ('warm'); fornāx 'furnace'",
      Greek: "thermós (θερμός, 'hot, warm')",
      Sanskrit: "gharmá- (घर्म, 'heat, hot season')",
      Russian: "gorjáčij (горячий, 'hot'; gorét' гореть 'to burn')",
      Irish: "gor (Old Irish, 'heat')",
      Persian: "garm (گرم, 'warm, hot')",
      Lithuanian: "gãras ('steam, vapour')",
    },
    soundNotes:
      "The aspirated labiovelar *gʷʰ has one of the widest ranges of reflexes in the family: > Germanic w (warm), > Latin f (formus), > Greek th (thermós), > Sanskrit gh (gharmá-), > Iranian g (garm), > Slavic g (gorét'). English warm and Greek thermós look nothing alike yet are the same word. Greek thermós gives thermal, thermometer and thermos; Latin fornāx gives furnace.",
  },
  {
    pieRoot: "*dem-/*dóm-",
    meaning: "house, household",
    forms: {
      English: "timber (Old English timber, 'building material')",
      Latin: "domus ('house, home')",
      Greek: "dómos (δόμος, 'house'); despótēs (δεσπότης, 'master of the house')",
      Sanskrit: "dáma- (दम, 'house, home')",
      Russian: "dom (дом, 'house')",
      Irish: "(no cognate; Old Irish damnae 'material' is sometimes compared)",
      Persian: "(no cognate; uses xāne خانه)",
      Lithuanian: "nãmas ('house', with irregular n- for d-)",
    },
    soundNotes:
      "Latin domus, Greek dómos, Sanskrit dáma- and Russian dom are almost identical. English timber comes from the same root by a shift from 'house' to 'what a house is built of' — the Germanic verb behind it, *timrōną, meant 'to build'. Greek despótēs (> English 'despot') is literally *dems-potis, 'master of the house'.",
  },
  {
    pieRoot: "*leyp-",
    meaning: "stick, smear, fat",
    forms: {
      English: "live, life (Old English lifian, līf; Germanic *lib- 'to remain')",
      Latin: "(no cognate)",
      Greek: "lípos (λίπος, 'fat, grease'; cf. 'lipid')",
      Sanskrit: "limpáti (लिम्पति, 'smears, anoints')",
      Russian: "lípnut' (липнуть, 'to stick')",
      Irish: "(no cognate)",
      Persian: "(no cognate)",
      Lithuanian: "lìpti ('to stick, cling')",
    },
    soundNotes:
      "A striking case of semantic divergence from one root. English life and live go back to 'to stick, to remain' and so 'to persist'. Greek lípos 'fat' (> lipid, liposuction) reflects the greasy, smearing sense. Russian lípnut' and Lithuanian lìpti keep the concrete meaning 'to stick'.",
  },
  {
    pieRoot: "*ǵerh₂-",
    meaning: "grow old, ripen; grain",
    forms: {
      English: "corn (Old English corn, from *ǵr̥h₂-no-)",
      Latin: "grānum ('grain, seed')",
      Greek: "gérōn (γέρων, 'old man')",
      Sanskrit: "jīrṇá- (जीर्ण, 'old, worn out')",
      Russian: "zernó (зерно, 'grain, seed')",
      Irish: "grán ('grain')",
      Persian: "(no cognate; cf. Avestan zaurvan- 'old age')",
      Lithuanian: "žìrnis ('pea', from *ǵr̥h₂-ni-)",
    },
    soundNotes:
      "The palatovelar is *ǵ, as the satem reflexes show: Sanskrit j (jīrṇá-), Russian z (zernó), Lithuanian ž (žìrnis) against Latin g (grānum) and Greek g (gérōn). The root means 'to ripen, to become worn'; a ripened seed is *ǵr̥h₂-nom (grain), a worn-out person is *ǵerh₂-ōn (Greek gérōn, behind 'geriatric'). English 'grow' belongs to a different root and is not related.",
  },
  {
    pieRoot: "*ǵʰans-",
    meaning: "goose",
    forms: {
      English: "goose (Old English gōs)",
      Latin: "ānser ('goose', with loss of the initial velar)",
      Greek: "khḗn (χήν, 'goose')",
      Sanskrit: "haṁsá- (हंस, 'goose, swan')",
      Russian: "gus' (гусь, 'goose')",
      Irish: "gé ('goose', Old Irish géd)",
      Persian: "qāz (غاز, 'goose'; whether this form is inherited or borrowed is uncertain)",
      Lithuanian: "žąsìs ('goose')",
    },
    soundNotes:
      "PIE *ǵʰ > Germanic g (goose), > Greek kh (khḗn), > Sanskrit h (haṁsá-), > Slavic g (gus'), > Lithuanian ž (žąsìs). Latin ānser lost the initial velar altogether. The word is probably imitative in origin. Sanskrit haṁsá- became a religious term, the swan-soul of Hindu and Buddhist symbolism.",
  },
  {
    pieRoot: "*pisk-",
    meaning: "fish",
    forms: {
      English: "fish (Old English fisc)",
      Latin: "piscis ('fish')",
      Greek: "(no cognate; uses ikhthús ἰχθύς)",
      Sanskrit: "(no cognate; uses mátsya- मत्स्य)",
      Russian: "(no cognate; uses rýba рыба)",
      Irish: "iasc ('fish', from *pisko-)",
      Persian: "(no cognate; uses māhī ماهی)",
      Lithuanian: "(no cognate; uses žuvìs)",
    },
    soundNotes:
      "A western word only: Italic, Celtic and Germanic. PIE *p > Germanic f (fish); Celtic lost *p- entirely (Irish iasc). Because the eastern branches all use unrelated words, some hold that PIE had no single inherited 'fish' term — which fits a homeland where fishing was marginal to a pastoral economy.",
    sources: ["Mallory & Adams 2006", "Matasović 2009"],
  },
  {
    pieRoot: "*wérdʰh₁om",
    meaning: "word, spoken utterance",
    forms: {
      English: "word (Old English word; Gothic waúrd)",
      Latin: "verbum ('word', from *werdʰ-o-m, with *dʰ > b between vowels)",
      Greek: "(no cognate; cf. eírō εἴρω 'I say', from the related root *werh₁-)",
      Sanskrit: "(no cognate; vratá- व्रत 'vow, command' has been compared, but its etymology is disputed)",
      Russian: "(no cognate)",
      Irish: "(no cognate; focal 'word' belongs to *wekʷ- — see the 'speak, voice' entry)",
      Persian: "(no cognate)",
      Lithuanian: "var̃das ('name')",
    },
    soundNotes:
      "This is a different root from *wekʷ- 'to speak, voice', with which it is often confused: English word, Latin verbum and Lithuanian var̃das all require a dental *-dʰ-, which *wekʷ- cannot supply. Latin verbum shows the regular Italic change of *-dʰ- to -b- between vowels (not rhotacism, which affects *s). Lithuanian var̃das is best placed here rather than with *h₁nómn̥ 'name', where its d cannot be explained.",
    sources: ["Fortson 2010", "de Vaan 2008", "Derksen 2015"],
  },
  {
    pieRoot: "*dʰer-",
    meaning: "hold, support",
    forms: {
      English: "(no cognate; 'firm', 'affirm', 'confirm' are Latin loans)",
      Latin: "firmus ('firm, strong', from *dʰer-mo-)",
      Greek: "thrónos (θρόνος, 'seat, throne', literally 'support')",
      Sanskrit: "dhāráyati (धारयति, 'holds, supports'); dhárma- धर्म",
      Russian: "deržát' (держать, 'to hold')",
      Irish: "(no cognate)",
      Persian: "dāštan (داشتن, 'to have, hold')",
      Lithuanian: "(no cognate)",
    },
    soundNotes:
      "PIE *dʰ > Latin f (firmus), > Greek th (thrónos), > Sanskrit dh (dhāráyati), > Slavic d (deržát'). Greek thrónos, behind English 'throne', originally meant simply 'a support'. Sanskrit dhárma- 'law, duty' is from the same root — literally 'that which holds things together'.",
  },
  {
    pieRoot: "*leuk-",
    meaning: "light, brightness",
    forms: {
      English: "light (Old English lēoht)",
      Latin: "lūx ('light', stem lūc-); lūcēre 'to shine'; lūna 'moon'",
      Greek: "leukós (λευκός, 'white, bright')",
      Sanskrit: "roká- (रोक, 'light'); rúc- (रुच्, 'to shine')",
      Russian: "luč (луч, 'ray of light')",
      Irish: "lóchet (Old Irish, 'lightning')",
      Persian: "rūz (روز, 'day', from *rauča-)",
      Lithuanian: "laũkas ('with a white blaze', of animals)",
    },
    soundNotes:
      "English light, Latin lūx, Greek leukós and Russian luč all descend transparently from *leuk-. Indo-Iranian shows the regular *l > r (roká-, rūz). Latin lūna is *louk-s-nā, 'the shining one'. Greek leukós gives 'leukaemia' ('white blood'); Latin lūx gives lucid, translucent and elucidate.",
  },
  {
    pieRoot: "*ḱlew-",
    meaning: "hear; fame",
    forms: {
      English: "loud (Old English hlūd, from *ḱlu-tós 'heard')",
      Latin: "cluēre ('to be spoken of'); inclutus 'renowned'",
      Greek: "kléos (κλέος, 'fame, glory', literally 'what is heard')",
      Sanskrit: "śrávas- (श्रवस्, 'fame, glory'); śṛṇóti (शृणोति, 'hears')",
      Russian: "sláva (слава, 'glory, fame')",
      Irish: "clú ('fame, reputation')",
      Persian: "(no cognate; cf. Avestan sraoša- 'hearing, obedience')",
      Lithuanian: "klausýti ('to listen, to obey')",
    },
    soundNotes:
      "The link between hearing and fame — fame is what is heard about you — runs through the whole family. Greek kléos áphthiton 'imperishable fame' and Vedic śrávas ákṣitam are word-for-word matches, and are the strongest evidence that Homeric and Vedic poetry inherit a common formulaic tradition. Names built on the root are everywhere: Cleopatra ('glory of her father'), Heracles ('glory of Hera'), Slavic Vladislav, Sanskrit Sundaraśravas. (The derivation of the ethnonym 'Slav' from sláva is popular but not certain; a derivation from slovo 'word' is also proposed.)",
    sources: ["West 2007", "Watkins 1995", "Mallory & Adams 2006"],
  },
];
