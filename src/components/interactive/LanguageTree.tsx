import { useEffect, useRef, useState, useCallback } from 'react'
import * as d3 from 'd3'
import { languageTree, type LanguageNode } from '../../data/languageTree'

interface TreeNode extends d3.HierarchyPointNode<LanguageNode> {
  _children?: TreeNode[]
  x0?: number
  y0?: number
}

const STATUS_COLORS: Record<string, string> = {
  reconstructed: '#9B59B6',
  extinct: '#95A5A6',
  living: '#27AE60',
}

const BRANCH_COLORS: Record<string, string> = {
  'Anatolian': '#8E44AD',
  'Tocharian': '#F39C12',
  'Celtic': '#2ECC71',
  'Italic': '#E74C3C',
  'Germanic': '#3498DB',
  'Balto-Slavic': '#1ABC9C',
  'Indo-Iranian': '#E67E22',
  'Hellenic': '#1ABC9C',
  'Armenian': '#D35400',
  'Albanian': '#C0392B',
}

function getBranchColor(node: TreeNode): string {
  let current: TreeNode | null = node
  while (current && current.depth > 1) {
    current = current.parent as TreeNode | null
  }
  if (current && current.data.name) {
    return BRANCH_COLORS[current.data.name] || '#8B7355'
  }
  return '#D4A537'
}

function diagonal(s: { x: number; y: number }, d: { x: number; y: number }): string {
  return `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`
}

