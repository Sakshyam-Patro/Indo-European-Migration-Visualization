import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { motion } from 'framer-motion'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { cultures, type Culture } from '../../data/cultures'
import { migrations, type MigrationRoute } from '../../data/migrations'
import { territories } from '../../data/territories'
import { brand, vizPalette, withAlpha } from '../../theme'
import useReducedMotion from '../../hooks/useReducedMotion'
import VizHeading from '../ui/VizHeading'
import Legend from '../ui/Legend'
import type { LegendItem } from '../ui/Legend'

const MIN_DATE = -4500
const MAX_DATE = -800
const ANIM_SPEED = 100 // years per second
const MAP_MIN_ZOOM = 2
const MAP_MAX_ZOOM = 7

/** Cultures created by a migration only appear once that route is this far along. */
const MIGRATION_ARRIVAL_PROGRESS = 0.7

/** Below this the layout switches to the stacked/compact treatment. */
const MOBILE_QUERY = '(max-width: 768px)'

/** Parchment tone shown behind the tiles while they load. */
const MAP_BACKDROP = '#E8E0D0'

/**
 * CARTO's basemaps are rendered from OpenStreetMap data, so their terms require
 * crediting OSM contributors (ODbL) alongside CARTO itself.
 */
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors (ODbL) &middot; ' +
  '&copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>'

function dateToLabel(date: number): string {
  return `${Math.abs(date)} BCE`
}

function dateToShort(date: number): string {
  return `${Math.abs(date)}`
}

/**
 * Interpolate along a polyline path.
 */
function getPartialPath(
  path: [number, number][],
  progress: number
): [number, number][] {
  if (progress <= 0 || path.length < 2) return [path[0]]
  if (progress >= 1) return path

  const totalSegments = path.length - 1
  const exactIndex = progress * totalSegments
  const segIndex = Math.floor(exactIndex)
  const segProgress = exactIndex - segIndex

  const result = path.slice(0, segIndex + 1)

  if (segIndex < totalSegments) {
    const from = path[segIndex]
    const to = path[segIndex + 1]
    result.push([
      from[0] + (to[0] - from[0]) * segProgress,
      from[1] + (to[1] - from[1]) * segProgress,
    ])
  }

  return result
}

/** Get tip bearing angle (degrees) for arrow rotation */
function getTipAngle(path: [number, number][]): number {
  if (path.length < 2) return 0
  const prev = path[path.length - 2]
  const tip = path[path.length - 1]
  const dx = tip[1] - prev[1]
  const dy = tip[0] - prev[0]
  return (Math.atan2(dx, dy) * 180) / Math.PI
}

/** Short branch label for map display */
const SHORT_LABELS: Record<string, string> = {
  'clv-west': 'Pre-PIE',
  'clv-south': 'Anatolian',
  'yamnaya-europe': 'Balto-Slavic\nGermanic',
  'yamnaya-afanasievo': 'Afanasievo',
  'corded-ware-sintashta': 'Sintashta\nFormation',
  'sintashta-andronovo': 'Andronovo',
  'armenian-migration': 'Armenian',
  'bell-beaker-iberia': 'Celtic\nItalic',
  'bell-beaker-britain': 'Beaker\nBritain',
  'indo-iranian-trunk': 'Indo-Iranian',
  'indo-aryan': 'Indo-Aryan',
  'iranian': 'Iranian',
  'greek-migration': 'Greek',
  'tocharian-route': 'Tocharian',
}

/** Per-route label offset adjustments [latOffset, lngOffset] to avoid overlap */
const LABEL_OFFSETS: Record<string, [number, number]> = {
  'clv-west': [1, 1.5],
  'clv-south': [-1.5, -2],
  'yamnaya-europe': [1.5, -2],
  'yamnaya-afanasievo': [1.5, 1.5],
  'corded-ware-sintashta': [-1.5, -2],
  'sintashta-andronovo': [1.5, 1.5],
  'armenian-migration': [-1.5, 2],
  'bell-beaker-iberia': [-1.5, -2],
  'bell-beaker-britain': [1.5, -1.5],
  'indo-iranian-trunk': [1, 1.5],
  'indo-aryan': [-1.5, 2],
  'iranian': [-1.5, -2],
  'greek-migration': [-2, -2],
  'tocharian-route': [-1, 1.5],
}

/**
 * Maps culture IDs to the migration route that "created" them.
 * These cultures only appear on the map once the relevant migration
 * has reached MIGRATION_ARRIVAL_PROGRESS, rather than purely by date range.
 * Cultures NOT in this map are "origin" cultures that appear by date alone.
 */
const CULTURE_MIGRATION_DEPENDENCY: Record<string, string> = {
  'corded-ware': 'yamnaya-europe',
  'afanasievo': 'yamnaya-afanasievo',
  'sintashta': 'corded-ware-sintashta',
  'andronovo': 'sintashta-andronovo',
  'mycenaean': 'greek-migration',
}

// Origin point for all migrations
const PIE_HOMELAND: [number, number] = [47.5, 42.0]

const GENETIC_LABELS: Record<string, string> = {
  WHG: 'Western Hunter-Gatherer',
  EHG: 'Eastern Hunter-Gatherer',
  CHG: 'Caucasus Hunter-Gatherer',
  EEF: 'Early European Farmer',
  Steppe: 'Yamnaya-related Steppe',
  Other: 'Other regional ancestry',
}

/** One ancestry component, one palette slot — shared by the bar and its key. */
const GENETIC_COLORS: Record<string, string> = {
  WHG: vizPalette[5],
  EHG: vizPalette[1],
  CHG: vizPalette[4],
  EEF: vizPalette[3],
  Steppe: vizPalette[0],
  Other: vizPalette[2],
}
const GENETIC_FALLBACK = vizPalette[7]

