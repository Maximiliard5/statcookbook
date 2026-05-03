'use client'

import { useState } from 'react'
import type { DerivationStep } from '@/types/distribution-content'
import { KatexBlock } from './KatexBlock'

type Props = {
  steps: DerivationStep[]
}

export function DerivationAccordion({ steps }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 text-xs text-blue-500 dark:text-blue-400 hover:underline mt-1"
        aria-expanded={open}
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="currentColor"
          className={`transition-transform duration-150 ${open ? 'rotate-90' : ''}`}
        >
          <path d="M3 2l4 3-4 3V2z" />
        </svg>
        {open ? 'Hide derivation' : 'Show derivation'}
      </button>

      {open && (
        <ol className="mt-3 space-y-5 border-l-2 border-gray-100 dark:border-gray-800 pl-4">
          {steps.map((step, i) => (
            <li key={i}>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {i + 1}. {step.description}
              </p>
              <div className="overflow-x-auto">
                <KatexBlock src={step.latex} />
              </div>
              {step.justification && (
                <p className="text-xs text-gray-400 dark:text-gray-500 italic mt-1">
                  {step.justification}
                </p>
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
