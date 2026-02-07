import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cultures, type Culture } from '../../data/cultures'
import { migrations } from '../../data/migrations'
import { territories } from '../../data/territories'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const MIN_DATE = -5000
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
  'yamnaya-afanasievo': 'Tocharian',
  'bell-beaker': 'Celtic\nItalic',
  'indo-iranian': 'Indo-Iranian',
  'greek-migration': 'Greek',
  'tocharian-route': 'Tocharian',
}

/** Per-route label offset adjustments [latOffset, lngOffset] to avoid overlap */
const LABEL_OFFSETS: Record<string, [number, number]> = {
  'clv-west': [4, 5],
  'clv-south': [-5, -6],
  'yamnaya-europe': [5, -6],
  'yamnaya-afanasievo': [4, 4],
  'bell-beaker': [4, -7],
  'indo-iranian': [-5, 7],
  'greek-migration': [-7, -6],
  'tocharian-route': [-3, 4],
}

interface CulturePopupData {
  culture: Culture
  x: number
  y: number
}

// Origin point for all migrations
const PIE_HOMELAND: [number, number] = [47.5, 42.0]

export default function MigrationMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [currentDate, setCurrentDate] = useState(MIN_DATE)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedCulture, setSelectedCulture] = useState<CulturePopupData | null>(null)

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
    const visibleCultures = cultures.filter(
      c => c.startDate <= date && c.endDate >= date
    )
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
      const dateRange = `${dateToShort(culture.startDate)}-${dateToShort(culture.endDate)}`
      const nameLabel = L.marker(center, {
        icon: L.divIcon({
          className: '',
          iconSize: [130, 36],
          iconAnchor: [65, 18],
          html: `<div style="
            text-align: center;
            white-space: nowrap;
            opacity: ${Math.min(1, opacity * 1.5)};
          ">
            <div style="
              font-family: 'Source Sans 3', sans-serif;
              font-size: 10px;
              font-weight: 700;
              color: ${culture.color};
              text-shadow: 0 0 4px rgba(255,255,255,0.95), 0 0 8px rgba(255,255,255,0.8);
              letter-spacing: 0.03em;
            ">${shortName}</div>
            <div style="
              font-family: 'Source Sans 3', sans-serif;
              font-size: 8px;
              font-weight: 600;
              color: #777;
              text-shadow: 0 0 3px rgba(255,255,255,0.9);
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
                ">
                  <div style="
                    display: inline-block;
                    padding: 3px 10px;
                    background: ${migration.color}dd;
                    color: #fff;
                    font-family: 'Source Sans 3', sans-serif;
                    font-size: 11px;
                    font-weight: 700;
                    border-radius: 10px;
                    line-height: 1.3;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
                    letter-spacing: 0.02em;
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
              interactive: false,
            }
          )
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
      })
      markerLayerGroup.current!.addLayer(marker)
    })
  }, [])

  // React state → update layers
  useEffect(() => {
    updateLayers(currentDate)
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

      accDate += (delta / 1000) * ANIM_SPEED

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
  }, [isPlaying, updateLayers])

  // Close popup on map click
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const handler = () => setSelectedCulture(null)
    map.on('click', handler)
    return () => { map.off('click', handler) }
  }, [])

  // Legend data
  const visibleCulturesList = cultures.filter(
    c => c.startDate <= currentDate && c.endDate >= currentDate
  )
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
          Eurasia. Bold arrows show migration routes, colored regions mark archaeological
          cultures, and labels indicate the language branches that emerged.
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
          padding: '0.75rem',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: 8,
          border: '1px solid rgba(139, 115, 85, 0.2)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          maxHeight: 260,
          overflowY: 'auto',
          maxWidth: 250,
        }}>
          <div style={{
            fontSize: '0.6rem',
            color: '#888',
            fontFamily: 'var(--font-body)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.4rem',
          }}>
            Migration Routes
          </div>
          {activeMigrations.length === 0 ? (
            <div style={{
              fontSize: '0.7rem',
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
                  gap: '0.4rem',
                  marginBottom: '0.25rem',
                  fontSize: '0.65rem',
                  color: isActive ? '#333' : '#888',
                  fontFamily: 'var(--font-body)',
                  fontWeight: isActive ? 600 : 400,
                }}>
                  <span style={{
                    width: 18, height: 4,
                    background: m.color,
                    flexShrink: 0,
                    borderRadius: 2,
                    opacity: isActive ? 1 : 0.6,
                  }} />
                  <span style={{ lineHeight: 1.3 }}>
                    {SHORT_LABELS[m.id] || m.branch || m.name}
                    {isActive && (
                      <span style={{
                        marginLeft: 4,
                        color: m.color,
                        fontSize: '0.6rem',
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
                fontSize: '0.6rem',
                color: '#888',
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginTop: '0.5rem',
                marginBottom: '0.3rem',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                paddingTop: '0.4rem',
              }}>
                Active Cultures
              </div>
              {visibleCulturesList.map(c => (
                <div key={c.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  marginBottom: '0.2rem',
                  fontSize: '0.65rem',
                  color: '#555',
                  fontFamily: 'var(--font-body)',
                }}>
                  <span style={{
                    width: 10, height: 10,
                    borderRadius: 3,
                    background: c.color,
                    flexShrink: 0,
                    opacity: 0.5,
                    border: '1px solid rgba(0,0,0,0.15)',
                  }} />
                  {c.name.split('(')[0].trim()}
                </div>
              ))}
            </>
          )}
        </div>

        {/* Culture popup */}
        {selectedCulture && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              top: Math.min(selectedCulture.y, 380),
              left: Math.min(Math.max(selectedCulture.x, 180), 800),
              transform: 'translate(-50%, -100%) translateY(-20px)',
              zIndex: 1001,
              width: 280,
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(12px)',
              borderRadius: 10,
              border: `2px solid ${selectedCulture.culture.color}66`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
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
                color: '#2C2416', fontWeight: 600,
              }}>
                {selectedCulture.culture.name}
              </span>
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
              maxHeight: 120,
              overflowY: 'auto',
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
                    return (
                      <span key={key} style={{
                        fontSize: '0.55rem', color: '#8A7E6A',
                        fontFamily: 'var(--font-body)',
                      }}>
                        {key} {value}%
                      </span>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div style={{
        marginTop: '1rem',
        padding: '1rem 1.25rem',
        background: 'rgba(26, 31, 43, 0.5)',
        borderRadius: 12,
        border: '1px solid rgba(139, 115, 85, 0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => {
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

          <input
            type="range"
            min={MIN_DATE}
            max={MAX_DATE}
            step={25}
            value={currentDate}
            onChange={(e) => {
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

        <div style={{
          marginTop: '0.5rem', fontSize: '0.7rem',
          color: 'var(--text-on-dark-muted)', fontFamily: 'var(--font-body)',
          textAlign: 'center',
        }}>
          {currentDate >= MAX_DATE - 50
            ? 'All major IE migration routes shown. Click cultures for details.'
            : isPlaying
              ? `Playing · ${ANIM_SPEED} years/second`
              : 'Drag the slider or press play'}
        </div>
      </div>
    </div>
  )
}
