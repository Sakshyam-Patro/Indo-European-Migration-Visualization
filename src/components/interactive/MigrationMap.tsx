import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cultures, type Culture } from '../../data/cultures'
import { migrations } from '../../data/migrations'
import { territories } from '../../data/territories'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MIN_DATE = -4500
const MAX_DATE = -800
const ANIM_SPEED = 100 // years per second

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
 * has reached ≥70% progress, rather than purely by date range.
 * Cultures NOT in this map are "origin" cultures that appear by date alone.
 */
const CULTURE_MIGRATION_DEPENDENCY: Record<string, string> = {
  'corded-ware': 'yamnaya-europe',
  'afanasievo': 'yamnaya-afanasievo',
  'sintashta': 'corded-ware-sintashta',
  'andronovo': 'sintashta-andronovo',
  'mycenaean': 'greek-migration',
}

interface CulturePopupData {
  culture: Culture
  x: number
  y: number
}

interface BranchPopupData {
  migration: (typeof migrations)[number]
  x: number
  y: number
}

// Origin point for all migrations
const PIE_HOMELAND: [number, number] = [47.5, 42.0]

const GENETIC_LABELS: Record<string, string> = {
  WHG: 'Western Hunter-Gatherer',
  EHG: 'Eastern Hunter-Gatherer',
  CHG: 'Caucasus Hunter-Gatherer',
  EEF: 'Early European Farmer',
  Steppe: 'Yamnaya-related Steppe',
}

const SPEED_OPTIONS = [
  { label: '0.5x', value: 50 },
  { label: '1x', value: 100 },
  { label: '2x', value: 200 },
]

