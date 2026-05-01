'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { GraphLegend } from '@/components/graph/GraphLegend'
import { distributionNodes, relationshipEdges } from '@/data/distribution-relationships'

const DistributionGraph = dynamic(
  () => import('@/components/graph/DistributionGraph').then(m => m.DistributionGraph),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full text-gray-400 text-sm">
        Loading graph…
      </div>
    ),
  }
)

type TypeFilter = 'all' | 'discrete' | 'continuous'

const nodeCount = distributionNodes.length
const edgeCount = relationshipEdges.length

export default function RelationshipsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-100 px-6 py-4">
        <h1 className="text-xl font-semibold text-gray-900 tracking-tight">
          Univariate Distribution Relationships
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          {nodeCount} distributions · {edgeCount} relationships ·{' '}
          <span className="italic">
            Interactive version of{' '}
            <a
              href="https://doi.org/10.1198/000313008X270448"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Leemis &amp; McQueston (2008)
            </a>
          </span>
        </p>
      </div>

      {/* Controls */}
      <div className="border-b border-gray-100 px-6 py-2.5 flex flex-wrap items-center gap-4">
        {/* Search */}
        <div className="relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter distributions…"
            className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md w-52 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 placeholder-gray-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Type filter */}
        <div className="flex items-center gap-1 text-sm">
          {(['all', 'continuous', 'discrete'] as TypeFilter[]).map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={[
                'px-3 py-1 rounded-md border transition-colors duration-100 capitalize',
                typeFilter === f
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Instructions hint */}
        <p className="text-[11px] text-gray-400 ml-auto hidden sm:block">
          Hover a node to highlight its connections · Click to open its page
        </p>
      </div>

      {/* Legend */}
      <div className="border-b border-gray-100 px-6 py-2">
        <GraphLegend />
      </div>

      {/* Graph canvas — takes remaining height */}
      <div className="flex-1 min-h-0">
        <DistributionGraph searchQuery={searchQuery} typeFilter={typeFilter} />
      </div>
    </div>
  )
}