const SPEED_OPTIONS = [
  { label: '0.5x', value: 50 },
  { label: '1x', value: 100 },
  { label: '2x', value: 200 },
]

/** Inline treatment for <kbd> keys named in the intro copy. */
const keyStyle = {
  padding: '0.05em 0.4em',
  borderRadius: 4,
  border: `1px solid ${withAlpha(brand.ochreLight, 0.3)}`,
  background: withAlpha(brand.ochreLight, 0.1),
  color: 'var(--text-bright)',
  fontFamily: 'var(--font-body)',
  fontSize: '0.85em',
}

/**
 * Single definition of "which cultures are on the map right now".
 * Both the Leaflet layers and the legend read from this, so the
 * migration-dependency rule can never drift between the two.
 */
function getVisibleCultures(date: number): Culture[] {
  return cultures.filter(culture => {
    if (culture.startDate > date || culture.endDate < date) return false
    const depMigrationId = CULTURE_MIGRATION_DEPENDENCY[culture.id]
    if (!depMigrationId) return true // origin culture, show by date
    const depMigration = migrations.find(m => m.id === depMigrationId)
    if (!depMigration) return true
    if (depMigration.startDate > date) return false
    const span = depMigration.endDate - depMigration.startDate
    if (span <= 0) return true
    return (date - depMigration.startDate) / span >= MIGRATION_ARRIVAL_PROGRESS
  })
}

/** Territories fade in at the start of a culture's span and out at the end. */
function getCultureOpacity(culture: Culture, date: number): number {
  const totalSpan = culture.endDate - culture.startDate
  const fadeWindow = Math.min(totalSpan * 0.15, 200)
  let opacity = 1
  if (fadeWindow > 0) {
    const elapsed = date - culture.startDate
    const remaining = culture.endDate - date
    if (elapsed < fadeWindow) opacity = elapsed / fadeWindow
    if (remaining < fadeWindow) opacity = Math.min(opacity, remaining / fadeWindow)
  }
  return Math.max(0.1, Math.min(1, opacity))
}

function routeLabel(migration: MigrationRoute): string {
  return (SHORT_LABELS[migration.id] || migration.branch || migration.name).replace('\n', ' / ')
}

function cultureLabel(culture: Culture): string {
  return culture.name.split('(')[0].trim()
}

function toggleLayer(group: L.LayerGroup, layer: L.Layer, visible: boolean): void {
  const present = group.hasLayer(layer)
  if (visible && !present) group.addLayer(layer)
  else if (!visible && present) group.removeLayer(layer)
}

/** Rotate an arrow marker without rebuilding its divIcon HTML. */
function setArrowAngle(marker: L.Marker, angle: number): void {
  const svg = marker.getElement()?.firstElementChild
  if (svg instanceof SVGElement) svg.style.transform = `rotate(${angle}deg)`
}

/**
 * Makes a Leaflet vector layer focusable and operable from the keyboard.
 * Leaflet routes DOM keydown from a focused path back to the layer, so the
 * same element serves mouse, touch and keyboard users.
 *
 * The attributes are re-applied on every `add` because the SVG renderer builds
 * a fresh <path> element each time a layer rejoins the map.
 */
function makeKeyboardOperable(
  layer: L.Path,
  label: string,
  activate: () => void,
  setHighlight: (on: boolean) => void
): void {
  const applyAttributes = () => {
    const el = layer.getElement()
    if (!el) return
    el.setAttribute('tabindex', '0')
    el.setAttribute('role', 'button')
    el.setAttribute('aria-label', label)
    el.addEventListener('focus', () => setHighlight(true))
    el.addEventListener('blur', () => setHighlight(false))
  }
  layer.on('add', applyAttributes)
  layer.on('keydown', (event: L.LeafletKeyboardEvent) => {
    const key = event.originalEvent.key
    if (key !== 'Enter' && key !== ' ' && key !== 'Spacebar') return
    event.originalEvent.preventDefault()
    event.originalEvent.stopPropagation()
    activate()
  })
  applyAttributes()
}

/** Everything Leaflet needs for one migration route, built once and reused. */
interface RouteHandles {
  migration: MigrationRoute
  shadow: L.Polyline
  outline: L.Polyline
  line: L.Polyline
  hitArea: L.Polyline
  tipArrow: L.Marker
  endArrow: L.Marker
  branchLabel: L.Marker | null
  visible: boolean
  /** Last progress committed to the geometry; -1 forces the next update through. */
  renderedProgress: number
  renderedMode: 'active' | 'complete' | null
}

/** Everything Leaflet needs for one archaeological culture, built once. */
interface CultureHandles {
  culture: Culture
  territory: L.Polygon | null
  label: L.Marker
  marker: L.CircleMarker
  visible: boolean
  renderedOpacity: number
}

function subscribeToViewport(onStoreChange: () => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {}
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', onStoreChange)
  return () => mql.removeEventListener('change', onStoreChange)
}

function getViewportSnapshot(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia(MOBILE_QUERY).matches
}

/**
 * Narrow-viewport flag driven by matchMedia, so it tracks resizes and
 * orientation changes instead of freezing at the first render's innerWidth.
 */
function useIsMobile(): boolean {
  return useSyncExternalStore(subscribeToViewport, getViewportSnapshot, () => false)
}

