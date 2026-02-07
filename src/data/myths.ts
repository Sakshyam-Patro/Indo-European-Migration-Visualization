export interface MythConnection {
  id: string;
  name: string;
  description: string;
  cultures: { culture: string; deity: string; details: string }[];
  category: "deity" | "motif" | "ritual" | "cosmology";
}

export const mythConnections: MythConnection[] = [
  {
    id: "sky-father",
    name: "Sky Father (*Dyḗus ph₂tḗr)",
    description:
      "The reconstructed Proto-Indo-European supreme sky deity, whose name derives from the PIE root *dyew- meaning 'to shine' or 'sky.' This figure presided over the daylit sky and was invoked as a father god. The phonological correspondences across branches, with *Dy- preserved in Sanskrit, Latin, and Greek, constitute one of the strongest pieces of evidence for a shared PIE religious tradition. In most daughter traditions, this deity retained associations with celestial authority, oaths, and cosmic order, though his relative prominence shifted as local pantheons evolved.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Dyáuṣ Pitā́",
        details:
          "Literally 'Sky Father,' Dyáuṣ Pitā́ appears in the Rigveda as an ancient but already somewhat faded deity. He is paired with Pṛthivī Mātā (Earth Mother) as a primordial couple. While no longer the chief god by the Rigvedic period, having been supplanted by Indra and Varuṇa, his name preserves the PIE formula most faithfully. Rigveda 1.89.4 addresses the pair Dyāvāpṛthivī together.",
      },
      {
        culture: "Greek",
        deity: "Zeus Patḗr",
        details:
          "Zeus (from Mycenaean di-we) is the direct Greek reflex of *Dyḗus. The vocative form 'Zeu pater' exactly mirrors the PIE formula *Dyeu ph₂tēr. Zeus became the supreme Olympian deity, ruling over gods and mortals from Mount Olympus, wielding the thunderbolt, and presiding over xenia (guest-right) and oaths. His elevation to chief god contrasts with the Vedic demotion of Dyáuṣ.",
      },
      {
        culture: "Roman",
        deity: "Iūpiter (Diēspiter)",
        details:
          "The Latin name Iūpiter derives from the archaic vocative *Dyeu-pater, with regular Latin sound changes (*dy- > j-). The older form Diēspiter preserves the connection more transparently. Jupiter served as the supreme deity of the Roman state religion, associated with sky, lightning, and sovereign authority. His temple on the Capitoline Hill was the center of Roman civic religion.",
      },
      {
        culture: "Germanic",
        deity: "Tīwaz / Týr",
        details:
          "The Proto-Germanic *Tīwaz (from PIE *deywós, the derived adjective meaning 'celestial one') is reflected in Old Norse Týr, Old English Tīw, and Old High German Ziu. By the Norse period, Týr had been reduced to a god of war and legal proceedings, overshadowed by Odin and Thor. However, his name preserves the PIE divine root, and he gave his name to Tuesday (Tīwesdæg). The loss of his hand to the wolf Fenrir may reflect a myth about the costs of upholding cosmic law.",
      },
      {
        culture: "Illyrian / Messapic",
        deity: "Dei-paturos",
        details:
          "A Messapic inscription from southeastern Italy records the theonym Dei-paturos, transparently 'Sky Father,' providing an additional independent witness to the PIE formula *Dyḗus ph₂tḗr from a poorly attested Indo-European branch.",
      },
    ],
    category: "deity",
  },
  {
    id: "dawn-goddess",
    name: "Dawn Goddess (*H₂éusōs)",
    description:
      "The PIE goddess of the dawn, reconstructed as *H₂éusōs (from the root *h₂ews- 'to shine, especially of the reddish dawn light'). She is one of the most securely reconstructed PIE deities, with cognate names preserved across many branches. Comparative mythology associates her with youth, beauty, and erotic love, as well as a formulaic epithet describing her as 'daughter of the sky' (*dʰugh₂tḗr diwós). She drove a chariot across the sky to announce the coming of the sun, and several traditions preserve myths of her illicit love affairs or her reluctance to yield to the sun god.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Uṣás",
        details:
          "Uṣás is celebrated in approximately 20 hymns of the Rigveda, more than almost any other goddess. She is described as a beautiful young woman, the 'daughter of heaven' (divó duhitā́), who drives away darkness with her radiant chariot drawn by reddish horses or cows. She is called 'ever-young' though she makes mortals grow old. The Rigvedic poets praised her with some of the most lyrical passages in the entire corpus.",
      },
      {
        culture: "Greek",
        deity: "Ēṓs",
        details:
          "Ēṓs (Homeric Ἠώς) is the rosy-fingered goddess of the dawn (rhododáktylos Ēṓs), daughter of the Titan Hyperion and sister of Helios and Selene. She is known for her love affairs with mortal men, including Tithōnos (for whom she obtained immortality but not eternal youth) and Kephalos. Her name is the exact Greek phonological reflex of *H₂éusōs, with the laryngeal *H₂ reflected in the rough breathing and prothetic vowel.",
      },
      {
        culture: "Roman",
        deity: "Aurōra",
        details:
          "Latin Aurōra continues the PIE dawn goddess name via an Italic form with regular sound development (*H₂eus- > *aus- > Latin aur- by rhotacism of intervocalic -s-). She was identified with Greek Ēṓs in the interpretatio Romana and shares the mythological association with erotic love and the abduction of mortal youths (such as Cephalus).",
      },
      {
        culture: "Germanic",
        deity: "Ēostre / *Austrō",
        details:
          "Bede (De Temporum Ratione, 8th century) records that the Anglo-Saxon month Ēosturmōnaþ (April) was named after a goddess Ēostre, to whom feasts were held. The name derives from Proto-Germanic *Austrō, the regular Germanic reflex of *H₂éusōs. The modern English word 'Easter' preserves this theonym. While Bede is the sole direct literary source, the linguistic derivation is uncontested, and a number of inscriptions from the Rhineland mention Matronae Austriahenae, possibly related.",
      },
      {
        culture: "Baltic",
        deity: "Aušrinė",
        details:
          "Lithuanian Aušrinė is the dawn goddess or morning star deity in Baltic mythology, whose name derives from the same PIE root (*h₂ews-). She appears in Lithuanian folk songs (dainos) as a celestial maiden associated with the planet Venus as the morning star. Latvian tradition preserves a cognate in Auseklis, the morning star, with a masculine grammatical gender but similar mythological function.",
      },
    ],
    category: "deity",
  },
  {
    id: "divine-twins",
    name: "Divine Twins (*Diwó-s sunū́)",
    description:
      "The PIE Divine Twins, reconstructed as the 'Sons of the Sky God' (*Diwó-s sunū́), are a pair of young horseman-gods associated with the morning and evening star, rescue at sea, horsemanship, and healing. They often have a special relationship with their sister, the Sun Maiden (*Sāweliyos dʰugh₂tḗr, 'Daughter of the Sun'), and function as benevolent helpers of humanity. The twin motif is one of the most widespread and detailed mythological correspondences across IE traditions, with Donald Ward and others establishing extensive parallels.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Aśvínau (the Ashvins)",
        details:
          "The Aśvínau ('the Horsemen') are twin gods of the Rigveda, sons of the sky or the sun, divine physicians (dásrā) and rescuers of those in distress. They travel in a three-wheeled chariot at dawn and dusk, and they are associated with honey (mádhu). They courted the Sun Maiden Sūryā. Over 50 Rigvedic hymns are dedicated to them, making them among the most frequently invoked deities.",
      },
      {
        culture: "Greek",
        deity: "Dióskouroi (Kastor & Polydeuces)",
        details:
          "The Dióskouroi ('youths of Zeus'), Kastor and Polydeuces (Latin Castor and Pollux), are sons of Zeus and Leda. They are associated with horsemanship (Kastor as the horse-tamer), rescue at sea (St. Elmo's fire was attributed to them), and appear as the constellation Gemini. The motif of one twin being mortal and the other immortal, sharing immortality between them, may reflect an ancient IE myth about the twins' alternation, paralleling their identification with the morning and evening star.",
      },
      {
        culture: "Germanic",
        deity: "Alcis",
        details:
          "Tacitus (Germania, ch. 43) reports that the Naharvali, a Germanic tribe, worshipped a pair of divine brothers called the Alcis in a sacred grove, attended by a priest in women's clothing. He identifies them with Castor and Pollux by interpretatio Romana. The name Alcis may derive from PIE *h₂elk- ('to defend') and is possibly cognate with Vedic rakṣ- ('to protect'). The Norse Freyr and Njörðr as the Vanir gods may also distantly reflect the twin-deity pattern.",
      },
      {
        culture: "Baltic",
        deity: "Dieva dēli (Sons of God)",
        details:
          "Latvian folk songs (dainas) extensively reference the Dieva dēli ('Sons of God'), who court the Saules meita ('Daughter of the Sun') and ride horses across the sky. They serve as celestial horsemen associated with the morning and evening star, directly parallel to the Vedic Ashvins courting Sūryā. Lithuanian tradition preserves a similar pair, the Dievo sūneliai, in analogous folk narratives.",
      },
      {
        culture: "Celtic (Insular)",
        deity: "Macha & related twin/horse figures",
        details:
          "While the Celtic reflex is debated, the Irish Macha (who races against horses while pregnant and bears twins) and the Welsh Pryderi (associated with horses from birth) have been connected by scholars like D. Ward to the broader IE Divine Twin pattern. The Gaulish inscription of Divanno and Dinomogetimarus as a paired cult may also be relevant, though the evidence is less secure than in other branches.",
      },
    ],
    category: "deity",
  },
  {
    id: "thunder-god",
    name: "Thunder God (*Perkʷunos)",
    description:
      "The PIE thunder god, often reconstructed as *Perkʷunos (from *perkʷu- 'oak' or 'striking'), is a warrior deity who wields a weapon, typically a club, axe, or hammer, against serpentine or chaotic adversaries. While the name *Perkʷunos is best preserved in Baltic and Slavic branches, functionally equivalent thunder gods appear throughout IE traditions. This deity is typically the most actively worshipped god in his respective pantheon, a champion of the cosmic order against the forces of chaos, and a god of storms, rain, and fertility of the land. He is distinct from the Sky Father and often in tension with or subordinate to the sovereign deity.",
    cultures: [
      {
        culture: "Norse (Germanic)",
        deity: "Þórr (Thor)",
        details:
          "Thor, son of Odin (Jörð, the Earth, being his mother), wields the hammer Mjölnir and protects Midgard (the human world) against the Jötnar (giants). His name derives from Proto-Germanic *Þunraz ('thunder'), cognate with Latin tonitrus. He rides a chariot drawn by two goats, Tanngrisnir and Tanngnjóstr. His greatest adversary is the World Serpent Jörmungandr, whom he is fated to slay and be slain by at Ragnarök. Thursday (Þórsdagr) bears his name.",
      },
      {
        culture: "Slavic",
        deity: "Perun",
        details:
          "Perun is the supreme thunder god of the Slavic pantheon, whose name directly continues PIE *Perkʷunos (with regular Slavic *kʷ > p before u). He was the chief deity of the pre-Christian Slavic religion, associated with oak trees, eagles, and the high places of the sky. In the Primary Chronicle, Prince Vladimir erected an idol of Perun with a silver head and golden mustache in Kiev. Perun's mythological battle against the chthonic serpent Veles (who steals cattle and retreats to the waters) is the core Slavic myth.",
      },
      {
        culture: "Baltic",
        deity: "Perkūnas",
        details:
          "Lithuanian Perkūnas (Latvian Pērkons) preserves the PIE theonym *Perkʷunos most faithfully of all attested traditions. He is the god of thunder, lightning, rain, and the oak. Baltic folk tradition depicts him as a fierce, axe-wielding figure who strikes the devil (velnias) hiding in trees, stones, and animals. The Lithuanian word perkūnija ('thunderstorm') derives from his name, and oak groves were sacred to his cult. He is among the most prominent figures in the Lithuanian dainos.",
      },
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Indra",
        details:
          "Indra is the king of the gods in the Rigveda, to whom more hymns are addressed than to any other deity (approximately 250). He wields the vajra (thunderbolt), rides a chariot, and is the great warrior who slew the serpent Vṛtra to release the waters. While his name does not continue *Perkʷunos, his mythological function as the thunder-wielding, serpent-slaying champion of cosmic order is the precise functional equivalent. His weapon, the vajra, was fashioned by the divine craftsman Tvaṣṭṛ.",
      },
      {
        culture: "Greek",
        deity: "Zeus (as thunderer)",
        details:
          "In Greek tradition, the sky father Zeus absorbed the thunder god function, wielding the keraunós (thunderbolt) forged by the Cyclopes. His epithets include Keraunios ('of the thunderbolt'), Brontaios ('of thunder'), and Astrapios ('of lightning'). This merger of the sky father and thunder god roles into a single figure is a Greek innovation; in most other IE traditions, these remain distinct deities (e.g., Norse Odin vs. Thor, Vedic Dyáuṣ vs. Indra).",
      },
    ],
    category: "deity",
  },
  {
    id: "dragon-serpent-slayer",
    name: "Dragon/Serpent Slayer Myth",
    description:
      "One of the central PIE myths involves a heroic figure, often the thunder god, who battles and slays a serpent or dragon that has dammed or stolen the cosmic waters (or cattle). This 'chaoskampf' narrative was reconstructed by Calvert Watkins in his work 'How to Kill a Dragon' (1995), identifying a shared poetic formula: 'the hero slew the serpent.' The myth encodes a cosmogonic or cosmological struggle between order (represented by the hero and the released waters) and chaos (the serpent who hoards or obstructs). It has reflexes in nearly every IE branch and is among the most confidently reconstructed PIE narrative structures.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Indra vs. Vṛtrá",
        details:
          "The foundational version: Indra, empowered by soma, strikes the serpent Vṛtrá ('the Obstruction') with his vajra, splitting him open and releasing the pent-up waters that flow forth to nourish the world. This myth is narrated repeatedly throughout the Rigveda, especially in the cycle of hymns 1.32. Vṛtrá is described as lying across the mountains like a dam. The formula 'áhan vṛtrám' ('he slew Vṛtra') is among the most repeated ritual phrases.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Þórr vs. Jörmungandr",
        details:
          "Thor's perpetual enmity with the Miðgarðsormr (World Serpent, Jörmungandr) is the Norse reflex of the serpent-slayer myth. The famous fishing episode (Hymiskviða) in which Thor hooks the serpent and nearly kills it, and the final confrontation at Ragnarök where he slays the serpent but dies from its venom after taking nine steps, preserve ancient elements of the combat myth. The mutual destruction motif may reflect a variant where the hero is also doomed.",
      },
      {
        culture: "Greek",
        deity: "Zeus vs. Typhon; Apollo vs. Python",
        details:
          "Zeus's battle against the monstrous serpentine Typhon (Τυφῶν), who threatened to overthrow the Olympian order, preserves the IE chaoskampf. Apollo's slaying of the serpent Python at Delphi to establish his oracle is another reflex. The Hesiodic tradition (Theogony 820-868) describes Typhon as a hundred-headed dragon. Additionally, the myth of Herakles and the Hydra may carry traces of the same pattern.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Θraētaona vs. Aži Dahāka",
        details:
          "In the Avestan tradition (Yašt 9.14), the hero Θraētaona (later Middle Persian Ferēdūn) defeats the three-headed, six-eyed serpent Aži Dahāka, who was created by Angra Mainyu to destroy the world. This is one of the core myths of Iranian heroic tradition, preserved through the Shāhnāmeh. The Vedic cognate of Θraētaona is Trita Āptya, 'the Third, of the Waters,' who also slays a three-headed dragon in RV 10.99.6.",
      },
      {
        culture: "Slavic",
        deity: "Perun vs. Veles",
        details:
          "Reconstructed by V. V. Ivanov and V. N. Toporov (1974), the Slavic 'basic myth' describes Perun (the thunder god, residing in the sky/on a mountain) battling Veles (the chthonic serpent-god of waters and cattle, residing below). Veles steals Perun's cattle (or wife, or children), provoking Perun to strike him with thunderbolts. The defeated Veles hides in water, trees, or animals. This seasonal myth explains the thunderstorm: Perun's lightning strikes release the rain/cattle hoarded by Veles.",
      },
    ],
    category: "motif",
  },
  {
    id: "sacred-fire",
    name: "Sacred Fire (*h₁n̥gʷnis)",
    description:
      "Fire held a central position in PIE religion, both as a deified force and as the ritual hearth that formed the axis of domestic and communal worship. The PIE word for fire, *h₁n̥gʷnis, is preserved across multiple branches (Latin ignis, Sanskrit Agní, Lithuanian ugnis, Old Church Slavonic ogni). The sacrality of fire is reflected in the institution of a perpetual or ritually maintained flame tended by dedicated priests or priestesses, and in fire's role as the intermediary between humans and the gods, serving as the conveyor of sacrificial offerings. The fire deity or concept is often associated with the hearth, the home, and the cosmic center.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Agní",
        details:
          "Agni is the god of fire in the Rigveda, second only to Indra in the number of hymns addressed to him (approximately 200). His name directly continues PIE *h₁n̥gʷnis. He is the priest of the gods (purohita) and the god of priests, serving as the divine intermediary (dūta, 'messenger') who carries sacrificial offerings from the human world to the celestial realm via the sacrificial flame. He is present in every hearth and every ritual fire. The Agnicayana ritual of constructing a fire altar is among the most elaborate Vedic ceremonies.",
      },
      {
        culture: "Greek",
        deity: "Hestía",
        details:
          "Hestía is the goddess of the hearth, whose name derives from PIE *wes- ('to burn, dwell'). Every Greek household maintained a hearth fire sacred to Hestia, and every city had a public hearth (prytaneion) where a perpetual flame burned. She received the first and last offering at every sacrifice. Though she has few myths, her cultic importance was immense. The related figure Hephaistos (god of fire and the forge) represents a different functional aspect of the fire concept.",
      },
      {
        culture: "Roman",
        deity: "Vesta",
        details:
          "Vesta, the Roman cognate of Greek Hestía (both from *wes-), was the goddess of the sacred hearth fire of Rome. Her round temple in the Forum Romanum housed a perpetual flame tended by the Vestal Virgins (Virgines Vestales), six priestesses who served for thirty years and whose lapse in duty was punishable by death. The extinction of Vesta's fire was considered a portent of national catastrophe. Her cult was among the oldest and most revered in Roman religion.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Ātar",
        details:
          "Ātar is the Avestan fire deity, son of Ahura Mazdā, and one of the most sacred elements in Zoroastrian religion. Cognate with Sanskrit atharvan- ('fire priest'), Ātar is maintained perpetually in Zoroastrian fire temples (ātaš gāh). Three grades of sacred fire are recognized, the highest being Ātaš Bahrām ('Fire of Victory'). Ātar battled the dragon Aži Dahāka for possession of the divine glory (xᵛarənah). The Zoroastrian reverence for fire as the visible symbol of Aša (Truth/Cosmic Order) reflects the PIE association of fire with ritual purity.",
      },
      {
        culture: "Baltic",
        deity: "Gabija / Sacred hearth fire",
        details:
          "Lithuanian tradition preserved the cult of the sacred hearth fire, called Gabija (from gabti, 'to cover,' referring to the banking of embers at night). The perpetual fire was maintained at the temple of Romuva and tended by priestesses called vaidilutės, a striking parallel to the Roman Vestals. Lithuanian ugnis ('fire') directly continues PIE *h₁n̥gʷnis. The hearth fire was personified as a female domestic spirit who protected the household.",
      },
    ],
    category: "deity",
  },
  {
    id: "cattle-raid",
    name: "Cattle Raid / Cattle as Wealth (*gʷōus)",
    description:
      "Cattle constituted the primary form of mobile wealth in PIE society, and raids to capture another community's cattle formed a central narrative and cultural motif. The PIE word for cattle, *gʷōus (cf. Sanskrit gáu, Greek boûs, Latin bōs, Old English cū), is also the etymological source of words for 'wealth' in several branches. Mythologically, the theft and recovery of cattle appears as a divine narrative: a malevolent force steals the cosmic cattle (often identified with rain clouds, rivers, or the dawn), and a heroic deity recovers them. Historically, cattle raiding was an institution of IE warrior culture that persisted for millennia.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Paṇi cattle theft; Saramā",
        details:
          "In Rigvedic mythology (RV 10.108), the Paṇis (demonic misers) steal the cosmic cattle and hide them in a cave (vala). The divine hound Saramā is sent by Indra to track them, and Indra (with the Aṅgirases) eventually breaks open the vala to release the cattle, which are equated with the dawn, the waters, or the sun's rays. The word gavyā/gavișṭi means both 'desire for cattle' and 'battle,' reflecting how deeply cattle and warfare were intertwined.",
      },
      {
        culture: "Irish (Celtic)",
        deity: "Táin Bó Cúailnge",
        details:
          "The Táin Bó Cúailnge ('Cattle Raid of Cooley') is the central epic of the Ulster Cycle, in which Queen Medb of Connacht invades Ulster to capture the great bull Donn Cúailnge. The Táin and the many other Irish tales with the formula Táin Bó ('cattle raid of...') reflect the centrality of cattle raiding in Celtic warrior culture. Cattle were the primary unit of wealth, and bride-prices and legal fines were reckoned in cattle.",
      },
      {
        culture: "Greek",
        deity: "Hermes steals Apollo's cattle; Herakles and Geryon",
        details:
          "In the Homeric Hymn to Hermes, the newborn god Hermes steals fifty cattle from Apollo, driving them backwards to confuse their tracks, a trickster cattle-raid narrative. Herakles' tenth labor, stealing the cattle of the triple-bodied Geryon from the far west, is another reflex of the IE cattle-recovery myth. The word bous-ia (sacrifice of cattle) was the literal meaning of hecatomb.",
      },
      {
        culture: "Slavic",
        deity: "Veles as cattle god",
        details:
          "In the reconstructed Slavic mythology of Ivanov and Toporov, Veles (the chthonic serpentine deity) is specifically associated with cattle and wealth (Russian dialectal volos, 'relating to cattle'). Perun's thunderbolts strike Veles to recover the stolen cattle, and the rain that follows is the metaphorical recovery of the heavenly herds. The medieval oath formula invoking both Perun and Veles in the Russo-Byzantine treaties likely reflects this mythological opposition of sky-warrior and cattle-guardian.",
      },
      {
        culture: "Germanic",
        deity: "Wealth reckoned in cattle (fehu)",
        details:
          "The Proto-Germanic word *fehu ('cattle, wealth, money') is the origin of the first rune ᚠ of the Elder Futhark. It is cognate with Latin pecū ('cattle') and pecūnia ('money'). The semantic shift from 'cattle' to 'wealth/money' occurred independently in multiple IE branches, testifying to the PIE equivalence of livestock and prosperity. Old English feoh meant both 'cattle' and 'property,' and the modern English word 'fee' descends from this root.",
      },
    ],
    category: "motif",
  },
  {
    id: "world-tree",
    name: "World Tree / Cosmic Axis (*-deru-)",
    description:
      "The concept of a cosmic tree or pillar that connects the three vertical zones of the universe, namely sky, earth, and underworld, appears across multiple IE traditions. The PIE word *dóru ('tree, wood,' cf. Sanskrit dā́ru, Greek dóry, Old English trēow) and *deru- ('to be firm, solid, tree') form the linguistic basis. The cosmic tree often has an eagle at its crown, a serpent at its roots, and an animal running between them. It serves as the axis mundi around which the cosmos is organized, and its health reflects the state of the cosmos itself. Sacred trees, especially oaks, were central to PIE and daughter-tradition ritual life.",
    cultures: [
      {
        culture: "Norse (Germanic)",
        deity: "Yggdrasill",
        details:
          "Yggdrasill is the great ash (or possibly yew) tree at the center of Norse cosmology, connecting the nine worlds. An eagle perches at its crown, the serpent Níðhöggr gnaws at its roots, and the squirrel Ratatoskr runs between them carrying insults. Three wells lie beneath its roots: Urðarbrunnr (Well of Fate), Mímisbrunnr (Well of Wisdom), and Hvergelmir (source of rivers). Odin hung himself on this tree for nine nights to gain the runes, making Yggdrasill both a cosmic structure and a site of initiatory sacrifice.",
      },
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Aśvattha (the cosmic fig tree)",
        details:
          "The Rigveda and later Upanishads describe a cosmic tree with its roots above and branches below (ūrdhvamūla, RV 1.24.7; Kaṭha Upaniṣad 6.1), an inversion that signifies the celestial origin of existence. The Aśvattha (Ficus religiosa) is the sacred tree under which the Buddha later attained enlightenment. In Vedic cosmology, two birds sit in this tree, one eating its fruit, the other watching (RV 1.164.20), an image parallel to the Norse eagle and hawk in Yggdrasill.",
      },
      {
        culture: "Slavic",
        deity: "World Oak / World Tree",
        details:
          "East Slavic folk tradition, reconstructed from byliny, folk charms, and embroidery patterns, describes a world tree (often an oak) standing at the center of the world on the island of Buyan. An eagle sits in its crown, a serpent lies at its roots, and bees inhabit its trunk. This three-level tree maps onto the tripartite Slavic cosmos: the heavens (Perun's realm), the middle world, and the waters below (Veles's realm). The structural parallel with Norse Yggdrasill is extensive.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "The Saēna Tree (Vīspo.bīš)",
        details:
          "The Avestan tradition describes a sacred tree called Vīspo.bīš ('all-healing') growing in the cosmic sea Vourukaša. The great bird Saēna (cognate with Sanskrit śyená, 'eagle/hawk') nests in its branches. The seeds of all plants originate from this tree. This cosmic tree parallels Yggdrasill in having a great raptor perched in it and standing in or near cosmic waters, and the Vedic cosmic tree in its life-giving function.",
      },
      {
        culture: "Baltic",
        deity: "The World Tree in dainos",
        details:
          "Lithuanian and Latvian folk songs frequently reference a cosmic tree (often an oak, birch, or linden) standing at the center or edge of the world, in or near the sea. The Sun (Saulė) hangs her belt on its branches, and the celestial bodies revolve around it. Its imagery pervades Baltic textile patterns and folk art. Like the Slavic and Norse versions, it connects the celestial, terrestrial, and chthonic realms, serving as the organizing axis of the cosmos.",
      },
    ],
    category: "cosmology",
  },
  {
    id: "trifunctional-ideology",
    name: "Trifunctional Ideology (Dumézil's Three Functions)",
    description:
      "Georges Dumézil (1898 to 1986) proposed that PIE society and mythology were organized around three fundamental functions: (1) sovereignty and the sacred (priests, kings, cosmic order), (2) military force (warriors, physical power), and (3) fertility and production (farmers, herders, abundance). This trifunctional hypothesis, developed across Dumézil's extensive body of work, argues that these three functions structured not only social classes but also pantheons, mythological narratives, and rituals across IE cultures. While debated, the trifunctional pattern has proven remarkably productive for comparative mythology and has been confirmed by independent social-structural evidence (e.g., the Indian varṇa system, Roman tripartite flamines, Celtic/Germanic social tripartition).",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Varṇa system: Brāhmaṇa, Kṣatriya, Vaiśya",
        details:
          "The Vedic social order exhibits Dumézil's three functions in its varṇa system: the Brāhmaṇas (priests, 1st function of sovereignty/sacred), the Kṣatriyas/Rājanya (warriors, 2nd function of military force), and the Vaiśyas (commoners/producers, 3rd function of fertility/production). The divine patrons map accordingly: Mitra-Varuṇa (sovereignty, law, cosmic order), Indra (warrior might), and the Aśvins/Nāsatyas (healing, abundance, fertility). The Puruṣa Sūkta (RV 10.90) mythologically derives the four varṇas from the cosmic man's body.",
      },
      {
        culture: "Roman",
        deity: "Jupiter, Mars, Quirinus (Archaic Triad)",
        details:
          "Rome's archaic pre-Capitoline triad, Jupiter, Mars, and Quirinus, maps onto Dumézil's three functions: Jupiter as sovereign/priest-king of the gods (1st function), Mars as the war god (2nd function), and Quirinus as the deified Romulus associated with the peaceful, productive Roman populace (3rd function). Their respective flamines (flamen Dialis, flamen Martialis, flamen Quirinalis) constituted the three major priesthoods of the early Roman state, directly reflecting trifunctional organization.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Odin, Thor, Freyr",
        details:
          "The Norse pantheon exhibits trifunctionality in its major gods: Odin (Óðinn) represents sovereignty, wisdom, magic, and the sacred (1st function); Thor (Þórr) represents warrior might and defense of the cosmic order (2nd function); and Freyr (along with Freyja and the Vanir deities generally) represents fertility, abundance, peace, and prosperity (3rd function). The mythological war between the Æsir and Vanir, ending in their integration, has been interpreted as reflecting the incorporation of 3rd-function deities into the pantheon.",
      },
      {
        culture: "Celtic (Gaulish/Insular)",
        deity: "Druids, Warriors, Free Farmers",
        details:
          "Caesar (De Bello Gallico 6.13) describes Gaulish society as divided into druides (priests, 1st function), equites (warriors/knights, 2nd function), and plebs (commoners, 3rd function). Irish tradition similarly distinguishes druids, warriors (fían), and farmers (bó-aire, literally 'cow-noble'). The three major Irish peoples, Tuatha Dé Danann (gods of skill/sovereignty), Fír Bolg (warrior settlers), and Fomorians (associated with agricultural fertility and chthonic forces), may also encode the trifunctional pattern.",
      },
      {
        culture: "Scythian / Iranian",
        deity: "Three-part origin myth",
        details:
          "Herodotus (Histories 4.5-6) relates the Scythian origin myth in which three golden objects, a cup, a battle-axe, and a plough with yoke, fell from heaven. Only the youngest son, Colaxais, could touch them without the gold catching fire. The three objects represent Dumézil's three functions: the cup (priestly sovereignty), the axe (warrior force), and the plough (agricultural production). The three Scythian tribes descended from the three sons correspond to the three functional classes.",
      },
    ],
    category: "motif",
  },
  {
    id: "horse-sacrifice",
    name: "Horse Sacrifice / Sacred Horse (*h₁éḱwos)",
    description:
      "The horse, domesticated on the Pontic-Caspian steppe by approximately 4000 BCE, held extraordinary ritual and symbolic importance in PIE and derivative cultures. The PIE word *h₁éḱwos (Sanskrit áśva, Latin equus, Greek híppos, Old English eoh) is securely reconstructed. Horse sacrifice was among the most solemn and significant of PIE rituals, associated with royal consecration, cosmic renewal, and sovereign legitimacy. The consistent appearance of elaborate horse sacrifice rituals across geographically distant IE cultures, with specific shared structural elements (royal consecration, sexual symbolism, dismemberment, cosmic identification of the horse), strongly suggests a common PIE origin.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Aśvamedha",
        details:
          "The Aśvamedha (horse sacrifice) was the most prestigious Vedic royal ritual, described in the Yajurveda and Śatapatha Brāhmaṇa. A specially selected white stallion was set free to roam for one year, followed by the king's army. All territory the horse entered was claimed for the king. After its return, the horse was ritually suffocated, and the chief queen performed a symbolic sexual act with the dead horse under a covering (a detail with parallels in other IE traditions). The horse was identified with the cosmos, and its dismembered body parts were equated with cosmic elements.",
      },
      {
        culture: "Roman",
        deity: "October Equus (October Horse)",
        details:
          "On the Ides of October, the Romans sacrificed the right-hand horse of the winning chariot team in a race on the Campus Martius. Its head and tail were cut off; the tail was carried to the Regia so that blood dripped on the sacred hearth, and the head was fought over by the inhabitants of two neighborhoods (Suburra and Via Sacra). Dumézil, following the analysis of the October Equus, identified structural parallels with the Vedic Aśvamedha: royal association, ritual dismemberment, and the special treatment of the horse's extremities.",
      },
      {
        culture: "Irish (Celtic)",
        deity: "Royal horse ritual (Giraldus Cambrensis)",
        details:
          "Gerald of Wales (Topographia Hibernica, c. 1188) described a royal inauguration ritual in Donegal in which the king-to-be ritually mated with a white mare, which was then killed, dismembered, and boiled. The king bathed in the broth and ate the horse's flesh. While Gerald's account may be sensationalized, the structural parallels with the Vedic Aśvamedha, especially the sexual element, the royal consecration context, the white horse, and its consumption, are striking and have been analyzed by scholars including Jaan Puhvel and Wendy Doniger.",
      },
      {
        culture: "Germanic (Norse)",
        deity: "Blót horse sacrifice",
        details:
          "Horse sacrifice played an important role in Norse pagan religion. Adam of Bremen (c. 1070) describes horse carcasses hanging in the sacred grove at the Temple of Uppsala alongside humans and dogs. Ibn Fadlan's account of a Rus (Varangian) ship burial describes the sacrifice and dismemberment of horses. The consumption of horse meat (hrossát) was so strongly associated with pagan ritual that its prohibition was one of the first acts of the Christianized Scandinavian kingdoms, and the eating of horse meat became a marker of paganism.",
      },
      {
        culture: "Scythian / Central Asian",
        deity: "Kurgan horse burials",
        details:
          "Archaeological evidence from Scythian, Pazyryk, and related steppe cultures reveals elaborate horse burials accompanying elite individuals, with horses sacrificed, sometimes in large numbers (dozens of horses in a single royal kurgan). The frozen Pazyryk tombs preserve horses buried with ornate gold and felt trappings. Herodotus describes the Scythian royal funeral involving the strangling and mounting of horses around the burial mound. These practices represent the continuation of PIE horse-sacrifice traditions on the steppe from which the IE expansion originated.",
      },
    ],
    category: "ritual",
  },
  {
    id: "sacred-drink",
    name: "Sacred Intoxicating Drink (*médʰu)",
    description:
      "The preparation and ritual consumption of a sacred intoxicating beverage is a deeply embedded PIE religious practice. The PIE word *médʰu ('honey, mead, intoxicating drink') is one of the most widely attested cultural terms (cf. Sanskrit mádhu, Greek méthy, Old English medu, Old Church Slavonic medŭ). In several branches, a specific ritual drink, prepared from a plant (Vedic sóma, Avestan haoma) or from fermented honey, was central to religious ceremonies, believed to confer divine power, poetic inspiration, or immortality. The mythological theft or recovery of this sacred drink from a hostile guardian is a recurrent narrative.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Sóma",
        details:
          "Sóma is both a deity and a ritually pressed plant juice in the Rigveda, with the entire ninth maṇḍala (114 hymns) dedicated to its preparation. The soma plant was pressed between stones, filtered through wool, mixed with milk or water, and consumed by priests during the ritual. It was believed to grant immortality, ecstatic visions, and divine power. The identity of the original soma plant remains debated (candidates include Ephedra, Amanita muscaria, and Peganum harmala). Indra consumed vast quantities of soma before slaying Vṛtra.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Haoma",
        details:
          "Avestan haoma is the exact Iranian cognate of Vedic sóma (PIE *sewh₂- 'to press, extract juice'). The Hōm Yašt (Yasna 9-11) describes the preparation and ritual use of haoma in Zoroastrian ceremony, where it is personified as a deity who was the first priest. Unlike Vedic soma, haoma worship survived into historical Zoroastrianism and is still ritually prepared in modern Zoroastrian ceremonies using Ephedra twigs. The Indo-Iranian origin of the soma/haoma cult is universally accepted.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Mead of Poetry (Óðrœrir)",
        details:
          "Norse mythology preserves the myth of the Mead of Poetry (Óðrœrir), brewed from the blood of the wisest being, Kvasir. The giants Fjalarr and Galarr murdered Kvasir and blended his blood with honey to create the mead that grants poetic and scholarly ability. Odin recovered this mead through trickery, seduction of the giantess Gunnlöð, and shape-shifting into an eagle. The structural parallel, a sacred drink granting divine/poetic powers, stolen or recovered from hostile guardians, mirrors the Vedic myth of Indra's recovery of soma.",
      },
      {
        culture: "Greek",
        deity: "Néktar and Ambrosia",
        details:
          "The Greek divine drink néktar (possibly from PIE *neḱ- 'death' + *terh₂- 'overcome,' i.e., 'overcoming death') and food ambrosía (from *n̥-mṛtos, 'immortal,' cognate with Sanskrit amṛta) conferred immortality on the gods. While the specific preparation ritual was not preserved as in the Vedic tradition, the conceptual parallel, a divine intoxicant associated with immortality, is consistent with the broader IE pattern. The word ambrosia is the exact cognate of Sanskrit amṛta, both meaning 'immortality.'",
      },
      {
        culture: "Celtic",
        deity: "Mead (mid) and the Cauldron of Inspiration",
        details:
          "Welsh tradition preserves the Cauldron of Cerridwen, which brewed an awen (poetic inspiration) drink for a year and a day. Three drops conferred all knowledge and poetic power on Gwion Bach (who became Taliesin). Irish tradition features the Well of Wisdom (Tobar Segais) surrounded by hazel trees whose nuts drop into the water and are eaten by the Salmon of Knowledge. The Celtic traditions of mead (Old Irish mid, Welsh medd, from PIE *médʰu) as a sacred and prestige beverage complement these mythological narratives of divinely potent drinks.",
      },
    ],
    category: "ritual",
  },
  {
    id: "sun-deity",
    name: "Sun Deity / Solar Chariot (*sóh₂wl̥)",
    description:
      "The PIE sun, *sóh₂wl̥ (cf. Sanskrit sū́rya, Latin sōl, Greek hḗlios, Gothic sauil, Old Church Slavonic slŭnĭce), was conceived as a deity who traversed the sky in a horse-drawn chariot. Archaeological evidence from the Nordic Bronze Age (the Trundholm sun chariot, c. 1400 BCE) confirms the antiquity of this motif. The sun's gender varies across branches, masculine in some (Sanskrit Sūrya, Greek Helios), feminine in others (Germanic *Sunnōn, Baltic Saulė), suggesting that the PIE original may have been grammatically neuter. The sun's daily journey, disappearance at night (often explained by a journey through the underworld or a sea voyage), and association with the cosmic chariot are widely shared.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Sūrya",
        details:
          "Sūrya is the solar deity of the Rigveda, who rides a chariot with one or seven horses driven by the charioteer Aruṇa (the dawn). He is the 'eye of Mitra and Varuṇa,' surveying all the world's deeds. Sūrya's daughter, Sūryā, is courted by the Ashvins (the Divine Twins), a mytheme with parallels in Baltic tradition. The Gāyatrī mantra (RV 3.62.10), the most sacred Vedic verse, is a meditation on the divine light of Savitṛ, the solar impeller.",
      },
      {
        culture: "Greek",
        deity: "Hḗlios",
        details:
          "Hḗlios (from PIE *sh₂wélios) drives a four-horse chariot (quadriga) across the sky from east to west, then returns at night in a golden cup sailing on the river Oceanus. He is the 'all-seeing' witness god who observes oaths and transgressions. The myth of Phaëthon, his son who lost control of the solar chariot and was struck down by Zeus's thunderbolt, may preserve an ancient IE mytheme about the dangers of solar irregularity.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Sól",
        details:
          "In Norse mythology, Sól (Proto-Germanic *Sunnōn) is a goddess who drives the solar chariot, pursued across the sky by the wolf Sköll, who will finally devour her at Ragnarök. The Trundholm sun chariot, a Bronze Age artifact from Denmark (c. 1400 BCE), depicts a horse pulling a golden solar disc on a wheeled platform, providing striking archaeological confirmation of the IE solar chariot concept in a Germanic context over a thousand years before the Norse literary sources.",
      },
      {
        culture: "Baltic",
        deity: "Saulė",
        details:
          "Lithuanian Saulė is the sun goddess, one of the central figures in Baltic mythology. She rides in a chariot drawn by horses that never tire, and she is the mother of the Saules meita ('Sun's daughter'), who is courted by the Dieva dēli (Divine Twins). Latvian folk songs (dainas) describe Saulė dancing on a silver mountain at midsummer and dipping into the sea at evening. The Baltic feminine sun and masculine moon (Mēnesis/Mėnulis) preserve a gendered pairing that contrasts with but complements the pattern in other IE branches.",
      },
      {
        culture: "Celtic",
        deity: "Sulis / Belenus",
        details:
          "The Celtic sun deity is attested through theonyms such as Sulis (the goddess of the thermal springs at Bath, whose name derives from *sūli-, cognate with Latin sōl) and Belenus (a widely worshipped Gaulish god associated with light and healing, attested in over 50 inscriptions). The Coligny calendar and solar-aligned megalithic monuments of the Celtic world attest to sophisticated solar observation. The festival of Beltaine (May 1) may incorporate the theonym Bel- from a solar deity.",
      },
    ],
    category: "deity",
  },
  {
    id: "cosmic-order",
    name: "Cosmic Order / Truth (*h₂r̥tós)",
    description:
      "A fundamental PIE concept was the existence of a cosmic order or universal truth that governed both the natural and moral worlds. Reconstructed as *h₂r̥tós ('properly fitted, right, true'), this concept is reflected in Vedic ṛtá, Avestan aša (aṣ̌a), Greek artós/harmonia, and Latin ars/artus. It encompassed the regularity of natural phenomena (seasons, celestial movements, growth), the correctness of ritual performance, the truth of speech, and moral righteousness. Violation of this cosmic order was the fundamental definition of wrong action, and maintaining it was the primary duty of gods, priests, and kings.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Ṛtá (guarded by Mitra and Varuṇa)",
        details:
          "Ṛtá is the cosmic order that governs the universe in Vedic thought: the principle that ensures the sun rises, the seasons turn, and rituals achieve their purpose. Varuṇa is the chief guardian of ṛtá, punishing those who transgress its laws with his snares (pā́śa). Mitra, his partner, represents the contractual, social aspect of ṛtá. The opposite of ṛtá is druh (falsehood, disorder). The Rigvedic poets describe the gods as acting 'in accordance with ṛtá' (ṛténa), and the sacrificial fire is said to be 'born of ṛtá' (ṛtā́vān).",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Aša (Aṣ̌a Vahišta)",
        details:
          "Avestan aša is the exact Iranian cognate of Vedic ṛtá, both from PIE *h₂r̥tós. In Zoroastrian theology, Aša Vahišta ('Best Truth') is one of the seven Ameša Spentas (Bountiful Immortals) and represents cosmic truth, righteousness, and order. The fundamental ethical dualism of Zoroastrianism, Aša vs. Druj (Truth vs. Lie), directly develops the PIE opposition of *h₂r̥tós vs. *drugh- (disorder). The Zoroastrian phrase 'aṣ̌əm vohū' ('truth is the highest good') opens many prayers.",
      },
      {
        culture: "Greek",
        deity: "Díkē, Thémis, Harmonía",
        details:
          "Greek preserves the concept through several divine personifications: Díkē (Justice, daughter of Zeus and Themis), Thémis (Divine Law, the primordial embodiment of right custom), and Harmonía (cosmic fitting-together). While the specific PIE word *h₂r̥tós is not directly continued in the Greek theonyms, the concept of a cosmic justice that governs both nature and human affairs, overseen by Zeus as guarantor, is the precise functional equivalent. Hesiod's Works and Days extensively develops the theme of díkē versus hýbris.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Örlög and the Norns",
        details:
          "In Norse cosmology, örlög ('primal law/fate') represents the fundamental cosmic order laid down at the beginning of time. The three Norns, Urðr (Fate/What Has Become), Verðandi (Becoming), and Skuld (What Shall Be), tend the Well of Urðr at the base of Yggdrasill, watering the World Tree and carving the fates of all beings into its wood. This maintenance of cosmic order through ritual action at the cosmic center closely parallels the Vedic priests' maintenance of ṛtá through sacrifice at the ritual fire.",
      },
      {
        culture: "Roman",
        deity: "Fās and Iūs; Ars",
        details:
          "Latin preserves the reflex of *h₂r̥tós in ars ('skill, proper fitting') and artus ('fitted, joint'). The Roman concepts of fās (divine/natural law) and iūs (human/civic law) together cover the domain of the PIE cosmic order. Fās was considered inviolable; what was nefās was an abomination against the cosmic order itself. The pontifex maximus and the college of augurs served to interpret and maintain the correct relationship (pāx deōrum) between Rome and the gods, functioning analogously to the Vedic priest's maintenance of ṛtá.",
      },
    ],
    category: "cosmology",
  },
  {
    id: "underworld-afterlife",
    name: "Realm of the Dead / Underworld (*yemo-)",
    description:
      "The PIE conception of the afterlife centered on a realm of the dead ruled by or associated with the 'First Man' (*Yemo- or *Manu-) who, as the first mortal to die, became the lord and guide of the dead. The PIE word *yemo- ('twin') is reflected in Vedic Yama, Avestan Yima, and Norse Ymir, though these figures' roles diverged significantly across traditions. The path to the underworld often involved crossing a body of water, guided by psychopomps (conductors of souls), and the dead were accompanied by grave goods for the journey. Two dogs often guarded the entrance to the realm of the dead.",
    cultures: [
      {
        culture: "Vedic (Indo-Aryan)",
        deity: "Yama",
        details:
          "Yama (from PIE *Yemo-, 'twin') was the first man to die, and by doing so, he discovered the path to the afterlife and became king of the dead (RV 10.14). His realm is a paradise where the ancestors (pitṛs) feast. Two four-eyed, broad-nosed dogs (the Sarameya, sons of Saramā) guard the path to his kingdom. Yama's twin sister Yamī appears in RV 10.10 in a dialogue where she proposes an incestuous union to continue the human race, which Yama refuses, a mytheme likely reflecting the PIE twin myth.",
      },
      {
        culture: "Iranian (Avestan)",
        deity: "Yima (Yima xšaēta)",
        details:
          "Avestan Yima (the exact cognate of Vedic Yama) is described in the Avesta as the first king of a golden age, who ruled over a deathless, ageless world. He expanded the earth three times to accommodate growing populations (Vidēvdāt 2). However, he fell through the sin of falsehood and lost his divine glory (xᵛarənah). In later Iranian tradition (as Jamshid in the Shāhnāmeh), he becomes a prototype of the just king whose pride causes his downfall. His association with death is less prominent than in Vedic tradition but structurally parallel.",
      },
      {
        culture: "Norse (Germanic)",
        deity: "Ymir; Hel",
        details:
          "Norse Ymir (from PIE *Yemo-, 'twin') is the primordial giant from whose dismembered body the world was created, a cosmogonic myth with Vedic parallels (Puruṣa Sūkta). The realm of the dead, Hel, is ruled by the goddess Hel (daughter of Loki), a cold, grey underworld beneath one root of Yggdrasill. The psychopomp function is served by the Valkyries (for warriors bound for Valhalla) and by Hermóðr's ride to Hel to retrieve Baldr. The dog Garmr guards the entrance to Hel, paralleling Yama's two dogs and Greek Cerberus.",
      },
      {
        culture: "Greek",
        deity: "Hades; Charon; Cerberus",
        details:
          "The Greek underworld, ruled by Hades (Aḯdēs, 'the unseen'), is reached by crossing the river Styx in the boat of the ferryman Charon (requiring an obol placed in the mouth of the dead). The three-headed dog Cerberus guards the entrance, preventing the dead from leaving. The structural elements, a lord of the dead, a water crossing, a dog guardian, are shared with Vedic (Yama, the Vaitaraṇī river, the two Sarameyau dogs) and Norse traditions, suggesting PIE antiquity for the basic eschatological framework.",
      },
      {
        culture: "Baltic",
        deity: "Vėlės / Velu māte",
        details:
          "Lithuanian tradition preserves the concept of vėlės (souls of the dead), cognate with Latvian veļi and possibly with Slavic Veles. Latvian mythology features Velu māte ('Mother of the Dead'), who presides over the realm of deceased souls. The Lithuanian festival of Vėlinės (November 2, now conflated with All Souls' Day) involved leaving food at graves for the dead and lighting bonfires to guide them. The Baltic afterlife was typically envisioned as a continuation of earthly life beyond a hill or body of water.",
      },
    ],
    category: "cosmology",
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
