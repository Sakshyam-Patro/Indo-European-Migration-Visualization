# CLAUDE.md — Indo-European Migration Visualization

This file provides guidance for AI assistants working in this repository.

## Project Overview

An interactive, scroll-driven educational web application tracing the origins and spread of Proto-Indo-European (PIE) languages from ~4500 BCE to the present. The app combines linguistics, archaeology, ancient DNA genetics, and comparative mythology to explain how a single language spoken on the Pontic-Caspian steppe evolved into 445+ modern languages with 3.2 billion speakers.

Deployed at `indo-european-explorer.com` via GitHub Pages.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript 5 |
| Build | Vite 7 |
| Mapping | Leaflet 1.9 + react-leaflet 5 |
| Data viz | D3.js 7 |
| Animation | Framer Motion 12 |
| Styling | Tailwind CSS 4 + custom CSS properties |
| Linting | ESLint 9 with TypeScript + React plugins |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Repository Structure

```
src/
  main.tsx                  # React DOM entry point
  App.tsx                   # Root component — section assembly, lazy loading, navigation
  App.css                   # App-level styles
  index.css                 # Global CSS custom properties (color tokens, typography)

  components/
    interactive/            # Heavy visualization components (D3, Leaflet)
      MigrationMap.tsx      # Animated Leaflet map of IE language spread (~1,167 lines)
      LanguageTree.tsx      # D3 collapsible tree of 400+ IE languages (~815 lines)
      LanguagePathways.tsx  # D3 language divergence graph (~586 lines)
      SoundShiftMachine.tsx # Interactive Grimm's Law / phonetic rule demo (~421 lines)
      CognateExplorer.tsx   # Searchable cognate comparison across 8 languages (~422 lines)
      Timeline.tsx          # D3 drag-based PIE dating timeline (~424 lines)
      AncestryChart.tsx     # Animated ancestry component chart (D3, ~369 lines)
      MythWeb.tsx           # D3 network graph of shared mythology (~399 lines)
    layout/
      Header.tsx            # Fixed top navigation with Framer Motion animations
      ScrollProgress.tsx    # Visual scroll progress bar
      SectionWrapper.tsx    # Generic scroll-triggered section wrapper
    ui/
      PIEForm.tsx           # Displays Proto-Indo-European word forms
      InteractiveLabel.tsx  # Tooltip/label elements for visualizations

  sections/                 # Content sections rendered in App.tsx order
    HookSection.tsx         # Word chain: "father" traced back through languages to PIE
    DiscoverySection.tsx    # Cognates and Grimm's Law discovery narrative
    DatingSection.tsx       # How scholars date PIE (~4500 BCE)
    HomelandSection.tsx     # Pontic-Caspian steppe homeland and migration map
    FamilyTreeSection.tsx   # Interactive IE language family tree
    SpreadSection.tsx       # Mechanisms of language spread
    MythologySection.tsx    # Shared mythological concepts across IE cultures
    DNASection.tsx          # Ancient DNA evidence section
    ExplorerSection.tsx     # Full cognate database explorer

  data/                     # Pure TypeScript data — no runtime dependencies
    cognates.ts             # 50+ PIE roots with cognates in 8+ modern languages
    languageTree.ts         # Complete IE family tree (~400 languages with metadata)
    migrations.ts           # Geographic migration routes (lat/lng coordinate arrays)
    soundChanges.ts         # Grimm's Law and other systematic phonetic rules
    myths.ts                # Mythology data: deities, rituals, cosmic concepts
    genetics.ts             # Ancient DNA ancestry components and temporal slices
    cultures.ts             # Archaeological cultures with date ranges
    timeline.ts             # Historical timeline events
    territories.ts          # Geographic regions and extents

  hooks/
    useScrollProgress.ts    # rAF-based scroll progress percentage hook

public/
  CNAME                     # Custom domain: indo-european-explorer.com
  og-image.png              # OpenGraph social preview image

.github/workflows/
  deploy.yml                # CI: build on push to main, deploy to GitHub Pages
```

---

## Development Workflow

### Local Development

```bash
npm install          # Install dependencies
npm run dev          # Start Vite dev server (hot reload)
npm run build        # TypeScript check + production build
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

There are no tests configured. `npm run build` serves as the primary correctness check via TypeScript strict mode.

### Before Committing

Always run:
```bash
npm run lint    # Must pass with no errors
npm run build   # Must succeed (type-checks + builds)
```

Both must pass. Fix all TypeScript and ESLint errors before committing.

### Deployment

Pushes to `main` automatically trigger `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages. No manual deployment step is needed.

---

## Architecture Patterns

### Scroll-Driven Layout

`App.tsx` assembles nine `<Section>` components in order. Each section uses `SectionWrapper` which observes intersection visibility to trigger Framer Motion entrance animations. The `useScrollProgress` hook drives the `ScrollProgress` bar at the top.

### Lazy Loading

All sections and heavy interactive components are loaded with React `lazy()` + `Suspense` to keep initial bundle size manageable given the large D3/Leaflet dependencies.

