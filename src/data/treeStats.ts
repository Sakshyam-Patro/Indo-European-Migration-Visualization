import { languageTree } from './languageTree'
import type { LanguageNode } from './languageTree'

export interface TreeStats {
  /** Every node in the tree, including internal branch nodes. */
  total: number
  /** Leaf nodes marked as living or revived — the "languages you can hear today". */
  livingLeaves: number
  extinct: number
  reconstructed: number
  revived: number
  /** Depth of the deepest branch, counting the root as level 1. */
  maxDepth: number
}

/**
 * Counts the tree at runtime rather than hardcoding totals in prose.
 *
 * Earlier copy claimed the tree charted "445+ living languages" while the data
 * held a fraction of that. Deriving the numbers means the text cannot drift
 * from the dataset again.
 */
export function computeTreeStats(root: LanguageNode = languageTree): TreeStats {
  const stats: TreeStats = {
    total: 0,
    livingLeaves: 0,
    extinct: 0,
    reconstructed: 0,
    revived: 0,
    maxDepth: 0,
  }

  const walk = (node: LanguageNode, depth: number) => {
    stats.total += 1
    stats.maxDepth = Math.max(stats.maxDepth, depth)

    const isLeaf = !node.children || node.children.length === 0
    if (node.status === 'extinct') stats.extinct += 1
    if (node.status === 'reconstructed') stats.reconstructed += 1
    if (node.status === 'revived') stats.revived += 1
    if (isLeaf && (node.status === 'living' || node.status === 'revived')) {
      stats.livingLeaves += 1
    }

    node.children?.forEach(child => walk(child, depth + 1))
  }

  walk(root, 1)
  return stats
}

export const treeStats = computeTreeStats()
