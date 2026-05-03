import { PropertyCard } from './PropertyCard'
import type { DistributionProperty } from '@/types/distribution-content'

type Props = {
  properties: DistributionProperty[]
}

export function PropertiesSection({ properties }: Props) {
  return (
    <div className="border border-gray-100 dark:border-gray-800 rounded-lg px-4">
      {properties.map(property => (
        <PropertyCard key={property.name} property={property} />
      ))}
    </div>
  )
}
