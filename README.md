# Indo-European Explorer

### A 6,000-Year Journey Through Language, Myth, and DNA

An interactive explorable explanation tracing how a single language spoken on the Pontic-Caspian steppe became half the world's words. Built with React, D3, and Leaflet.

**[View Live Site](https://indo-european-explorer.com/)**

---

## What Is This?

Nearly half the people on Earth speak an Indo-European language, from English and Spanish to Hindi and Persian. They all descend from a single tongue spoken around 4500 BCE. This interactive site lets you explore that story through nine narrative sections, each with hands-on visualizations.

## Sections

| # | Section | Interactive Component | What You Explore |
|---|---------|----------------------|------------------|
| 1 | **The Hook** | Word Chain | Trace "father" back through Old English, Latin, Sanskrit to Proto-Indo-European |
| 2 | **The Discovery** | Cognate Explorer + Grimm's Law Machine | Compare cognates across 8 languages; see systematic sound shifts in action |
| 3 | **Dating the Language** | Timeline | Drag a bracket to explore when PIE could have been spoken |
| 4 | **The Homeland** | Migration Map | Watch animated arrows show Indo-European languages spreading across Eurasia |
| 5 | **The Family Tree** | Language Tree | Explore the branching family of 400+ Indo-European languages |
| 6 | **How Languages Spread** | Info Cards | Learn about elite dominance vs. mass migration, the steppe package, and language shift |
| 7 | **Shared Mythology** | Myth Connection Explorer | Discover shared gods, rituals, and cosmic ideas across cultures |
| 8 | **The DNA Evidence** | Ancestry Chart | See how ancient DNA ancestry components changed over millennia |
| 9 | **Explorer** | Cognate Search | Search any English word to find its Proto-Indo-European root and cognates |

## Tech Stack

- **React 19** + TypeScript + Vite
- **D3.js** for data visualizations (language tree, ancestry chart, timeline)
- **Leaflet** + React-Leaflet for the interactive migration map
- **Framer Motion** for scroll-triggered animations
- **Tailwind CSS** for styling

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Sakshyam-Patro/Indo-European-Migration-Visualization.git
cd Indo-European-Migration-Visualization

# Install dependencies
npm install

# Start dev server
npm run dev
```


## Build

```bash
npm run build
npm run preview
```

## Deployment

The site auto-deploys to GitHub Pages via GitHub Actions on every push to `main`.

## References

### Ancient DNA & Archaeogenomics
- Lazaridis et al., "The Genetic Origin of the Indo-Europeans" (*Nature*, 2022; *Science*, 2025)
- Haak et al., "Massive migration from the steppe was a source for Indo-European languages in Europe" (*Nature*, 2015)
- Narasimhan et al., "The formation of human populations in South and Central Asia" (*Science*, 2019)
- Olalde et al., "The Beaker Phenomenon and the Genomic Transformation of Northwest Europe" (*Nature*, 2018)
- Reich, D., *Who We Are and How We Got Here* (2018)

### Archaeology & Migration
- Anthony, D.W., *The Horse, the Wheel, and Language* (2007)
- Heyd, V., "Yamnaya, Corded Wares, and Bell Beakers on the Move" (2021)
- Furholt, M., "Mobility and Social Change" (*Journal of Archaeological Research*, 2021)

### Linguistics
- Mallory, J.P. & Adams, D.Q., *The Oxford Introduction to Proto-Indo-European and the Proto-Indo-European World* (2006)
- Mallory, J.P., *In Search of the Indo-Europeans* (1989)
- Fortson, B.W., *Indo-European Language and Culture* (2010)

### Comparative Mythology
- Watkins, C., *How to Kill a Dragon: Aspects of Indo-European Poetics* (1995)
- West, M.L., *The East Face of Helicon* (1997)
- Witzel, M., *The Origins of the World's Mythologies* (2012)

## License

MIT