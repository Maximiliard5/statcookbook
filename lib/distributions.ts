import { distributionNodes, relationshipEdges } from '@/data/distribution-relationships'
import type { DistributionContent } from '@/types/distribution-content'
import type { DistributionNodeData, RelationshipEdgeData } from '@/data/distribution-relationships'

export const CONTENT_SLUGS: readonly string[] = [
  'normal',
  'binomial',
  'poisson',
  'exponential',
  'beta',
]

export async function getDistributionContent(slug: string): Promise<DistributionContent | null> {
  if (!CONTENT_SLUGS.includes(slug)) return null
  try {
    const mod = await import(`@/data/distributions/${slug}`)
    return mod.default as DistributionContent
  } catch {
    return null
  }
}

export function getDistributionNode(slug: string): DistributionNodeData | undefined {
  return distributionNodes.find(d => d.slug === slug)
}

export type RelatedDistribution = {
  node: DistributionNodeData
  edge: RelationshipEdgeData
  direction: 'outgoing' | 'incoming'
}

export function getRelatedDistributions(slug: string): RelatedDistribution[] {
  const node = getDistributionNode(slug)
  if (!node) return []
  return relationshipEdges
    .filter(e => e.source === node.id || e.target === node.id)
    .map(e => {
      const direction = e.source === node.id ? 'outgoing' : 'incoming'
      const relatedId = direction === 'outgoing' ? e.target : e.source
      const relatedNode = distributionNodes.find(d => d.id === relatedId)
      return relatedNode ? { node: relatedNode, edge: e, direction } : null
    })
    .filter((x): x is RelatedDistribution => x !== null)
}
