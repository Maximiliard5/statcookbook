'use client'

import { useState } from 'react'

type Tab = 'relationships' | 'positions'

type Props = {
  relationshipsTs: string
  positionsTs: string
  onClose: () => void
}

export function ExportModal({ relationshipsTs, positionsTs, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('relationships')
  const [copied, setCopied] = useState(false)

  const content = tab === 'relationships' ? relationshipsTs : positionsTs
  const filename = tab === 'relationships' ? 'distribution-relationships.ts' : 'distribution-positions.ts'

  function handleCopy() {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleTabChange(t: Tab) {
    setTab(t)
    setCopied(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col" style={{ width: 720, maxHeight: '80vh' }}>
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-800">Export Data</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none px-1">
            ×
          </button>
        </div>

        <div className="px-5 py-2 border-b border-gray-100 flex gap-1">
          {(['relationships', 'positions'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => handleTabChange(t)}
              className={[
                'px-3 py-1 text-xs rounded font-medium transition-colors font-mono',
                tab === t ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-gray-600',
              ].join(' ')}
            >
              {t === 'relationships' ? 'distribution-relationships.ts' : 'distribution-positions.ts'}
            </button>
          ))}
        </div>

        <div className="px-5 py-2 text-[11px] text-gray-500 border-b border-gray-100">
          Paste into <code className="font-mono bg-gray-50 px-1 py-0.5 rounded border border-gray-100">data/{filename}</code>
          {tab === 'positions' && (
            <span className="ml-2 text-blue-500">→ once pasted, layout is preserved across reloads (Dagre skipped)</span>
          )}
        </div>

        <textarea
          readOnly
          value={content}
          className="flex-1 font-mono text-[11px] p-4 resize-none focus:outline-none text-gray-700 bg-gray-50 min-h-0 overflow-auto"
          style={{ minHeight: 0 }}
        />

        <div className="flex justify-end px-5 py-3 border-t border-gray-100">
          <button
            onClick={handleCopy}
            className={[
              'px-4 py-1.5 text-xs rounded-md font-medium transition-colors',
              copied ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-800 text-white hover:bg-gray-700',
            ].join(' ')}
          >
            {copied ? '✓ Copied!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
    </div>
  )
}
