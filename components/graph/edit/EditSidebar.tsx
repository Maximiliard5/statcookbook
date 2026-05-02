'use client'

import { useState } from 'react'
import { Node, Edge } from '@xyflow/react'
import { DistributionNodeData, RelationshipType, PropertyCode } from '@/data/distribution-relationships'
import { KatexSpan } from '@/components/KatexSpan'

type NodeMetaPatch = Partial<Pick<DistributionNodeData, 'name' | 'notation' | 'type' | 'group' | 'slug' | 'properties'>>
type EdgeMetaPatch = { type?: RelationshipType; label?: string }

type Props = {
  selectedNode: Node | null
  selectedEdge: Edge | null
  onNodeMetaChange: (id: string, patch: NodeMetaPatch) => void
  onEdgeMetaChange: (id: string, patch: EdgeMetaPatch) => void
  onDeleteNode: (id: string) => void
  onDeleteEdge: (id: string) => void
}

const EDGE_TYPES: RelationshipType[] = ['special-case', 'limiting', 'transformation', 'bayesian']

const ALL_PROPERTIES: { code: PropertyCode; desc: string }[] = [
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

export function EditSidebar({ selectedNode, selectedEdge, onNodeMetaChange, onEdgeMetaChange, onDeleteNode, onDeleteEdge }: Props) {
  if (!selectedNode && !selectedEdge) {
    return (
      <div className="absolute top-4 right-4 w-56 bg-white border border-gray-200 rounded-xl shadow-sm p-4 z-10 pointer-events-none">
        <p className="text-xs text-gray-400">Click a node or edge to edit it</p>
        <p className="text-[10px] text-gray-300 mt-1">Drag from a node handle to create an edge</p>
      </div>
    )
  }

  if (selectedNode) {
    const d = selectedNode.data as DistributionNodeData
    return (
      <div className="absolute top-4 right-4 w-64 bg-white border border-amber-200 rounded-xl shadow-sm p-4 z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-700">Node</span>
          <button
            onClick={() => onDeleteNode(selectedNode.id)}
            className="text-[10px] text-red-500 hover:text-red-700 font-medium"
          >
            Delete
          </button>
        </div>
        <p className="text-[10px] text-gray-400 font-mono -mt-2">{d.id}</p>

        <Field label="Name">
          <input
            key={selectedNode.id + '-name'}
            defaultValue={d.name}
            onBlur={e => onNodeMetaChange(selectedNode.id, { name: e.target.value })}
            className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
          />
        </Field>

        <Field label="Notation (LaTeX)">
          <KatexField
            key={selectedNode.id + '-notation'}
            initialValue={d.notation}
            onBlur={val => onNodeMetaChange(selectedNode.id, { notation: val })}
          />
        </Field>

        <Field label="Type">
          <div className="flex gap-3">
            {(['continuous', 'discrete'] as const).map(t => (
              <label key={t} className="flex items-center gap-1.5 text-xs cursor-pointer">
                <input
                  type="radio"
                  name={`type-${selectedNode.id}`}
                  value={t}
                  defaultChecked={d.type === t}
                  onChange={() => onNodeMetaChange(selectedNode.id, { type: t })}
                />
                {t}
              </label>
            ))}
          </div>
        </Field>

        <Field label="Group">
          <input
            key={selectedNode.id + '-group'}
            defaultValue={d.group}
            onBlur={e => onNodeMetaChange(selectedNode.id, { group: e.target.value })}
            className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400 font-mono"
          />
        </Field>

        <Field label="Slug (page URL)">
          <input
            key={selectedNode.id + '-slug'}
            defaultValue={d.slug ?? ''}
            placeholder="null = no page"
            onBlur={e => onNodeMetaChange(selectedNode.id, { slug: e.target.value.trim() || null })}
            className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400 font-mono"
          />
        </Field>

        <Field label="Properties">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1">
            {ALL_PROPERTIES.map(({ code, desc }) => {
              const checked = (d.properties ?? []).includes(code)
              return (
                <label key={code} className="flex items-center gap-1.5 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={ev => {
                      const current = d.properties ?? []
                      const next = ev.target.checked
                        ? [...current, code]
                        : current.filter(c => c !== code)
                      onNodeMetaChange(selectedNode.id, { properties: next as PropertyCode[] })
                    }}
                  />
                  <span className="font-mono font-bold text-gray-500 text-[10px]">{code}</span>
                  <span className="text-gray-400 text-[10px]">{desc}</span>
                </label>
              )
            })}
          </div>
        </Field>
      </div>
    )
  }

  const e = selectedEdge!
  return (
    <div className="absolute top-4 right-4 w-64 bg-white border border-amber-200 rounded-xl shadow-sm p-4 z-10 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-700">Edge</span>
        <button
          onClick={() => onDeleteEdge(e.id)}
          className="text-[10px] text-red-500 hover:text-red-700 font-medium"
        >
          Delete
        </button>
      </div>
      <p className="text-[10px] text-gray-400 -mt-2">{e.source} → {e.target}</p>

      <Field label="Relationship Type">
        <select
          value={e.type as string}
          onChange={ev => onEdgeMetaChange(e.id, { type: ev.target.value as RelationshipType })}
          className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
        >
          {EDGE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>

      <Field label="Label (LaTeX)">
        <KatexField
          key={e.id + '-label'}
          initialValue={String(e.label ?? '')}
          onBlur={val => onEdgeMetaChange(e.id, { label: val })}
        />
      </Field>
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

function KatexField({ initialValue, onBlur }: { initialValue: string; onBlur: (val: string) => void }) {
  const [value, setValue] = useState(initialValue)
  return (
    <div className="flex flex-col gap-1">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onBlur={() => onBlur(value)}
        placeholder="plain text or \LaTeX{} code"
        className="w-full text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-blue-400 font-mono"
      />
      {value && (
        <div className="px-2 py-1 bg-gray-50 border border-gray-100 rounded min-h-[22px] flex items-center">
          <KatexSpan src={value} className="text-[11px]" />
        </div>
      )}
    </div>
  )
}
