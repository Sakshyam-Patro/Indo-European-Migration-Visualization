# CLAUDE.md — Indo-European Migration Visualization

This file provides guidance for AI assistants working in this repository.

**Keep this file accurate.** If you change what a component uses or how a data
file is shaped, update the description here in the same commit. A previous
version of this document described D3 charts that contained no D3 and a data
shape that did not match the code; that drift is worse than no documentation.

## Project Overview

An interactive, scroll-driven educational site tracing the origins and spread of
Proto-Indo-European (PIE) from roughly 4500 BCE to the present, combining
historical linguistics, archaeology, ancient DNA, and comparative mythology.

Deployed at `indo-european-explorer.com` via GitHub Pages.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5 (strict) |
| Build | Vite 7 |
| Mapping | Leaflet 1.9 + react-leaflet 5 (`MigrationMap` only) |
| Data viz | D3 7 (`LanguageTree` only); all other charts are hand-written SVG |
| Animation | Framer Motion 12 |
| Styling | Inline style objects + CSS custom properties in `src/index.css` |
| Linting | ESLint 9 with TypeScript + React plugins |
| CI/CD | GitHub Actions → GitHub Pages |

Tailwind is installed via the Vite plugin but the codebase does not currently
use utility classes; layout is written with inline style objects. Do not mix a
third styling system in without converting the rest.

---

## Repository Structure

```
src/
  main.tsx                  # React DOM entry point
  App.tsx                   # Shell: scroll state, nav, viewport-gated lazy sections, footer
  App.css                   # Intentionally empty; all styles live in index.css or inline
  index.css                 # Design tokens, section modes, focus/skip-link, reduced motion
  theme.ts                  # Same tokens as TS constants, for SVG/canvas code + vizPalette

  components/
    interactive/            # The eight visualisations
      MigrationMap.tsx      # Leaflet map of IE spread. The ONLY Leaflet consumer.
      LanguageTree.tsx      # D3 collapsible tree. The ONLY D3 consumer.
      LanguagePathways.tsx  # Framer-Motion stepper through divergence pathways (no D3)
      SoundShiftMachine.tsx # Grimm's Law / phonetic rule demo (no D3)
      CognateExplorer.tsx   # Searchable cognate comparison table (no D3)
      Timeline.tsx          # Draggable PIE dating bracket, hand-written SVG/DOM (no D3)
      AncestryChart.tsx     # Stacked ancestry bars, hand-written SVG (no D3)
      MythWeb.tsx           # Filterable mythology card grid (not a network graph, no D3)
    layout/
      Header.tsx            # Fixed nav; exports PROGRESS_BAR_HEIGHT shared with ScrollProgress
      ScrollProgress.tsx    # Progress bar; receives progress as a prop, owns no listener
      SiteFooter.tsx        # Site-wide footer + reference list, rendered outside <main>
      LazyMount.tsx         # Defers mounting a section until it nears the viewport
    ui/
      FadeIn.tsx            # The single scroll entrance animation used by every section
      SectionHeading.tsx    # Eyebrow + h2 + standfirst
      VizCard.tsx           # VizCard, ContentCard, SectionDivider, ClosingNote
      VizHeading.tsx        # Badge + h3 + intro, opens every visualisation
      Legend.tsx            # Shared colour key
      InteractiveLabel.tsx  # The "Interactive" pill
      PIEForm.tsx           # Renders *reconstructed forms with correct notation
      MigrationBackdrop.tsx # Static SVG migration routes behind the hero (no Leaflet)

  sections/                 # Nine narrative sections, rendered in App.tsx order
  data/                     # Pure TypeScript data — no runtime dependencies
  hooks/
    useScrollState.ts       # The app's ONLY scroll listener (rAF-batched)
    useReducedMotion.ts     # Reactive hook + non-reactive prefersReducedMotion()
```

---

## Development Workflow

```bash
npm install
npm run dev        # Vite dev server
npm run build      # tsc -b && vite build — the primary correctness check
npm run preview
npm run lint
```

