'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { distributionNodes } from '@/data/distribution-relationships'
import { CONTENT_SLUGS } from '@/lib/distributions'
import { ThemeToggle } from '@/components/ThemeToggle'

const NOTES_KEY = 'dev-distribution-notes'

type FilterMode = 'all' | 'implemented' | 'pending'

function loadNotes(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY) ?? '{}')
  } catch {
    return {}
  }
}

function saveNotes(notes: Record<string, string>) {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes))
}

export default function DevTrackerPage() {
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [filter, setFilter] = useState<FilterMode>('all')
  const [search, setSearch] = useState('')
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setNotes(loadNotes())
    setHydrated(true)
  }, [])

  const updateNote = useCallback((id: string, value: string) => {
    setNotes(prev => {
      const next = { ...prev, [id]: value }
      saveNotes(next)
      return next
    })
  }, [])

  const implementedSet = new Set(CONTENT_SLUGS)
  const implementedCount = distributionNodes.filter(n => n.slug && implementedSet.has(n.slug)).length

  const filtered = distributionNodes.filter(node => {
    const isImplemented = node.slug != null && implementedSet.has(node.slug)
    if (filter === 'implemented' && !isImplemented) return false
    if (filter === 'pending' && isImplemented) return false
    if (search) {
      const q = search.toLowerCase()
      return node.name.toLowerCase().includes(q) || node.id.includes(q)
    }
    return true
  })

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <header className="border-b border-gray-100 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            The Hall of Statistics
          </h1>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
            Developer tracker — {implementedCount} of {distributionNodes.length} distributions implemented
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/distributions/relationships"
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Relationship graph →
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Controls */}
      <div className="border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex flex-wrap items-center gap-4">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search distributions…"
          className="pl-3 pr-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-500 rounded-md w-52 focus:outline-none focus:border-blue-400"
        />
        <div className="flex items-center gap-1 text-sm">
          {(['all', 'implemented', 'pending'] as FilterMode[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                'px-3 py-1 rounded-md border transition-colors duration-100 capitalize',
                filter === f
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500',
              ].join(' ')}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">
          Notes are saved in your browser
        </span>
      </div>

      {/* Distribution list */}
      <div className="max-w-4xl mx-auto px-6 py-6 space-y-2">
        {filtered.map(node => {
          const isImplemented = node.slug != null && implementedSet.has(node.slug)
          return (
            <div
              key={node.id}
              className="border border-gray-100 dark:border-gray-800 rounded-lg px-4 py-3 bg-white dark:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                {/* Status dot */}
                <span
                  className={[
                    'w-2 h-2 rounded-full shrink-0',
                    isImplemented ? 'bg-green-400' : 'bg-gray-300 dark:bg-gray-600',
                  ].join(' ')}
                />

                {/* Name + type */}
                <div className="flex items-center gap-2 min-w-0">
                  {isImplemented && node.slug ? (
                    <Link
                      href={`/distributions/${node.slug}`}
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {node.name}
                    </Link>
                  ) : (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {node.name}
                    </span>
                  )}
                  <span
                    className={[
                      'text-[10px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide shrink-0',
                      node.type === 'continuous'
                        ? 'bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500',
                    ].join(' ')}
                  >
                    {node.type === 'continuous' ? 'cont' : 'disc'}
                  </span>
                </div>

                {/* Slug label */}
                <span className="text-xs text-gray-300 dark:text-gray-600 font-mono ml-auto shrink-0">
                  {node.slug ?? '—'}
                </span>
              </div>

              {/* Notes */}
              {hydrated && (
                <textarea
                  value={notes[node.id] ?? ''}
                  onChange={e => updateNote(node.id, e.target.value)}
                  placeholder="Add a note…"
                  rows={1}
                  className="mt-2 w-full text-xs text-gray-600 dark:text-gray-400 bg-transparent placeholder-gray-300 dark:placeholder-gray-700 resize-none focus:outline-none border-none p-0 leading-relaxed"
                  style={{ minHeight: '1.5rem' }}
                  onInput={e => {
                    const t = e.currentTarget
                    t.style.height = 'auto'
                    t.style.height = t.scrollHeight + 'px'
                  }}
                />
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 dark:text-gray-500 py-8 text-center">
            No distributions match your filter.
          </p>
        )}
      </div>
    </div>
  )
}
