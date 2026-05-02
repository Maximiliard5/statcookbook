'use client'

import React from 'react'
import { Handle, Position, NodeProps } from '@xyflow/react'
import { DistributionNodeData } from '@/data/distribution-relationships'
import { KatexSpan } from '@/components/KatexSpan'

type NodeData = DistributionNodeData & { highlighted?: boolean; isEditMode?: boolean }

const POSITIONS = [
  { id: 'l', pos: Position.Left },
  { id: 'r', pos: Position.Right },
  { id: 't', pos: Position.Top },
  { id: 'b', pos: Position.Bottom },
] as const

export function DistributionNodeComponent({ data, selected }: NodeProps) {
  const d = data as NodeData
  const isHighlighted = d.highlighted || selected
  const isEditMode = d.isEditMode ?? false

  const handleClass = isEditMode
    ? '!w-3 !h-3 !border-2 !border-blue-400 !bg-blue-100 !rounded-full !z-10'
    : '!w-2 !h-2 !border-0 !bg-transparent !opacity-0 !pointer-events-none'

  return (
    <div
      className={[
        'bg-white dark:bg-gray-900 rounded-lg px-3 py-2 cursor-pointer select-none',
        'border transition-all duration-150',
        isHighlighted
          ? 'border-blue-500 shadow-md shadow-blue-100 dark:shadow-blue-900'
          : 'border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500',
      ].join(' ')}
    >
      {/* All 4 positions × 2 types = 8 handles. Invisible in view mode, blue in edit mode. */}
      {POSITIONS.map(({ id, pos }) => (
        <React.Fragment key={id}>
          <Handle id={`${id}-t`} type="target" position={pos} className={handleClass} />
          <Handle id={`${id}-s`} type="source" position={pos} className={handleClass} />
        </React.Fragment>
      ))}

      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[12px] font-semibold text-gray-900 dark:text-gray-100 leading-tight whitespace-nowrap">
            {d.name}
          </div>
          <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 whitespace-nowrap">
            <KatexSpan src={d.notation} />
          </div>
        </div>
        <div className="flex flex-col items-end gap-0.5 shrink-0">
          <span
            className={[
              'text-[9px] px-1 py-0.5 rounded font-medium uppercase tracking-wide',
              d.type === 'continuous'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-gray-100 text-gray-500',
            ].join(' ')}
          >
            {d.type === 'continuous' ? 'cont' : 'disc'}
          </span>
          {d.properties && d.properties.length > 0 && (
            <div className="flex gap-0.5 flex-wrap justify-end">
              {d.properties.map(p => (
                <span key={p} className="text-[8px] font-mono font-bold text-gray-400 leading-none">
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {!d.slug && (
        <div className="text-[9px] text-gray-300 dark:text-gray-600 mt-1 whitespace-nowrap">no page yet</div>
      )}
    </div>
  )
}
