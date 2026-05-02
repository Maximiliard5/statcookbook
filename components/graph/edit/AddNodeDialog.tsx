'use client'

import { useState } from 'react'
import { DistributionNodeData } from '@/data/distribution-relationships'

type Props = {
  onConfirm: (data: DistributionNodeData) => void
  onCancel: () => void
}

export function AddNodeDialog({ onConfirm, onCancel }: Props) {
  const [name, setName] = useState('')
  const [notation, setNotation] = useState('')
  const [type, setType] = useState<'discrete' | 'continuous'>('continuous')
  const [group, setGroup] = useState('misc-continuous')
  const [slug, setSlug] = useState('')

  const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  function handleConfirm() {
    if (name.trim() && notation.trim() && id) {
      onConfirm({
        id,
        name: name.trim(),
        notation: notation.trim(),
        type,
        group,
        slug: slug.trim() || null,
      })
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 w-80 flex flex-col gap-4">
        <h3 className="text-sm font-semibold text-gray-800">Add Distribution Node</h3>

        <div className="flex flex-col gap-3">
          <Field label="Name">
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Beta-Binomial"
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400"
              autoFocus
            />
            {id && (
              <span className="text-[10px] text-gray-400 mt-0.5 font-mono">id: {id}</span>
            )}
          </Field>

          <Field label="Notation">
            <input
              value={notation}
              onChange={e => setNotation(e.target.value)}
              placeholder="e.g. BetaBin(n, α, β)"
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 font-mono"
            />
          </Field>

          <Field label="Type">
            <div className="flex gap-3">
              {(['continuous', 'discrete'] as const).map(t => (
                <label key={t} className="flex items-center gap-1.5 text-xs cursor-pointer">
                  <input
                    type="radio"
                    name="add-node-type"
                    value={t}
                    checked={type === t}
                    onChange={() => {
                      setType(t)
                      setGroup(t === 'continuous' ? 'misc-continuous' : 'misc-discrete')
                    }}
                  />
                  {t}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Group">
            <input
              value={group}
              onChange={e => setGroup(e.target.value)}
              placeholder="e.g. gamma-family"
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 font-mono"
            />
          </Field>

          <Field label="Slug (page URL, optional)">
            <input
              value={slug}
              onChange={e => setSlug(e.target.value)}
              placeholder="leave blank for no page"
              className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 focus:outline-none focus:border-blue-400 font-mono"
            />
          </Field>
        </div>

        <div className="flex gap-2 justify-end">
          <button onClick={onCancel} className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium">
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!name.trim() || !notation.trim()}
            className="px-4 py-1.5 text-xs bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 disabled:opacity-40"
          >
            Add Node
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