There are no tests. `npm run lint` and `npm run build` must both pass before
committing. TypeScript runs with `strict`, `noUnusedLocals`, and
`noUnusedParameters`, so an unused import is a build failure.

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml`.

---

## Architecture Patterns

### One scroll listener

`useScrollState` owns the app's only `scroll` handler. It is rAF-batched,
passive, and also recomputes on resize and document-height changes. `App.tsx`
derives both the active section and header visibility from it, and passes
progress down to `ScrollProgress`. Do not add another `window.scroll` listener.

### Deferred section mounting

Sections are `React.lazy()` **and** wrapped in `LazyMount`, which holds the
section's anchor id on a placeholder until the section nears the viewport. Lazy
alone only defers parsing — without the gate every chunk downloads on first
paint.

### Colour

Brand tokens live in `src/index.css`. `src/theme.ts` mirrors them as TS
constants because **CSS custom properties do not resolve inside SVG
presentation attributes** — `.attr('stroke', 'var(--x)')` silently renders
nothing. Use `.style()` for CSS properties, or a literal from `theme.ts`.

Any categorical colour scale must come from `vizPalette` in `theme.ts` so one
hue does not mean "Italic branch" in one chart and "mass migration" in another.
Use `withAlpha()` rather than concatenating hex alpha suffixes.

### Motion

Every animation must be gated on reduced-motion: `useReducedMotion()` in React,
`prefersReducedMotion()` in imperative D3/Leaflet code. `index.css` also
neutralises CSS animation globally under the media query. Looping or
auto-playing motion additionally needs a visible pause control.

### Data layer

All content lives in `src/data/` as plain TypeScript. No API calls, no fetching.
Do not embed content arrays inside component or section files.

---

## Content Standards

This site makes empirical claims about genetics, archaeology, and linguistics,
so accuracy is a functional requirement rather than a nicety.

- **Never invent a citation.** A prior revision shipped a fabricated paper entry
  in `genetics.ts`. If a claim needs a source and you do not know one, say the
  claim is uncertain instead of attaching a plausible-looking reference.
- **Never invent data** to make a number in the copy come true. Prose figures
  about the dataset should be derived from the dataset — see `data/treeStats.ts`,
  which counts the tree at runtime so the copy cannot drift from it.
- **Hedge contested scholarship.** The Anatolian-vs-Steppe debate, the
  trifunctional hypothesis, the Ivanov–Toporov "basic myth", and glottochronology
  dates are all live disputes. Attribute them; do not assert them.
- **Real citations belong in `data/references.ts`** with an optional DOI, which
  is populated only where verified.

---

## Style Conventions

- Files under `components/interactive/` and `sections/` omit semicolons and use
  `export default function X()`. Match the file you are editing.
- Component props always get an explicit interface.
- `interface` for object shapes, `type` for unions.
- Export data as `export const`, never `export default`.
- No `any`, no `@ts-ignore`, no `@ts-expect-error`.
- No `<style>` blocks inside components. Keyframes belong in `index.css`.
- Comments should explain a constraint the code cannot show. Do not narrate what
  the next line does, and do not leave banner dividers.

---

## Accessibility Requirements

These are not optional polish; several were shipped broken and had to be fixed.

- Anything readable on hover must also be reachable by keyboard focus and usable
  on touch. Do not put data in a `title` attribute alone.
- Drag interactions use Pointer Events so touch works, and must have a keyboard
  equivalent (arrow keys) with complete ARIA value attributes.
- Data-bearing SVG needs `role="img"` and an accessible name, or a `<title>`.
- Never encode meaning by colour alone.
- Interactive targets should be at least 24×24 CSS px, using padding if the
  visible mark is smaller.
- Heading order must not skip levels.

---

## What to Avoid

- Adding API calls or external data fetching.
- Bypassing strict mode with casts.
- Mutating D3's SVG DOM from a render function; use `useEffect` **with cleanup**
  that interrupts transitions and clears timers.
- Adding dependencies without weighing bundle size. Leaflet and D3 are already
  heavy, and Leaflet must stay out of the initial chunk — only `MigrationMap`
  may import it.
- Committing with failing lint or build.
