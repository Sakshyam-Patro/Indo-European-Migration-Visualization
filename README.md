# Indo-European Explorer

### A 6,000-Year Journey Through Language, Myth, and DNA

An interactive explorable explanation tracing how a single language spoken on the Pontic-Caspian steppe became half the world's words. Built with React, D3, and Leaflet.

**[View Live Site](https://sakshyam-patro.github.io/Indo-European-Migration-Visualization/)**

---

## What Is This?

Nearly half the people on Earth speak an Indo-European language, from English and Spanish to Hindi and Persian. They all descend from a single tongue spoken around 4500 BCE. This interactive site lets you explore that story through eight narrative sections, each with hands-on visualizations.

## Sections

| # | Section | Interactive Component | What You Explore |
|---|---------|----------------------|------------------|
| 1 | **The Hook** | Word Chain | Trace "father" back through Old English, Latin, Sanskrit to Proto-Indo-European |
| 2 | **The Discovery** | Cognate Explorer + Grimm's Law Machine | Compare cognates across 8 languages; see systematic sound shifts in action |
| 3 | **Dating the Language** | Timeline | Drag a bracket to explore when PIE could have been spoken |
| 4 | **The Homeland** | Migration Map | Watch animated arrows show Indo-European languages spreading across Eurasia |
| 5 | **How Languages Spread** | Info Cards | Learn about elite dominance vs. mass migration, the steppe package, and language shift |
| 6 | **The Family Tree** | Language Tree | Explore the branching family of 400+ Indo-European languages |
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

- Anthony, D.W., *The Horse, the Wheel, and Language* (2007)
- Mallory, J.P., *In Search of the Indo-Europeans* (1989)
- Fortson, B.W., *Indo-European Language and Culture* (2010)
- Haak et al., "Massive migration from the steppe" (*Nature*, 2015)
- Reich, D., *Who We Are and How We Got Here* (2018)

## License

MIT