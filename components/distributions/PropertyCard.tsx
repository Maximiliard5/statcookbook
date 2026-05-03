import { KatexSpan } from '@/components/KatexSpan'
import { DerivationAccordion } from './DerivationAccordion'
import type { DistributionProperty } from '@/types/distribution-content'

type Props = {
  property: DistributionProperty
}

export function PropertyCard({ property }: Props) {
  return (
    <div className="py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 shrink-0 min-w-32">
          {property.name}
        </span>
        <span className="text-sm font-mono overflow-x-auto">
          <KatexSpan src={property.latex} />
        </span>
      </div>
      {property.derivation && property.derivation.length > 0 && (
        <DerivationAccordion steps={property.derivation} />
      )}
    </div>
  )
}
