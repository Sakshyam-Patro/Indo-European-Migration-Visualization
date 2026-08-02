/**
 * Branch-by-branch reflexes of the PIE stop series.
 *
 * IMPORTANT — WHAT THIS TABLE IS
 * The exported constant is named `grimmsLaw` for historical reasons (it is
 * consumed under that name by SoundShiftMachine), but the data is NOT a table
 * of Grimm's Law. Grimm's Law is a Germanic-only shift. What follows is a
 * comparative table: for each PIE stop it lists the Germanic outcome (which is
 * Grimm's Law) alongside the Latin, Greek and Sanskrit outcomes (which are
 * retentions or entirely separate developments such as the satem
 * palatalisation of Indo-Iranian).
 *
 * Every `shifts[]` entry therefore carries a `changeType` naming the change
 * responsible for that reflex. Only entries with changeType "Grimm's Law" are
 * Grimm's Law; nothing else in this file is.
 */

/** The kind of sound change a particular branch reflex represents. */
export type ChangeType =
  | "Grimm's Law"
  | "retention"
  | "satem palatalisation"
  | "centum merger"
  | "independent development";

export interface SoundShift {
  pieLetter: string;
  description: string;
  /** Clarifies which reflexes in this row are Grimm's Law and which are not. */
  note?: string;
  /** Standard reference works for this row. */
  sources?: string[];
  shifts: {
    branch: string;
    result: string;
    /**
     * Names the change that produced this reflex. Only "Grimm's Law" entries
     * belong to Grimm's Law; satem sibilants and centum mergers do not.
     */
    changeType?: ChangeType;
    example?: { pie: string; daughter: string; meaning: string };
  }[];
}

