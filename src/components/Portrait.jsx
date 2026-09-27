import { useEffect, useState } from 'react'

// Dark → bright character ramp (dense characters glow brightest on a dark terminal)
const RAMP = ' .\'`^",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$'
const COLS = 64
const CHAR_ASPECT = 0.6 // monospace glyph width relative to line height
const BG_TOLERANCE = 30 // how close (RGB distance) a pixel must be to the backdrop to be blanked

// Converts the photo to ASCII art in the browser, so swapping the photo updates it automatically.
function toAscii(img) {
  const rows = Math.round(COLS * CHAR_ASPECT * (img.height / img.width))
  const canvas = document.createElement('canvas')
  canvas.width = COLS
  canvas.height = rows
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(img, 0, 0, COLS, rows)
  const { data } = ctx.getImageData(0, 0, COLS, rows)
  const px = (x, y) => {
    const i = (y * COLS + x) * 4
    return [data[i], data[i + 1], data[i + 2]]
  }
  const lum = ([r, g, b]) => 0.299 * r + 0.587 * g + 0.114 * b

  // Background removal, three layers:
  // 1. backdrop-coloured cells (interpolated from each row's edge pixels) connected to the top/sides
  // 2. blue sky
  // 3. anything outside an oval around head + shoulders (tames busy outdoor backgrounds)
  const isBackdrop = (x, y) => {
    const L = px(0, y), R = px(COLS - 1, y), p = px(x, y), t = x / (COLS - 1)
    const d = Math.hypot(...p.map((v, k) => v - (L[k] * (1 - t) + R[k] * t)))
    const sky = p[2] > p[0] + 25 && p[2] > p[1]
    return d < BG_TOLERANCE || sky
  }
  const outsideOval = (x, y) => {
    const nx = (x + 0.5) / COLS - 0.52
    const ny = (y + 0.5) / rows - 0.62
    return !((nx / 0.4) ** 2 + (ny / 0.62) ** 2 <= 1 || (ny > 0.25 && Math.abs(nx) < 0.48))
  }
  const clear = Array.from({ length: rows }, () => new Array(COLS).fill(false))
  const stack = []
  for (let x = 0; x < COLS; x++) stack.push([x, 0])
  for (let y = 0; y < rows; y++) stack.push([0, y], [COLS - 1, y])
  while (stack.length) {
    const [x, y] = stack.pop()
    if (x < 0 || y < 0 || x >= COLS || y >= rows || clear[y][x] || !isBackdrop(x, y)) continue
    clear[y][x] = true
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }
  for (let y = 0; y < rows; y++) for (let x = 0; x < COLS; x++) if (outsideOval(x, y)) clear[y][x] = true

  // Stretch contrast over the subject only
  const subject = []
  for (let y = 0; y < rows; y++) for (let x = 0; x < COLS; x++) if (!clear[y][x]) subject.push(lum(px(x, y)))
  subject.sort((a, b) => a - b)
  const lo = subject[Math.floor(subject.length * 0.02)] ?? 0
  const hi = subject[Math.floor(subject.length * 0.98)] ?? 255

  const lines = []
  for (let y = 0; y < rows; y++) {
    let line = ''
    for (let x = 0; x < COLS; x++) {
      const l = Math.min(1, Math.max(0, (lum(px(x, y)) - lo) / (hi - lo || 1))) ** 0.9
      line += clear[y][x] ? ' ' : RAMP[Math.round(l * (RAMP.length - 1))]
    }
    lines.push(line)
  }
  return lines
}

export default function Portrait({ src, alt, fallback }) {
  const [lines, setLines] = useState(null)
  const [mode, setMode] = useState('ascii')

  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.onload = () => {
      try {
        setLines(toAscii(img))
      } catch {
        setMode('photo')
      }
    }
    img.src = src
  }, [src])

  if (!src) {
    return <div className="neo-initials"><span>{fallback}</span></div>
  }

  const isPhoto = mode === 'photo'
  return (
    <button
      type="button"
      className="portrait"
      onClick={() => setMode(isPhoto ? 'ascii' : 'photo')}
      aria-label={isPhoto ? 'Show ASCII portrait' : `Show photo of ${alt}`}
    >
      <span className={`portrait-frame ${isPhoto ? 'is-photo' : ''}`}>
        {isPhoto ? (
          <img className="photo" src={src} alt={alt} />
        ) : lines ? (
          <pre className="ascii" aria-hidden="true">
            {lines.map((l, i) => (
              <span key={i} className="ascii-row" style={{ '--i': i }}>{l}</span>
            ))}
          </pre>
        ) : (
          <span className="muted">rendering…</span>
        )}
      </span>
      <span className="portrait-caption">[ {isPhoto ? 'show ascii' : 'show photo'} ]</span>
    </button>
  )
}
