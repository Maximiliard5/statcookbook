import { KatexBlock } from './KatexBlock'
import { KatexSpan } from '@/components/KatexSpan'

type DensityProps = {
  kind: 'pmf' | 'pdf'
  latex: string
  support: string
}

type Props = {
  density: DensityProps
}

export function DensityFormula({ density }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 px-6 py-5">
      <p className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
        {density.kind === 'pmf' ? 'Probability Mass Function' : 'Probability Density Function'}
      </p>
      <div className="overflow-x-auto">
        <KatexBlock src={density.latex} />
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
        Support:{' '}
        <KatexSpan src={density.support} />
      </p>
    </div>
  )
}
