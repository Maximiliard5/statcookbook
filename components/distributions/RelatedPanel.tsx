import Link from 'next/link'
import { KatexSpan } from '@/components/KatexSpan'
import type { RelatedDistribution } from '@/lib/distributions'

const RELATIONSHIP_LABELS: Record<string, string> = {
  'special-case': 'Special cases',
  'limiting': 'Limiting distributions',
  'transformation': 'Transformations',
  'bayesian': 'Bayesian relationships',
}

type Props = {
  related: RelatedDistribution[]
}

export function RelatedPanel({ related }: Props) {
  if (related.length === 0) return null

  const grouped = related.reduce<Record<string, RelatedDistribution[]>>((acc, r) => {
    const key = r.edge.relationshipType
    ;(acc[key] ??= []).push(r)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
        Related distributions
      </h2>
      {Object.entries(grouped).map(([type, items]) => (
        <div key={type}>
          <h3 className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-2">
            {RELATIONSHIP_LABELS[type] ?? type}
          </h3>
          <ul className="space-y-2">
            {items.map(({ node, edge }) => (
              <li key={node.id}>
                <div className="text-sm">
                  {node.slug ? (
                    <Link
                      href={`/distributions/${node.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {node.name}
                    </Link>
                  ) : (
                    <span className="text-gray-500 dark:text-gray-500">{node.name}</span>
                  )}
                </div>
                {edge.label && (
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                    <KatexSpan src={edge.label} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
