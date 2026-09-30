interface CursorState {
  x: number
  y: number
  vx: number
  vy: number
  label: string
  scale: number
}

const state: CursorState = { x: 0, y: 0, vx: 0, vy: 0, label: '', scale: 1 }
let ringX = 0, ringY = 0
let rafId: number
let dot: HTMLElement | null = null
let ring: HTMLElement | null = null
let label: HTMLElement | null = null
let trail: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null
let points: Array<{x: number, y: number, age: number}> = []

export function initCursor() {
  dot = document.getElementById('cursor-dot')
  ring = document.getElementById('cursor-ring')
  label = document.getElementById('cursor-label')

  // Canvas trail
  trail = document.createElement('canvas')
  trail.id = 'cursor-trail'
  trail.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:9997;'
  trail.width = window.innerWidth
  trail.height = window.innerHeight
  document.body.appendChild(trail)
  ctx = trail.getContext('2d')

  window.addEventListener('resize', () => {
    if (trail) { trail.width = window.innerWidth; trail.height = window.innerHeight }
  })

  document.addEventListener('mousemove', (e) => {
    state.vx = e.clientX - state.x
    state.vy = e.clientY - state.y
    state.x = e.clientX
    state.y = e.clientY
    points.push({ x: e.clientX, y: e.clientY, age: 0 })
    if (points.length > 24) points.shift()
    if (dot) { dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px' }
  })

  // Hover detection
  document.addEventListener('mouseover', (e) => {
    const t = e.target as HTMLElement
    if (t.closest('[data-cursor="view"]')) setCursorLabel('VIEW')
    else if (t.closest('[data-cursor="explore"]')) setCursorLabel('EXPLORE')
    else if (t.closest('a, button, [data-cursor="link"]')) expandRing(1.6)
    else resetCursor()
  })

  loop()
}

function setCursorLabel(text: string) {
  if (ring) ring.style.transform = 'translate(-50%,-50%) scale(2.5)'
  if (label) { label.textContent = text; label.style.opacity = '1' }
}

function expandRing(s: number) {
  if (ring) ring.style.transform = `translate(-50%,-50%) scale(${s})`
}

function resetCursor() {
  if (ring) ring.style.transform = 'translate(-50%,-50%) scale(1)'
  if (label) label.style.opacity = '0'
}

function loop() {
  rafId = requestAnimationFrame(loop)

  // Ring interpolation
  ringX += (state.x - ringX) * 0.1
  ringY += (state.y - ringY) * 0.1
  if (ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px' }

  // Trail canvas
  if (!ctx || !trail) return
  ctx.clearRect(0, 0, trail.width, trail.height)
  points = points.map(p => ({ ...p, age: p.age + 1 })).filter(p => p.age < 20)
  if (points.length < 2) return
  ctx.beginPath()
  ctx.moveTo(points[0].x, points[0].y)
  for (let i = 1; i < points.length - 1; i++) {
    const mx = (points[i].x + points[i + 1].x) / 2
    const my = (points[i].y + points[i + 1].y) / 2
    ctx.quadraticCurveTo(points[i].x, points[i].y, mx, my)
  }
  const vel = Math.sqrt(state.vx ** 2 + state.vy ** 2)
  const lineWidth = Math.min(vel * 0.15, 3)
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = 'rgba(245, 242, 237, 0.18)'
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
  ctx.stroke()
}

export function destroyCursor() {
  cancelAnimationFrame(rafId)
  trail?.remove()
}