export default function LanguageTree() {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<TreeNode | null>(null)
  const updateFnRef = useRef<((source: TreeNode) => void) | null>(null)
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null)
  const [selectedNode, setSelectedNode] = useState<LanguageNode | null>(null)
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 })

  // Responsive sizing
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const w = entry.contentRect.width
        setDimensions({ width: w, height: Math.max(500, Math.min(650, w * 0.6)) })
      }
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleNodeSelect = useCallback((data: LanguageNode) => {
    setSelectedNode(data)
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    const { width, height } = dimensions
    const margin = { top: 20, right: 20, bottom: 20, left: 20 }

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove()

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)

    // Main group that zoom/pan will transform
    const g = svg.append('g')

    // Create hierarchy
    const root = d3.hierarchy<LanguageNode>(languageTree) as TreeNode
    rootRef.current = root

    // Initially collapse to depth 1 (show major branches only)
    root.descendants().forEach((d: TreeNode) => {
      if (d.depth >= 1 && d.children) {
        d._children = d.children as TreeNode[]
        d.children = undefined
      }
    })
    if (root._children) {
      root.children = root._children
      root._children = undefined
    }

    // Store initial positions
    root.x0 = 0
    root.y0 = 0

    // Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.15, 3])
      .filter((event) => {
        // Block wheel scroll to avoid hijacking page scroll
        if (event.type === 'wheel') return false
        return true
      })
      .on('zoom', (event) => {
        g.attr('transform', event.transform.toString())
      })

    svg.call(zoom)
    zoomRef.current = zoom

    // Double-click to fit
    svg.on('dblclick.zoom', () => {
      fitToView(0, 500)
    })

    function fitToView(paddingX = 60, duration = 600) {
      // Get bounding box of all content
      const gNode = g.node()
      if (!gNode) return
      const bbox = gNode.getBBox()
      if (bbox.width === 0 || bbox.height === 0) return

      const fullWidth = width - margin.left - margin.right
      const fullHeight = height - margin.top - margin.bottom

      const scale = Math.min(
        fullWidth / (bbox.width + paddingX * 2),
        fullHeight / (bbox.height + 40),
        1.2 // cap max scale so collapsed state doesn't look weird
      )

      const tx = margin.left + (fullWidth - bbox.width * scale) / 2 - bbox.x * scale
      const ty = margin.top + (fullHeight - bbox.height * scale) / 2 - bbox.y * scale

      const transform = d3.zoomIdentity.translate(tx, ty).scale(scale)

      if (duration > 0) {
        svg.transition().duration(duration).call(zoom.transform, transform)
      } else {
        svg.call(zoom.transform, transform)
      }
    }

    function update(source: TreeNode) {
      const duration = 600

      // Count visible leaf nodes to calculate virtual layout height
      const leaves = root.leaves()
      const nodeSpacing = 20
      const layoutHeight = Math.max(400, leaves.length * nodeSpacing)

      // Compute max depth for horizontal spacing
      const allNodes = root.descendants() as TreeNode[]
      const maxDepth = Math.max(...allNodes.map(d => d.depth), 1)
      const layoutWidth = maxDepth * 180

      // Tree layout in virtual coordinate space
      const treeLayout = d3.tree<LanguageNode>()
        .size([layoutHeight, layoutWidth])
        .separation((a, b) => (a.parent === b.parent ? 1 : 1.3))

      treeLayout(root as d3.HierarchyNode<LanguageNode>)

      const nodes = root.descendants() as TreeNode[]
      const links = root.links()

      // ---- LINKS ----
      const link = g.selectAll<SVGPathElement, d3.HierarchyLink<LanguageNode>>('path.tree-link')
        .data(links, (d: d3.HierarchyLink<LanguageNode>) => {
          const target = d.target as TreeNode
          return target.data.name
        })

      const linkEnter = link.enter()
        .append('path')
        .attr('class', 'tree-link')
        .attr('fill', 'none')
        .attr('stroke', d => getBranchColor(d.target as TreeNode))
        .attr('stroke-opacity', 0.5)
        .attr('stroke-width', d => {
          const target = d.target as TreeNode
          return Math.max(1.5, 4 - target.depth * 0.6)
        })
        .attr('d', () => {
          const o = { x: source.x0 || 0, y: source.y0 || 0 }
          return diagonal(o, o)
        })

      linkEnter.merge(link)
        .transition()
        .duration(duration)
        .attr('d', d => diagonal(d.source as TreeNode, d.target as TreeNode))
        .attr('stroke-opacity', 0.5)

      link.exit()
        .transition()
        .duration(duration)
        .attr('d', () => {
          const o = { x: source.x || 0, y: source.y || 0 }
          return diagonal(o, o)
        })
        .remove()

      // ---- NODES ----
      const node = g.selectAll<SVGGElement, TreeNode>('g.tree-node')
        .data(nodes, (d: TreeNode) => d.data.name)

      const nodeEnter = node.enter()
        .append('g')
        .attr('class', 'tree-node')
        .attr('role', d => (d.children || d._children) ? 'button' : null)
        .attr('aria-label', d => {
          if (d.children) return `Collapse ${d.data.name}`
          if (d._children) return `Expand ${d.data.name}`
          return d.data.name
        })
        .attr('transform', () => `translate(${source.y0 || 0},${source.x0 || 0})`)
        .attr('cursor', d => (d.children || d._children) ? 'pointer' : 'default')
        .on('click', (_event, d) => {
          if (d.children) {
            d._children = d.children as TreeNode[]
            d.children = undefined
          } else if (d._children) {
            d.children = d._children
            d._children = undefined
          }
          update(d)
          handleNodeSelect(d.data)
        })

      // Node circle
      nodeEnter.append('circle')
        .attr('r', 0)
        .attr('fill', d => {
          if (d.depth === 0) return '#D4A537'
          return d._children ? getBranchColor(d) : (d.children ? getBranchColor(d) : '#fff')
        })
        .attr('stroke', d => getBranchColor(d))
        .attr('stroke-width', d => d.depth === 0 ? 3 : 2)

      // Expand/collapse indicator
      nodeEnter.append('text')
        .attr('class', 'expand-indicator')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        .attr('font-size', d => d.depth === 0 ? '14px' : '10px')
        .attr('font-weight', '700')
        .attr('fill', '#fff')
        .attr('pointer-events', 'none')
        .text(d => d._children ? '+' : (d.children ? '\u2212' : ''))

      // Node label
      nodeEnter.append('text')
        .attr('class', 'node-label')
        .attr('dy', d => d.depth === 0 ? '-1.2em' : '0.35em')
        .attr('x', d => {
          if (d.depth === 0) return 0
          return (d.children || d._children) ? -14 : 14
        })
        .attr('text-anchor', d => {
          if (d.depth === 0) return 'middle'
          return (d.children || d._children) ? 'end' : 'start'
        })
        .attr('font-family', d => d.depth === 0 ? "'Cormorant Garamond', serif" : "'Source Sans 3', sans-serif")
        .attr('font-size', d => {
          if (d.depth === 0) return '16px'
          if (d.depth === 1) return '13px'
          if (d.depth === 2) return '12px'
          return '11px'
        })
        .attr('font-weight', d => d.depth <= 1 ? '700' : '500')
        .attr('font-style', d => d.data.status === 'reconstructed' ? 'italic' : 'normal')
        .attr('fill', d => {
          if (d.data.status === 'reconstructed') return '#D4A537'
          if (d.data.status === 'extinct') return '#95A5A6'
          return '#E8E2D6'
        })
        .attr('paint-order', 'stroke')
        .attr('stroke', 'var(--bg-elevated)')
        .attr('stroke-width', 3)
        .text(d => {
          if (d.data.status === 'reconstructed') return `*${d.data.name}`
          return d.data.name
        })

      // Pulse ring for living language dots (uses recursive D3 transitions)
      nodeEnter.filter(d => !d.children && !d._children && d.data.status === 'living')
        .append('circle')
        .attr('class', 'status-pulse')
        .attr('cx', 8)
        .attr('cy', -6)
        .attr('r', 3)
        .attr('fill', 'none')
        .attr('stroke', '#27AE60')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0)
        .each(function () {
          const el = d3.select(this)
          function pulse() {
            el.attr('r', 3).attr('opacity', 0.7).attr('stroke-width', 1.5)
              .transition()
              .duration(2500)
              .ease(d3.easeCubicOut)
              .attr('r', 10)
              .attr('opacity', 0)
              .attr('stroke-width', 0.5)
              .on('end', pulse)
          }
          pulse()
        })

      // Status dot for leaf nodes
      nodeEnter.filter(d => !d.children && !d._children && d.data.status === 'living')
        .append('circle')
        .attr('class', 'status-dot')
        .attr('cx', 8)
        .attr('cy', -6)
        .attr('r', 3)
        .attr('fill', '#27AE60')
        .attr('opacity', 0.9)

      // Update + enter
      const nodeUpdate = nodeEnter.merge(node)

      nodeUpdate.transition()
        .duration(duration)
        .attr('transform', d => `translate(${d.y},${d.x})`)

      nodeUpdate.select('circle:first-of-type')
        .transition()
        .duration(duration)
        .attr('r', d => {
          if (d.depth === 0) return 12
          if (d._children) return 8
          if (d.children) return 7
          return 4.5
        })
        .attr('fill', d => {
          if (d.depth === 0) return '#D4A537'
          return d._children ? getBranchColor(d) : (d.children ? getBranchColor(d) : '#fff')
        })

      nodeUpdate
        .attr('aria-label', d => {
          if (d.children) return `Collapse ${d.data.name}`
          if (d._children) return `Expand ${d.data.name}`
          return d.data.name
        })

      nodeUpdate.select('.expand-indicator')
        .text(d => d._children ? '+' : (d.children ? '\u2212' : ''))

      nodeUpdate.select('.node-label')
        .attr('x', d => {
          if (d.depth === 0) return 0
          return (d.children || d._children) ? -14 : 14
        })
        .attr('text-anchor', d => {
          if (d.depth === 0) return 'middle'
          return (d.children || d._children) ? 'end' : 'start'
        })

      // Exit nodes
      const nodeExit = node.exit()
        .transition()
        .duration(duration)
        .attr('transform', () => `translate(${source.y},${source.x})`)
        .remove()

      nodeExit.select('circle').attr('r', 0)
      nodeExit.select('text').style('fill-opacity', 0)

      // Store positions for next transition
      nodes.forEach(d => {
        d.x0 = d.x
        d.y0 = d.y
      })

      // Auto-fit view after transition completes
      setTimeout(() => fitToView(80, 400), duration + 50)
    }

    updateFnRef.current = update

    // Initial render
    update(root)
  }, [dimensions, handleNodeSelect])

  // Expand All / Collapse All
  const expandAll = useCallback(() => {
    if (!rootRef.current || !updateFnRef.current) return
    function expand(d: TreeNode) {
      if (d._children) {
        d.children = d._children
        d._children = undefined
      }
      d.children?.forEach(c => expand(c as TreeNode))
    }
    expand(rootRef.current)
    updateFnRef.current(rootRef.current)
  }, [])

  const collapseAll = useCallback(() => {
    if (!rootRef.current || !updateFnRef.current) return
    function collapse(d: TreeNode) {
      if (d.children) {
        d.children.forEach(c => collapse(c as TreeNode))
        if (d.depth >= 1) {
          d._children = d.children as TreeNode[]
          d.children = undefined
        }
      }
    }
    collapse(rootRef.current)
    updateFnRef.current(rootRef.current)
  }, [])

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.3rem 0.8rem',
            background: 'rgba(13, 115, 119, 0.15)',
            border: '1px solid rgba(13, 115, 119, 0.3)',
            borderRadius: 20,
            marginBottom: '0.75rem',
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
            marginBottom: '0.5rem',
          }}>
            Indo-European Language Tree
          </h3>
          <p style={{
            color: 'var(--text-on-dark-secondary)',
            fontSize: '0.9rem',
          }}>
            Click any branch to expand or collapse it. Click a language to see details.
            Drag to pan, pinch to zoom. Double-click to fit view.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-end' }}>
          {/* Legend */}
          <div style={{
            display: 'flex',
            gap: '1.25rem',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--text-on-dark-muted)',
            flexWrap: 'wrap',
          }}>
            {Object.entries(STATUS_COLORS).map(([status, color]) => (
              <div key={status} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: color, display: 'inline-block',
                }} />
                {status === 'reconstructed' ? 'Reconstructed' : status === 'extinct' ? 'Extinct' : 'Living'}
              </div>
            ))}
          </div>

          {/* Expand/Collapse buttons */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={expandAll}
              aria-label="Expand all tree branches"
              style={{
                background: 'rgba(13, 115, 119, 0.15)',
                border: '1px solid rgba(13, 115, 119, 0.3)',
                borderRadius: 8,
                color: 'var(--teal-light)',
                cursor: 'pointer',
                padding: '0.45rem 0.9rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              aria-label="Collapse all tree branches"
              style={{
                background: 'rgba(139, 115, 85, 0.15)',
                border: '1px solid rgba(139, 115, 85, 0.3)',
                borderRadius: 8,
                color: 'var(--text-on-dark-muted)',
                cursor: 'pointer',
                padding: '0.45rem 0.9rem',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-body)',
              }}
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Tree visualization */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(139, 115, 85, 0.2)',
          background: 'var(--bg-elevated)',
        }}
      >
        <svg ref={svgRef} style={{ display: 'block', width: '100%' }} />
      </div>

      {/* Selected node detail panel */}
      {selectedNode && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem 1.25rem',
          background: 'rgba(26, 31, 43, 0.6)',
          borderRadius: 12,
          border: '1px solid rgba(139, 115, 85, 0.2)',
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: STATUS_COLORS[selectedNode.status || 'living'],
              }} />
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                color: selectedNode.status === 'reconstructed' ? 'var(--ochre-light)' : 'var(--text-bright)',
                fontStyle: selectedNode.status === 'reconstructed' ? 'italic' : 'normal',
              }}>
                {selectedNode.status === 'reconstructed' ? `*${selectedNode.name}` : selectedNode.name}
              </span>
            </div>

            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap',
              fontSize: '0.75rem', color: 'var(--text-on-dark-muted)',
              fontFamily: 'var(--font-body)', marginBottom: '0.5rem',
            }}>
              {selectedNode.period && <span>{selectedNode.period}</span>}
              {selectedNode.region && <span>&middot; {selectedNode.region}</span>}
              {selectedNode.speakers && <span>&middot; {selectedNode.speakers}</span>}
            </div>

            {selectedNode.note && (
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--text-on-dark-secondary)',
                fontFamily: 'var(--font-body)',
                lineHeight: 1.5,
                maxWidth: '60ch',
              }}>
                {selectedNode.note}
              </p>
            )}
          </div>

          <button
            onClick={() => setSelectedNode(null)}
            style={{
              background: 'none',
              border: '1px solid rgba(139, 115, 85, 0.3)',
              borderRadius: 6,
              color: 'var(--text-on-dark-muted)',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              fontSize: '0.7rem',
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
