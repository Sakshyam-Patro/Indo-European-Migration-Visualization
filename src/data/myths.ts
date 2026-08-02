/**
 * How securely a given tradition's evidence supports the connection it is listed under.
 * - "strong": inherited word or formula, or a narrative attested early and independently.
 * - "moderate": good evidence, but functional/typological rather than etymological, or attested late.
 * - "contested": the attribution, the etymology, or the source itself is disputed in the literature.
 * Optional and additive: an entry without a rating is simply unrated.
 */
export type MythConfidence = "strong" | "moderate" | "contested";

export interface MythCulture {
  culture: string;
  deity: string;
  details: string;
  confidence?: MythConfidence;
}

export interface MythConnection {
  id: string;
  name: string;
  description: string;
  cultures: MythCulture[];
  category: "deity" | "motif" | "ritual" | "cosmology";
  /** Structured citations. Primary sources are given by work and locus; modern works by author, year, title. */
  sources?: string[];
}

export const mythConnections: MythConnection[] = [
  {
    id: "sky-father",
    name: "Sky Father (*Dyḗus ph₂tḗr)",
    description:
      "The reconstructed Proto-Indo-European sky deity, whose name derives from the PIE root *dyew- 'to shine, sky'. This figure presided over the daylit sky and was invoked as a father god. The correspondence of both the theonym and the two-word formula across Indo-Iranian, Greek, Italic and (as a gloss) Illyrian is one of the strongest single pieces of evidence for a shared PIE religious vocabulary. In most daughter traditions the deity retained associations with celestial authority, oaths and cosmic order, though his prominence shifted sharply as local pantheons developed — from supreme in Greece to nearly forgotten in India.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Dyáuṣ Pitā́",
        confidence: "strong",
        details:
          "Literally 'Sky Father', Dyáuṣ Pitā́ appears in the Rigveda as an ancient but already faded deity, paired with Pṛthivī Mātā (Earth Mother) as a primordial couple. He is no longer the chief god by the Rigvedic period, having been overshadowed by Indra and Varuṇa, but his name preserves the PIE formula most faithfully. RV 1.89.4 sets the two side by side in exactly the inherited shape: mātā́ pṛthivī́ … pitā́ dyaúḥ, 'Mother Earth … Father Sky'.",
      },
      {
        culture: "Greek",
        deity: "Zeus Patḗr",
        confidence: "strong",
        details:
          "Zeus is the direct Greek reflex of *Dyḗus, attested already in Mycenaean Greek (Linear B dative di-we, 'to Zeus'). The vocative Zeû páter matches the reconstructed PIE address *Dyeu ph₂ter almost segment for segment. Zeus became the supreme Olympian, ruling gods and mortals, wielding the thunderbolt and presiding over xenía (guest-right) and oaths — an elevation that contrasts sharply with the Vedic demotion of Dyáuṣ.",
      },
      {
        culture: "Roman",
        deity: "Iūpiter (Diēspiter)",
        confidence: "strong",
        details:
          "Latin Iūpiter continues the archaic vocative *Dyeu-pater, with the regular Italic development of *dy- to i̯-. The variant Diēspiter shows the same compound built on the oblique stem and makes the derivation transparent. Jupiter was the supreme deity of Roman state religion, associated with sky, lightning and sovereign authority, and his Capitoline temple was the centre of Roman civic cult.",
      },
      {
        culture: "Germanic",
        deity: "Tīwaz / Týr",
        confidence: "moderate",
        details:
          "Proto-Germanic *Tīwaz continues not the theonym *Dyḗus itself but the derived adjective *deywós 'celestial one', and is reflected in Old Norse Týr, Old English Tīw and Old High German Zīu. By the Norse period Týr had been reduced to a god of war and legal procedure, overshadowed by Óðinn and Þórr; he survives in the weekday name (Old English Tīwesdæg, 'Tuesday'). The loss of his hand to the wolf Fenrir is often read as a myth about the cost of upholding a sworn order, though that reading is interpretive rather than attested.",
      },
      {
        culture: "Illyrian (Hesychius' gloss)",
        deity: "Deipátyros (Δειπάτυρος)",
        confidence: "contested",
        details:
          "The lexicographer Hesychius glosses Δειπάτυρος as a god worshipped among the Stymphaioi, an Epirote people — transparently 'Sky Father' and an independent witness to the PIE formula. Note that this is a single late lexicon entry, not an inscription, and the language behind it (usually labelled Illyrian, sometimes compared with Messapic) is too poorly documented for the attribution to be certain.",
      },
    ],
    category: "deity",
    sources: [
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 25",
      "West 2007, Indo-European Poetry and Myth, ch. 4",
      "Hesychius, Lexicon s.v. Δειπάτυρος",
      "de Vaan 2008, Etymological Dictionary of Latin and the other Italic Languages, s.v. Iuppiter",
    ],
  },
  {
    id: "dawn-goddess",
    name: "Dawn Goddess (*H₂éusōs)",
    description:
      "The PIE goddess of the dawn, reconstructed as *h₂éusōs (root *h₂ews- 'to shine, of the reddish dawn light'). She is among the most securely reconstructed PIE deities, with cognate names in Indo-Iranian, Greek, Italic, Germanic and Baltic. Comparative work associates her with youth, beauty and erotic pursuit, and with the inherited epithet 'daughter of the sky' (*dʰugh₂tḗr diwós), matched exactly by Vedic divó duhitā́ and Greek thugátēr Diós. Several traditions preserve narratives of her love affairs with mortals or of her reluctance to yield the sky.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Uṣás",
        confidence: "strong",
        details:
          "Uṣás is celebrated in roughly twenty hymns of the Rigveda, more than almost any other goddess. She is a beautiful young woman, the 'daughter of heaven' (divó duhitā́), who drives away darkness with a radiant chariot drawn by reddish horses or cows. She is 'ever-young' though she makes mortals grow old — a paradox the Rigvedic poets develop in some of the most lyrical passages in the corpus.",
      },
      {
        culture: "Greek",
        deity: "Ēṓs",
        confidence: "strong",
        details:
          "Ēṓs (Homeric Ἠώς, Aeolic αὔως, Doric ἀώς) is the 'rosy-fingered' dawn (rhododáktylos Ēṓs), daughter of the Titan Hyperion and sister of Helios and Selene. She is known for abducting mortal men, including Tithōnos (for whom she won immortality but not eternal youth) and Kephalos. The Aeolic form αὔως still shows the *-u- of *h₂éusōs; the Ionic-Attic forms result from regular loss of intervocalic *-s- and the vocalisation of the initial laryngeal sequence *h₂e-.",
      },
      {
        culture: "Roman",
        deity: "Aurōra",
        confidence: "strong",
        details:
          "Latin Aurōra continues an Italic derivative of the same stem, with regular rhotacism of intervocalic *-s- (*ausōs- > aurōr-). She was equated with Greek Ēṓs in the interpretatio Romana and inherits the same association with erotic pursuit of mortal youths, notably Cephalus.",
      },
      {
        culture: "Germanic",
        deity: "Ēostre / *Austrōn-",
        confidence: "contested",
        details:
          "Bede (De Temporum Ratione 15, 8th century) records that the Anglo-Saxon month Ēosturmōnaþ (April) was named after a goddess Ēostre, to whom feasts were held; modern English 'Easter' preserves the name. The formal link to Proto-Germanic *austrōn- and thus to *h₂ews- is straightforward, but the identification as an inherited dawn goddess is not settled: Bede is the sole literary witness, and Shaw (2011) argues that Ēostre may have been a local or group-linked goddess whose name relates to 'east' rather than to the PIE dawn. The Rhineland Matronae Austriahenae inscriptions are sometimes adduced but are not evidence for a dawn myth.",
      },
      {
        culture: "Baltic",
        deity: "Aušrinė / Auseklis",
        confidence: "moderate",
        details:
          "Lithuanian Aušrinė is the dawn or morning-star goddess, from the same root *h₂ews-, appearing in Lithuanian folk songs (dainos) as a celestial maiden identified with Venus as morning star. Latvian preserves a cognate in Auseklis, the morning star, grammatically masculine but functionally similar. The etymology is secure; the mythological detail comes from folk-song collections of the 18th century onward, so the narrative content is late even where the name is old.",
      },
    ],
    category: "deity",
    sources: [
      "Bede, De Temporum Ratione 15",
      "Shaw 2011, Pagan Goddesses in the Early Germanic World",
      "West 2007, Indo-European Poetry and Myth, ch. 6",
      "Jackson 2002, 'Light from Distant Asterisks: Towards a Description of the Indo-European Religious Heritage', Numen 49",
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 25",
    ],
  },
  {
    id: "divine-twins",
    name: "Divine Twins (*Diwós sunū́)",
    description:
      "The PIE Divine Twins, reconstructed as 'sons of the sky god', are a pair of young horseman-gods associated with the morning and evening star, rescue at sea, horsemanship and healing. They stand in a special relationship to a Sun Maiden, whom they court or rescue; the maiden's title is preserved as Vedic duhitā́ Sū́ryasya and Latvian Saules meita, both literally 'daughter of the Sun'. The twin dossier is one of the most detailed in comparative IE mythology. A Celtic reflex has been proposed — Irish Macha, who races horses while pregnant and bears twins, and Welsh Pryderi, linked to a colt from birth — but that material is structurally distant and is not included below as a witness on the same footing as the others.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Aśvínau (the Ashvins)",
        confidence: "strong",
        details:
          "The Aśvínau ('the two Horsemen'), also called Nā́satyā and epithetically Dasrā ('the wondrous ones'), are twin gods of the Rigveda, called divó nápātā ('descendants of Dyaus'). They are the physicians of the gods and rescuers of those in distress, travelling in a three-wheeled chariot at dawn and dusk, and associated with honey (mádhu). They court the Sun Maiden Sūryā. More than fifty Rigvedic hymns are addressed to them.",
      },
      {
        culture: "Greek",
        deity: "Dióskouroi (Kástōr & Poludeúkēs)",
        confidence: "strong",
        details:
          "The Dióskouroi ('sons of Zeus'), Kástōr and Poludeúkēs (Latin Castor and Pollux), are the sons of Leda; in the standard version only Poludeúkēs is fathered by Zeus, Kástōr being the son of Tyndareus, which is what makes one twin mortal and the other immortal. They are horsemen (Kástōr hippódamos, 'horse-tamer'), rescuers at sea (St Elmo's fire was credited to them), and the constellation Gemini. Their alternation between life and death parallels the morning/evening star pairing found elsewhere.",
      },
      {
        culture: "Germanic",
        deity: "Alcis; the Haddingjar",
        confidence: "contested",
        details:
          "Tacitus (Germania 43) reports that the Naharvali worshipped a pair of divine brothers, the Alcis, in a sacred grove tended by a priest in women's dress, and identifies them with Castor and Pollux by interpretatio Romana. The name has been connected to *h₂elk- 'to ward off' and, alternatively, to Gothic alhs 'temple' / Lithuanian alkas 'sacred grove'; neither is decisive. Ward (1968) further proposed the Norse Haddingjar, a pair of brothers in later saga tradition, as a Germanic continuation — a suggestion that remains speculative.",
      },
      {
        culture: "Baltic",
        deity: "Dieva dēli (Sons of God)",
        confidence: "moderate",
        details:
          "Latvian folk songs (dainas) repeatedly name the Dieva dēli ('sons of Dievs'), who court the Saules meita ('daughter of the Sun') and ride across the sky, matching the Vedic Ashvins courting Sūryā closely enough that the parallel is widely accepted. Lithuanian tradition has a comparable pair (Dievo sūneliai) but attests them far more thinly. As with all Baltic material, the songs were collected in the modern period, so antiquity is inferred from the structure rather than documented.",
      },
    ],
    category: "deity",
    sources: [
      "Ward 1968, The Divine Twins: An Indo-European Myth in Germanic Tradition",
      "Tacitus, Germania 43",
      "West 2007, Indo-European Poetry and Myth, ch. 5",
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 25",
    ],
  },
  {
    id: "thunder-god",
    name: "Thunder God (*Perkʷunos)",
    description:
      "A thunder-wielding warrior deity who strikes serpentine or chaotic adversaries recurs across IE traditions. A theonym *Perkʷunos (connected either with *perkʷu- 'oak' or with *per- 'to strike') is securely reconstructible only for Baltic, with Slavic and Germanic *Fjǫrgyn- offering partial and disputed support; elsewhere the correspondence is functional rather than etymological. Where attested, this god is a champion of order against chaos and a bringer of storm, rain and the fertility that follows. He is normally distinct from the Sky Father — Greek is the notable exception, where Zeus absorbed the thunderer's role entirely (keraunós, epithets Keraúnios, Brontaîos, Astrapaîos), which is why Greece supplies no separate witness here.",
    cultures: [
      {
        culture: "Norse (Germanic)",
        deity: "Þórr (Thor)",
        confidence: "moderate",
        details:
          "Þórr, son of Óðinn and of Jǫrð ('Earth'), wields the hammer Mjǫllnir and defends Miðgarðr against the jǫtnar. His name continues Proto-Germanic *Þunraz 'thunder' (the same root as Latin tonitrus), not *Perkʷunos, so the match with the Baltic god is one of function, not of name. He rides a chariot drawn by two goats, Tanngrisnir and Tanngnjóstr; his great adversary is the world serpent Jǫrmungandr, whom he kills and is killed by at Ragnarǫk. Old Norse Þórsdagr gives English 'Thursday'. The Germanic figure that does formally match *Perkʷunos is the obscure Fjǫrgyn/Fjǫrgynn, named as Þórr's mother.",
      },
      {
        culture: "Slavic",
        deity: "Perun",
        confidence: "contested",
        details:
          "Perun is the chief thunder god of the pre-Christian Slavs, associated with oaks, eagles and high places. The Rus' Primary Chronicle records that Vladimir raised an idol of Perun with a silver head and golden moustache at Kiev, and the Rus'-Byzantine treaty oaths invoke him. His name is very widely equated with *Perkʷunos, but the equation is phonologically problematic, not regular: no Slavic sound law removes the velar of *perkʷ-, and the loss is precisely what the debate is about. Many etymologists therefore derive Perunъ from the Slavic root *per- 'to strike' with the suffix -unъ, treating any relation to *Perkʷunos as reshaping rather than direct descent. The equation is plausible and popular; it is not demonstrated.",
      },
      {
        culture: "Baltic",
        deity: "Perkūnas",
        confidence: "strong",
        details:
          "Lithuanian Perkūnas (Latvian Pērkons) is the one theonym that continues *Perkʷunos without difficulty, and is the anchor of the whole reconstruction. He is the god of thunder, lightning, rain and the oak. Baltic folk tradition shows him as a fierce axe-wielding figure who strikes the devil (velnias) hiding in trees, stones and animals. Lithuanian perkūnija 'thunderstorm' is built on his name, oak groves were sacred to him, and he is among the most prominent figures in the dainos.",
      },
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Indra",
        confidence: "moderate",
        details:
          "Indra is king of the gods in the Rigveda, receiving roughly 250 hymns, more than any other deity. He wields the vajra (thunderbolt, fashioned by the craftsman Tvaṣṭṛ), rides a chariot, and is the warrior who split the serpent Vṛtrá to release the waters. His name has no connection to *Perkʷunos; the correspondence is purely functional — the thunder-wielding, serpent-slaying champion of order — and it is the myth, not the theonym, that carries the comparative weight.",
      },
    ],
    category: "deity",
    sources: [
      "Rus' Primary Chronicle (Povest' vremennykh let), s.a. 6415 and 6488",
      "Derksen 2008, Etymological Dictionary of the Slavic Inherited Lexicon, s.v. *Perunъ",
      "Vasmer, Russisches etymologisches Wörterbuch, s.v. Перун",
      "West 2007, Indo-European Poetry and Myth, ch. 6",
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 25",
    ],
  },
  {
    id: "dragon-serpent-slayer",
    name: "Dragon/Serpent Slayer Myth",
    description:
      "A hero, often the thunder god, battles and slays a serpent or dragon that has blocked or stolen the cosmic waters or cattle. Calvert Watkins (1995) reconstructed not just the story but its verbal formula — a basic sentence 'HERO SLEW SERPENT', PIE *(h₁e)gʷʰent h₁ógʷʰim — traceable through Vedic áhann áhim, Avestan janat̰ ažīm, Greek and Hittite reflexes. The myth encodes a struggle between order (the hero, the released waters) and obstruction (the serpent who hoards). Because the evidence is lexical and formulaic rather than merely thematic, this is among the most confidently reconstructed PIE narratives.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Indra vs. Vṛtrá",
        confidence: "strong",
        details:
          "The keystone version: Indra, strengthened by soma, strikes the serpent Vṛtrá ('the Obstruction') with the vajra, splitting him open and releasing the pent-up waters. RV 1.32 narrates it at length, and its opening line supplies the formula itself — áhann áhim, 'he slew the serpent'. Vṛtrá lies across the mountains like a dam; the phrase recurs throughout the corpus as a fixed ritual tag.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Þórr vs. Jǫrmungandr",
        confidence: "moderate",
        details:
          "Þórr's enmity with the Miðgarðsormr (Jǫrmungandr) is the Norse reflex. The fishing episode of Hymiskviða, in which he hooks the serpent and nearly kills it, and the final encounter at Ragnarǫk, where he kills it but dies of its venom nine steps later, preserve recognisably old elements. The mutual-destruction ending has no exact counterpart elsewhere and may be a Norse development rather than an inherited variant.",
      },
      {
        culture: "Greek",
        deity: "Zeus vs. Typhōn; Apollo vs. Pythōn",
        confidence: "strong",
        details:
          "Zeus's battle with the serpentine Typhōn, who threatens to overturn the Olympian order, is the clearest Greek reflex; Hesiod (Theogony 820-868) gives him a hundred snake heads. Apollo's killing of the serpent Pythōn at Delphi to found his oracle is a second, and the Homeric Hymn to Apollo uses the inherited verb of serpent-slaying. Herakles and the Hydra may carry traces of the same pattern.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Θraētaona vs. Aži Dahāka",
        confidence: "strong",
        details:
          "In the Avesta (Yasna 9.7-8; Yašt 19.36-37) the hero Θraētaona, later Middle Persian Frēdōn and Persian Farīdūn, kills the three-mouthed, three-headed, six-eyed serpent Aži Dahāka, a creature of Angra Mainyu. The Iranian phrasing preserves Watkins's formula with the cognate verb and the cognate word for serpent (aži- = Vedic áhi-). The Vedic counterpart of Θraētaona is Trita Āptya, 'the Third, of the Waters', who likewise slays a three-headed adversary (RV 10.8.8).",
      },
      {
        culture: "Slavic",
        deity: "Perun vs. Veles (reconstructed)",
        confidence: "contested",
        details:
          "The Slavic 'basic myth' (osnovnoj mif) is a reconstruction proposed by V. V. Ivanov and V. N. Toporov (1974), not a text: Perun, the thunder god above, battles Veles, the chthonic god of waters and cattle below, who has stolen his cattle (or wife, or children); the defeated Veles hides in water, trees or animals, and the storm is the recovery. It has been enormously influential, especially in Russian-language scholarship, but it is heavily criticised — it splices sparse chronicle notices onto much later folk songs, charms and toponyms, and critics argue the resulting narrative is largely a modern scholarly construct rather than an attested Slavic myth. Treat it as a hypothesis rather than a datum.",
      },
    ],
    category: "motif",
    sources: [
      "Watkins 1995, How to Kill a Dragon: Aspects of Indo-European Poetics",
      "Ivanov & Toporov 1974, Issledovanija v oblasti slavjanskix drevnostej",
      "Kalik & Uchitel 2019, Slavic Gods and Heroes (critique of the 'basic myth')",
      "Hesiod, Theogony 820-868",
      "West 2007, Indo-European Poetry and Myth, ch. 6",
    ],
  },
  {
    id: "sacred-fire",
    name: "Sacred Fire (*h₁n̥gʷnis)",
    description:
      "Fire was central to PIE religion both as a deified force and as the hearth around which domestic and communal worship turned. PIE distinguished an animate fire-word *h₁n̥gʷnis (Latin ignis, Sanskrit agní-, Lithuanian ugnis, Old Church Slavonic ognь) from an inanimate one *péh₂wr̥ (Greek pŷr, Old English fȳr) — and the branches that continue the animate word are precisely the ones with a personal fire god. Greek and Italic lost *h₁n̥gʷnis as a living word, so their hearth deities below are evidence for the institution of the tended fire rather than for the inherited theonym. Across branches, fire is the intermediary that carries offerings to the gods, and the tended flame marks the household and the cosmic centre.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Agní",
        confidence: "strong",
        details:
          "Agni is the fire god of the Rigveda, second only to Indra in number of hymns (roughly 200), and his name directly continues *h₁n̥gʷnis. He is the priest of the gods (puróhita) and the messenger (dūtá) who carries offerings from the human world to the celestial one through the sacrificial flame. He is present in every hearth and every ritual fire; the Agnicayana, the building of the fire altar, is among the most elaborate Vedic ceremonies.",
      },
      {
        culture: "Roman",
        deity: "Vesta",
        confidence: "strong",
        details:
          "Vesta was the goddess of Rome's sacred hearth fire. Her round temple in the Forum Romanum housed a perpetual flame tended by the six Vestal Virgins (Virginēs Vestālēs), who served for thirty years and whose breach of duty was capital. The extinction of the fire counted as a portent of national catastrophe. Her cult was among the oldest and most carefully guarded in Roman religion, and the institution — not the name — is what matches the Indo-Iranian and Baltic evidence.",
      },
      {
        culture: "Greek",
        deity: "Hestía",
        confidence: "contested",
        details:
          "Hestía is the goddess of the hearth; every household kept a hearth fire sacred to her and every city a public one in the prytaneîon, and she received the first and last portion at sacrifice. Her cultic weight was enormous even though she has almost no myths. The traditional derivation from *h₁wes- 'burn, dwell' and the direct equation with Latin Vesta are, however, phonologically awkward and disputed — Beekes treats Hestía's etymology as uncertain — so the Greek and Roman hearth goddesses may be a parallel institution rather than a shared inheritance. Hephaistos represents a separate, technological aspect of fire.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Ātar",
        confidence: "strong",
        details:
          "Ātar is the Avestan fire deity, called son of Ahura Mazdā, and fire is the most sacred element of Zoroastrian practice, maintained perpetually in fire temples; three grades are recognised, the highest being Ātaš Bahrām, 'Fire of Victory'. Ātar contends with Aži Dahāka for possession of the divine glory (xᵛarənah). The word ātar- itself has no clear IE cognate, but the priestly title āθrauuan- corresponds exactly to Sanskrit átharvan-, and the reverence for fire as the visible sign of Aša (Truth) matches the Vedic linkage of fire and cosmic order.",
      },
      {
        culture: "Baltic",
        deity: "Gabija (hearth fire)",
        confidence: "moderate",
        details:
          "Lithuanian tradition preserved a cult of the domestic hearth fire personified as Gabija, usually derived from gaubti 'to cover', referring to the banking of embers at night; she was fed, addressed and put to bed like a household guardian. Lithuanian ugnis continues *h₁n̥gʷnis directly, which is the solid part of the evidence. The often-repeated claim of a Lithuanian 'temple of Romuva' with vestal-like priestesses (vaidilutės) rests on Simon Grunau's 16th-century chronicle, which is generally judged unreliable, and should not be used as a parallel to the Roman Vestals.",
      },
    ],
    category: "deity",
    sources: [
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 11 and 25",
      "Beekes 2010, Etymological Dictionary of Greek, s.v. Ἑστία",
      "Boyce 1975, A History of Zoroastrianism, Vol. 1: The Early Period",
      "Greimas 1992, Of Gods and Men: Studies in Lithuanian Mythology",
    ],
  },
  {
    id: "cattle-raid",
    name: "Cattle Raid / Cattle as Wealth (*gʷōus)",
    description:
      "Cattle were the primary form of mobile wealth in PIE society, and raiding for them was both an institution and a narrative engine. The PIE word for the bovine, *gʷṓws (Sanskrit gáuḥ, Greek boûs, Latin bōs, Old English cū), is one of the most securely reconstructed items in the lexicon; a separate root, *peḱu- 'livestock', is what actually supplies the words for movable wealth in several branches (Latin pecūnia, Gothic faihu, Old English feoh). Mythologically, a hostile power steals or pens the cattle — often identified with rain clouds, waters or the light of dawn — and a heroic deity recovers them. Historically, cattle raiding persisted as a warrior institution for millennia.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "The Paṇis and the Vala cave; Saramā",
        confidence: "strong",
        details:
          "In Rigvedic myth (RV 10.108 and the Vala hymns) the Paṇis, demonic hoarders, pen the cosmic cattle in a cave, Vala. The divine bitch Saramā is sent to find them, and Indra with the Aṅgirases splits the cave open to release the cattle, which are equated with the dawns, the waters or the sun's rays. The noun gáviṣṭi means both 'seeking cattle' and 'battle', showing how tightly the two were bound together.",
      },
      {
        culture: "Irish (Celtic)",
        deity: "Táin Bó Cúailnge",
        confidence: "strong",
        details:
          "The Táin Bó Cúailnge ('Cattle Raid of Cooley') is the central epic of the Ulster Cycle: Medb of Connacht invades Ulster to seize the bull Donn Cúailnge. It heads a whole genre of Irish tales titled Táin Bó ('cattle raid of …'). In early Irish law cattle were the unit of value — bride-price and legal fines were reckoned in them, and the rank of a farmer was literally 'cow-noble' (bó-aire).",
      },
      {
        culture: "Greek",
        deity: "Hermes and Apollo's cattle; Herakles and Geryon",
        confidence: "moderate",
        details:
          "In the Homeric Hymn to Hermes the newborn god steals fifty cattle from Apollo and drives them backwards to confuse the tracks — a trickster version of the raid. Herakles' tenth labour, driving off the cattle of the triple-bodied Geryon from the far west, is a second reflex. The scale of bovine sacrifice is fossilised in the word hekatómbē, literally 'hundred oxen' (hekatón + boûs).",
      },
      {
        culture: "Germanic",
        deity: "*fehu — cattle as wealth",
        confidence: "moderate",
        details:
          "Proto-Germanic *fehu 'cattle, wealth, money' names the first rune of the Elder Futhark, ᚠ, and is cognate with Latin pecū 'livestock' and pecūnia 'money'. Old English feoh meant both 'cattle' and 'property', and gives modern English 'fee'. Note that this is lexical and social evidence for the cattle-wealth equation, not a cattle-raid myth: Germanic preserves no narrative of stolen and recovered divine herds.",
      },
      {
        culture: "Slavic",
        deity: "Veles as cattle god",
        confidence: "contested",
        details:
          "The Rus' Primary Chronicle calls Volosъ (Veles) skotĭjĭ bogъ, 'god of livestock', and the Rus'-Byzantine treaty oaths pair him with Perun — those two facts are attested. The rest, that Perun's thunderbolts strike Veles to recover stolen heavenly herds and that the rain is their release, belongs to the Ivanov-Toporov 'basic myth' reconstruction and is inference from later folklore rather than record. The mythological cattle-raid reading of Slavic material should be labelled as such.",
      },
    ],
    category: "motif",
    sources: [
      "Lincoln 1981, Priests, Warriors, and Cattle: A Study in the Ecology of Religions",
      "Watkins 1995, How to Kill a Dragon: Aspects of Indo-European Poetics",
      "Ivanov & Toporov 1974, Issledovanija v oblasti slavjanskix drevnostej",
      "Rus' Primary Chronicle (Povest' vremennykh let), treaty texts s.a. 6415 and 6479",
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 9",
    ],
  },
  {
    id: "world-tree",
    name: "World Tree / Cosmic Axis (*dóru)",
    description:
      "A cosmic tree or pillar joining sky, earth and underworld appears in several IE traditions, often with an eagle at the crown, a serpent at the roots, and a creature moving between them. The PIE words *dóru 'tree, wood' (Sanskrit dā́ru, Greek dóru, Old English trēow) and the root *deru- 'be firm' supply the vocabulary, and sacred trees, especially oaks, were central to ritual life. It should be said plainly that this is a weaker reconstruction than the dragon-slaying or twin dossiers: no shared formula or theonym underlies it, the Vedic and Norse versions differ structurally, and the same axis-tree motif is widespread in Uralic and Siberian traditions, so areal diffusion is a live alternative to inheritance.",
    cultures: [
      {
        culture: "Norse (Germanic)",
        deity: "Yggdrasill",
        confidence: "strong",
        details:
          "Yggdrasill is the great ash at the centre of Norse cosmology, joining the nine worlds. An eagle sits at its crown with the hawk Veðrfǫlnir between its eyes, the serpent Níðhǫggr gnaws the roots, and the squirrel Ratatoskr carries insults between them. Three wells lie beneath the roots: Urðarbrunnr (fate), Mímisbrunnr (wisdom) and Hvergelmir (the source of rivers). Óðinn hangs himself on a windswept tree for nine nights to win the runes, making it both cosmic structure and site of initiatory sacrifice.",
      },
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "The inverted tree; Aśvattha",
        confidence: "moderate",
        details:
          "RV 1.24.7 describes Varuṇa holding up a tree whose base is above and whose branches hang down; the Kaṭha Upaniṣad (6.1) develops this into the eternal aśvattha (Ficus religiosa) with roots above and branches below, an inversion signifying the celestial origin of existence. RV 1.164.20 places two birds in one tree, one eating the fruit and the other watching — formally close to the eagle-and-hawk of Yggdrasill, though the Indian tree is an image of cosmic and later metaphysical order rather than a load-bearing structure of the world.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "The Saēna tree (Vīspō.bīš)",
        confidence: "moderate",
        details:
          "The Avesta describes a sacred all-healing tree, Vīspō.bīš, growing in the cosmic sea Vourukaša, from which the seeds of all plants come; the great bird Saēna (cognate with Sanskrit śyená- 'raptor', and the ancestor of the Persian Sīmurgh) nests in its branches. The combination of a great raptor in the branches and cosmic waters beneath is what makes the comparison with Yggdrasill and the Vedic tree worth drawing.",
      },
      {
        culture: "Slavic",
        deity: "The world oak of Buyan",
        confidence: "contested",
        details:
          "East Slavic charms and byliny describe a tree, usually an oak, standing at the centre of the world on the island of Buyan, with an eagle in its crown, a serpent at its roots and bees in its trunk. The imagery is genuinely attested in folk texts, but the mapping onto a tripartite Slavic cosmos with Perun above and Veles below is a 20th-century reconstruction, and the folk sources are recorded from the 18th century onward. The structural resemblance to Yggdrasill is close enough to invite either inheritance or borrowing.",
      },
    ],
    category: "cosmology",
    sources: [
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 9 and 25",
      "West 2007, Indo-European Poetry and Myth, ch. 8",
      "Ivanov & Toporov 1974, Issledovanija v oblasti slavjanskix drevnostej",
      "Kaṭha Upaniṣad 6.1; Rigveda 1.24.7, 1.164.20",
    ],
  },
  {
    id: "trifunctional-ideology",
    name: "Trifunctional Ideology (Dumézil's Three Functions)",
    description:
      "Georges Dumézil (1898-1986) proposed that PIE society and mythology were organised around three functions: sovereignty and the sacred; military force; and fertility and production. He argued that these structured pantheons, narratives and social classes alike. The hypothesis has been extraordinarily productive for comparative work, but it is not confirmed and should not be presented as a finding. Critics object that a three-part scheme is elastic enough to fit almost any three-part datum, that the readings are often circular, and that the Indian varṇa system, the Roman flamines and the Gaulish classes each admit local explanations that need no inherited ideology; Belier (1991) traces how the scheme developed in Dumézil's own thinking, and Lincoln (1999) distanced himself from his earlier Dumézilian work. What follows is the classic Dumézilian dossier, presented as his interpretation of the evidence.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Varṇa scheme: Brāhmaṇa, Kṣatriya, Vaiśya",
        confidence: "moderate",
        details:
          "Dumézil read the varṇa scheme as the clearest survival of the three functions: Brāhmaṇas (priests, sovereignty and the sacred), Kṣatriyas or Rājanyas (warriors), Vaiśyas (producers), with divine patrons to match — Mitra-Varuṇa for law and sovereignty, Indra for warrior might, the Aśvins for healing and abundance. The Puruṣa Sūkta (RV 10.90) derives the varṇas from the body of the cosmic man. Against this, the fourfold varṇa scheme appears late in the Rigveda and its social reality in the Vedic period is itself debated, so its value as a witness to PIE structure is contested.",
      },
      {
        culture: "Roman",
        deity: "Jupiter, Mars, Quirinus (archaic triad)",
        confidence: "moderate",
        details:
          "Rome's archaic pre-Capitoline triad — Jupiter, Mars, Quirinus — was Dumézil's showpiece: Jupiter as sovereign, Mars as war god, Quirinus as patron of the productive citizen body. Their three flāminēs maiōrēs (Diālis, Martiālis, Quirinālis) formed the senior priesthoods of the early state. Critics note that Quirinus' third-function character is largely inferred from the scheme it is meant to support.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Óðinn, Þórr, Freyr",
        confidence: "contested",
        details:
          "The Dumézilian reading assigns Óðinn sovereignty, magic and the sacred; Þórr warrior might; and Freyr with the Vanir fertility and prosperity, and treats the Æsir-Vanir war ending in integration as the absorption of third-function deities. The fit is loose: Óðinn is also a war god, Þórr is the popular protector rather than a warrior-caste patron, and the Norse sources are Christian-era compilations, which is why this is the most frequently challenged panel of the dossier.",
      },
      {
        culture: "Celtic (Gaulish/Insular)",
        deity: "Druids, warriors, commoners",
        confidence: "contested",
        details:
          "Caesar (De Bello Gallico 6.13) says that in Gaul two classes are of account, the druidēs and the equitēs, with the plebs treated as near-servile — a two-plus-one description that Dumézilians read as trifunctional and critics read as Caesar's own ethnographic shorthand. Irish tradition does distinguish druids, warriors and farmers (bó-aire, 'cow-noble'). The further mapping of the Tuatha Dé Danann, Fir Bolg and Fomoire onto the three functions is an interpretation imposed on the pseudo-historical Lebor Gabála scheme and is not supported by the texts themselves.",
      },
      {
        culture: "Scythian / Iranian",
        deity: "The three golden objects",
        confidence: "moderate",
        details:
          "Herodotus (Histories 4.5-6) relates a Scythian origin myth in which three golden objects fall from the sky — a cup, a battle-axe, and a plough with yoke — and only the youngest brother, Kolaxais, can take them up without the gold blazing. Dumézil read the three objects as the three functions (priestly cup, warrior axe, agricultural plough) and the three descended tribes as functional classes. This is the single best-known piece of evidence for the hypothesis, though the tale is reported by an outsider and other readings of the objects exist.",
      },
    ],
    category: "motif",
    sources: [
      "Dumézil 1958, L'idéologie tripartie des Indo-Européens",
      "Dumézil 1970, Archaic Roman Religion",
      "Belier 1991, Decayed Gods: Origin and Development of Georges Dumézil's 'idéologie tripartie'",
      "Lincoln 1999, Theorizing Myth: Narrative, Ideology, and Scholarship",
      "Caesar, De Bello Gallico 6.13",
      "Herodotus, Histories 4.5-6",
    ],
  },
  {
    id: "horse-sacrifice",
    name: "Horse Sacrifice / Sacred Horse (*h₁éḱwos)",
    description:
      "The horse carried extraordinary ritual and symbolic weight in PIE and daughter cultures, and the word *h₁éḱwos (Sanskrit áśva-, Latin equus, Greek híppos, Old English eoh) is securely reconstructed. Dating the domestication behind it has recently shifted: genomic work indicates that the modern domestic lineage (DOM2) spread out of the Volga-Don steppe from roughly 2200 BCE, while the earlier Botai horses of c. 3500 BCE left essentially no ancestry in modern horses — so the older textbook figure of 'domesticated by 4000 BCE' should be treated as superseded. Horse sacrifice recurs across widely separated IE cultures with shared structural elements — royal consecration, sexual symbolism, dismemberment, identification of the horse with the cosmos — which is what suggests a common origin rather than the ritual's mere existence.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Aśvamedha",
        confidence: "strong",
        details:
          "The Aśvamedha was the most prestigious Vedic royal rite, described in the Yajurveda and the Śatapatha Brāhmaṇa. A chosen stallion roamed free for a year, followed by the king's army, and every territory it entered was claimed. On its return it was ritually suffocated, and the chief queen (mahiṣī) enacted a symbolic union with the dead horse beneath a covering. The horse was identified with the cosmos, and its dismembered parts equated with cosmic elements.",
      },
      {
        culture: "Roman",
        deity: "October Equus",
        confidence: "strong",
        details:
          "On the Ides of October the Romans sacrificed the right-hand horse of the winning team in a chariot race on the Campus Martius. Its head and tail were severed; the tail was rushed to the Regia so its blood dripped on the sacred hearth, and the head was fought over by the men of the Suburra and the Via Sacra. Dumézil's analysis identified the structural parallels with the Aśvamedha: royal association, dismemberment, and the special handling of the extremities.",
      },
      {
        culture: "Irish (Celtic)",
        deity: "Royal inauguration rite (Gerald of Wales)",
        confidence: "contested",
        details:
          "Gerald of Wales (Topographia Hibernica III.25, c. 1188) describes an inauguration in Donegal in which the king-to-be mated with a white mare, which was then killed, dismembered and boiled; he bathed in the broth and ate the flesh. Puhvel and Doniger drew the parallel with the Aśvamedha, and the shared elements — white horse, sexual act, royal consecration, consumption — are striking. But Gerald is a hostile outsider writing propaganda about the Irish, the account is unique and unverified, and it may be a literary slander that happens to echo a genuine pattern.",
      },
      {
        culture: "Germanic (Norse)",
        deity: "Horse sacrifice at blót",
        confidence: "moderate",
        details:
          "Adam of Bremen (Gesta Hammaburgensis IV.26-27, c. 1070) reports horse carcasses hanging in the sacred grove at Uppsala alongside dogs and men, and Ibn Faḍlān's account of a Rus' ship burial describes horses killed and dismembered. Eating horse flesh (hrossakjǫt) was so closely tied to pagan sacrifice that banning it was among the first measures of the Christianised Scandinavian kingdoms. What is attested is the sacrifice and the meal; the royal-consecration frame present in the Vedic and Irish material is not.",
      },
      {
        culture: "Scythian / steppe",
        deity: "Kurgan horse burials",
        confidence: "strong",
        details:
          "Scythian, Pazyryk and related steppe cultures buried elites with sacrificed horses, sometimes dozens in a single royal kurgan; the frozen Pazyryk tombs preserve them with ornate gold and felt trappings. Herodotus (4.71-72) describes strangled horses mounted on frames around a royal mound. This is the one strand of the dossier that is archaeological rather than textual, and it sits directly in the region from which the IE expansions are thought to have begun.",
      },
    ],
    category: "ritual",
    sources: [
      "Puhvel 1970, 'Aspects of Equine Functionality', in Myth and Law Among the Indo-Europeans",
      "Puhvel 1987, Comparative Mythology",
      "Doniger O'Flaherty 1980, Women, Androgynes, and Other Mythical Beasts",
      "Dumézil 1970, Archaic Roman Religion",
      "Gerald of Wales, Topographia Hibernica III.25",
      "Adam of Bremen, Gesta Hammaburgensis Ecclesiae Pontificum IV.26-27",
      "Herodotus, Histories 4.71-72",
      "Librado et al. 2021, 'The origins and spread of domestic horses from the Western Eurasian steppes', Nature 598",
      "Anthony 2007, The Horse, the Wheel, and Language",
    ],
  },
  {
    id: "sacred-drink",
    name: "Sacred Intoxicating Drink (*médʰu)",
    description:
      "The preparation and ritual drinking of a sacred intoxicant is deeply embedded in IE religious practice. PIE *médʰu 'honey, mead' is one of the most widely attested cultural terms (Sanskrit mádhu, Greek méthu, Old English medu, Old Church Slavonic medъ, Old Irish mid). In several branches a specific ritual drink — pressed from a plant in Indo-Iranian, fermented from honey in Europe — was believed to confer divine power, poetic inspiration or immortality, and a recurrent narrative has the drink stolen from or recovered from a hostile guardian. The Indo-Iranian evidence is by far the strongest; the European material is a family resemblance rather than a shared rite.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Sóma",
        confidence: "strong",
        details:
          "Sóma is both a deity and a pressed plant juice, with the whole ninth maṇḍala of the Rigveda (114 hymns) devoted to its preparation: pressed between stones, filtered through wool, mixed with milk or water, drunk by the priests. It grants ecstatic vision, strength and a share in immortality; Indra drinks vast quantities before killing Vṛtrá. The botanical identity of the original plant is still unsettled, with Ephedra, Amanita muscaria and Peganum harmala all proposed.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Haoma",
        confidence: "strong",
        details:
          "Avestan haoma is the exact cognate of Vedic sóma (Indo-Iranian *sauma-, from the root 'to press'). The Hōm Yašt (Yasna 9-11) describes its preparation and personifies Haoma as a deity who was the first priest. Unlike Vedic soma, haoma survived into historical and living Zoroastrianism and is still prepared ritually with Ephedra twigs. That the soma/haoma cult goes back to a common Indo-Iranian rite is not seriously doubted; that it goes back further, to PIE, is a separate and weaker claim.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Mead of Poetry (Óðrœrir)",
        confidence: "moderate",
        details:
          "Snorri preserves the myth of the mead of poetry: the dwarfs Fjalarr and Galarr murder the wise Kvasir and mix his blood with honey to brew a drink that confers poetic skill, kept by the giant Suttungr and his daughter Gunnlǫð. Óðinn wins it by seduction and trickery and escapes in eagle form. The eagle is the detail that carries comparative weight, since in the Rigveda (4.26-27) it is a raptor, the śyená-, that seizes soma from its guarded height and brings it down — a shared image of a bird carrying off the guarded drink.",
      },
      {
        culture: "Greek",
        deity: "Néktar and ambrosía",
        confidence: "contested",
        details:
          "Greek ambrosía is built on *n̥-mr̥-to- 'immortal' and corresponds formally to Sanskrit amṛ́ta-, which is a real and useful equation. The much-repeated etymology of néktar as *neḱ- 'death' plus *terh₂- 'overcome' is Thieme's conjecture and is not generally accepted. Greek preserves no ritual of preparing or drinking the divine substance comparable to the soma pressing, so this is a conceptual parallel — a divine food of immortality — rather than evidence for an inherited rite.",
      },
      {
        culture: "Celtic",
        deity: "Mead (mid); cauldrons of inspiration",
        confidence: "contested",
        details:
          "Old Irish mid and Welsh medd continue *médʰu, and mead is a prestige and ceremonial drink throughout early Irish and Welsh literature — that much is solid. The mythological material usually attached to it is late: Ceridwen's cauldron, whose brew of awen confers all knowledge on Gwion Bach, who becomes Taliesin, comes from the medieval Hanes Taliesin, and the Well of Segais with its hazels and Salmon of Knowledge is a separate motif involving no drink of the *médʰu type at all.",
      },
    ],
    category: "ritual",
    sources: [
      "Watkins 1995, How to Kill a Dragon: Aspects of Indo-European Poetics",
      "Falk 1989, 'Soma I and II', Bulletin of the School of Oriental and African Studies 52",
      "West 2007, Indo-European Poetry and Myth, ch. 3",
      "Snorri Sturluson, Prose Edda (Skáldskaparmál)",
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 14",
    ],
  },
  {
    id: "sun-deity",
    name: "Sun Deity / Solar Chariot (*sóh₂wl̥)",
    description:
      "The PIE sun was a heteroclitic neuter noun, *sóh₂wl̥ with oblique stem *sh₂un-, continued in Vedic svàr and sū́rya-, Latin sōl, Greek hḗlios, Gothic sauil and Old Church Slavonic slъnьce. It was conceived as crossing the sky in a horse-drawn vehicle, a motif with Bronze Age archaeological support in the Trundholm sun chariot from Denmark (c. 1400 BCE). The sun's gender varies by branch — masculine in Vedic and Greek, feminine in Germanic and Baltic — which fits the neuter origin of the noun. The daily journey, the disappearance at night by underworld passage or sea voyage, and the chariot are widely shared. Celtic supplies no securely inherited solar theonym: Sulis and Belenus are sometimes claimed as reflexes, but both etymologies are disputed, so no Celtic witness is listed below.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Sūrya",
        confidence: "strong",
        details:
          "Sūrya rides a chariot drawn by one or seven horses and is the 'eye of Mitra and Varuṇa', surveying all deeds — an all-seeing witness role matched by Greek Helios. His daughter Sūryā is courted by the Ashvins, a mytheme with a close Baltic counterpart. The Gāyatrī (RV 3.62.10), the most recited Vedic verse, meditates on the light of Savitṛ, the solar impeller. The charioteer Aruṇa belongs to later, Puranic tradition rather than the Rigveda.",
      },
      {
        culture: "Greek",
        deity: "Hḗlios",
        confidence: "strong",
        details:
          "Hḗlios (from *sāwelios) drives a four-horse chariot from east to west and returns at night in a golden cup floating on Ocean. He is the all-seeing witness of oaths and transgressions — in the Odyssey it is he who sees the cattle slaughtered on Thrinacia. The myth of Phaëthon, his son, who loses control of the solar chariot and is struck down by Zeus's thunderbolt, may preserve an old mytheme about the danger of solar irregularity.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Sól",
        confidence: "strong",
        details:
          "Sól (Proto-Germanic *sōwelō / *sunnōn) is a goddess who drives the solar chariot, pursued by the wolf Skǫll, who devours her at Ragnarǫk. The Trundholm sun chariot — a Bronze Age Danish artefact of c. 1400 BCE showing a horse drawing a gilded disc on wheels — attests the horse-drawn sun in the Germanic area more than two thousand years before the literary sources, and is the strongest archaeological confirmation of the motif anywhere in the family.",
      },
      {
        culture: "Baltic",
        deity: "Saulė / Saule",
        confidence: "moderate",
        details:
          "Lithuanian Saulė and Latvian Saule are the sun goddess, central to Baltic folk religion. She rides a chariot drawn by tireless horses; her daughter, Latvian Saules meita, is courted by the Dieva dēli, matching the Vedic Ashvins and Sūryā. Latvian dainas show her dancing on a silver hill at midsummer and sinking into the sea at evening. The Baltic pairing of a feminine sun with a masculine moon (Latvian Mēness, Lithuanian Mėnulis) is the reverse of the Greek and Vedic arrangement. The name is inherited; the narrative detail is drawn from folk songs collected in the modern era.",
      },
    ],
    category: "deity",
    sources: [
      "West 2007, Indo-European Poetry and Myth, ch. 5",
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 8 and 25",
      "Kristiansen & Larsson 2005, The Rise of Bronze Age Society (on the Trundholm chariot and solar imagery)",
      "Jackson 2002, 'Light from Distant Asterisks', Numen 49",
    ],
  },
  {
    id: "cosmic-order",
    name: "Cosmic Order / Truth (*h₂r̥tós)",
    description:
      "A cosmic order governing both the natural and the moral world is one of the best-supported PIE religious concepts. The root is *h₂er- 'to fit, join', and the verbal adjective *h₂r̥-tó- 'fitted, right' is continued directly in Vedic ṛtá- and Avestan aṣ̌a-. Greek continues the same root in ártios 'fitting, complete' and in the verb ararískō 'to fit together' (whence harmós 'joint' and harmonía), and Latin in ars 'fitting skill' and artus 'joint'. (The commonly seen 'Greek artós' is an error: artós means 'bread' and is unrelated.) The concept covered the regularity of seasons and stars, the correctness of ritual, the truth of speech and moral rightness; its violation was the fundamental definition of wrong action, and its maintenance the primary duty of gods, priests and kings.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Ṛtá (guarded by Mitra and Varuṇa)",
        confidence: "strong",
        details:
          "Ṛtá is the order that makes the sun rise, the seasons turn and rituals take effect. Varuṇa is its chief guardian, snaring transgressors with his pā́śa; Mitra, his partner, covers its contractual and social aspect. Its direct opposite is ánṛta 'untruth', with druh- 'deceit' closely allied. The poets describe the gods as acting ṛténa, 'in accordance with ṛtá', and call the sacrificial fire ṛtā́van-, 'possessing ṛtá'.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Aṣ̌a (Aṣ̌a Vahišta)",
        confidence: "strong",
        details:
          "Avestan aṣ̌a- is the exact cognate of Vedic ṛtá-, and the pair is the single strongest piece of evidence for the concept. In Zoroastrian theology Aṣ̌a Vahišta, 'Best Truth', is one of the Aməṣ̌a Spəṇtas and personifies cosmic truth and right order. The central Zoroastrian dualism of Aṣ̌a against Druj (Truth against the Lie) develops the inherited opposition of *h₂r̥tós and *dʰrewgʰ-. The Aṣ̌əm Vohū, which opens with 'aṣ̌əm vohū vahištəm astī', is the most repeated Zoroastrian prayer.",
      },
      {
        culture: "Greek",
        deity: "ártios / harmonía; Díkē and Thémis",
        confidence: "moderate",
        details:
          "Greek keeps the root in the vocabulary of fitting rather than in a theonym: ártios 'fitted, complete', ararískō 'to join', harmós 'joint' and harmonía 'fitting-together'. The cosmic and juridical concept is carried instead by figures with different etymologies — Díkē (Justice, daughter of Zeus and Themis), Thémis (established right custom), and Zeus as guarantor of oaths. Hesiod's Works and Days develops díkē against hýbris at length. So Greek supplies the inherited root and the equivalent concept, but not in the same word.",
      },
      {
        culture: "Roman",
        deity: "Ars and artus; fās and iūs",
        confidence: "moderate",
        details:
          "Latin continues *h₂er- in ars 'skill, proper fitting' and artus 'joint, fitted', though neither is a religious term. The conceptual domain is covered by fās (what is divinely permitted) against nefās (abomination), and iūs (human law). The pontifex maximus and the college of augurs existed to keep the pāx deōrum, the correct relationship between Rome and the gods — functionally analogous to the Vedic priest's maintenance of ṛtá, though built from different words.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Ørlǫg and the Norns",
        confidence: "contested",
        details:
          "Old Norse ørlǫg, 'primal layings-down', is the fate or law established at the beginning; the three Norns — Urðr, Verðandi and Skuld — tend the well beneath Yggdrasill, watering the tree and setting the fates of all beings. The comparison with ṛtá is thematic only: ørlǫg is fate rather than truth, no shared root connects the two, and Germanic preserves no reflex of *h₂r̥tó-. Included here for the parallel of order maintained by ritual action at the cosmic centre, not as linguistic evidence.",
      },
    ],
    category: "cosmology",
    sources: [
      "Watkins 1995, How to Kill a Dragon: Aspects of Indo-European Poetics",
      "Lüders 1951-59, Varuṇa (2 vols.)",
      "Boyce 1975, A History of Zoroastrianism, Vol. 1: The Early Period",
      "West 2007, Indo-European Poetry and Myth, ch. 3",
      "Beekes 2010, Etymological Dictionary of Greek, s.vv. ἀραρίσκω, ἄρτιος",
    ],
  },
  {
    id: "underworld-afterlife",
    name: "Realm of the Dead / First Mortal (*Yemo-)",
    description:
      "A recurrent IE conception makes the first mortal to die the lord and guide of the dead. The name *Yemo- 'twin' is continued in Vedic Yama and Avestan Yima, an exact and secure pair; Norse Ymir is usually derived from the same root, though that step is less certain and Ymir's role is cosmogonic rather than funerary. Bruce Lincoln reconstructed an underlying myth in which a first man sacrifices his twin to create the world and the social order. The path to the realm of the dead often involves crossing water and passing guardian dogs, and the dead were equipped with grave goods for the journey.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Yama",
        confidence: "strong",
        details:
          "Yama was the first man to die and so found the path others follow, becoming king of the dead (RV 10.14). His realm is a place of feasting with the ancestors (pitṛs). Two four-eyed, broad-nosed dogs, the sārameyau (sons of Saramā), watch the road to it. In RV 10.10 his twin sister Yamī urges an incestuous union to continue the human race and he refuses — a dialogue that is central to reconstructing the twin element of the figure.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Yima (Yima xšaēta)",
        confidence: "strong",
        details:
          "Avestan Yima is the exact cognate of Vedic Yama, but the role has shifted: he is the first king of a golden age, ruling a world without death or old age, who thrice enlarges the earth for its growing population (Vīdēvdād 2). He falls through falsehood and loses the xᵛarənah, and in later Persian tradition, as Jamšīd in the Šāhnāma, he becomes the type of the just king undone by pride. His link to death is far weaker than Yama's; the shared name and the golden-age framing carry the comparison.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Ymir; Hel",
        confidence: "moderate",
        details:
          "Ymir is the primordial giant from whose dismembered body the world is made — a cosmogony with a close Vedic counterpart in the Puruṣa Sūkta (RV 10.90), which is the real strength of this entry. The realm of the dead, Hel, ruled by Loki's daughter of the same name, lies beneath a root of Yggdrasill; the dog Garmr bays at its entrance. Note that Ymir and Hel are separate figures: Norse splits between them what Vedic keeps in Yama, and the derivation of Ymir from *yem- is probable rather than proven.",
      },
      {
        culture: "Greek",
        deity: "Hades; Charon; Kerberos",
        confidence: "moderate",
        details:
          "The Greek underworld is ruled by Hades (whose name is traditionally glossed 'the unseen', though the etymology is uncertain) and reached by crossing water in Charon's ferry, paid with a coin placed in the mouth of the dead. The three-headed dog Kerberos keeps the dead from leaving. The structural elements — lord of the dead, water crossing, dog guardian — recur in Vedic and Norse, and Kerberos has been etymologically compared with the Vedic śabála- dog, though that comparison is disputed. Greek has no reflex of *Yemo-.",
      },
      {
        culture: "Baltic",
        deity: "Vėlės / Veļu māte",
        confidence: "contested",
        details:
          "Lithuanian vėlės 'souls of the dead' and Latvian veļi are cognate, and Latvian tradition has a Veļu māte, 'mother of the dead', presiding over them. The often-repeated further link to Slavic Veles is possible but disputed. The Lithuanian feast of Vėlinės (2 November, now merged with All Souls') involved leaving food at graves and lighting fires for the dead, and the Baltic afterlife is generally imagined as ordinary life continued beyond a hill or a water. None of this involves a *Yemo- figure; it belongs here as a parallel conception of the realm of the dead rather than as a witness to the reconstruction.",
      },
    ],
    category: "cosmology",
    sources: [
      "Lincoln 1975, 'The Indo-European Myth of Creation', History of Religions 15",
      "Lincoln 1986, Myth, Cosmos, and Society: Indo-European Themes of Creation and Destruction",
      "Puhvel 1987, Comparative Mythology",
      "Mallory & Adams 2006, The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World, ch. 25",
      "Rigveda 10.10, 10.14, 10.90; Vīdēvdād 2",
    ],
  },
];

export const mythCategories: Record<
  string,
  { label: string; color: string }
> = {
  deity: { label: "Shared Deities", color: "#E67E22" },
  motif: { label: "Shared Motifs", color: "#3498DB" },
  ritual: { label: "Shared Rituals", color: "#E74C3C" },
  cosmology: { label: "Cosmological Themes", color: "#9B59B6" },
};
