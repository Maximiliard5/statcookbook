'use client'

export function GraphLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-gray-600">
      <div className="flex items-center gap-1.5">
        <svg width="28" height="10" aria-hidden>
          <line x1="0" y1="5" x2="20" y2="5" stroke="#374151" strokeWidth="1.5" />
          <polygon points="20,2 28,5 20,8" fill="#374151" />
        </svg>
        <span>Special case</span>
      </div>

      <div className="flex items-center gap-1.5">
        <svg width="28" height="10" aria-hidden>
          <line x1="0" y1="5" x2="20" y2="5" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5 3" />
          <polygon points="20,2 28,5 20,8" fill="#2563eb" />
        </svg>
        <span>Limiting</span>
      </div>

      <div className="flex items-center gap-1.5">
        <svg width="28" height="10" aria-hidden>
          <line x1="0" y1="5" x2="20" y2="5" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 3" />
          <polygon points="20,2 28,5 20,8" fill="#0d9488" />
        </svg>
        <span>Transformation</span>
      </div>

      <div className="flex items-center gap-1.5">
        <svg width="28" height="10" aria-hidden>
          <line x1="0" y1="5" x2="20" y2="5" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="7 2 2 2" />
          <polygon points="20,2 28,5 20,8" fill="#7c3aed" />
        </svg>
        <span>Bayesian</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-blue-50 border border-blue-200" />
          <span>Continuous</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-gray-100 border border-gray-300" />
          <span>Discrete</span>
        </div>
      </div>
    </div>
  )
}
