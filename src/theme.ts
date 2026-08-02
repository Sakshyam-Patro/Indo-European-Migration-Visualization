/**
 * Single source of truth for colours used inside visualisations.
 *
 * Brand tokens live in `src/index.css`; this module mirrors the subset that
 * D3/Leaflet/SVG code needs as plain strings, because CSS custom properties do
 * not resolve inside SVG presentation attributes.
 *
 * Categorical series must be drawn from `vizPalette` so the same hue never
 * means two different things in two different charts.
 */

export const brand = {
  ochre: '#B8860B',
  ochreLight: '#D4A537',
  ochreDark: '#8B6914',
  sienna: '#A0522D',
  siennaLight: '#B8724D',
  bronze: '#8B7355',
  bronzeDark: '#6B5B45',
  teal: '#0D7377',
  tealLight: '#14919B',
  tealDark: '#0A5C5F',
  bgDeep: '#141820',
  bgSurface: '#1A1F2B',
  bgElevated: '#222836',
  bgCard: '#2A3040',
  textOnDark: '#E8E2D6',
  textOnDarkSecondary: '#C0B8A9',
  textOnDarkMuted: '#9A9488',
  textOnLight: '#2C2416',
  textOnLightSecondary: '#5A4E3A',
  textOnLightMuted: '#706454',
  textBright: '#F5F0E8',
} as const

/**
 * Ordered categorical palette. Hues are spaced for discriminability while
 * staying within the site's warm/earth register.
 *
 * Measured against `bgSurface` (#1A1F2B), the background every visualisation
 * card sits on: all eight clear the 3:1 non-text threshold (WCAG 1.4.11), and
 * all but teal, sienna, and bronze also clear 4.5:1 for use as text. These
 * values are NOT safe on the light parchment background — do not reuse them
 * inside `.section-light` without rechecking.
 */
export const vizPalette = [
  '#D4A537', // gold
  '#14919B', // teal
  '#B8724D', // sienna
  '#7E9B5F', // sage
  '#9B7EBD', // plum
  '#6D8FB8', // slate blue
  '#C97B7B', // clay
  '#8B7355', // bronze
] as const

/** Semantic accents that carry a fixed meaning across every visualisation. */
export const semantic = {
  living: '#7E9B5F',
  extinct: '#9A9488',
  revived: '#14919B',
  reconstructed: '#D4A537',
  positive: '#5F8F5F',
  warning: '#B8724D',
} as const

/** Translucent surface treatments shared by every card and panel. */
export const surface = {
  cardBorder: 'rgba(212, 165, 55, 0.16)',
  cardBorderSubtle: 'rgba(212, 165, 55, 0.09)',
  cardShadow: '0 8px 40px rgba(0, 0, 0, 0.15)',
  panelShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
  overlay: 'rgba(20, 24, 32, 0.92)',
} as const

/**
 * Mixes a hex colour with an alpha channel. Prefer this over string
 * concatenation (`color + '80'`), which breaks silently for non-hex input.
 */
export function withAlpha(hex: string, alpha: number): string {
  const match = /^#([0-9a-f]{6})$/i.exec(hex)
  if (!match) return hex
  const value = parseInt(match[1], 16)
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