export default function MigrationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const controlsRef = useRef<HTMLDivElement>(null)

  const [currentDate, setCurrentDate] = useState(MIN_DATE)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedCulture, setSelectedCulture] = useState<Culture | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<MigrationRoute | null>(null)
  const [legendOverride, setLegendOverride] = useState<boolean | null>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [animSpeed, setAnimSpeed] = useState(ANIM_SPEED)

  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const legendPanelId = useId()
  const legendOpen = legendOverride ?? !isMobile

  const territoryLayerGroup = useRef<L.LayerGroup | null>(null)
  const routeLayerGroup = useRef<L.LayerGroup | null>(null)
  const markerLayerGroup = useRef<L.LayerGroup | null>(null)
  const labelLayerGroup = useRef<L.LayerGroup | null>(null)
  const routeHandlesRef = useRef<Map<string, RouteHandles>>(new Map())
  const cultureHandlesRef = useRef<Map<string, CultureHandles>>(new Map())
  const animationRef = useRef<number | null>(null)
  const dateRef = useRef(currentDate)
  const reducedMotionRef = useRef(reducedMotion)
  const cultureCardRef = useRef<HTMLDivElement>(null)
  const branchCardRef = useRef<HTMLDivElement>(null)

  // Keep refs in sync for use inside imperative callbacks and one-shot listeners
  useEffect(() => {
    dateRef.current = currentDate
  }, [currentDate])

  useEffect(() => {
    reducedMotionRef.current = reducedMotion
  }, [reducedMotion])

  /**
   * The rAF sweep is gated on the motion preference rather than on `isPlaying`
   * alone: a reduced-motion visitor never gets an animated timeline, and a
   * preference that flips mid-run stops the sweep on the next render.
   */
  const isAnimating = isPlaying && !reducedMotion

  // ---------------------------------------------------------------------------
  // Map + layer construction. Every Leaflet object the animation touches is
  // created exactly once here; the per-frame update below only mutates them.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const container = mapContainerRef.current
    if (!container || mapRef.current) return

    const map = L.map(container, {
      center: [42, 45],
      zoom: 3,
      minZoom: MAP_MIN_ZOOM,
      maxZoom: MAP_MAX_ZOOM,
      zoomControl: false,
      attributionControl: false,
    })

    L.control.zoom({ position: 'topright' }).addTo(map)
    L.control.attribution({ position: 'bottomright', prefix: false }).addTo(map)

    // Muted terrain basemap: enough relief to read the steppe corridor without
    // place-name labels competing with the migration overlay.
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: MAP_MAX_ZOOM,
      attribution: TILE_ATTRIBUTION,
    }).addTo(map)

    // Layer groups: territories (bottom) → routes → markers → labels (top)
    const territoryGroup = L.layerGroup().addTo(map)
    const routeGroup = L.layerGroup().addTo(map)
    const markerGroup = L.layerGroup().addTo(map)
    const labelGroup = L.layerGroup().addTo(map)
    territoryLayerGroup.current = territoryGroup
    routeLayerGroup.current = routeGroup
    markerLayerGroup.current = markerGroup
    labelLayerGroup.current = labelGroup

    // ---------- HOMELAND (always visible) ----------
    L.circleMarker(PIE_HOMELAND, {
      radius: 22,
      fillColor: brand.ochreLight,
      fillOpacity: 0.15,
      color: brand.ochreLight,
      weight: 2,
      opacity: 0.4,
      interactive: false,
    }).addTo(map)

    L.circleMarker(PIE_HOMELAND, {
      radius: 10,
      fillColor: brand.ochreLight,
      fillOpacity: 0.9,
      color: '#fff',
      weight: 2.5,
      opacity: 0.9,
      interactive: false,
    }).addTo(map)

    L.marker(PIE_HOMELAND, {
      // Leaflet stamps tabindex="0" + role="button" on every marker icon unless
      // `keyboard` is off, which would put unnamed tab stops between the routes
      // and cultures that actually carry the map's information.
      keyboard: false,
      icon: L.divIcon({
        className: '',
        iconSize: [140, 40],
        iconAnchor: [70, -14],
        html: `<div style="
          text-align: center;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: ${brand.ochreDark};
          text-shadow: 0 0 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.7);
          white-space: nowrap;
          letter-spacing: 0.05em;
        ">PIE HOMELAND</div>`,
      }),
      interactive: false,
    }).addTo(map)

    // ---------- TERRITORIES + CULTURE MARKERS ----------
    const cultureHandles = new Map<string, CultureHandles>()
    cultures.forEach(culture => {
      const polyCoords = territories[culture.id]
      let territory: L.Polygon | null = null
      if (polyCoords) {
        territory = L.polygon(polyCoords, {
          fillColor: culture.color,
          fillOpacity: 0.3,
          color: culture.color,
          weight: 2.5,
          opacity: 0.6,
          interactive: false,
        })
        // Territories always sit under the routes, even when they appear later.
        territory.on('add', () => territory?.bringToBack())
      }

      const dateRange = `${dateToShort(culture.startDate)}–${dateToShort(culture.endDate)} BCE`
      const label = L.marker(culture.center, {
        // Decorative twin of the focusable culture marker below: keep it out of
        // the tab order (see the homeland label for why `keyboard` matters).
        keyboard: false,
        icon: L.divIcon({
          className: '',
          iconSize: [160, 42],
          iconAnchor: [80, 21],
          // Hidden from assistive tech: the focusable culture marker below
          // carries the same name and dates in one announcement.
          html: `<div aria-hidden="true" style="text-align: center; white-space: nowrap;">
            <div style="
              font-family: 'Source Sans 3', sans-serif;
              font-size: 12px;
              font-weight: 700;
              color: ${culture.color};
              text-shadow: 0 0 4px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.6);
              letter-spacing: 0.03em;
            ">${cultureLabel(culture)}</div>
            <div style="
              font-family: 'Source Sans 3', sans-serif;
              font-size: 10px;
              font-weight: 600;
              color: ${brand.textOnLightSecondary};
              text-shadow: 0 0 4px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.8);
            ">${dateRange}</div>
          </div>`,
        }),
        interactive: false,
      })

      const marker = L.circleMarker(culture.center, {
        radius: 7,
        fillColor: culture.color,
        fillOpacity: 0.85,
        color: '#fff',
        weight: 2,
        opacity: 0.9,
      })
      const openCulture = () => {
        setSelectedCulture(culture)
        setSelectedBranch(null)
      }
      marker.on('click', (event: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(event)
        openCulture()
      })
      marker.on('add', () => marker.bringToFront())
      makeKeyboardOperable(
        marker,
        `${culture.name}, ${dateToLabel(culture.startDate)} to ${dateToLabel(culture.endDate)}. Show details.`,
        openCulture,
        on => marker.setStyle({ radius: on ? 10 : 7, weight: on ? 3 : 2 })
      )

      cultureHandles.set(culture.id, {
        culture,
        territory,
        label,
        marker,
        visible: false,
        renderedOpacity: -1,
      })
    })
    cultureHandlesRef.current = cultureHandles

    // ---------- MIGRATION ROUTES ----------
    const routeHandles = new Map<string, RouteHandles>()
    migrations.forEach(migration => {
      const openBranch = () => {
        setSelectedBranch(migration)
        setSelectedCulture(null)
      }

      // Outer glow.
      const shadow = L.polyline(migration.path, {
        color: migration.color,
        weight: 14,
        opacity: 0.15,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false,
      })

      // Dark outline for contrast on the light basemap.
      const outline = L.polyline(migration.path, {
        color: '#000',
        weight: 7,
        opacity: 0.08,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false,
      })

      const line = L.polyline(migration.path, {
        color: migration.color,
        weight: 5.5,
        opacity: 0.85,
        lineCap: 'round',
        lineJoin: 'round',
        interactive: false,
      })

      const hitArea = L.polyline(migration.path, {
        color: 'transparent',
        weight: 20,
        opacity: 0,
        interactive: true,
      })

      // Z-order is settled when a layer joins the map, not on every frame:
      // the dark outline drops behind everything, the hit area rides on top.
      outline.on('add', () => outline.bringToBack())
      hitArea.on('add', () => hitArea.bringToFront())

      const setHighlight = (on: boolean) => {
        hitArea.setStyle(
          on
            ? { color: migration.color, opacity: 0.18 }
            : { color: 'transparent', opacity: 0 }
        )
      }
      hitArea.on('mouseover', () => {
        setHighlight(true)
        map.getContainer().style.cursor = 'pointer'
      })
      hitArea.on('mouseout', () => {
        setHighlight(false)
        map.getContainer().style.cursor = ''
      })
      hitArea.on('click', (event: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(event)
        openBranch()
      })
      makeKeyboardOperable(
        hitArea,
        `${routeLabel(migration)} migration route, ${dateToLabel(migration.startDate)} to ${dateToLabel(migration.endDate)}. Show details.`,
        openBranch,
        setHighlight
      )

      const arrowSvg = (size: number, points: string, strokeWidth: number, opacity: number) =>
        `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-hidden="true" focusable="false" style="transform: rotate(0deg); filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3))">
          <polygon points="${points}" fill="${migration.color}" stroke="#fff" stroke-width="${strokeWidth}" stroke-linejoin="round" opacity="${opacity}"/>
        </svg>`

      const tipArrow = L.marker(migration.path[0], {
        // Arrowheads are pure decoration on top of the focusable route path.
        keyboard: false,
        icon: L.divIcon({
          className: '',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          html: arrowSvg(28, '14,2 5,24 14,18 23,24', 1.5, 1),
        }),
        interactive: false,
      })

      const endpoint = migration.path[migration.path.length - 1]
      const endArrow = L.marker(endpoint, {
        keyboard: false,
        icon: L.divIcon({
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          html: arrowSvg(24, '12,2 4,20 12,15 20,20', 1, 0.85),
        }),
        interactive: false,
      })
      endArrow.on('add', () => setArrowAngle(endArrow, getTipAngle(migration.path)))

      // Branch name pill at the endpoint, shown once the route has arrived.
      let branchLabel: L.Marker | null = null
      const pillText = SHORT_LABELS[migration.id] || migration.branch || ''
      if (pillText) {
        const offset = LABEL_OFFSETS[migration.id] || [0, 0]
        const labelPos: [number, number] = [endpoint[0] + offset[0], endpoint[1] + offset[1]]
        branchLabel = L.marker(labelPos, {
          // The focusable route path already announces this text, so the pill is
          // a pointer affordance only and stays out of the tab order.
          keyboard: false,
          icon: L.divIcon({
            className: '',
            iconSize: [140, 44],
            iconAnchor: [70, 22],
            html: `<div aria-hidden="true" style="text-align: center; white-space: nowrap; cursor: pointer;">
              <div style="
                display: inline-block;
                padding: 4px 12px;
                background: ${withAlpha(migration.color, 0.87)};
                color: #fff;
                font-family: 'Source Sans 3', sans-serif;
                font-size: 12px;
                font-weight: 700;
                border-radius: 10px;
                line-height: 1.3;
                box-shadow: 0 1px 4px rgba(0,0,0,0.2);
                letter-spacing: 0.02em;
              ">${pillText.replace('\n', ' / ')}</div>
              <div style="
                font-family: 'Source Sans 3', sans-serif;
                font-size: 10px;
                font-weight: 700;
                color: ${brand.textOnLightSecondary};
                margin-top: 2px;
                text-shadow: 0 0 3px rgba(255,255,255,0.9);
              ">~${Math.abs(migration.endDate)} BCE</div>
            </div>`,
          }),
          interactive: true,
        })
        branchLabel.on('click', (event: L.LeafletMouseEvent) => {
          L.DomEvent.stopPropagation(event)
          openBranch()
        })
      }

      routeHandles.set(migration.id, {
        migration,
        shadow,
        outline,
        line,
        hitArea,
        tipArrow,
        endArrow,
        branchLabel,
        visible: false,
        renderedProgress: -1,
        renderedMode: null,
      })
    })
    routeHandlesRef.current = routeHandles

    // Dismiss detail cards when the basemap itself is clicked.
    const clearSelection = () => {
      setSelectedCulture(null)
      setSelectedBranch(null)
    }
    map.on('click', clearSelection)

    // Leaflet caches the container size, so tell it whenever the box changes —
    // the section is lazily revealed and the mobile stylesheet resizes it.
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ animate: false })
    })
    resizeObserver.observe(container)

    let visibilityObserver: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      visibilityObserver = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return
        map.invalidateSize({ animate: false })
        visibilityObserver?.disconnect()
        visibilityObserver = null
      })
      visibilityObserver.observe(container)
    }

    mapRef.current = map

    return () => {
      resizeObserver.disconnect()
      visibilityObserver?.disconnect()
      map.off('click', clearSelection)
      map.remove()
      mapRef.current = null
      territoryLayerGroup.current = null
      routeLayerGroup.current = null
      markerLayerGroup.current = null
      labelLayerGroup.current = null
      routeHandlesRef.current = new Map()
      cultureHandlesRef.current = new Map()
    }
  }, [])

  // ---------------------------------------------------------------------------
  // Per-frame update. No layer is created or destroyed here: geometry, style and
  // group membership are mutated in place, and untouched when nothing changed.
  // ---------------------------------------------------------------------------
  const updateLayers = useCallback((date: number) => {
    const territoryGroup = territoryLayerGroup.current
    const routeGroup = routeLayerGroup.current
    const markerGroup = markerLayerGroup.current
    const labelGroup = labelLayerGroup.current
    if (!territoryGroup || !routeGroup || !markerGroup || !labelGroup) return

    const cultureHandles = cultureHandlesRef.current
    const routeHandles = routeHandlesRef.current

    // ---------- TERRITORIES + CULTURE MARKERS ----------
    const visibleIds = new Set(getVisibleCultures(date).map(c => c.id))
    cultureHandles.forEach((handles, id) => {
      const visible = visibleIds.has(id)
      if (visible !== handles.visible) {
        handles.visible = visible
        if (handles.territory) toggleLayer(territoryGroup, handles.territory, visible)
        toggleLayer(markerGroup, handles.label, visible)
        toggleLayer(markerGroup, handles.marker, visible)
        if (!visible) handles.renderedOpacity = -1
      }
      if (!visible) return

      const opacity = getCultureOpacity(handles.culture, date)
      if (Math.abs(opacity - handles.renderedOpacity) < 0.01) return
      handles.renderedOpacity = opacity
      handles.territory?.setStyle({ fillOpacity: 0.3 * opacity, opacity: 0.6 * opacity })
      handles.label.setOpacity(Math.min(1, opacity * 1.5))
    })

    // ---------- MIGRATION ROUTES ----------
    let routeAppeared = false
    routeHandles.forEach(handles => {
      const { migration } = handles
      const totalDuration = migration.endDate - migration.startDate
      const rawProgress = totalDuration > 0 ? (date - migration.startDate) / totalDuration : 1
      const isComplete = rawProgress >= 1
      const progress = Math.max(0, Math.min(1, rawProgress))
      const visiblePath = isComplete ? migration.path : getPartialPath(migration.path, progress)
      const shouldShow = migration.startDate <= date && visiblePath.length >= 2

      if (shouldShow !== handles.visible) {
        handles.visible = shouldShow
        toggleLayer(routeGroup, handles.shadow, shouldShow)
        toggleLayer(routeGroup, handles.outline, shouldShow)
        toggleLayer(routeGroup, handles.line, shouldShow)
        toggleLayer(routeGroup, handles.hitArea, shouldShow)
        if (shouldShow) {
          routeAppeared = true
        } else {
          toggleLayer(markerGroup, handles.tipArrow, false)
          toggleLayer(markerGroup, handles.endArrow, false)
          if (handles.branchLabel) toggleLayer(labelGroup, handles.branchLabel, false)
          handles.renderedProgress = -1
          handles.renderedMode = null
        }
      }
      if (!shouldShow) return

      const mode: 'active' | 'complete' = isComplete ? 'complete' : 'active'
      if (mode !== handles.renderedMode) {
        handles.renderedMode = mode
        handles.renderedProgress = -1
        handles.shadow.setStyle(
          mode === 'complete' ? { weight: 12, opacity: 0.1 } : { weight: 14, opacity: 0.15 }
        )
        handles.line.setStyle(
          mode === 'complete' ? { weight: 5, opacity: 0.7 } : { weight: 5.5, opacity: 0.85 }
        )
        toggleLayer(markerGroup, handles.tipArrow, mode === 'active')
        toggleLayer(markerGroup, handles.endArrow, mode === 'complete')
        if (handles.branchLabel) {
          toggleLayer(labelGroup, handles.branchLabel, mode === 'complete')
        }
      }

      if (mode === 'complete') {
        if (handles.renderedProgress !== 1) {
          handles.renderedProgress = 1
          handles.shadow.setLatLngs(migration.path)
          handles.outline.setLatLngs(migration.path)
          handles.line.setLatLngs(migration.path)
          handles.hitArea.setLatLngs(migration.path)
        }
        return
      }

      // Sub-pixel geometry churn is invisible; skip it.
      if (Math.abs(progress - handles.renderedProgress) < 0.0015) return
      handles.renderedProgress = progress
      handles.shadow.setLatLngs(visiblePath)
      handles.outline.setLatLngs(visiblePath)
      handles.line.setLatLngs(visiblePath)
      handles.hitArea.setLatLngs(visiblePath)
      handles.tipArrow.setLatLng(visiblePath[visiblePath.length - 1])
      setArrowAngle(handles.tipArrow, getTipAngle(visiblePath))
    })

    // A route that just joined the map sits above the culture dots; restore the
    // dots on the handful of frames where that actually happens.
    if (routeAppeared) {
      cultureHandles.forEach(handles => {
        if (handles.visible) handles.marker.bringToFront()
      })
    }
  }, [])

  const jumpTo = useCallback((date: number) => {
    dateRef.current = date
    setCurrentDate(date)
    updateLayers(date)
  }, [updateLayers])

  // React state → layers. While playing, the rAF loop owns the layers, so this
  // effect stands down instead of repeating the work the loop just did.
  useEffect(() => {
    if (isAnimating) return
    updateLayers(currentDate)
  }, [currentDate, isAnimating, updateLayers])

  const togglePlay = useCallback(() => {
    setHasInteracted(true)
    if (reducedMotionRef.current) {
      // No animated sweep for reduced motion: jump between the two end states.
      setIsPlaying(false)
      jumpTo(dateRef.current >= MAX_DATE - 50 ? MIN_DATE : MAX_DATE)
      return
    }
    if (dateRef.current >= MAX_DATE - 50) jumpTo(MIN_DATE)
    setIsPlaying(playing => !playing)
  }, [jumpTo])

  // Spacebar toggles playback. Bound once — the handler reads live values from
  // refs rather than closing over state.
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.code !== 'Space') return
      const target = event.target
      if (target instanceof Element) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'BUTTON') return
        if (target instanceof HTMLElement && target.isContentEditable) return
        // Focus is on a route or culture inside the map: Space activates that.
        if (mapContainerRef.current?.contains(target)) return
      }
      const controls = controlsRef.current
      if (!controls) return
      const rect = controls.getBoundingClientRect()
      if (rect.top >= window.innerHeight || rect.bottom <= 0) return
      event.preventDefault()
      togglePlay()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [togglePlay])

  // Animation loop
  useEffect(() => {
    if (!isAnimating) return

    let lastTime = 0
    let accDate = dateRef.current

    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const delta = timestamp - lastTime
      lastTime = timestamp

      accDate += (delta / 1000) * animSpeed

      if (accDate >= MAX_DATE) {
        dateRef.current = MAX_DATE
        updateLayers(MAX_DATE)
        setCurrentDate(MAX_DATE)
        setIsPlaying(false)
        return
      }

      updateLayers(accDate)
      dateRef.current = accDate
      setCurrentDate(Math.round(accDate / 5) * 5)

      animationRef.current = requestAnimationFrame(step)
    }

    animationRef.current = requestAnimationFrame(step)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [isAnimating, animSpeed, updateLayers])

  // Detail cards take focus so keyboard users land on the content they opened.
  useEffect(() => {
    if (selectedCulture) cultureCardRef.current?.focus()
  }, [selectedCulture])

  useEffect(() => {
    if (selectedBranch) branchCardRef.current?.focus()
  }, [selectedBranch])

  const dismissCards = useCallback(() => {
    setSelectedCulture(null)
    setSelectedBranch(null)
    // Hand focus back to the map so keyboard users are not dropped at the
    // document start, without yanking the viewport for mouse users.
    mapContainerRef.current?.focus({ preventScroll: true })
  }, [])

  const visibleCulturesList = useMemo(() => getVisibleCultures(currentDate), [currentDate])
  const activeMigrations = useMemo(
    () => migrations.filter(m => m.startDate <= currentDate),
    [currentDate]
  )

  const routeLegendItems: LegendItem[] = useMemo(
    () =>
      activeMigrations.map(m => ({
        color: m.color,
        label: `${routeLabel(m)} — ${m.endDate >= currentDate ? 'advancing' : 'settled'}`,
        dimmed: m.endDate < currentDate,
      })),
    [activeMigrations, currentDate]
  )

  const cultureLegendItems: LegendItem[] = useMemo(
    () => visibleCulturesList.map(c => ({ color: c.color, label: cultureLabel(c) })),
    [visibleCulturesList]
  )

  const atEnd = currentDate >= MAX_DATE - 50
  const playLabel = reducedMotion
    ? atEnd
      ? 'Return the map to 4500 BCE'
      : 'Skip to the end of the migrations'
    : isPlaying
      ? 'Pause the migration animation'
      : 'Play the migration animation'

  const cardBaseStyle = {
    position: 'absolute' as const,
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 1001,
    padding: '1rem',
    background: 'rgba(255, 255, 255, 0.97)',
    backdropFilter: 'blur(12px)',
    borderRadius: 10,
    boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
    maxHeight: '60%',
    overflowY: 'auto' as const,
  }

  const closeButtonStyle = {
    width: 28,
    height: 28,
    borderRadius: '50%',
    border: `1px solid ${withAlpha(brand.textOnLight, 0.2)}`,
    background: withAlpha(brand.textOnLight, 0.08),
    color: brand.textOnLightSecondary,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    padding: 0,
  }

  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="The Migration Map">
        <p style={{ marginBottom: '0.5rem' }}>
          Press play to watch Indo-European languages spread from the homeland across
          Eurasia. Select any <strong style={{ color: 'var(--text-bright)' }}>route</strong> or{' '}
          <strong style={{ color: 'var(--text-bright)' }}>culture</strong> on the map for
          details, including genetic ancestry breakdowns.
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          Every route and culture is reachable with <kbd style={keyStyle}>Tab</kbd>; press{' '}
          <kbd style={keyStyle}>Enter</kbd> or <kbd style={keyStyle}>Space</kbd> to open
          its details.
        </p>
        <p style={{ fontSize: '0.8rem', fontStyle: 'italic', color: 'var(--text-on-dark-muted)' }}>
          Routes and dates reflect scholarship as of 2025 and may be revised as new research emerges.
        </p>
      </VizHeading>

      {/* Map */}
      <div style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        border: `1px solid ${withAlpha(brand.bronze, 0.3)}`,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
      }}>
        <div
          ref={mapContainerRef}
          className="migration-map-container"
          role="region"
          aria-label="Interactive map of Indo-European migration routes and archaeological cultures"
          style={{
            width: '100%',
            height: 600,
            background: MAP_BACKDROP,
          }}
        />

        {/* Date overlay */}
        <div style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 1000,
          padding: '0.5rem 1rem',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: 8,
          border: `1px solid ${withAlpha(brand.bronze, 0.3)}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: brand.ochreDark,
            fontWeight: 600,
            lineHeight: 1,
          }}>
            {dateToLabel(Math.round(currentDate))}
          </div>
        </div>

        {/* Culture detail card */}
        {selectedCulture && (
          <motion.div
            ref={cultureCardRef}
            role="group"
            aria-label={`${selectedCulture.name} details`}
            tabIndex={-1}
            onKeyDown={event => {
              if (event.key === 'Escape') dismissCards()
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...cardBaseStyle,
              maxWidth: 320,
              border: `2px solid ${withAlpha(selectedCulture.color, 0.4)}`,
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem',
            }}>
              <span aria-hidden="true" style={{
                width: 12, height: 12, borderRadius: '50%',
                background: selectedCulture.color,
              }} />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                color: brand.textOnLight, fontWeight: 600, flex: 1,
              }}>
                {selectedCulture.name}
              </span>
              <button
                type="button"
                onClick={dismissCards}
                aria-label="Close culture detail"
                style={closeButtonStyle}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                  <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div style={{
              fontSize: '0.75rem', color: brand.textOnLightMuted,
              fontFamily: 'var(--font-body)', marginBottom: '0.5rem',
            }}>
              {dateToLabel(selectedCulture.startDate)} to {dateToLabel(selectedCulture.endDate)}
              &nbsp;&middot;&nbsp;{selectedCulture.region}
            </div>
            <p style={{
              fontSize: '0.8rem', color: brand.textOnLightSecondary,
              lineHeight: 1.5, fontFamily: 'var(--font-body)',
              marginBottom: selectedCulture.geneticProfile ? '0.75rem' : 0,
            }}>
              {selectedCulture.description}
            </p>

            {selectedCulture.geneticProfile && (
              <div>
                <div style={{
                  fontSize: '0.7rem', color: brand.textOnLightMuted,
                  fontFamily: 'var(--font-body)', textTransform: 'uppercase',
                  letterSpacing: '0.08em', marginBottom: '0.3rem',
                }}>
                  Genetic Ancestry
                </div>
                <div aria-hidden="true" style={{
                  display: 'flex', height: 8, borderRadius: 4,
                  overflow: 'hidden', gap: 1,
                }}>
                  {Object.entries(selectedCulture.geneticProfile).map(([key, value]) => {
                    if (!value) return null
                    return (
                      <div key={key} style={{
                        width: `${value}%`,
                        background: GENETIC_COLORS[key] || GENETIC_FALLBACK,
                        borderRadius: 2,
                      }} />
                    )
                  })}
                </div>
                <div style={{
                  display: 'flex', gap: '0.5rem', marginTop: '0.35rem', flexWrap: 'wrap',
                }}>
                  {Object.entries(selectedCulture.geneticProfile).map(([key, value]) => {
                    if (!value) return null
                    return (
                      <span key={key} style={{
                        fontSize: '0.7rem', color: brand.textOnLightMuted,
                        fontFamily: 'var(--font-body)',
                        display: 'inline-flex', alignItems: 'center', gap: '0.25rem',
                      }}>
                        <span aria-hidden="true" style={{
                          width: 6, height: 6, borderRadius: 2,
                          background: GENETIC_COLORS[key] || GENETIC_FALLBACK,
                          flexShrink: 0,
                        }} />
                        {GENETIC_LABELS[key] || key} {value}%
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Branch detail card */}
        {selectedBranch && (
          <motion.div
            ref={branchCardRef}
            role="group"
            aria-label={`${routeLabel(selectedBranch)} migration details`}
            tabIndex={-1}
            onKeyDown={event => {
              if (event.key === 'Escape') dismissCards()
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              ...cardBaseStyle,
              maxWidth: 340,
              border: `2px solid ${withAlpha(selectedBranch.color, 0.4)}`,
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem',
            }}>
              <span aria-hidden="true" style={{
                width: 12, height: 12, borderRadius: '50%',
                background: selectedBranch.color,
              }} />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                color: brand.textOnLight, fontWeight: 600, flex: 1,
              }}>
                {routeLabel(selectedBranch)}
              </span>
              <button
                type="button"
                onClick={dismissCards}
                aria-label="Close migration detail"
                style={closeButtonStyle}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" focusable="false">
                  <path d="M3 3 L11 11 M11 3 L3 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div style={{
              fontSize: '0.75rem', color: brand.textOnLightMuted,
              fontFamily: 'var(--font-body)', marginBottom: '0.25rem',
            }}>
              {dateToLabel(selectedBranch.startDate)} to {dateToLabel(selectedBranch.endDate)}
            </div>
            {selectedBranch.branch && (
              <div style={{
                fontSize: '0.7rem', color: brand.textOnLightSecondary,
                fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: '0.5rem',
              }}>
                {selectedBranch.branch}
              </div>
            )}
            <p style={{
              fontSize: '0.8rem', color: brand.textOnLightSecondary,
              lineHeight: 1.5, fontFamily: 'var(--font-body)',
              marginBottom: 0,
            }}>
              {selectedBranch.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div ref={controlsRef} style={{
        marginTop: '1rem',
        padding: '1rem 1.25rem',
        background: withAlpha(brand.bgSurface, 0.5),
        borderRadius: 12,
        border: `1px solid ${withAlpha(brand.bronze, 0.2)}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {/*
              Attention ring. Driven by Framer rather than `.homeland-pulse`,
              whose keyframes animate the SVG-only `r` property and fade to
              zero — on an HTML span that reads as a dim blink instead of an
              expanding pulse. The `!reducedMotion` guard is what stops the
              loop; the stylesheet's reduced-motion block cannot reach a
              JS-driven animation.
            */}
            {!hasInteracted && !isPlaying && !reducedMotion && (
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0.3, scale: 1 }}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  border: `2px solid ${brand.ochreLight}`,
                  pointerEvents: 'none',
                }}
              />
            )}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playLabel}
              title={playLabel}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: `2px solid ${brand.ochreDark}`,
                background: withAlpha(brand.ochreLight, isAnimating ? 0.18 : 0.08),
                color: 'var(--ochre)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                {reducedMotion ? (
                  atEnd ? (
                    <>
                      <rect x="2.5" y="2.5" width="2.5" height="11" rx="1" fill="currentColor" />
                      <path d="M13.5 2.5 L6.5 8 L13.5 13.5 Z" fill="currentColor" />
                    </>
                  ) : (
                    <>
                      <path d="M2.5 2.5 L9.5 8 L2.5 13.5 Z" fill="currentColor" />
                      <rect x="11" y="2.5" width="2.5" height="11" rx="1" fill="currentColor" />
                    </>
                  )
                ) : isPlaying ? (
                  <>
                    <rect x="3.5" y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
                    <rect x="9" y="2.5" width="3.5" height="11" rx="1" fill="currentColor" />
                  </>
                ) : (
                  <path d="M4 2.5 L13 8 L4 13.5 Z" fill="currentColor" />
                )}
              </svg>
            </button>
          </div>

          <input
            type="range"
            min={MIN_DATE}
            max={MAX_DATE}
            step={25}
            value={currentDate}
            onChange={event => {
              setHasInteracted(true)
              setIsPlaying(false)
              jumpTo(Number(event.target.value))
            }}
            aria-label="Migration timeline date"
            aria-valuetext={dateToLabel(Math.round(currentDate))}
            style={{ flex: 1, accentColor: 'var(--ochre)', cursor: 'pointer' }}
          />

          <span style={{
            fontFamily: 'var(--font-display)', fontSize: '1.2rem',
            color: 'var(--ochre)', minWidth: 110, textAlign: 'right',
            fontWeight: 500,
          }}>
            {dateToLabel(Math.round(currentDate))}
          </span>
        </div>

        {/* Speed + status row */}
        <div style={{
          marginTop: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          {!reducedMotion && (
            <div role="group" aria-label="Playback speed" style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              {SPEED_OPTIONS.map(opt => {
                const selected = animSpeed === opt.value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setAnimSpeed(opt.value)}
                    aria-pressed={selected}
                    aria-label={`Playback speed ${opt.label}`}
                    style={{
                      padding: '0.4rem 0.75rem',
                      minHeight: 32,
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-body)',
                      fontWeight: selected ? 700 : 400,
                      color: selected ? 'var(--ochre)' : 'var(--text-on-dark-muted)',
                      background: selected ? withAlpha(brand.ochreLight, 0.15) : 'transparent',
                      border: `1px solid ${withAlpha(brand.ochreLight, selected ? 0.4 : 0.15)}`,
                      borderRadius: 6,
                      cursor: 'pointer',
                      transition: 'background 0.2s, border-color 0.2s',
                    }}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          )}
          <span aria-live="polite" style={{
            fontSize: '0.9rem',
            color: 'var(--text-on-dark-secondary)',
            fontFamily: 'var(--font-body)',
          }}>
            {reducedMotion
              ? 'Reduced motion is on — drag the slider to scrub the timeline.'
              : atEnd
                ? 'Select routes or cultures for details'
                : isPlaying
                  ? 'Playing'
                  : !hasInteracted
                    ? 'Press play or spacebar to begin'
                    : 'Drag the slider or press play'}
          </span>
        </div>
      </div>

      {/* Map key */}
      <div style={{
        marginTop: '0.75rem',
        padding: '0.75rem 1.25rem 1rem',
        background: withAlpha(brand.bgSurface, 0.5),
        borderRadius: 12,
        border: `1px solid ${withAlpha(brand.bronze, 0.2)}`,
      }}>
        <button
          type="button"
          onClick={() => setLegendOverride(!legendOpen)}
          aria-expanded={legendOpen}
          aria-controls={legendPanelId}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            width: '100%',
            minHeight: 32,
            padding: '0.25rem 0',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-on-dark-secondary)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Map key</span>
          <svg
            width="12" height="12" viewBox="0 0 12 12"
            aria-hidden="true" focusable="false"
            style={{
              flexShrink: 0,
              transform: legendOpen ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s',
            }}
          >
            <path d="M4 2 L9 6 L4 10 Z" fill="currentColor" />
          </svg>
        </button>

        <div
          id={legendPanelId}
          hidden={!legendOpen}
          style={{
            marginTop: '0.6rem',
            maxHeight: isMobile ? '45vh' : 300,
            overflowY: 'auto',
          }}
        >
          {routeLegendItems.length === 0 ? (
            <p style={{
              fontSize: '0.8rem',
              fontStyle: 'italic',
              color: 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)',
              margin: 0,
            }}>
              Press play to begin — routes appear here as they set out.
            </p>
          ) : (
            <Legend title="Migration routes" shape="line" items={routeLegendItems} />
          )}
          {cultureLegendItems.length > 0 && (
            <Legend
              title="Cultures on the map"
              shape="dot"
              items={cultureLegendItems}
              style={{ marginTop: '0.9rem' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