export const grimmsLaw: SoundShift[] = [
  {
    pieLetter: "*p",
    description: "PIE voiceless bilabial stop",
    note: "Only the Germanic row is Grimm's Law. Latin, Greek and Sanskrit simply keep the inherited *p.",
    shifts: [
      {
        branch: "Germanic",
        result: "f",
        changeType: "Grimm's Law",
        example: {
          pie: "*ph₂tḗr",
          daughter: "father (OE fæder)",
          meaning: "father",
        },
      },
      {
        branch: "Latin",
        result: "p (unchanged)",
        changeType: "retention",
        example: { pie: "*ph₂tḗr", daughter: "pater", meaning: "father" },
      },
      {
        branch: "Greek",
        result: "p (unchanged)",
        changeType: "retention",
        example: { pie: "*ph₂tḗr", daughter: "patḗr (πατήρ)", meaning: "father" },
      },
      {
        branch: "Sanskrit",
        result: "p (unchanged)",
        changeType: "retention",
        example: { pie: "*ph₂tḗr", daughter: "pitṛ́ (पितृ)", meaning: "father" },
      },
    ],
  },
  {
    pieLetter: "*t",
    description: "PIE voiceless dental stop",
    note: "Only the Germanic row is Grimm's Law. The other branches keep *t unchanged.",
    shifts: [
      {
        branch: "Germanic",
        result: "þ / th",
        changeType: "Grimm's Law",
        example: {
          pie: "*tréyes",
          daughter: "three (OE þrēo)",
          meaning: "three",
        },
      },
      {
        branch: "Latin",
        result: "t (unchanged)",
        changeType: "retention",
        example: { pie: "*tréyes", daughter: "trēs", meaning: "three" },
      },
      {
        branch: "Greek",
        result: "t (unchanged)",
        changeType: "retention",
        example: { pie: "*tréyes", daughter: "treîs (τρεῖς)", meaning: "three" },
      },
      {
        branch: "Sanskrit",
        result: "t (unchanged)",
        changeType: "retention",
        example: { pie: "*tréyes", daughter: "tráyas (त्रयस्)", meaning: "three" },
      },
    ],
  },
  {
    pieLetter: "*k / *ḱ",
    description:
      "PIE plain velar *k and palatovelar *ḱ — two distinct PIE sounds, merged by the centum branches and kept apart by the satem branches",
    note: "The Germanic row is Grimm's Law (*k > h). The Latin and Greek rows are the centum merger of *ḱ with *k, which is not Grimm's Law. The Sanskrit row is the satem palatalisation *ḱ > ś, an Indo-Iranian development entirely unrelated to Grimm's Law.",
    sources: ["Fortson 2010", "Ringe 2017"],
    shifts: [
      {
        branch: "Germanic",
        result: "h",
        changeType: "Grimm's Law",
        example: {
          pie: "*ḱm̥tóm",
          daughter: "hundred (OE hund)",
          meaning: "hundred",
        },
      },
      {
        branch: "Latin",
        result: "c /k/ — *ḱ merges with plain *k",
        changeType: "centum merger",
        example: { pie: "*ḱr̥d-", daughter: "cor (stem cord-)", meaning: "heart" },
      },
      {
        branch: "Greek",
        result: "k — *ḱ merges with plain *k",
        changeType: "centum merger",
        example: {
          pie: "*ḱr̥d-",
          daughter: "kardía (καρδία)",
          meaning: "heart",
        },
      },
      {
        branch: "Sanskrit",
        result: "ś — satem palatalisation of *ḱ (not Grimm's Law)",
        changeType: "satem palatalisation",
        example: {
          pie: "*ḱm̥tóm",
          daughter: "śatám (शतम्)",
          meaning: "hundred",
        },
      },
    ],
  },
  {
    pieLetter: "*d",
    description: "PIE voiced dental stop",
    note: "Only the Germanic rows are Grimm's Law. In the Sanskrit example the *d itself is simply retained; the ś of dáśa comes from the neighbouring palatovelar *ḱ by satem palatalisation, a separate change.",
    shifts: [
      {
        branch: "Germanic",
        result: "t",
        changeType: "Grimm's Law",
        example: {
          pie: "*déḱm̥",
          daughter: "ten (OE tīen, Gothic taihun)",
          meaning: "ten",
        },
      },
      {
        branch: "Latin",
        result: "d (unchanged)",
        changeType: "retention",
        example: { pie: "*déḱm̥", daughter: "decem", meaning: "ten" },
      },
      {
        branch: "Greek",
        result: "d (unchanged)",
        changeType: "retention",
        example: { pie: "*déḱm̥", daughter: "déka (δέκα)", meaning: "ten" },
      },
      {
        branch: "Sanskrit",
        result: "d (unchanged; the ś of dáśa is from *ḱ, not from *d)",
        changeType: "retention",
        example: { pie: "*déḱm̥", daughter: "dáśa (दश)", meaning: "ten" },
      },
      {
        branch: "Germanic (second example)",
        result: "t",
        changeType: "Grimm's Law",
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
      "PIE voiced bilabial stop — vanishingly rare in PIE, and its existence as a phoneme is disputed",
    note: "Only the Germanic row is Grimm's Law. Because *b is so poorly attested, no branch offers a secure minimal pair, and the examples below are correspondingly weak.",
    sources: ["Fortson 2010", "Mallory & Adams 2006"],
    shifts: [
      {
        branch: "Germanic",
        result: "p",
        changeType: "Grimm's Law",
        example: {
          pie: "*dʰewb- (possibly *dʰeub-)",
          daughter: "deep (OE dēop; the initial *dʰ > d is Grimm's Law too)",
          meaning: "deep",
        },
      },
      {
        branch: "Latin",
        result: "b (unchanged, where it occurs at all)",
        changeType: "retention",
      },
      {
        branch: "Greek",
        result: "b (unchanged, where it occurs at all)",
        changeType: "retention",
      },
      {
        branch: "Sanskrit",
        result: "b (unchanged, where it occurs at all)",
        changeType: "retention",
      },
    ],
  },
  {
    pieLetter: "*g / *ǵ",
    description:
      "PIE plain velar *g and palatovelar *ǵ — two distinct PIE sounds, merged by the centum branches and kept apart by the satem branches",
    note: "The Germanic rows are Grimm's Law (*g > k). The Latin and Greek rows are the centum merger. The Sanskrit row is the satem palatalisation *ǵ > j, an Indo-Iranian development, not Grimm's Law.",
    sources: ["Fortson 2010", "Ringe 2017"],
    shifts: [
      {
        branch: "Germanic",
        result: "k",
        changeType: "Grimm's Law",
        example: {
          pie: "*ǵónu",
          daughter: "knee (OE cnēo, with the k- still pronounced)",
          meaning: "knee",
        },
      },
      {
        branch: "Latin",
        result: "g — *ǵ merges with plain *g",
        changeType: "centum merger",
        example: { pie: "*ǵénu", daughter: "genū", meaning: "knee" },
      },
      {
        branch: "Greek",
        result: "g — *ǵ merges with plain *g",
        changeType: "centum merger",
        example: { pie: "*ǵónu", daughter: "gónu (γόνυ)", meaning: "knee" },
      },
      {
        branch: "Sanskrit",
        result: "j — satem palatalisation of *ǵ (not Grimm's Law)",
        changeType: "satem palatalisation",
        example: { pie: "*ǵónu", daughter: "jā́nu (जानु)", meaning: "knee" },
      },
      {
        branch: "Germanic (second example)",
        result: "k",
        changeType: "Grimm's Law",
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
    note: "Only the Germanic row is Grimm's Law. Latin and Greek each deaspirated or devoiced the series in their own way — separate, independent changes — and Sanskrit simply kept the aspirate.",
    shifts: [
      {
        branch: "Germanic",
        result: "b (via an intermediate fricative *β)",
        changeType: "Grimm's Law",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "brother (OE brōþor)",
          meaning: "brother",
        },
      },
      {
        branch: "Latin",
        result: "f- word-initially, -b- between vowels",
        changeType: "independent development",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "frāter",
          meaning: "brother",
        },
      },
      {
        branch: "Greek",
        result: "pʰ (φ) — devoicing, not Grimm's Law",
        changeType: "independent development",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "phrā́tēr (φράτηρ, 'clansman')",
          meaning: "brother / clansman",
        },
      },
      {
        branch: "Sanskrit",
        result: "bʰ (unchanged)",
        changeType: "retention",
        example: {
          pie: "*bʰréh₂tēr",
          daughter: "bhrā́tṛ (भ्रातृ)",
          meaning: "brother",
        },
      },
    ],
  },
  {
    pieLetter: "*dʰ",
    description: "PIE voiced aspirated dental stop",
    note: "Only the Germanic row is Grimm's Law. The Latin and Greek outcomes are independent treatments of the aspirate series; Sanskrit retains it.",
    shifts: [
      {
        branch: "Germanic",
        result: "d (via an intermediate fricative *ð)",
        changeType: "Grimm's Law",
        example: {
          pie: "*dʰeh₁-",
          daughter: "do, deed (OE dōn, dǣd)",
          meaning: "to do, to place",
        },
      },
      {
        branch: "Latin",
        result: "f- word-initially, -d- or -b- between vowels",
        changeType: "independent development",
        example: {
          pie: "*dʰeh₁-",
          daughter: "fēcī (perfect of faciō 'I make')",
          meaning: "to do, to make",
        },
      },
      {
        branch: "Greek",
        result: "tʰ (θ) — devoicing, not Grimm's Law",
        changeType: "independent development",
        example: {
          pie: "*dʰeh₁-",
          daughter: "títhēmi (τίθημι, 'I place')",
          meaning: "to place, to put",
        },
      },
      {
        branch: "Sanskrit",
        result: "dʰ (unchanged)",
        changeType: "retention",
        example: {
          pie: "*dʰeh₁-",
          daughter: "dádhāti (दधाति, 'he places')",
          meaning: "to place, to put",
        },
      },
    ],
  },
  {
    pieLetter: "*gʰ / *ǵʰ",
    description:
      "PIE plain velar *gʰ and palatovelar *ǵʰ — two distinct PIE sounds, merged by the centum branches and kept apart by the satem branches",
    note: "The Germanic row is Grimm's Law. Latin and Greek show their own treatments of the aspirate series plus the centum merger; the Sanskrit h of híma- is the satem palatalisation of *ǵʰ, not Grimm's Law. Greek xénos 'stranger, guest' used to be cited here as the reflex of *gʰóstis, but that equation is rejected: xénos goes back to *ksen-wos and is unrelated. The Greek example below therefore uses a secure case instead.",
    sources: ["Fortson 2010", "Beekes 2010", "de Vaan 2008"],
    shifts: [
      {
        branch: "Germanic",
        result: "g (via an intermediate fricative *ɣ)",
        changeType: "Grimm's Law",
        example: {
          pie: "*gʰóstis",
          daughter: "guest (OE giest, gæst)",
          meaning: "guest, stranger",
        },
      },
      {
        branch: "Latin",
        result: "h- word-initially, -g- (sometimes -h-) between vowels",
        changeType: "independent development",
        example: {
          pie: "*gʰóstis",
          daughter: "hostis ('enemy', originally 'stranger')",
          meaning: "stranger, enemy",
        },
      },
      {
        branch: "Greek",
        result: "kʰ (χ) — devoicing, not Grimm's Law",
        changeType: "independent development",
        example: {
          pie: "*ǵʰans-",
          daughter: "khḗn (χήν)",
          meaning: "goose",
        },
      },
      {
        branch: "Sanskrit",
        result: "gʰ for plain *gʰ; h for palatovelar *ǵʰ (satem palatalisation)",
        changeType: "satem palatalisation",
        example: {
          pie: "*ǵʰeim-",
          daughter: "himá- (हिम, 'snow, cold'; cf. Himālaya 'abode of snow')",
          meaning: "winter, snow",
        },
      },
    ],
  },
];
