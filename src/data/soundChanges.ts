export interface SoundShift {
  pieLetter: string;
  description: string;
  shifts: {
    branch: string;
    result: string;
    example?: { pie: string; daughter: string; meaning: string };
  }[];
}

export const grimmsLaw: SoundShift[] = [
  {
    pieLetter: "*p",
    description: "PIE voiceless bilabial stop",
    shifts: [
      {
        branch: "Germanic",
        result: "f",
        example: {
          pie: "*ph₂tḗr",
          daughter: "father (OE fæder)",
          meaning: "father",
        },
      },
      {
        branch: "Latin",
        result: "p (preserved)",
        example: { pie: "*ph₂tḗr", daughter: "pater", meaning: "father" },
      },
      {
        branch: "Greek",
        result: "p (preserved)",
        example: { pie: "*ph₂tḗr", daughter: "patḗr", meaning: "father" },
      },
      {
        branch: "Sanskrit",
        result: "p (preserved)",
        example: { pie: "*ph₂tḗr", daughter: "pitṛ́", meaning: "father" },
      },
    ],
  },
  {
    pieLetter: "*t",
    description: "PIE voiceless dental/alveolar stop",
    shifts: [
      {
        branch: "Germanic",
        result: "þ / th",
        example: {
          pie: "*tréyes",
          daughter: "three (OE þrēo)",
          meaning: "three",
        },
      },
      {
        branch: "Latin",
        result: "t (preserved)",
        example: { pie: "*tréyes", daughter: "trēs", meaning: "three" },
      },
      {
        branch: "Greek",
        result: "t (preserved)",
        example: { pie: "*tréyes", daughter: "treîs", meaning: "three" },
      },
      {
        branch: "Sanskrit",
        result: "t (preserved)",
        example: { pie: "*tréyes", daughter: "tráyas", meaning: "three" },
      },
    ],
  },
  {
    pieLetter: "*k / *ḱ",
    description:
      "PIE voiceless velar stop (plain *k and palatovelar *ḱ merge in centum languages)",
    shifts: [
      {
        branch: "Germanic",
        result: "h",
        example: {
          pie: "*ḱm̥tóm",
          daughter: "hundred (OE hund)",
          meaning: "hundred",
        },
      },
      {
        branch: "Latin",
        result: "c /k/ (preserved as velar)",
        example: { pie: "*ḱr̥d-", daughter: "cor (stem cord-)", meaning: "heart" },
      },
      {
        branch: "Greek",
        result: "k (preserved as velar in centum treatment)",
        example: {
          pie: "*ḱr̥d-",
          daughter: "kardía",
          meaning: "heart",
        },
      },
      {
        branch: "Sanskrit",
        result: "ś (palatovelar *ḱ → ś in satem languages)",
        example: {
          pie: "*ḱm̥tóm",
          daughter: "śatám",
          meaning: "hundred",
        },
      },
    ],
  },
  {
    pieLetter: "*d",
    description: "PIE voiced dental/alveolar stop",
    shifts: [
      {
        branch: "Germanic",
        result: "t",
        example: {
          pie: "*déḱm̥",
          daughter: "ten (OE tīen, Gothic taihun)",
          meaning: "ten",
        },
      },
      {
        branch: "Latin",
        result: "d (preserved)",
        example: { pie: "*déḱm̥", daughter: "decem", meaning: "ten" },
      },
      {
        branch: "Greek",
        result: "d (preserved)",
        example: { pie: "*déḱm̥", daughter: "déka", meaning: "ten" },
      },
      {
        branch: "Sanskrit",
        result: "d (preserved, with palatovelar *ḱ → ś)",
        example: { pie: "*déḱm̥", daughter: "dáśa", meaning: "ten" },
      },
      {
        branch: "Germanic (additional)",
        result: "t",
        example: {
          pie: "*dwóh₁",
          daughter: "two (OE twā)",
          meaning: "two",
        },
      },
    ],
  },
  {
    pieLetter: "*b",
    description:
      "PIE voiced bilabial stop (extremely rare in PIE; its existence is debated)",
    shifts: [
      {
        branch: "Germanic",
        result: "p",
        example: {
          pie: "*dʰewb- (possibly *dʰeub-)",
          daughter: "deep (OE dēop; note: initial *dʰ > d also applies here)",
          meaning: "deep",
        },
      },
      {
        branch: "Latin",
        result: "b (preserved where it occurs)",
      },
      {
        branch: "Greek",
        result: "b (preserved where it occurs)",
      },
      {
        branch: "Sanskrit",
        result: "b (preserved where it occurs)",
      },
    ],
  },
  {
    pieLetter: "*g / *ǵ",
    description:
      "PIE voiced velar stop (plain *g and palatovelar *ǵ merge in centum languages)",
    shifts: [
      {
        branch: "Germanic",
        result: "k",
        example: {
          pie: "*ǵénu",
          daughter: "knee (OE cnēo, with initial k- still pronounced)",
          meaning: "knee",
        },
      },
      {
        branch: "Latin",
        result: "g (preserved as velar)",
        example: { pie: "*ǵénu", daughter: "genū", meaning: "knee" },
      },
      {
        branch: "Greek",
        result: "g (preserved as velar in centum treatment)",
        example: { pie: "*ǵénu", daughter: "gónu", meaning: "knee" },
      },
      {
        branch: "Sanskrit",
        result: "j (palatovelar *ǵ → j in satem languages)",
        example: { pie: "*ǵénu", daughter: "jā́nu", meaning: "knee" },
      },
      {
        branch: "Germanic (additional)",
        result: "k",
        example: {
          pie: "*ǵneh₃-",
          daughter: "know (OE cnāwan)",
          meaning: "to know",
        },
      },
    ],
  },
  {
    pieLetter: "*bʰ",
    description: "PIE voiced aspirated bilabial stop",
    shifts: [
      {
        branch: "Germanic",
        result: "b (via intermediate *β)",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "brother (OE brōþor)",
          meaning: "brother",
        },
      },
      {
        branch: "Latin",
        result: "f- (word-initially), -b- (medially)",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "frāter",
          meaning: "brother",
        },
      },
      {
        branch: "Greek",
        result: "pʰ (φ)",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "phrā́tēr (clansman)",
          meaning: "brother / clansman",
        },
      },
      {
        branch: "Sanskrit",
        result: "bʰ (preserved)",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "bhrā́tṛ",
          meaning: "brother",
        },
      },
    ],
  },
  {
    pieLetter: "*dʰ",
    description: "PIE voiced aspirated dental/alveolar stop",
    shifts: [
      {
        branch: "Germanic",
        result: "d (via intermediate *ð)",
        example: {
          pie: "*dʰeh₁-",
          daughter: "do, deed (OE dōn, dǣd)",
          meaning: "to do, to place",
        },
      },
      {
        branch: "Latin",
        result: "f- (word-initially), -d-/-b- (medially)",
        example: {
          pie: "*dʰeh₁-",
          daughter: "fēcī (perfect of faciō 'I do/make')",
          meaning: "to do, to make",
        },
      },
      {
        branch: "Greek",
        result: "tʰ (θ)",
        example: {
          pie: "*dʰeh₁-",
          daughter: "títhēmi (τίθημι, I place)",
          meaning: "to place, to put",
        },
      },
      {
        branch: "Sanskrit",
        result: "dʰ (preserved)",
        example: {
          pie: "*dʰeh₁-",
          daughter: "dádhāti (he places)",
          meaning: "to place, to put",
        },
      },
    ],
  },
  {
    pieLetter: "*gʰ / *ǵʰ",
    description:
      "PIE voiced aspirated velar stop (plain *gʰ and palatovelar *ǵʰ merge in centum languages)",
    shifts: [
      {
        branch: "Germanic",
        result: "g (via intermediate *ɣ)",
        example: {
          pie: "*gʰóstis",
          daughter: "guest (OE giest, gæst)",
          meaning: "guest, stranger",
        },
      },
      {
        branch: "Latin",
        result: "h- (word-initially), -g- (medially, sometimes -h-)",
        example: {
          pie: "*gʰóstis",
          daughter: "hostis (enemy; originally stranger)",
          meaning: "stranger, enemy",
        },
      },
      {
        branch: "Greek",
        result: "kʰ (χ)",
        example: {
          pie: "*gʰóstis",
          daughter: "xénos (ξένος, via *gʰs- > xs-; debated connection)",
          meaning: "stranger, guest",
        },
      },
      {
        branch: "Sanskrit",
        result: "gʰ (preserved for plain velar) / h (for palatovelar *ǵʰ)",
        example: {
          pie: "*ǵʰéyōm",
          daughter: "híma (cold, winter; compare Himālaya)",
          meaning: "winter, snow",
        },
      },
    ],
  },
];
