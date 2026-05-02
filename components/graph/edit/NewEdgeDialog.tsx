'use client'

import { useState } from 'react'
import { Connection } from '@xyflow/react'
import { RelationshipType } from '@/data/distribution-relationships'

type Props = {
  connection: Connection
  sourceLabel: string
  targetLabel: string
  onConfirm: (type: RelationshipType, label: string, property?: string) => void
  onCancel: () => void
}

const EDGE_TYPES: { value: RelationshipType; label: string }[] = [
  { value: 'special-case', label: 'Special Case' },
  { value: 'limiting', label: 'Limiting' },
  { value: 'transformation', label: 'Transformation' },
  { value: 'bayesian', label: 'Bayesian' },
]

export function NewEdgeDialog({ connection: _conn, sourceLabel, targetLabel, onConfirm, onCancel }: Props) {
  const [type, setType] = useState<RelationshipType>('special-case')
  const [label, setLabel] = useState('')
  const [property, setProperty] = useState('')

  function handleConfirm() {
    if (label.trim()) {
      onConfirm(type, label.trim(), property.trim() || undefined)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-80 flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">New Edge</h3>
          <p className="text-xs text-gray-400 mt-0.5 font-mono">{sourceLabel} → {targetLabel}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Field label="Relationship Type">
            <select
              value={type}
              onChange={e => setType(e.target.value as RelationshipType)}
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
            >
              {EDGE_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </Field>

          <Field label="Label (required)">
            <input
              value={label}
              onChange={e => setLabel(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleConfirm() }}
              placeholder="e.g. α=1, n→∞, sum of n"
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
              autoFocus
            />
          </Field>

          <Field label="Property (optional)">
            <input
              value={property}
              onChange={e => setProperty(e.target.value)}
              placeholder="C, V, I, F, or leave blank"
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 font-mono"
            />
          </Field>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!label.trim()}
            className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-40"
          >
            Add Edge
          </button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{label}</span>
      {children}
    </div>
  )
}
