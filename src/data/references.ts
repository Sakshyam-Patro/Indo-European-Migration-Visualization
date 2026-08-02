/**
 * Works consulted for the content of this site.
 *
 * `doi` is populated only where the identifier is known with confidence;
 * entries without one (notably books) render as plain text. Nothing here is
 * a placeholder — if a field is absent it is because it was not verified.
 */

export interface Reference {
  authors: string
  year: number
  title: string
  /** Journal, publisher, or series. */
  venue: string
  doi?: string
  category: 'genetics' | 'archaeology' | 'linguistics' | 'mythology'
}

export const references: Reference[] = [
  {
    authors: 'Haak, W. et al.',
    year: 2015,
    title: 'Massive migration from the steppe was a source for Indo-European languages in Europe',
    venue: 'Nature 522, 207-211',
    doi: '10.1038/nature14317',
    category: 'genetics',
  },
  {
    authors: 'Olalde, I. et al.',
    year: 2018,
    title: 'The Beaker phenomenon and the genomic transformation of northwest Europe',
    venue: 'Nature 555, 190-196',
    doi: '10.1038/nature25738',
    category: 'genetics',
  },
  {
    authors: 'Narasimhan, V. M. et al.',
    year: 2019,
    title: 'The formation of human populations in South and Central Asia',
    venue: 'Science 365, eaat7487',
    doi: '10.1126/science.aat7487',
    category: 'genetics',
  },
  {
    authors: 'Lazaridis, I. et al.',
    year: 2022,
    title: 'The genetic history of the Southern Arc: a bridge between West Asia and Europe',
    venue: 'Science 377, eabm4247',
    category: 'genetics',
  },
  {
    authors: 'Lazaridis, I. et al.',
    year: 2025,
    title: 'The genetic origin of the Indo-Europeans',
    venue: 'Nature',
    category: 'genetics',
  },
  {
    authors: 'Zhang, F. et al.',
    year: 2021,
    title: 'The genomic origins of the Bronze Age Tarim Basin mummies',
    venue: 'Nature 599, 256-261',
    category: 'genetics',
  },
  {
    authors: 'Librado, P. et al.',
    year: 2021,
    title: 'The origins and spread of domestic horses from the Western Eurasian steppes',
    venue: 'Nature 598, 634-640',
    category: 'genetics',
  },
  {
    authors: 'Reich, D.',
    year: 2018,
    title: 'Who We Are and How We Got Here: Ancient DNA and the New Science of the Human Past',
    venue: 'Pantheon Books',
    category: 'genetics',
  },
  {
    authors: 'Anthony, D. W.',
    year: 2007,
    title: 'The Horse, the Wheel, and Language: How Bronze-Age Riders from the Eurasian Steppes Shaped the Modern World',
    venue: 'Princeton University Press',
    category: 'archaeology',
  },
  {
    authors: 'Heyd, V.',
    year: 2021,
    title: 'Yamnaya, Corded Wares, and Bell Beakers on the Move',
    venue: 'Universitätsforschungen zur prähistorischen Archäologie',
    category: 'archaeology',
  },
  {
    authors: 'Furholt, M.',
    year: 2021,
    title: 'Mobility and Social Change: Understanding the European Neolithic Period after the Archaeogenetic Revolution',
    venue: 'Journal of Archaeological Research 29, 481-535',
    category: 'archaeology',
  },
  {
    authors: 'Mallory, J. P. & Adams, D. Q.',
    year: 2006,
    title: 'The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World',
    venue: 'Oxford University Press',
    category: 'linguistics',
  },
  {
    authors: 'Mallory, J. P.',
    year: 1989,
    title: 'In Search of the Indo-Europeans: Language, Archaeology and Myth',
    venue: 'Thames & Hudson',
    category: 'linguistics',
  },
  {
    authors: 'Fortson, B. W.',
    year: 2010,
    title: 'Indo-European Language and Culture: An Introduction (2nd ed.)',
    venue: 'Wiley-Blackwell',
    category: 'linguistics',
  },
  {
    authors: 'Ringe, D.',
    year: 2017,
    title: 'From Proto-Indo-European to Proto-Germanic (2nd ed.)',
    venue: 'Oxford University Press',
    category: 'linguistics',
  },
  {
    authors: 'Watkins, C.',
    year: 2011,
    title: 'The American Heritage Dictionary of Indo-European Roots (3rd ed.)',
    venue: 'Houghton Mifflin Harcourt',
    category: 'linguistics',
  },
  {
    authors: 'Heggarty, P. et al.',
    year: 2023,
    title: 'Language trees with sampled ancestors support a hybrid model for the origin of Indo-European languages',
    venue: 'Science 381, eabg0818',
    category: 'linguistics',
  },
  {
    authors: 'Watkins, C.',
    year: 1995,
    title: 'How to Kill a Dragon: Aspects of Indo-European Poetics',
    venue: 'Oxford University Press',
    category: 'mythology',
  },
  {
    authors: 'West, M. L.',
    year: 1997,
    title: 'The East Face of Helicon: West Asiatic Elements in Greek Poetry and Myth',
    venue: 'Clarendon Press',
    category: 'mythology',
  },
  {
    authors: 'Witzel, E. J. M.',
    year: 2012,
    title: 'The Origins of the World’s Mythologies',
    venue: 'Oxford University Press',
    category: 'mythology',
  },
]

export const referenceCategoryLabels: Record<Reference['category'], string> = {
  genetics: 'Ancient DNA & Archaeogenomics',
  archaeology: 'Archaeology & Migration',
  linguistics: 'Historical Linguistics',
  mythology: 'Comparative Mythology',
}
