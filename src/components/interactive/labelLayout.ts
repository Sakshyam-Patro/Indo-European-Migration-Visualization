/**
 * Screen-space label placement for the migration map.
 *
 * Route endpoints cluster (Britain/Scandinavia, the Urals, the Caucasus), so
 * fixed lat/lng offsets always collide at some zoom level. Instead each label
 * tries positions around its anchor, nearest first, and takes the first one
 * that doesn't overlap anything already placed.
 */

export interface Box {
  x: number
  y: number
  w: number
  h: number
}

export interface LabelRequest {
  id: string
  /** Point the label describes, in container pixels */
  anchor: { x: number; y: number }
  w: number
  h: number
  /** Preferred side of the anchor, e.g. [1, -1] = right and above */
  prefer: [number, number]
  /** Route dates, available to labelPriority */
  startDate: number
  endDate: number
}

const GAP = 4
const DISTANCES = [12, 26, 42, 60, 80]
const DIRECTIONS: [number, number][] = [
  [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1],
]

function overlapArea(a: Box, b: Box): number {
  const w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x) + GAP
  const h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y) + GAP
  return w > 0 && h > 0 ? w * h : 0
}

/** Directions ordered by how close they are to the preferred side */
function directionsFrom(prefer: [number, number]): [number, number][] {
  const target = Math.atan2(prefer[1], prefer[0])
  const turn = (d: [number, number]) => {
    const diff = Math.abs(Math.atan2(d[1], d[0]) - target)
    return Math.min(diff, 2 * Math.PI - diff)
  }
  return [...DIRECTIONS].sort((a, b) => turn(a) - turn(b))
}

/**
 * Which label gets first pick of position when an area is crowded.
 * Lower numbers are placed first and so sit closest to their route's end;
 * later ones get pushed outward.
 *
 * TODO(you): this default is chronological, which keeps labels from jumping
 * during playback (a label placed at 2500 BCE never moves when a later one
 * arrives). See the note in the chat for the alternatives.
 */
export function labelPriority(label: LabelRequest): number {
  return label.endDate
}

export function placeLabels(requests: LabelRequest[], obstacles: Box[]): Map<string, Box> {
  const taken = [...obstacles]
  const placed = new Map<string, Box>()
  const ordered = [...requests].sort((a, b) => labelPriority(a) - labelPriority(b))

  for (const req of ordered) {
    const directions = directionsFrom(req.prefer)
    let best: Box | null = null
    let bestOverlap = Infinity

    search:
    for (const dist of DISTANCES) {
      for (const [dx, dy] of directions) {
        const box: Box = {
          x: req.anchor.x + dx * (dist + req.w / 2) - req.w / 2,
          y: req.anchor.y + dy * (dist + req.h / 2) - req.h / 2,
          w: req.w,
          h: req.h,
        }
        const overlap = taken.reduce((sum, other) => sum + overlapArea(box, other), 0)
        if (overlap < bestOverlap) {
          best = box
          bestOverlap = overlap
          if (overlap === 0) break search
        }
      }
    }

    if (best) {
      placed.set(req.id, best)
      taken.push(best)
    }
  }

  return placed
}

let measureCtx: CanvasRenderingContext2D | null = null

export function textWidth(text: string, font: string): number {
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d')
  if (!measureCtx) return text.length * 7
  measureCtx.font = font
  return measureCtx.measureText(text).width
}