### Data Layer

All content data lives in `src/data/` as plain TypeScript constants and interfaces — no external API, no database. When adding or updating content, edit only these files. Do not embed large data objects inside component files.

### Visualization Components

- **Leaflet** (`MigrationMap.tsx`): used for geographic map rendering. Map tiles come from OpenStreetMap. Migration routes are animated SVG overlay paths drawn on top of the tile layer.
- **D3** (`LanguageTree`, `Timeline`, `AncestryChart`, `MythWeb`, `LanguagePathways`): SVG-based visualizations. D3 manages the SVG DOM directly via refs; React manages component lifecycle and props. Do not mix React state updates and D3 DOM manipulation in the same render cycle.
- **Framer Motion**: used for scroll-triggered entrance animations in sections and the header. Prefer `useInView` / `motion` components over imperative animation APIs.

---

## Styling Conventions

### CSS Custom Properties

Global color and typography tokens are defined in `src/index.css`. Use these variables rather than hard-coding values:

```css
/* Key color tokens (examples) */
--color-ochre
--color-sienna
--color-bronze
--color-teal
--color-bg-light
--color-bg-dark
```

### Tailwind CSS

Tailwind 4 is configured via the Vite plugin. Use Tailwind utility classes for layout and spacing. Use CSS custom properties (via `var(--token)`) for brand colors to maintain theme consistency.

### Typography

Google Fonts loaded in `index.html`:
- **Cormorant Garamond** — headings and decorative text
- **Source Sans 3** — body and UI text

---

## Data Conventions

### Adding Cognates (`src/data/cognates.ts`)

Each entry follows this shape:

```typescript
{
  pie: "*word",           // PIE root with asterisk prefix
  meaning: "...",
  languages: {
    sanskrit: "...",
    greek: "...",
    latin: "...",
    // ... other IE branches
  }
}
```

### Adding Languages (`src/data/languageTree.ts`)

The tree is a nested structure. Each node:

```typescript
{
  id: "unique-id",
  name: "Language Name",
  children?: [...],        // sub-branches
  extinct?: boolean,
  speakers?: number,       // approximate modern speakers
  region?: string,
}
```

### Adding Migration Routes (`src/data/migrations.ts`)

Each route is an array of `[lat, lng]` coordinate pairs describing the path, plus metadata like time period and culture name.

### Adding Timeline Events (`src/data/timeline.ts`)

Each event has a date (BCE negative, CE positive), label, and category.

---

## TypeScript Conventions

- **Strict mode** is enabled (`tsconfig.app.json`). All types must be explicit; avoid `any`.
- Target is **ES2022** for application code, **ES2023** for build tooling (`tsconfig.node.json`).
- Use TypeScript `interface` for object shapes used in data files; use `type` for unions and aliases.
- Export data constants as `export const`, not `export default`.
- Component props should always be typed with an explicit interface.

---

## ESLint Rules

Key active rules (see `eslint.config.js`):
- `react-hooks/rules-of-hooks` — enforced
- `react-hooks/exhaustive-deps` — enforced
- `react-refresh/only-export-components` — warnings only
- TypeScript recommended rules — enforced

All ESLint errors must be resolved before merging; warnings should be minimized.

---

## Key Files to Understand First

When picking up any task, read these files for orientation:

1. `src/App.tsx` — understand section order and lazy-loading structure
2. `src/index.css` — design tokens and global styles
3. The relevant `src/sections/*.tsx` file for the section being modified
4. The relevant `src/data/*.ts` file for data changes
5. The relevant `src/components/interactive/*.tsx` for visualization changes

---

## Common Tasks

### Add a new cognate entry
Edit `src/data/cognates.ts`. Follow the existing entry shape.

### Add a new language to the tree
Edit `src/data/languageTree.ts`. Insert the node in the correct branch position.

### Add a migration route
Edit `src/data/migrations.ts` with coordinate arrays and metadata.

### Modify a visualization
Read the component file in `src/components/interactive/` first. D3 logic uses refs and `useEffect`; be careful not to re-initialize D3 charts on every render — check dependency arrays.

### Add a new section
1. Create `src/sections/NewSection.tsx` following existing section patterns.
2. Add to `App.tsx` with `React.lazy()` and insert in the render order.
3. Add a navigation entry to `Header.tsx` if needed.

### Update styles
- For global tokens: edit `src/index.css`
- For component-specific styles: use Tailwind classes inline or add to the component's CSS module if one exists
- Do not add new `<style>` blocks inside component files

---

## What to Avoid

- Do not add API calls or external data fetching — all data is static TypeScript.
- Do not bypass TypeScript strict mode with `as any` or `@ts-ignore` without a documented reason.
- Do not mutate D3's SVG DOM from React render functions — use `useEffect` with proper cleanup.
- Do not add dependencies without considering bundle size — Leaflet and D3 are already significant.
- Do not embed large data literals inside component or section files — data belongs in `src/data/`.
- Do not commit with failing lint or build checks.
