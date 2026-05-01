'use client'

import { Handle, Position, NodeProps } from '@xyflow/react'
import { DistributionNodeData } from '@/data/distribution-relationships'

type NodeData = DistributionNodeData & { highlighted?: boolean }

export function DistributionNodeComponent({ data, selected }: NodeProps) {
  const d = data as NodeData
  const isHighlighted = d.highlighted || selected

  return (
    <div
      className={[
        'bg-white rounded-lg px-3 py-2 min-w-[148px] max-w-[180px] cursor-pointer select-none',
        'border transition-all duration-150',
        isHighlighted
          ? 'border-blue-500 shadow-md shadow-blue-100'
          : 'border-gray-200 hover:border-gray-400',
      ].join(' ')}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!w-2 !h-2 !border !border-gray-300 !bg-gray-100"
      />

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-gray-900 leading-tight truncate">
            {d.name}
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-0.5 truncate">
            {d.notation}
          </div>
        </div>
        <span
          className={[
            'text-[9px] px-1 py-0.5 rounded shrink-0 mt-0.5 font-medium uppercase tracking-wide',
            d.type === 'continuous'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-gray-100 text-gray-500',
          ].join(' ')}
        >
          {d.type === 'continuous' ? 'cont' : 'disc'}
        </span>
      </div>

      {!d.slug && (
        <div className="text-[9px] text-gray-300 mt-1">no page yet</div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        className="!w-2 !h-2 !border !border-gray-300 !bg-gray-100"
      />
    </div>
  )
}
