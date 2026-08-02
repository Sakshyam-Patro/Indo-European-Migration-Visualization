import { useMemo } from 'react'
import { migrations } from '../../data/migrations'

const WIDTH = 1000
const HEIGHT = 520
const PADDING = 40

/**
 * Decorative backdrop for the hero: the migration routes drawn as a plain SVG
 * on an equirectangular projection.
 *
 * This deliberately avoids Leaflet. The hero previously mounted a full tiled
 * map purely as 0.35-opacity decoration, which pulled the entire mapping
 * library and its tile requests into the initial page load for no interactive
 * benefit. The real map still lives in the Homeland section.
 */
export function MigrationBackdrop() {
  const { paths, bounds } = useMemo(() => {
    const lats: number[] = []
    const lngs: number[] = []
    migrations.forEach(route => {
      route.path.forEach(([lat, lng]) => {
        lats.push(lat)
        lngs.push(lng)
      })
    })

    const minLat = Math.min(...lats)
    const maxLat = Math.max(...lats)
    const minLng = Math.min(...lngs)
    const maxLng = Math.max(...lngs)

    const spanLat = maxLat - minLat || 1
    const spanLng = maxLng - minLng || 1

    const projectX = (lng: number) =>
      PADDING + ((lng - minLng) / spanLng) * (WIDTH - PADDING * 2)
    const projectY = (lat: number) =>
      PADDING + ((maxLat - lat) / spanLat) * (HEIGHT - PADDING * 2)

    const projected = migrations.map(route => ({
      id: route.id,
      color: route.color,
      d: route.path
        .map(([lat, lng], i) => `${i === 0 ? 'M' : 'L'} ${projectX(lng).toFixed(1)} ${projectY(lat).toFixed(1)}`)
        .join(' '),
    }))

    return {
      paths: projected,
      bounds: { minLat, maxLat, minLng, maxLng, projectX, projectY },
    }
  }, [])

  // Whole-degree graticule at 10-degree steps, clipped to the data extent.
  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
    const startLng = Math.ceil(bounds.minLng / 10) * 10
    for (let lng = startLng; lng <= bounds.maxLng; lng += 10) {
      const x = bounds.projectX(lng)
      lines.push({ x1: x, y1: PADDING, x2: x, y2: HEIGHT - PADDING })
    }
    const startLat = Math.ceil(bounds.minLat / 10) * 10
    for (let lat = startLat; lat <= bounds.maxLat; lat += 10) {
      const y = bounds.projectY(lat)
      lines.push({ x1: PADDING, y1: y, x2: WIDTH - PADDING, y2: y })
    }
    return lines
  }, [bounds])

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <g stroke="rgba(232, 226, 214, 0.06)" strokeWidth={1}>
        {gridLines.map((line, i) => (
          <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
        ))}
      </g>
      <g fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {paths.map(path => (
          <path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeOpacity={0.5}
            strokeDasharray="6 5"
          />
        ))}
      </g>
    </svg>
  )
}

export default MigrationBackdrop
