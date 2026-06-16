// Branded image fallback.
// Hot-linked stock photos can 404 or be unavailable offline. Rather than show a
// broken-image icon, we swap in a generated, on-brand SVG (gradient + bowl glyph
// + dish name) so the layout always looks intentional.

const PALETTES: [string, string][] = [
  ['#FE5D26', '#F2C078'],
  ['#7EBC89', '#C1DBB3'],
  ['#F2C078', '#FE5D26'],
  ['#C1DBB3', '#7EBC89'],
]

function hash(seed: string): number {
  let h = 0
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h
}

export function fallbackImage(seed: string): string {
  const [a, b] = PALETTES[hash(seed) % PALETTES.length]
  const label = seed.length > 24 ? seed.slice(0, 22) + '…' : seed
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='450' viewBox='0 0 600 450'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/>
    </linearGradient></defs>
    <rect width='600' height='450' fill='url(#g)'/>
    <g transform='translate(300 195)' opacity='0.92'>
      <path d='M-70 0 H70 a70 70 0 0 1 -140 0 Z' fill='#ffffff' opacity='0.85'/>
      <path d='M-70 0 H70' stroke='#ffffff' stroke-width='6' stroke-linecap='round'/>
      <path d='M-14 -22 q10 -14 0 -28' fill='none' stroke='#ffffff' stroke-width='6' stroke-linecap='round' opacity='0.8'/>
      <path d='M16 -22 q10 -14 0 -28' fill='none' stroke='#ffffff' stroke-width='6' stroke-linecap='round' opacity='0.8'/>
    </g>
    <text x='300' y='350' text-anchor='middle' font-family='Georgia, serif' font-size='30' font-weight='600' fill='#ffffff'>${label}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// Convenience onError handler for <img>. Replaces the source once, then detaches
// so a failing fallback can't loop.
import type { SyntheticEvent } from 'react'

export function onImgError(seed: string) {
  return (e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget
    el.onerror = null
    el.src = fallbackImage(seed)
  }
}
