import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { select, type Selection } from 'd3-selection'
import { hierarchy, tree as d3Tree, type HierarchyLink, type HierarchyNode, type HierarchyPointNode } from 'd3-hierarchy'
import { zoom as d3Zoom, zoomIdentity, zoomTransform, type ZoomTransform } from 'd3-zoom'
import { easeCubicOut } from 'd3-ease'
import 'd3-transition'
import { languageTree, type LanguageNode } from '../../data/languageTree'
import { brand, semantic, surface, vizPalette, withAlpha } from '../../theme'
import useReducedMotion from '../../hooks/useReducedMotion'
import Legend from '../ui/Legend'
import PIEForm from '../ui/PIEForm'
import VizHeading from '../ui/VizHeading'

interface TreeNode extends HierarchyPointNode<LanguageNode> {
  /** Children stashed away while the node is collapsed. */
  _children?: TreeNode[]
  x0?: number
  y0?: number
}

type Status = NonNullable<LanguageNode['status']>

/**
 * Below this viewport width the D3 canvas is swapped for a nested list — a
 * 400-node pannable diagram is unusable on a phone. Tracked with matchMedia so
 * it follows rotation and window resizes rather than only the first paint.
 */
const MOBILE_BREAKPOINT_PX = 600
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`

/**
 * Vertical room reserved per visible leaf in the virtual layout. 20px keeps
 * 11px labels from colliding while still letting a fully expanded branch fit.
 */
const LEAF_SPACING_PX = 20

/** Floor on the virtual layout height so a mostly-collapsed tree is not squashed. */
const MIN_LAYOUT_HEIGHT_PX = 400

/**
 * Horizontal room per depth level. 180px covers the longest language label
 * (~140px at 13px Source Sans) plus the 14px label offset either side.
 */
const DEPTH_COLUMN_WIDTH_PX = 180

/** Horizontal breathing room left around the tree when auto-fitting. */
const FIT_PADDING_X = 80

/** Vertical breathing room left around the tree when auto-fitting. */
const FIT_PADDING_Y = 40

/** Never zoom past this, or a collapsed tree fills the canvas with two circles. */
const MAX_FIT_SCALE = 1.2

const ZOOM_EXTENT: [number, number] = [0.15, 3]

const TRANSITION_MS = 600
const PULSE_MS = 2500

/** Radius of the invisible hit area on each node, so taps clear 24 CSS px. */
const NODE_HIT_RADIUS_PX = 14

/** Distance the arrow keys pan per press. */
const PAN_STEP_PX = 60
const KEY_ZOOM_FACTOR = 1.2

const ROOT_COLOR = vizPalette[0]
const FALLBACK_BRANCH_COLOR = vizPalette[7]

/**
 * Branch order in the data file, used to assign each branch a stable index into
 * the shared categorical palette. Ten branches share eight colours; the two
 * that wrap (Balto-Slavic, Indo-Iranian) sit at the far end of the canvas from
 * the branches whose hue they repeat, so the reuse never reads as a
 * relationship.
 */
const BRANCH_ORDER = [
  'Anatolian',
  'Tocharian',
  'Hellenic',
  'Armenian',
  'Albanian',
  'Celtic',
  'Italic',
  'Germanic',
  'Balto-Slavic',
  'Indo-Iranian',
] as const

const BRANCH_COLORS: Record<string, string> = Object.fromEntries(
  BRANCH_ORDER.map((name, index) => [name, vizPalette[index % vizPalette.length]]),
)

const STATUS_COLORS: Record<Status, string> = {
  reconstructed: semantic.reconstructed,
  extinct: semantic.extinct,
  living: semantic.living,
  revived: semantic.revived,
}

const STATUS_LABELS: Record<Status, string> = {
  reconstructed: 'Reconstructed',
  extinct: 'Extinct',
  living: 'Living',
  revived: 'Revived',
}

const STATUS_LEGEND = (Object.keys(STATUS_LABELS) as Status[]).map(status => ({
  color: STATUS_COLORS[status],
  label: STATUS_LABELS[status],
}))

function statusColor(status?: Status): string {
  return STATUS_COLORS[status ?? 'living']
}

/** Label colour by status. Shared by the D3 canvas and the mobile list. */
function labelColor(status?: Status): string {
  if (status === 'reconstructed') return semantic.reconstructed
  if (status === 'extinct') return semantic.extinct
  return brand.textOnDark
}

/** Branch colour by branch name. `undefined` means the Proto-Indo-European root. */
function branchColorForName(name?: string): string {
  if (!name) return ROOT_COLOR
  return BRANCH_COLORS[name] ?? FALLBACK_BRANCH_COLOR
}

/** Walks up to the depth-1 ancestor so every language inherits its branch hue. */
function getBranchColor(node: TreeNode): string {
  let current: TreeNode | null = node
  while (current && current.depth > 1) {
    current = current.parent
  }
  if (!current || current.depth === 0) return ROOT_COLOR
  return branchColorForName(current.data.name)
}

/** Filled for the root and for anything with children; hollow for leaves. */
function nodeFillColor(node: TreeNode): string {
  if (node.depth === 0) return ROOT_COLOR
  if (node.children || node._children) return getBranchColor(node)
  return brand.textBright
}

function nodeRadius(node: TreeNode): number {
  if (node.depth === 0) return 12
  if (node._children) return 8
  if (node.children) return 7
  return 4.5
}

function statusPhrase(status?: Status): string {
  return status ? STATUS_LABELS[status].toLowerCase() : 'language'
}

/** Status never rides on colour alone — it is spoken here and shown in the legend. */
function nodeAccessibleName(node: TreeNode): string {
  const base = `${node.data.name}, ${statusPhrase(node.data.status)}`
  if (node.children) return `${base}. Collapse branch.`
  if (node._children) return `${base}. Expand branch.`
  return `${base}. Show details.`
}

function nodeTooltip(node: TreeNode): string {
  const parts = [node.data.name, statusPhrase(node.data.status)]
  if (node.data.period) parts.push(node.data.period)
  return parts.join(' — ')
}

function diagonal(s: { x: number; y: number }, d: { x: number; y: number }): string {
  return `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`
}

function MobileTreeNode({ node, depth, branchName }: { node: LanguageNode; depth: number; branchName?: string }) {
  const [expanded, setExpanded] = useState(depth === 0)
  const children = node.children ?? []
  const hasChildren = children.length > 0
  const color = branchColorForName(depth === 1 ? node.name : branchName)
  const currentBranch = depth === 1 ? node.name : branchName

  const label = (
    <>
      <span
        style={{
          fontFamily: depth <= 1 ? 'var(--font-display)' : 'var(--font-body)',
          fontSize: depth === 0 ? '1rem' : depth === 1 ? '0.9rem' : '0.8rem',
          fontWeight: depth <= 1 ? 600 : 400,
          color: labelColor(node.status),
        }}
      >
        {node.status === 'reconstructed' ? <PIEForm root={node.name} /> : node.name}
      </span>
      {node.period && depth <= 2 && (
        <span style={{ fontSize: '0.7rem', color: 'var(--text-on-dark-muted)', fontFamily: 'var(--font-body)' }}>
          {node.period}
        </span>
      )}
    </>
  )

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    width: '100%',
    textAlign: 'left' as const,
    background: 'none',
    border: 'none',
    padding: '0.5rem 0.25rem',
    borderRadius: 6,
  }

  return (
    <div style={{ marginLeft: depth === 0 ? 0 : 16 }}>
      {hasChildren ? (
        <button
          type="button"
          onClick={() => setExpanded(value => !value)}
          aria-expanded={expanded}
          style={{ ...rowStyle, cursor: 'pointer' }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 18,
              height: 18,
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.7rem',
              fontWeight: 700,
              color,
              borderRadius: 3,
              background: withAlpha(color, 0.13),
            }}
          >
            {expanded ? '−' : '+'}
          </span>
          {label}
        </button>
      ) : (
        <div style={rowStyle}>
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              flexShrink: 0,
              borderRadius: '50%',
              background: statusColor(node.status),
              marginLeft: 5,
              marginRight: 5,
            }}
          />
          {label}
          <span className="sr-only">{statusPhrase(node.status)}</span>
        </div>
      )}

      {expanded && hasChildren && (
        <div
          style={{
            borderLeft: depth >= 1 ? `2px solid ${withAlpha(color, 0.2)}` : 'none',
            marginLeft: depth === 0 ? 0 : 7,
          }}
        >
          {children.map(child => (
            <MobileTreeNode key={child.name} node={child} depth={depth + 1} branchName={currentBranch} />
          ))}
        </div>
      )}
    </div>
  )
}

function MobileLanguageTree() {
  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="Indo-European Language Tree">
        Tap any branch to expand or collapse it.
      </VizHeading>

      <Legend items={STATUS_LEGEND} title="Status" style={{ marginBottom: '1rem' }} />

      <div
        style={{
          maxHeight: '60vh',
          overflowY: 'auto',
          padding: '0.5rem',
          borderRadius: 10,
          background: 'var(--bg-elevated)',
          border: `1px solid ${withAlpha(brand.bronze, 0.2)}`,
        }}
      >
        <MobileTreeNode node={languageTree} depth={0} />
      </div>
    </div>
  )
}

interface CanvasSize {
  width: number
  height: number
}

export default function LanguageTree() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<TreeNode | null>(null)
  const updateFnRef = useRef<((source: TreeNode) => void) | null>(null)
  const fitToViewRef = useRef<((paddingX?: number, duration?: number) => void) | null>(null)
  const pulseControlRef = useRef<{ start: () => void; stop: () => void } | null>(null)
  const sizeRef = useRef<CanvasSize>({ width: 900, height: 600 })

  const [selectedNode, setSelectedNode] = useState<LanguageNode | null>(null)
  const [size, setSize] = useState<CanvasSize | null>(null)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(MOBILE_QUERY).matches,
  )

  const reducedMotion = useReducedMotion()
  const reducedMotionRef = useRef(reducedMotion)
  const isMeasured = size !== null

  useLayoutEffect(() => {
    reducedMotionRef.current = reducedMotion
  }, [reducedMotion])

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return
    const query = window.matchMedia(MOBILE_QUERY)
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const measure = (width: number) => {
      if (width <= 0) return
      const next = { width, height: Math.max(500, Math.min(650, width * 0.6)) }
      sizeRef.current = next
      setSize(previous =>
        previous && previous.width === next.width && previous.height === next.height ? previous : next,
      )
    }

    measure(container.getBoundingClientRect().width)

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) measure(entry.contentRect.width)
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [isMobile])

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl || !size) return
    select(svgEl).attr('width', size.width).attr('height', size.height)
    fitToViewRef.current?.(FIT_PADDING_X, reducedMotionRef.current ? 0 : 300)
  }, [size])

  const handleNodeSelect = useCallback((data: LanguageNode) => {
    setSelectedNode(data)
  }, [])

  useEffect(() => {
    const svgEl = svgRef.current
    if (isMobile || !isMeasured || !svgEl) return

    let disposed = false
    let fitTimer: ReturnType<typeof setTimeout> | null = null
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }

    const animMs = (ms: number) => (reducedMotionRef.current ? 0 : ms)

    const svg = select(svgEl)
    svg.selectAll('*').remove()
    svg.attr('width', sizeRef.current.width).attr('height', sizeRef.current.height)

    const g = svg.append('g')

    const root = hierarchy<LanguageNode>(languageTree) as TreeNode
    rootRef.current = root

    root.descendants().forEach(d => {
      if (d.depth >= 1 && d.children) {
        d._children = d.children
        d.children = undefined
      }
    })
    if (root._children) {
      root.children = root._children
      root._children = undefined
    }
    root.x0 = 0
    root.y0 = 0

    const zoomBehavior = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent(ZOOM_EXTENT)
      .filter(event => {
        if (event.type === 'wheel') return event.ctrlKey || event.metaKey
        return true
      })
      .on('zoom', event => {
        g.attr('transform', event.transform.toString())
      })

    svg.call(zoomBehavior)

    function applyZoom(transform: ZoomTransform, duration: number) {
      if (duration > 0) {
        svg.transition().duration(duration).call(zoomBehavior.transform, transform)
      } else {
        svg.call(zoomBehavior.transform, transform)
      }
    }

    function fitToView(paddingX = 60, duration = TRANSITION_MS) {
      const gNode = g.node()
      if (!gNode) return
      const bbox = gNode.getBBox()
      if (bbox.width === 0 || bbox.height === 0) return

      const { width: w, height: h } = sizeRef.current
      const fullWidth = w - margin.left - margin.right
      const fullHeight = h - margin.top - margin.bottom

      const scale = Math.min(
        fullWidth / (bbox.width + paddingX * 2),
        fullHeight / (bbox.height + FIT_PADDING_Y),
        MAX_FIT_SCALE,
      )

      const tx = margin.left + (fullWidth - bbox.width * scale) / 2 - bbox.x * scale
      const ty = margin.top + (fullHeight - bbox.height * scale) / 2 - bbox.y * scale

      applyZoom(zoomIdentity.translate(tx, ty).scale(scale), duration)
    }

    fitToViewRef.current = fitToView

    /** Pans a keyboard-focused node into view so tabbing never lands off-canvas. */
    function ensureVisible(d: TreeNode) {
      const el = svg.node()
      if (!el) return
      const current = zoomTransform(el)
      const { width: w, height: h } = sizeRef.current
      const px = current.applyX(d.y)
      const py = current.applyY(d.x)
      const pad = 48
      if (px >= pad && px <= w - pad && py >= pad && py <= h - pad) return
      const next = zoomIdentity.translate(w / 2 - current.k * d.y, h / 2 - current.k * d.x).scale(current.k)
      applyZoom(next, animMs(300))
    }

    function startPulse(ring: Selection<SVGCircleElement, unknown, null, undefined>) {
      if (disposed || reducedMotionRef.current) return
      const el = ring.node()
      if (!el || !el.isConnected) return
      ring
        .attr('r', 3)
        .attr('opacity', 0.7)
        .attr('stroke-width', 1.5)
        .transition()
        .duration(PULSE_MS)
        .ease(easeCubicOut)
        .attr('r', 10)
        .attr('opacity', 0)
        .attr('stroke-width', 0.5)
        .on('end', () => startPulse(ring))
    }

    pulseControlRef.current = {
      start: () => {
        g.selectAll<SVGCircleElement, unknown>('.status-pulse').each(function () {
          startPulse(select(this))
        })
      },
      stop: () => {
        g.selectAll<SVGCircleElement, unknown>('.status-pulse').interrupt().attr('opacity', 0)
      },
    }

    function setFocusRing(el: SVGGElement, visible: boolean) {
      select(el).select('.focus-ring').attr('opacity', visible ? 1 : 0)
    }

    function toggle(d: TreeNode) {
      if (d.children) {
        d._children = d.children
        d.children = undefined
      } else if (d._children) {
        d.children = d._children
        d._children = undefined
      }
      update(d)
      handleNodeSelect(d.data)
    }

    function update(source: TreeNode) {
      const duration = animMs(TRANSITION_MS)

      const nodes = root.descendants()
      const layoutHeight = Math.max(MIN_LAYOUT_HEIGHT_PX, root.leaves().length * LEAF_SPACING_PX)
      const maxDepth = Math.max(...nodes.map(d => d.depth), 1)

      const treeLayout = d3Tree<LanguageNode>()
        .size([layoutHeight, maxDepth * DEPTH_COLUMN_WIDTH_PX])
        .separation((a, b) => (a.parent === b.parent ? 1 : 1.3))

      treeLayout(root as HierarchyNode<LanguageNode>)

      const links = root.links()

      const link = g
        .selectAll<SVGPathElement, HierarchyLink<LanguageNode>>('path.tree-link')
        .data(links, d => (d.target as TreeNode).data.name)

      const linkEnter = link
        .enter()
        .append('path')
        .attr('class', 'tree-link')
        .attr('fill', 'none')
        .attr('stroke', d => getBranchColor(d.target as TreeNode))
        .attr('stroke-opacity', 0.5)
        .attr('stroke-width', d => Math.max(1.5, 4 - (d.target as TreeNode).depth * 0.6))
        .attr('d', () => {
          const o = { x: source.x0 ?? 0, y: source.y0 ?? 0 }
          return diagonal(o, o)
        })

      linkEnter
        .merge(link)
        .transition()
        .duration(duration)
        .attr('d', d => diagonal(d.source as TreeNode, d.target as TreeNode))
        .attr('stroke-opacity', 0.5)

      link
        .exit()
        .transition()
        .duration(duration)
        .attr('d', () => {
          const o = { x: source.x, y: source.y }
          return diagonal(o, o)
        })
        .remove()

      const node = g.selectAll<SVGGElement, TreeNode>('g.tree-node').data(nodes, d => d.data.name)

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'tree-node')
        .attr('role', 'button')
        .attr('tabindex', 0)
        .attr('aria-label', nodeAccessibleName)
        .attr('aria-expanded', d => (d.children ? 'true' : d._children ? 'false' : null))
        .attr('transform', () => `translate(${source.y0 ?? 0},${source.x0 ?? 0})`)
        .attr('cursor', 'pointer')
        .on('click', (_event, d) => toggle(d))
        .on('keydown', (event: KeyboardEvent, d) => {
          if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return
          event.preventDefault()
          event.stopPropagation()
          toggle(d)
        })
        .on('focus', function (_event: FocusEvent, d) {
          setFocusRing(this, true)
          ensureVisible(d)
        })
        .on('blur', function () {
          setFocusRing(this, false)
        })

      nodeEnter.append('title').text(nodeTooltip)

      nodeEnter
        .append('circle')
        .attr('class', 'hit-area')
        .attr('r', NODE_HIT_RADIUS_PX)
        .attr('fill', 'none')
        .attr('pointer-events', 'all')

      nodeEnter
        .append('circle')
        .attr('class', 'node-circle')
        .attr('r', 0)
        .attr('fill', nodeFillColor)
        .attr('stroke', getBranchColor)
        .attr('stroke-width', d => (d.depth === 0 ? 3 : 2))

      nodeEnter
        .append('text')
        .attr('class', 'expand-indicator')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', d => (d.depth === 0 ? '14px' : '10px'))
        .attr('font-weight', '700')
        .attr('fill', brand.textBright)
        .attr('pointer-events', 'none')
        .text(d => (d._children ? '+' : d.children ? '−' : ''))

      nodeEnter
        .append('text')
        .attr('class', 'node-label')
        .attr('dy', d => (d.depth === 0 ? '-1.2em' : '0.35em'))
        .attr('x', d => (d.depth === 0 ? 0 : d.children || d._children ? -14 : 14))
        .attr('text-anchor', d => (d.depth === 0 ? 'middle' : d.children || d._children ? 'end' : 'start'))
        .attr('font-family', d =>
          d.depth === 0 ? "'Cormorant Garamond', serif" : "'Source Sans 3', sans-serif",
        )
        .attr('font-size', d => {
          if (d.depth === 0) return '16px'
          if (d.depth === 1) return '13px'
          if (d.depth === 2) return '12px'
          return '11px'
        })
        .attr('font-weight', d => (d.depth <= 1 ? '700' : '500'))
        .attr('font-style', d => (d.data.status === 'reconstructed' ? 'italic' : 'normal'))
        .attr('fill', d => labelColor(d.data.status))
        .attr('paint-order', 'stroke')
        // A literal colour, not `var(--bg-elevated)`: CSS custom properties do
        // not resolve inside SVG presentation attributes, so the halo silently
        // vanishes if a token is used here.
        .attr('stroke', brand.bgElevated)
        .attr('stroke-width', 3)
        .text(d => (d.data.status === 'reconstructed' ? `*${d.data.name}` : d.data.name))

      const animatedLeaves = nodeEnter.filter(
        d => !d.children && !d._children && (d.data.status === 'living' || d.data.status === 'revived'),
      )

      animatedLeaves
        .append('circle')
        .attr('class', 'status-pulse')
        .attr('cx', 8)
        .attr('cy', -6)
        .attr('r', 3)
        .attr('fill', 'none')
        .attr('stroke', d => statusColor(d.data.status))
        .attr('stroke-width', 1.5)
        .attr('opacity', 0)
        .attr('pointer-events', 'none')
        .each(function () {
          startPulse(select(this))
        })

      animatedLeaves
        .append('circle')
        .attr('class', 'status-dot')
        .attr('cx', 8)
        .attr('cy', -6)
        .attr('r', 3)
        .attr('fill', d => statusColor(d.data.status))
        .attr('opacity', 0.9)
        .attr('pointer-events', 'none')

      nodeEnter
        .append('circle')
        .attr('class', 'focus-ring')
        .attr('r', NODE_HIT_RADIUS_PX)
        .attr('fill', 'none')
        .attr('stroke', brand.textBright)
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '3 2')
        .attr('opacity', 0)
        .attr('pointer-events', 'none')

      const nodeUpdate = nodeEnter.merge(node)

      nodeUpdate.transition().duration(duration).attr('transform', d => `translate(${d.y},${d.x})`)

      nodeUpdate
        .select('.node-circle')
        .transition()
        .duration(duration)
        .attr('r', nodeRadius)
        .attr('fill', nodeFillColor)

      nodeUpdate
        .attr('aria-label', nodeAccessibleName)
        .attr('aria-expanded', d => (d.children ? 'true' : d._children ? 'false' : null))

      nodeUpdate.select('.expand-indicator').text(d => (d._children ? '+' : d.children ? '−' : ''))

      nodeUpdate
        .select('.node-label')
        .attr('x', d => (d.depth === 0 ? 0 : d.children || d._children ? -14 : 14))
        .attr('text-anchor', d => (d.depth === 0 ? 'middle' : d.children || d._children ? 'end' : 'start'))

      const exiting = node.exit<TreeNode>()

      // Stop the pulse loops on departing nodes before they detach, otherwise
      // they keep rescheduling forever against orphaned elements.
      exiting.each(function () {
        select(this).selectAll('.status-pulse').interrupt()
      })

      const nodeExit = exiting
        .transition()
        .duration(duration)
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .remove()

      nodeExit.select('.node-circle').attr('r', 0)
      nodeExit.select('.node-label').style('fill-opacity', 0)

      nodes.forEach(d => {
        d.x0 = d.x
        d.y0 = d.y
      })

      if (fitTimer !== null) clearTimeout(fitTimer)
      fitTimer = setTimeout(() => {
        fitTimer = null
        if (!disposed) fitToView(FIT_PADDING_X, animMs(400))
      }, duration + 50)
    }

    updateFnRef.current = update

    svg.on('dblclick.zoom', () => fitToView(0, animMs(500)))

    svg.on('keydown', (event: KeyboardEvent) => {
      const nudge = (dx: number, dy: number) => {
        if (reducedMotionRef.current) zoomBehavior.translateBy(svg, dx, dy)
        else zoomBehavior.translateBy(svg.transition().duration(200), dx, dy)
      }
      const scale = (factor: number) => {
        if (reducedMotionRef.current) zoomBehavior.scaleBy(svg, factor)
        else zoomBehavior.scaleBy(svg.transition().duration(200), factor)
      }

      switch (event.key) {
        case 'ArrowLeft':
          nudge(PAN_STEP_PX, 0)
          break
        case 'ArrowRight':
          nudge(-PAN_STEP_PX, 0)
          break
        case 'ArrowUp':
          nudge(0, PAN_STEP_PX)
          break
        case 'ArrowDown':
          nudge(0, -PAN_STEP_PX)
          break
        case '+':
        case '=':
          scale(KEY_ZOOM_FACTOR)
          break
        case '-':
        case '_':
          scale(1 / KEY_ZOOM_FACTOR)
          break
        case '0':
          fitToView(FIT_PADDING_X, animMs(400))
          break
        default:
          return
      }
      event.preventDefault()
    })

    update(root)

    return () => {
      disposed = true
      if (fitTimer !== null) {
        clearTimeout(fitTimer)
        fitTimer = null
      }
      svg.interrupt()
      svg.selectAll('*').interrupt()
      svg.on('.zoom', null)
      svg.on('keydown', null)
      svg.selectAll('*').remove()
      pulseControlRef.current = null
      fitToViewRef.current = null
      updateFnRef.current = null
      rootRef.current = null
    }
  }, [handleNodeSelect, isMeasured, isMobile])

  useEffect(() => {
    if (reducedMotion) pulseControlRef.current?.stop()
    else pulseControlRef.current?.start()
  }, [reducedMotion])

  const expandAll = useCallback(() => {
    const root = rootRef.current
    const update = updateFnRef.current
    if (!root || !update) return
    function expand(d: TreeNode) {
      if (d._children) {
        d.children = d._children
        d._children = undefined
      }
      d.children?.forEach(expand)
    }
    expand(root)
    update(root)
  }, [])

  const collapseAll = useCallback(() => {
    const root = rootRef.current
    const update = updateFnRef.current
    if (!root || !update) return
    function collapse(d: TreeNode) {
      if (d.children) {
        d.children.forEach(collapse)
        if (d.depth >= 1) {
          d._children = d.children
          d.children = undefined
        }
      }
    }
    collapse(root)
    update(root)
  }, [])

  if (isMobile) {
    return <MobileLanguageTree />
  }

  const controlButtonStyle = {
    borderRadius: 8,
    cursor: 'pointer',
    padding: '0.45rem 0.9rem',
    fontSize: '0.85rem',
    fontFamily: 'var(--font-body)',
  }

  return (
    <div style={{ width: '100%' }}>
      <VizHeading title="Indo-European Language Tree">
        {/* `.section-light p` in index.css would otherwise repaint this dark-card
            copy in the light-section ink (2:1 against the card). */}
        <p id="language-tree-help" style={{ color: 'inherit', fontSize: 'inherit', marginBottom: 0 }}>
          Click or focus a branch and press Enter to expand or collapse it; selecting a language shows its
          details below. Drag or use the arrow keys to pan, Ctrl-scroll or the <kbd>+</kbd> and{' '}
          <kbd>&minus;</kbd> keys to zoom, and double-click or press <kbd>0</kbd> to fit the whole tree.
        </p>
      </VizHeading>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1rem',
        }}
      >
        <Legend items={STATUS_LEGEND} title="Status" />

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={expandAll}
            style={{
              ...controlButtonStyle,
              background: withAlpha(brand.teal, 0.15),
              border: `1px solid ${withAlpha(brand.teal, 0.3)}`,
              color: 'var(--teal-light)',
            }}
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={collapseAll}
            style={{
              ...controlButtonStyle,
              background: withAlpha(brand.bronze, 0.15),
              border: `1px solid ${withAlpha(brand.bronze, 0.3)}`,
              color: 'var(--text-on-dark-muted)',
            }}
          >
            Collapse All
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          border: `1px solid ${withAlpha(brand.bronze, 0.2)}`,
          background: 'var(--bg-elevated)',
        }}
      >
        <svg
          ref={svgRef}
          role="group"
          tabIndex={0}
          aria-label="Indo-European language family tree"
          aria-describedby="language-tree-help"
          style={{ display: 'block', width: '100%' }}
        />
      </div>

      {selectedNode && (
        <div
          style={{
            marginTop: '1rem',
            padding: '1.25rem 1.5rem',
            background: withAlpha(brand.bgSurface, 0.85),
            borderRadius: 12,
            border: `1px solid ${surface.cardBorder}`,
            borderLeft: `3px solid ${brand.ochre}`,
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span
                aria-hidden="true"
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: statusColor(selectedNode.status),
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  color: selectedNode.status === 'reconstructed' ? 'var(--ochre-light)' : 'var(--text-bright)',
                }}
              >
                {selectedNode.status === 'reconstructed' ? (
                  <PIEForm root={selectedNode.name} />
                ) : (
                  selectedNode.name
                )}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--text-on-dark-muted)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {statusPhrase(selectedNode.status)}
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                fontSize: '0.75rem',
                color: 'var(--text-on-dark-muted)',
                fontFamily: 'var(--font-body)',
                marginBottom: '0.5rem',
              }}
            >
              {selectedNode.period && <span>{selectedNode.period}</span>}
              {selectedNode.region && <span>&middot; {selectedNode.region}</span>}
              {selectedNode.speakers && <span>&middot; {selectedNode.speakers}</span>}
            </div>

            {selectedNode.note && (
              <p
                style={{
                  fontSize: '0.85rem',
                  color: brand.textOnDarkSecondary,
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.6,
                  maxWidth: '60ch',
                }}
              >
                {selectedNode.note}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSelectedNode(null)}
            style={{
              background: 'none',
              border: `1px solid ${withAlpha(brand.bronze, 0.3)}`,
              borderRadius: 6,
              color: 'var(--text-on-dark-muted)',
              cursor: 'pointer',
              padding: '0.4rem 0.7rem',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}
