'use client'

import katex from 'katex'

type Props = {
  src: string
  className?: string
}

export function KatexBlock({ src, className }: Props) {
  let html: string
  try {
    html = katex.renderToString(src, {
      throwOnError: false,
      output: 'html',
      displayMode: true,
    })
  } catch {
    html = src
  }
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
