# Indo-European Explorer

### Language, myth, and DNA across six thousand years

An interactive explorable explanation of how a language spoken on the
Pontic-Caspian steppe became the ancestor of tongues spoken by close to half the
world today. Built with React, D3, and Leaflet.

**[View the live site](https://indo-european-explorer.com/)**

---

## What is this?

Roughly 400 living languages belong to the Indo-European family, spoken natively
by around 3.2 billion people — from English and Spanish to Hindi and Persian.
They descend from a single reconstructed language, Proto-Indo-European, spoken
somewhere around 4500–2500 BCE. This site works through the evidence for that
claim in nine sections, each with a visualisation you can operate yourself.

## Sections

| # | Section | Interactive | What you can do |
|---|---------|-------------|-----------------|
| — | Introduction | Word chain | Trace "father" back through Old English, Latin, and Sanskrit to PIE |
| I | The Discovery | Cognate Explorer + Grimm's Law | Compare cognates across eight languages and watch the sound shifts |
| II | When and Where? | Timeline | Drag a bracket across the evidence for when PIE was spoken |
| III | The Homeland | Migration Map | Play the spread of steppe cultures across Eurasia |
| IV | The Language Family | Language Tree | Expand branches of the family tree |
| V | How Languages Spread | Language Pathways | Step through how each branch reached its historical range |
| VI | Shared Mythology | Myth Explorer | Compare gods, rituals, and cosmic ideas across cultures |
| VII | The DNA Revolution | Ancestry Chart | See ancestry components shift across millennia |
| VIII | Explore | Cognate Search | Search any word for its PIE root and cognates |

## Accuracy

The site makes empirical claims, so a few rules govern its content:

- Every figure describing the site's own dataset is **computed from that
  dataset** rather than written by hand, so the prose cannot drift from the data.
- Contested scholarship — the trifunctional hypothesis, the Ivanov–Toporov
  "basic myth", the Anatolian-branch route, glottochronological dates — is
  attributed rather than asserted.
- Sources live in [`src/data/references.ts`](src/data/references.ts) and are
  listed in the site footer, with DOIs where verified.

Corrections are welcome. If you find an error, please open an issue.

## Accessibility

The site is built to be usable without a mouse and without motion:

- All hover-revealed information is also available on keyboard focus.
- Drag interactions use Pointer Events and have arrow-key equivalents.
- `prefers-reduced-motion` disables looping animation and autoplay throughout,
  and auto-advancing content has a visible pause control.
- A skip link, landmark regions, and a consistent heading order are in place.

## Tech stack

- **React 19** + TypeScript (strict) + Vite 7
- **D3 7** for the language tree
- **Leaflet 1.9** for the migration map — loaded only with that section
- **Framer Motion 12** for scroll-triggered animation
- Design tokens in `src/index.css`, mirrored as TS constants in `src/theme.ts`

## Getting started

```bash
git clone https://github.com/Sakshyam-Patro/Indo-European-Migration-Visualization.git
cd Indo-European-Migration-Visualization
npm install
npm run dev
```

## Build

```bash
npm run lint     # must pass
npm run build    # type-checks and builds
npm run preview
```

## Deployment

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`.

## References

The full bibliography is in [`src/data/references.ts`](src/data/references.ts)
and rendered in the site footer. Principal works include Anthony, *The Horse,
the Wheel, and Language* (2007); Mallory & Adams, *The Oxford Introduction to
Proto-Indo-European* (2006); Fortson, *Indo-European Language and Culture*
(2010); Watkins, *How to Kill a Dragon* (1995); Reich, *Who We Are and How We
Got Here* (2018); and papers by Haak et al. (2015), Olalde et al. (2018),
Narasimhan et al. (2019), Librado et al. (2021), and Lazaridis et al. (2022).

## Credits

Map data © OpenStreetMap contributors (ODbL); tiles © CARTO.

## License

[MIT](LICENSE)
