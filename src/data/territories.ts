/**
 * Approximate territory polygons for major IE-related cultures.
 * Each is an array of [lat, lng] points forming a rough boundary.
 * Based on archaeological evidence from Anthony (2007), Haak et al. (2015),
 * Allentoft et al. (2015), Olalde et al. (2018), Narasimhan et al. (2019).
 */

export const territories: Record<string, [number, number][]> = {
  clv: [
    [42.5, 44.0], [43.5, 43.0], [44.5, 44.0], [46.0, 46.5],
    [46.0, 49.0], [44.5, 50.0], [43.0, 49.0], [42.0, 47.0],
  ],
  khvalynsk: [
    [50.0, 47.0], [51.5, 46.5], [53.5, 48.0], [54.0, 50.0],
    [53.5, 52.0], [51.5, 52.0], [50.0, 50.5],
  ],
  "sredny-stog": [
    [47.0, 34.0], [48.0, 33.5], [49.5, 35.0], [50.0, 37.5],
    [49.5, 39.0], [48.5, 38.5], [47.5, 37.0],
  ],
  // Yamnaya: Danube to Urals, forest-steppe boundary to Black Sea/Caucasus
  yamnaya: [
    [45.0, 28.5], [46.0, 30.0], [44.5, 33.0], [44.5, 36.0],
    [44.0, 40.0], [44.0, 44.0], [45.0, 48.0], [47.5, 52.0],
    [50.5, 55.0], [52.5, 54.0], [53.0, 50.0], [52.5, 44.0],
    [52.0, 40.0], [51.0, 36.0], [49.0, 32.0], [47.0, 30.0],
  ],
  // Corded Ware: Rhine to upper Dnieper, Danube to southern Scandinavia
  "corded-ware": [
    [49.0, 6.0], [48.5, 10.0], [48.5, 14.0], [48.0, 18.0],
    [48.5, 22.0], [50.0, 26.0], [52.0, 30.0], [55.0, 30.0],
    [57.0, 27.0], [58.0, 24.0], [57.5, 18.0], [56.5, 14.0],
    [55.5, 10.0], [53.5, 8.0], [51.0, 6.0],
  ],
  // Bell Beaker: Iberia through western/central Europe to Britain
  "bell-beaker": [
    [37.0, -8.0], [38.0, -6.0], [40.0, -4.0], [42.0, -8.0],
    [43.5, -2.0], [47.0, -2.0], [49.0, -3.0], [52.0, -4.0],
    [54.0, -3.0], [53.0, 0.0], [51.5, 2.0], [50.5, 7.0],
    [49.0, 10.0], [47.5, 8.0], [46.0, 5.0], [44.0, 4.0],
    [43.0, 3.0], [41.0, 1.0], [39.0, -1.0],
  ],
  // Afanasievo: Altai-Sayan and western Mongolia
  afanasievo: [
    [48.0, 83.0], [49.0, 82.0], [51.0, 84.0], [52.0, 87.0],
    [51.5, 92.0], [50.0, 93.0], [48.0, 91.0], [47.0, 89.0],
    [47.5, 85.0],
  ],
  // Sintashta: compact zone in southeastern Urals (Chelyabinsk)
  sintashta: [
    [51.5, 57.5], [52.0, 57.0], [53.5, 58.0], [54.5, 59.5],
    [54.5, 61.5], [53.5, 62.5], [52.0, 62.0], [51.5, 60.0],
  ],
  // Andronovo: vast Central Asian steppe, Urals to Yenisei, south to BMAC contact
  andronovo: [
    [46.0, 57.0], [48.0, 55.0], [52.0, 56.0], [54.0, 60.0],
    [55.0, 68.0], [55.0, 75.0], [54.0, 80.0], [52.0, 85.0],
    [50.0, 83.0], [47.0, 78.0], [44.0, 72.0], [42.0, 66.0],
    [41.0, 62.0], [43.0, 58.0],
  ],
  // Mycenaean: mainland Greece including Peloponnese
  mycenaean: [
    [37.0, 21.5], [38.0, 21.0], [39.0, 22.0], [39.5, 23.5],
    [38.5, 24.5], [37.5, 24.0], [36.5, 23.0],
  ],
  // BMAC: Margiana + Bactria (Turkmenistan to northern Afghanistan)
  bmac: [
    [36.0, 60.0], [37.0, 58.0], [38.5, 59.0], [39.5, 61.0],
    [40.0, 63.0], [39.5, 66.0], [38.0, 68.0], [36.5, 67.0],
    [35.5, 65.0], [35.5, 62.0],
  ],
}
