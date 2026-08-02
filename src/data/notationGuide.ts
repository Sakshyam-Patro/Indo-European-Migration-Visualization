/** Reader's guide to the notation used for reconstructed PIE forms. */

export interface NotationEntry {
  symbol: string
  explanation: string
}

export const notationEntries: NotationEntry[] = [
  {
    symbol: '* (asterisk)',
    explanation:
      'Marks a reconstructed form that is not directly attested in any written record. For example, *ph₂tḗr is a best estimate based on comparing daughter languages.',
  },
  {
    symbol: 'Accent marks (ā, ḗ, etc.)',
    explanation:
      'Indicate vowel length or pitch accent in reconstructed and attested forms. A macron (ā) means a long vowel; an acute (é) marks stress or high pitch.',
  },
  {
    symbol: 'Superscript h (bʰ, dʰ, gʰ)',
    explanation:
      'Represents "aspirated" consonants: stops pronounced with a puff of breath. PIE had a full series of these, preserved most clearly in Sanskrit (bh, dh, gh).',
  },
  {
    symbol: 'Superscript w (kʷ, gʷ)',
    explanation:
      'Represents "labialized" consonants: sounds pronounced with rounded lips, like saying "k" and "w" simultaneously. These became "qu" in Latin and "wh" in English.',
  },
  {
    symbol: 'h₁, h₂, h₃ (laryngeals)',
    explanation:
      'Three reconstructed sounds whose exact pronunciation is debated. They affected neighboring vowels: h₁ left e-coloring, h₂ produced a-coloring, and h₃ produced o-coloring. Hittite preserved some as actual consonants.',
  },
  {
    symbol: '> (arrow)',
    explanation:
      'Means "became" or "developed into." For example, PIE *p > Germanic *f shows that the PIE p-sound shifted to f in the Germanic branch (Grimm\'s Law).',
  },
]
