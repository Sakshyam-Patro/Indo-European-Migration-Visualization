/**
 * Content for the opening "hook": the word chain that walks "father" back to
 * its reconstructed Proto-Indo-European ancestor, and the headline statistics
 * shown once the chain completes.
 */

export interface WordChainStep {
  word: string
  lang: string
  year: string
}

export const wordChain: WordChainStep[] = [
  { word: 'father', lang: 'English', year: 'Modern' },
  { word: 'fæder', lang: 'Old English', year: '~900 CE' },
  { word: 'fadar', lang: 'Gothic', year: '~350 CE' },
  { word: 'pater', lang: 'Latin', year: '~100 BCE' },
  { word: 'patḗr', lang: 'Greek', year: '~500 BCE' },
  { word: 'pitṛ́', lang: 'Sanskrit', year: '~1500 BCE' },
  { word: '*ph₂tḗr', lang: 'Proto-Indo-European', year: 'c. 4000 BCE' },
]

/**
 * Real-world figures for the Indo-European family as a whole (Ethnologue /
 * Glottolog order of magnitude), not counts of entries in this site's
 * illustrative dataset. The interactive family tree shows a curated subset.
 */
export const ieStats = {
  speakers: '~3.2 billion',
  percentage: '~46%',
  languages: '400+',
  languagesNote: 'living languages in the family worldwide; the tree in this site charts a representative selection',
} as const
