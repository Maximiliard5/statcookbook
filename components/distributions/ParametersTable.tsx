import { KatexSpan } from '@/components/KatexSpan'
import type { DistributionParameter } from '@/types/distribution-content'

type Props = {
  parameters: DistributionParameter[]
}

export function ParametersTable({ parameters }: Props) {
  return (
    <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden">
      {parameters.map(param => (
        <div
          key={param.symbol}
          className="grid grid-cols-[auto_auto_1fr] gap-x-6 items-baseline px-4 py-3 bg-white dark:bg-gray-900"
        >
          <span className="font-mono text-sm">
            <KatexSpan src={param.symbol} />
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            <KatexSpan src={param.range} />
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {param.description}
          </span>
        </div>
      ))}
    </div>
  )
}