export default function MigrationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [currentDate, setCurrentDate] = useState(MIN_DATE)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedCulture, setSelectedCulture] = useState<CulturePopupData | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<BranchPopupData | null>(null)
  const [legendOpen, setLegendOpen] = useState(() => window.innerWidth > 768)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [animSpeed, setAnimSpeed] = useState(ANIM_SPEED)
  const controlsRef = useRef<HTMLDivElement>(null)

  const territoryLayerGroup = useRef<L.LayerGroup | null>(null)
  const routeLayerGroup = useRef<L.LayerGroup | null>(null)
  const markerLayerGroup = useRef<L.LayerGroup | null>(null)
  const labelLayerGroup = useRef<L.LayerGroup | null>(null)
  const animationRef = useRef<number | null>(null)
  const dateRef = useRef(currentDate)

  dateRef.current = currentDate

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const map = L.map(mapContainerRef.current, {
      center: [42, 45],
      zoom: 3,
      minZoom: 2,
      maxZoom: 7,
      zoomControl: false,
      attributionControl: false,
    })

    // Light geographic basemap that shows terrain like the reference images
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map)

    L.control.zoom({ position: 'topright' }).addTo(map)
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('&copy; <a href="https://carto.com">CARTO</a>')
      .addTo(map)

    // Layer groups: territories (bottom) → routes → markers → labels (top)
    territoryLayerGroup.current = L.layerGroup().addTo(map)
    routeLayerGroup.current = L.layerGroup().addTo(map)
    markerLayerGroup.current = L.layerGroup().addTo(map)
    labelLayerGroup.current = L.layerGroup().addTo(map)

    // Homeland marker (always visible), large and prominent
    const homelandOuter = L.circleMarker(PIE_HOMELAND, {
      radius: 22,
      fillColor: '#D4A537',
      fillOpacity: 0.15,
      color: '#D4A537',
      weight: 2,
      opacity: 0.4,
    })
    homelandOuter.addTo(map)

    const homeland = L.circleMarker(PIE_HOMELAND, {
      radius: 10,
      fillColor: '#D4A537',
      fillOpacity: 0.9,
      color: '#fff',
      weight: 2.5,
      opacity: 0.9,
    })
    homeland.addTo(map)

    // Permanent homeland label
    const homelandLabel = L.marker(PIE_HOMELAND, {
      icon: L.divIcon({
        className: '',
        iconSize: [140, 40],
        iconAnchor: [70, -14],
        html: `<div style="
          text-align: center;
          font-family: 'Source Sans 3', sans-serif;
          font-size: 11px;
          font-weight: 700;
          color: #8B6914;
          text-shadow: 0 0 4px rgba(255,255,255,0.9), 0 0 8px rgba(255,255,255,0.7);
          white-space: nowrap;
          letter-spacing: 0.05em;
        ">PIE HOMELAND</div>`,
      }),
      interactive: false,
    })
    homelandLabel.addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      territoryLayerGroup.current = null
      routeLayerGroup.current = null
      markerLayerGroup.current = null
      labelLayerGroup.current = null
    }
  }, [])

  // Core layer update
  const updateLayers = useCallback((date: number) => {
    const map = mapRef.current
    if (!map || !territoryLayerGroup.current || !routeLayerGroup.current || !markerLayerGroup.current || !labelLayerGroup.current) return

    territoryLayerGroup.current.clearLayers()
    routeLayerGroup.current.clearLayers()
    markerLayerGroup.current.clearLayers()
    labelLayerGroup.current.clearLayers()

    // ---------- TERRITORY POLYGONS (large, bold, visible) ----------
    // Cultures with a migration dependency only appear once that migration
    // has reached ≥70% progress, not purely by their date range.
    const visibleCultures = cultures.filter(c => {
      if (c.startDate > date || c.endDate < date) return false
      const depMigrationId = CULTURE_MIGRATION_DEPENDENCY[c.id]
      if (!depMigrationId) return true // origin culture, show by date
      const depMigration = migrations.find(m => m.id === depMigrationId)
      if (!depMigration) return true
      if (depMigration.startDate > date) return false
      const progress = (date - depMigration.startDate) / (depMigration.endDate - depMigration.startDate)
      return progress >= 0.7
    })
    visibleCultures.forEach(culture => {
      const polyCoords = territories[culture.id]
      if (!polyCoords) return

      // Fade in/out
      const totalSpan = culture.endDate - culture.startDate
      const elapsed = date - culture.startDate
      const remaining = culture.endDate - date
      const fadeWindow = Math.min(totalSpan * 0.15, 200)
      let opacity = 1
      if (elapsed < fadeWindow) opacity = elapsed / fadeWindow
      if (remaining < fadeWindow) opacity = Math.min(opacity, remaining / fadeWindow)
      opacity = Math.max(0.1, Math.min(1, opacity))

      // Bold territory shading, highly visible like reference images
      const poly = L.polygon(polyCoords as L.LatLngExpression[], {
        fillColor: culture.color,
        fillOpacity: 0.3 * opacity,
        color: culture.color,
        weight: 2.5,
        opacity: 0.6 * opacity,
      })
      territoryLayerGroup.current!.addLayer(poly)

      // Culture name + date label on territory
      const center = culture.center
      const shortName = culture.name.split('(')[0].trim()
      const dateRange = `${dateToShort(culture.startDate)}\u2013${dateToShort(culture.endDate)} BCE`
      const nameLabel = L.marker(center, {
        icon: L.divIcon({
          className: '',
          iconSize: [160, 42],
          iconAnchor: [80, 21],
          html: `<div style="
            text-align: center;
            white-space: nowrap;
            opacity: ${Math.min(1, opacity * 1.5)};
          ">
            <div style="
              font-family: 'Source Sans 3', sans-serif;
              font-size: 12px;
              font-weight: 700;
              color: ${culture.color};
              text-shadow: 0 0 4px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.8), 0 0 12px rgba(255,255,255,0.6);
              letter-spacing: 0.03em;
            ">${shortName}</div>
            <div style="
              font-family: 'Source Sans 3', sans-serif;
              font-size: 10px;
              font-weight: 600;
              color: #555;
              text-shadow: 0 0 4px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.8);
            ">${dateRange}</div>
          </div>`,
        }),
        interactive: false,
      })
      markerLayerGroup.current!.addLayer(nameLabel)
    })

    // ---------- MIGRATION ROUTES (thick, bold arrows) ----------
    migrations.forEach(migration => {
      if (migration.startDate > date) return

      const totalDuration = migration.endDate - migration.startDate
      const elapsed = date - migration.startDate
      const rawProgress = elapsed / totalDuration
      const isComplete = rawProgress >= 1
      const progress = Math.max(0, Math.min(1, rawProgress))

      const fullPath = migration.path
      const visiblePath = isComplete
        ? fullPath
        : getPartialPath(fullPath, progress)

      if (visiblePath.length < 2) return

      // Outer glow / shadow (very wide, subtle)
      const shadow = L.polyline(visiblePath as L.LatLngExpression[], {
        color: migration.color,
        weight: isComplete ? 12 : 14,
        opacity: isComplete ? 0.1 : 0.15,
        lineCap: 'round',
        lineJoin: 'round',
      })
      routeLayerGroup.current!.addLayer(shadow)

      // Main route line, THICK and bold
      if (isComplete) {
        const line = L.polyline(visiblePath as L.LatLngExpression[], {
          color: migration.color,
          weight: 5,
          opacity: 0.7,
          lineCap: 'round',
          lineJoin: 'round',
        })
        routeLayerGroup.current!.addLayer(line)
      } else {
        // Active: solid thick line (not dashed, cleaner look)
        const line = L.polyline(visiblePath as L.LatLngExpression[], {
          color: migration.color,
          weight: 5.5,
          opacity: 0.85,
          lineCap: 'round',
          lineJoin: 'round',
        })
        routeLayerGroup.current!.addLayer(line)
      }

      // Dark outline for contrast on light map
      const outline = L.polyline(visiblePath as L.LatLngExpression[], {
        color: '#000',
        weight: 7,
        opacity: 0.08,
        lineCap: 'round',
        lineJoin: 'round',
      })
      routeLayerGroup.current!.addLayer(outline)
      // Bring main route above outline
      outline.bringToBack()

      // Clickable hit area (transparent, wider than visible line)
      const hitArea = L.polyline(visiblePath as L.LatLngExpression[], {
        color: 'transparent',
        weight: 20,
        opacity: 0,
        interactive: true,
      })
      hitArea.on('mouseover', () => {
        hitArea.setStyle({ color: migration.color, opacity: 0.15, weight: 20 })
        map.getContainer().style.cursor = 'pointer'
      })
      hitArea.on('mouseout', () => {
        hitArea.setStyle({ color: 'transparent', opacity: 0 })
        map.getContainer().style.cursor = ''
      })
      hitArea.on('click', (e: L.LeafletMouseEvent) => {
        L.DomEvent.stopPropagation(e)
        const point = map.latLngToContainerPoint(e.latlng)
        setSelectedBranch({ migration, x: point.x, y: point.y })
        setSelectedCulture(null)
      })
      routeLayerGroup.current!.addLayer(hitArea)
      hitArea.bringToFront()

      // Large arrowhead at leading edge
      if (!isComplete && visiblePath.length >= 2) {
        const tip = visiblePath[visiblePath.length - 1]
        const angle = getTipAngle(visiblePath)

        // Big SVG arrowhead
        const arrowIcon = L.divIcon({
          className: '',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          html: `<svg width="28" height="28" viewBox="0 0 28 28" style="transform: rotate(${angle}deg); filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3))">
            <polygon points="14,2 5,24 14,18 23,24" fill="${migration.color}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>`,
        })
        const arrowMarker = L.marker(tip as L.LatLngExpression, { icon: arrowIcon, interactive: false })
        markerLayerGroup.current!.addLayer(arrowMarker)
      }

      // Endpoint arrowhead + branch label for completed routes
      if (isComplete) {
        const endpoint = fullPath[fullPath.length - 1]
        const angle = getTipAngle(fullPath)

        // Arrowhead at end
        const endArrow = L.divIcon({
          className: '',
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          html: `<svg width="24" height="24" viewBox="0 0 24 24" style="transform: rotate(${angle}deg); filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2))">
            <polygon points="12,2 4,20 12,15 20,20" fill="${migration.color}" stroke="#fff" stroke-width="1" stroke-linejoin="round" opacity="0.85"/>
          </svg>`,
        })
        const endArrowMarker = L.marker(endpoint as L.LatLngExpression, { icon: endArrow, interactive: false })
        markerLayerGroup.current!.addLayer(endArrowMarker)

        // Branch name label at endpoint (pill-shaped background)
        const label = SHORT_LABELS[migration.id] || migration.branch || ''
        if (label) {
          const offset = LABEL_OFFSETS[migration.id] || [0, 0]
          const labelPos: [number, number] = [
            endpoint[0] + offset[0],
            endpoint[1] + offset[1],
          ]
          const displayLabel = label.replace('\n', ' / ')
          const dateStr = `~${Math.abs(migration.endDate)} BCE`

          const branchLabel = L.marker(
            labelPos as L.LatLngExpression,
            {
              icon: L.divIcon({
                className: '',
                iconSize: [140, 44],
                iconAnchor: [70, 22],
                html: `<div style="
                  text-align: center;
                  white-space: nowrap;
                  cursor: pointer;
                ">
                  <div style="
                    display: inline-block;
                    padding: 4px 12px;
                    background: ${migration.color}dd;
                    color: #fff;
                    font-family: 'Source Sans 3', sans-serif;
                    font-size: 12px;
                    font-weight: 700;
                    border-radius: 10px;
                    line-height: 1.3;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
                    letter-spacing: 0.02em;
                    transition: transform 0.15s, box-shadow 0.15s;
                  ">${displayLabel}</div>
                  <div style="
                    font-family: 'Source Sans 3', sans-serif;
                    font-size: 10px;
                    font-weight: 700;
                    color: #555;
                    margin-top: 2px;
                    text-shadow: 0 0 3px rgba(255,255,255,0.9);
                  ">${dateStr}</div>
                </div>`,
              }),
              interactive: true,
            }
          )
          branchLabel.on('click', (e: L.LeafletMouseEvent) => {
            L.DomEvent.stopPropagation(e)
            const point = map.latLngToContainerPoint(e.latlng)
            setSelectedBranch({ migration, x: point.x, y: point.y })
            setSelectedCulture(null)
          })
          labelLayerGroup.current!.addLayer(branchLabel)
        }
      }
    })

    // ---------- CULTURE CENTER MARKERS ----------
    visibleCultures.forEach(culture => {
      const marker = L.circleMarker(culture.center, {
        radius: 7,
        fillColor: culture.color,
        fillOpacity: 0.85,
        color: '#fff',
        weight: 2,
        opacity: 0.9,
      })
      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e)
        const point = map.latLngToContainerPoint(e.latlng)
        setSelectedCulture({ culture, x: point.x, y: point.y })
        setSelectedBranch(null)
      })
      markerLayerGroup.current!.addLayer(marker)
    })
  }, [])

  // React state → update layers
  useEffect(() => {
    updateLayers(currentDate)
  }, [currentDate, updateLayers])

  // Keyboard shortcut: spacebar to play/pause
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === 'Space' && controlsRef.current) {
        // Only handle if the map section is in viewport and focus isn't in an input
        const tag = (e.target as HTMLElement).tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
        const rect = controlsRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          e.preventDefault()
          setHasInteracted(true)
          if (currentDate >= MAX_DATE - 50) {
            setCurrentDate(MIN_DATE)
            dateRef.current = MIN_DATE
            updateLayers(MIN_DATE)
          }
          setIsPlaying(p => !p)
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [currentDate, updateLayers])

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      return
    }

    let lastTime = 0
    let accDate = dateRef.current

    const step = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp
      const delta = timestamp - lastTime
      lastTime = timestamp

      accDate += (delta / 1000) * animSpeed

      if (accDate >= MAX_DATE) {
        accDate = MAX_DATE
        setIsPlaying(false)
        setCurrentDate(MAX_DATE)
        updateLayers(MAX_DATE)
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
    }
  }, [isPlaying, updateLayers, animSpeed])

  // Close popup on map click
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const handler = () => { setSelectedCulture(null); setSelectedBranch(null) }
    map.on('click', handler)
    return () => { map.off('click', handler) }
  }, [])

  // Legend data (same migration-dependency logic as the map)
  const visibleCulturesList = cultures.filter(c => {
    if (c.startDate > currentDate || c.endDate < currentDate) return false
    const depMigrationId = CULTURE_MIGRATION_DEPENDENCY[c.id]
    if (!depMigrationId) return true
    const depMigration = migrations.find(m => m.id === depMigrationId)
    if (!depMigration) return true
    if (depMigration.startDate > currentDate) return false
    const progress = (currentDate - depMigration.startDate) / (depMigration.endDate - depMigration.startDate)
    return progress >= 0.7
  })
  const activeMigrations = migrations.filter(m => m.startDate <= currentDate)

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', maxWidth: '65ch', marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.3rem 0.8rem',
          background: 'rgba(13, 115, 119, 0.15)',
          border: '1px solid rgba(13, 115, 119, 0.3)',
          borderRadius: 20,
          marginBottom: '1rem',
          fontSize: '0.75rem',
          color: 'var(--teal-light)',
          fontFamily: 'var(--font-body)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
        }}>
          <span style={{
            width: 6, height: 6,
            borderRadius: '50%',
            background: 'var(--teal-light)',
            display: 'inline-block',
          }} />
          Interactive
        </div>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          color: 'var(--text-bright)',
          marginBottom: '0.75rem',
        }}>
          The Migration Map
        </h3>
        <p style={{
          color: 'var(--text-on-dark-secondary)',
          fontSize: '1rem',
        }}>
          Press play to watch Indo-European languages spread from the homeland across
          Eurasia. Click any <strong style={{ color: 'var(--text-bright)' }}>route</strong> or <strong style={{ color: 'var(--text-bright)' }}>culture</strong> on
          the map for details, including genetic ancestry breakdowns.
        </p>
        <p style={{
          color: 'var(--text-on-dark-muted)',
          fontSize: '0.8rem',
          fontStyle: 'italic',
          marginTop: '0.5rem',
        }}>
          Routes and dates reflect scholarship as of 2025 and may be revised as new research emerges.
        </p>
      </div>

      {/* Map */}
      <div style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(139, 115, 85, 0.3)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
      }}>
        <div
          ref={mapContainerRef}
          className="migration-map-container"
          style={{
            width: '100%',
            height: 600,
            background: '#e8e0d0',
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
          border: '1px solid rgba(139, 115, 85, 0.3)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: '#8B6914',
            fontWeight: 600,
            lineHeight: 1,
          }}>
            {dateToLabel(Math.round(currentDate))}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          zIndex: 1000,
          padding: legendOpen ? '1rem' : '0.5rem 0.75rem',
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(10px)',
          borderRadius: 10,
          border: '1px solid rgba(139, 115, 85, 0.25)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          maxHeight: legendOpen ? (window.innerWidth <= 768 ? '45vh' : 320) : 'auto',
          overflowY: legendOpen ? 'auto' : 'hidden',
          minWidth: legendOpen ? 200 : 'auto',
          maxWidth: 300,
        }}>
          <div
            onClick={() => setLegendOpen(!legendOpen)}
            style={{
              fontSize: '0.7rem',
              color: '#666',
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontWeight: 700,
              marginBottom: legendOpen ? '0.6rem' : 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              userSelect: 'none',
              gap: '0.5rem',
            }}>
            <span>Routes</span>
            <span style={{ fontSize: '0.6rem' }}>
              {legendOpen ? '▼' : '▶'}
            </span>
          </div>
          {legendOpen && (
            <>
              {activeMigrations.length === 0 ? (
                <div style={{
                  fontSize: '0.8rem',
                  color: '#999',
                  fontStyle: 'italic',
                }}>
                  Press play to begin...
                </div>
              ) : (
                activeMigrations.map(m => {
                  const isActive = m.startDate <= currentDate && m.endDate >= currentDate
                  return (
                    <div key={m.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.35rem',
                      fontSize: '0.8rem',
                      color: isActive ? '#222' : '#777',
                      fontFamily: 'var(--font-body)',
                      fontWeight: isActive ? 700 : 400,
                    }}>
                      <span style={{
                        width: 24, height: 5,
                        background: m.color,
                        flexShrink: 0,
                        borderRadius: 3,
                        opacity: isActive ? 1 : 0.5,
                      }} />
                      <span style={{ lineHeight: 1.3 }}>
                        {(SHORT_LABELS[m.id] || m.branch || m.name).replace('\n', ' / ')}
                        {isActive && (
                          <span style={{
                            marginLeft: 4,
                            color: m.color,
                            fontSize: '0.7rem',
                          }}>&#9654;</span>
                        )}
                      </span>
                    </div>
                  )
                })
              )}

              {visibleCulturesList.length > 0 && (
                <>
                  <div style={{
                    fontSize: '0.7rem',
                    color: '#666',
                    fontFamily: 'var(--font-body)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    marginTop: '0.6rem',
                    marginBottom: '0.4rem',
                    borderTop: '1px solid rgba(0,0,0,0.1)',
                    paddingTop: '0.5rem',
                  }}>
                    Active Cultures
                  </div>
                  {visibleCulturesList.map(c => (
                    <div key={c.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.3rem',
                      fontSize: '0.8rem',
                      color: '#444',
                      fontFamily: 'var(--font-body)',
                    }}>
                      <span style={{
                        width: 12, height: 12,
                        borderRadius: 3,
                        background: c.color,
                        flexShrink: 0,
                        opacity: 0.7,
                        border: '1px solid rgba(0,0,0,0.15)',
                      }} />
                      {c.name.split('(')[0].trim()}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        {/* Culture popup — bottom-anchored on mobile, floating on desktop */}
        {selectedCulture && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              right: 10,
              maxWidth: 320,
              zIndex: 1001,
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(12px)',
              borderRadius: 10,
              border: `2px solid ${selectedCulture.culture.color}66`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              maxHeight: '60%',
              overflowY: 'auto',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem',
            }}>
              <span style={{
                width: 12, height: 12, borderRadius: '50%',
                background: selectedCulture.culture.color,
              }} />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                color: '#2C2416', fontWeight: 600, flex: 1,
              }}>
                {selectedCulture.culture.name}
              </span>
              <button
                onClick={() => setSelectedCulture(null)}
                aria-label="Close culture detail"
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: 'rgba(0,0,0,0.08)',
                  color: '#555', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', lineHeight: 1, flexShrink: 0,
                  padding: 0, fontWeight: 700,
                }}
              >
                &times;
              </button>
            </div>
            <div style={{
              fontSize: '0.7rem', color: '#8A7E6A',
              fontFamily: 'var(--font-body)', marginBottom: '0.5rem',
            }}>
              {dateToLabel(selectedCulture.culture.startDate)} to {dateToLabel(selectedCulture.culture.endDate)}
              &nbsp;&middot;&nbsp;{selectedCulture.culture.region}
            </div>
            <p style={{
              fontSize: '0.8rem', color: '#5A4E3A',
              lineHeight: 1.5, fontFamily: 'var(--font-body)',
              marginBottom: selectedCulture.culture.geneticProfile ? '0.75rem' : 0,
            }}>
              {selectedCulture.culture.description}
            </p>

            {selectedCulture.culture.geneticProfile && (
              <div>
                <div style={{
                  fontSize: '0.6rem', color: '#8A7E6A',
                  fontFamily: 'var(--font-body)', textTransform: 'uppercase',
                  letterSpacing: '0.08em', marginBottom: '0.3rem',
                }}>
                  Genetic Ancestry
                </div>
                <div style={{
                  display: 'flex', height: 8, borderRadius: 4,
                  overflow: 'hidden', gap: 1,
                }}>
                  {Object.entries(selectedCulture.culture.geneticProfile).map(([key, value]) => {
                    if (!value) return null
                    const colors: Record<string, string> = {
                      WHG: '#4A90D9', EHG: '#7BB3E0', CHG: '#9B59B6',
                      EEF: '#27AE60', Steppe: '#E67E22',
                    }
                    return (
                      <div key={key} title={`${key}: ${value}%`} style={{
                        width: `${value}%`, background: colors[key] || '#888', borderRadius: 2,
                      }} />
                    )
                  })}
                </div>
                <div style={{
                  display: 'flex', gap: '0.5rem', marginTop: '0.25rem', flexWrap: 'wrap',
                }}>
                  {Object.entries(selectedCulture.culture.geneticProfile).map(([key, value]) => {
                    if (!value) return null
                    const colors: Record<string, string> = {
                      WHG: '#4A90D9', EHG: '#7BB3E0', CHG: '#9B59B6',
                      EEF: '#27AE60', Steppe: '#E67E22',
                    }
                    return (
                      <span key={key} title={GENETIC_LABELS[key] || key} style={{
                        fontSize: '0.55rem', color: '#8A7E6A',
                        fontFamily: 'var(--font-body)',
                        display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
                      }}>
                        <span style={{
                          width: 6, height: 6, borderRadius: 2,
                          background: colors[key] || '#888',
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

        {/* Branch popup — bottom-anchored on mobile, floating on desktop */}
        {selectedBranch && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              right: 10,
              maxWidth: 340,
              zIndex: 1001,
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.97)',
              backdropFilter: 'blur(12px)',
              borderRadius: 10,
              border: `2px solid ${selectedBranch.migration.color}66`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
              maxHeight: '60%',
              overflowY: 'auto',
            }}
          >
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem',
            }}>
              <span style={{
                width: 12, height: 12, borderRadius: '50%',
                background: selectedBranch.migration.color,
              }} />
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem',
                color: '#2C2416', fontWeight: 600, flex: 1,
              }}>
                {(SHORT_LABELS[selectedBranch.migration.id] || selectedBranch.migration.branch || '').replace('\n', ' / ')}
              </span>
              <button
                onClick={() => setSelectedBranch(null)}
                aria-label="Close migration detail"
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  border: '1px solid rgba(0,0,0,0.2)',
                  background: 'rgba(0,0,0,0.08)',
                  color: '#555', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '16px', lineHeight: 1, flexShrink: 0,
                  padding: 0, fontWeight: 700,
                }}
              >
                &times;
              </button>
            </div>
            <div style={{
              fontSize: '0.7rem', color: '#8A7E6A',
              fontFamily: 'var(--font-body)', marginBottom: '0.25rem',
            }}>
              {dateToLabel(selectedBranch.migration.startDate)} to {dateToLabel(selectedBranch.migration.endDate)}
            </div>
            {selectedBranch.migration.branch && (
              <div style={{
                fontSize: '0.7rem', color: selectedBranch.migration.color,
                fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: '0.5rem',
              }}>
                {selectedBranch.migration.branch}
              </div>
            )}
            <p style={{
              fontSize: '0.8rem', color: '#5A4E3A',
              lineHeight: 1.5, fontFamily: 'var(--font-body)',
              marginBottom: 0,
            }}>
              {selectedBranch.migration.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div ref={controlsRef} style={{
        marginTop: '1rem',
        padding: '1rem 1.25rem',
        background: 'rgba(26, 31, 43, 0.5)',
        borderRadius: 12,
        border: '1px solid rgba(139, 115, 85, 0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {!hasInteracted && !isPlaying && (
              <span style={{
                position: 'absolute',
                inset: -4,
                borderRadius: '50%',
                border: '2px solid var(--ochre)',
                animation: 'migration-pulse 2s ease-in-out infinite',
                pointerEvents: 'none',
              }} />
            )}
            <button
              onClick={() => {
                setHasInteracted(true)
                if (currentDate >= MAX_DATE - 50) {
                  setCurrentDate(MIN_DATE)
                  dateRef.current = MIN_DATE
                  updateLayers(MIN_DATE)
                }
                setIsPlaying(!isPlaying)
              }}
              aria-label={isPlaying ? 'Pause animation' : 'Play animation'}
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '2px solid var(--ochre-dark)',
                background: isPlaying ? 'rgba(200, 169, 110, 0.15)' : 'rgba(200, 169, 110, 0.08)',
                color: 'var(--ochre)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
          </div>

          <input
            type="range"
            min={MIN_DATE}
            max={MAX_DATE}
            step={25}
            value={currentDate}
            onChange={(e) => {
              setHasInteracted(true)
              const val = Number(e.target.value)
              setCurrentDate(val)
              dateRef.current = val
              setIsPlaying(false)
            }}
            aria-label="Migration timeline date"
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
          gap: '1rem',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}>
            {SPEED_OPTIONS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setAnimSpeed(opt.value)}
                aria-label={`Set speed to ${opt.label}`}
                style={{
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: animSpeed === opt.value ? 700 : 400,
                  color: animSpeed === opt.value ? 'var(--ochre)' : 'var(--text-on-dark-muted)',
                  background: animSpeed === opt.value ? 'rgba(200, 169, 110, 0.15)' : 'transparent',
                  border: `1px solid ${animSpeed === opt.value ? 'rgba(200, 169, 110, 0.4)' : 'rgba(255,255,255,0.15)'}`,
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <span style={{
            fontSize: '0.9rem',
            color: 'var(--text-on-dark-secondary)',
            fontFamily: 'var(--font-body)',
          }}>
            {currentDate >= MAX_DATE - 50
              ? 'Click routes or cultures for details'
              : isPlaying
                ? 'Playing'
                : !hasInteracted
                  ? 'Press play or spacebar to begin'
                  : 'Drag the slider or press play'}
          </span>
        </div>
        <style>{`
          @keyframes migration-pulse {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.15); }
          }
        `}</style>
      </div>
    </div>
  )
}
