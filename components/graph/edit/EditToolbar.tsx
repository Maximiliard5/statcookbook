'use client'

import { Panel } from '@xyflow/react'

type Props = {
  isEditMode: boolean
  isReady: boolean
  onToggle: () => void
  onAddNode: () => void
  onExport: () => void
}

export function EditToolbar({ isEditMode, isReady, onToggle, onAddNode, onExport }: Props) {
  return (
    <Panel position="top-left" className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggle}
          className={[
            'px-3 py-1.5 text-xs font-medium rounded-md border transition-colors',
            isEditMode
              ? 'bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100'
              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50',
          ].join(' ')}
        >
          {isEditMode ? '✏ Exit Edit' : '✏ Edit Mode'}
        </button>

        {isEditMode && (
          <>
            <button
              onClick={onAddNode}
              className="px-3 py-1.5 text-xs font-medium rounded-md border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              + Node
            </button>
            <button
              onClick={onExport}
              disabled={!isReady}
              className="px-3 py-1.5 text-xs font-medium rounded-md border bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition-colors disabled:opacity-40"
            >
              Export Data
            </button>
          </>
        )}
      </div>

      {isEditMode && (
        <div className="px-2 py-1 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-700 font-medium">
          EDIT MODE — drag handles to connect nodes, Delete key removes selection
        </div>
      )}
    </Panel>
  )
}
