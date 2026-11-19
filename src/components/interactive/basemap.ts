import L from 'leaflet'
import { geoEquirectangular, geoStream } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import detailedLandUrl from 'world-atlas/land-50m.json?url'
import coarseLandUrl from 'world-atlas/land-110m.json?url'

/**
 * Self-hosted basemap: Natural Earth coastlines drawn as one vector layer.
 * No tile server, no API key, and no modern borders or place names, which
 * would be anachronisms on a Bronze Age map anyway.
 */

export interface LandStyle {
  /** Sea colour, painted as the map background */
  sea: string
  land: string
  coast: string
  coastWidth?: number
  /** 'coarse' is a tenth of the download; enough for a dimmed backdrop */
  detail?: 'coarse' | 'detailed'
}

export const PARCHMENT_LAND: LandStyle = {
  sea: '#C9D3D0',
  land: '#F3ECDD',
  coast: '#9C8F78',
  coastWidth: 0.8,
}

// Brighter than it will appear: the hero dims its map to 35% behind the headline
export const NIGHT_LAND: LandStyle = {
  sea: '#141820',
  land: '#56617A',
  coast: '#8E99B3',
  detail: 'coarse',
  coastWidth: 0.6,
}

type Ring = [number, number][] // [lat, lng]

/**
 * Natural Earth is spherical data: shapes that cross the 180° meridian
 * (Chukotka, Antarctica) are stitched across it. Drawn flat, those stitches
 * become bands running the full width of the map. Streaming the shapes through
 * a plain degrees projection makes d3 cut them at the meridian first.
 */
function cutAtAntimeridian(land: GeoJSON.GeoJsonObject): Ring[][] {
  const degrees = geoEquirectangular().scale(180 / Math.PI).translate([0, 0]).precision(0)
  const polygons: Ring[][] = []
  let rings: Ring[] = []
  let ring: Ring = []

  geoStream(land as Parameters<typeof geoStream>[0], degrees.stream({
    polygonStart() { rings = [] },
    polygonEnd() { if (rings.length) polygons.push(rings) },
    lineStart() { ring = [] },
    lineEnd() { if (ring.length > 2) rings.push(ring) },
    point(x, y) { ring.push([-y, x]) },
    sphere() {},
  }))

  return polygons
}

const landUrls = { coarse: coarseLandUrl, detailed: detailedLandUrl }
const landCache = new Map<string, Promise<Ring[][]>>()

function loadLand(detail: 'coarse' | 'detailed'): Promise<Ring[][]> {
  const url = landUrls[detail]
  let promise = landCache.get(url)
  if (!promise) {
    promise = fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Coastline data failed to load (${res.status})`)
        return res.json() as Promise<Topology>
      })
      .then(topology => cutAtAntimeridian(feature(topology, topology.objects.land)))
      .catch(err => {
        landCache.delete(url)
        throw err
      })
    landCache.set(url, promise)
  }
  return promise
}

/**
 * Paint the sea and add the land layer beneath every other overlay.
 * Safe to call before the data arrives; the map shows open sea until then.
 */
export function addLandBasemap(map: L.Map, style: LandStyle): void {
  map.getContainer().style.setProperty('background', style.sea, 'important')

  const pane = map.createPane('basemap')
  pane.style.zIndex = '250' // above tiles (200), below vector overlays (400)
  pane.style.pointerEvents = 'none'
  const renderer = L.canvas({ pane: 'basemap', padding: 0.5 })

  loadLand(style.detail ?? 'detailed')
    .then(land => {
      // The map may have been torn down while the data was loading
      if (!map.getPane('basemap')?.isConnected) return
      // One shape holding every ring: the canvas fills it even-odd, so lakes
      // and inland seas stay cut out without sorting rings into outlines and holes.
      L.polygon(land.flat(), {
        renderer,
        pane: 'basemap',
        interactive: false,
        fillColor: style.land,
        fillOpacity: 1,
        color: style.coast,
        weight: style.coastWidth ?? 0.8,
        opacity: 1,
      }).addTo(map)
    })
    .catch(err => console.error(err))
}
