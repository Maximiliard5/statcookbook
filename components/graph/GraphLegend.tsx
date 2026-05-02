'use client'

const EDGE_TYPES = [
  { label: 'Special case',   stroke: '#374151', dash: undefined },
  { label: 'Transformation', stroke: '#0d9488', dash: '2 4' },
  { label: 'Limiting',       stroke: '#2563eb', dash: '6 4' },
  { label: 'Bayesian',       stroke: '#7c3aed', dash: '8 3 2 3' },
]

const PROPERTIES = [
  { code: 'C', desc: 'Convolution' },
  { code: 'F', desc: 'Forgetfulness' },
  { code: 'I', desc: 'Inverse' },
  { code: 'L', desc: 'Linear combination' },
  { code: 'M', desc: 'Minimum' },
  { code: 'P', desc: 'Product' },
  { code: 'R', desc: 'Residual' },
  { code: 'S', desc: 'Scaling' },
  { code: 'V', desc: 'Variate generation' },
  { code: 'X', desc: 'Maximum' },
]

export function GraphLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px] text-gray-600">
      {/* Relationship types */}
      {EDGE_TYPES.map(({ label, stroke, dash }) => (
        <div key={label} className="flex items-center gap-1.5">
          <svg width="28" height="10" aria-hidden>
            <line x1="0" y1="5" x2="20" y2="5" stroke={stroke} strokeWidth="1.5" strokeDasharray={dash} />
            <polygon points="20,2 28,5 20,8" fill={stroke} />
          </svg>
          <span>{label}</span>
        </div>
      ))}

      {/* Divider */}
      <span className="w-px h-4 bg-gray-200 mx-0.5" aria-hidden />

      {/* Property codes — node properties */}
      <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Node properties:</span>
      {PROPERTIES.map(({ code, desc }) => (
        <div key={code} className="flex items-center gap-1">
          <code className="font-mono text-[9px] font-bold text-gray-400">{code}</code>
          <span className="text-gray-500">{desc}</span>
        </div>
      ))}

      {/* Node types */}
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
