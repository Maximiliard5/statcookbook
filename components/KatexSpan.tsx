'use client'

import katex from 'katex'

type Props = {
  src: string
  className?: string
}

export function KatexSpan({ src, className }: Props) {
  let html: string
  try {
    html = katex.renderToString(src, {
      throwOnError: false,
      output: 'html',
      displayMode: false,
    })
  } catch {
    html = src
  }
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
}
