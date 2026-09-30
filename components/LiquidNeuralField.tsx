'use client'

import { useEffect, useRef } from 'react'

interface Node {
  baseX: number
  baseY: number
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  phase: number
  phaseSpeed: number
  amplitude: number
}

export default function LiquidNeuralField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    let W = 0
    let H = 0
    let dpr = 1

    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      vx: 0,
      vy: 0,
      speed: 0,
      isInside: false,
    }

    let nodes: Node[] = []

    const setCanvasSize = () => {
      const parent = canvas.parentElement || document.body
      W = parent.clientWidth
      H = parent.clientHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = W * dpr
      canvas.height = H * dpr
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      initNodes()
    }

    const initNodes = () => {
      nodes = []
      // Density based on screen dimensions
      const density = isMobile ? 38 : 64
      const cols = Math.max(Math.floor(W / (W / Math.sqrt(density * (W / H)))), 6)
      const rows = Math.max(Math.floor(H / (H / Math.sqrt(density * (H / W)))), 5)

      const cellW = W / cols
      const cellH = H / rows

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          // Jitter grid position slightly for organic distribution
          const jitterX = (Math.random() - 0.5) * cellW * 0.75
          const jitterY = (Math.random() - 0.5) * cellH * 0.75
          const bx = (c + 0.5) * cellW + jitterX
          const by = (r + 0.5) * cellH + jitterY

          nodes.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            radius: Math.random() * 0.8 + 1.2, // subtle 1.2px - 2px dots
            phase: Math.random() * Math.PI * 2,
            phaseSpeed: Math.random() * 0.008 + 0.004,
            amplitude: Math.random() * 6 + 4,
          })
        }
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (prefersReduced || isMobile) return
      const rect = canvas.getBoundingClientRect()
      const clientX = e.clientX - rect.left
      const clientY = e.clientY - rect.top

      if (mouse.prevX === -9999) {
        mouse.prevX = clientX
        mouse.prevY = clientY
      } else {
        mouse.prevX = mouse.x
        mouse.prevY = mouse.y
      }

      mouse.x = clientX
      mouse.y = clientY
      mouse.isInside = clientX >= 0 && clientX <= W && clientY >= 0 && clientY <= H

      const dx = mouse.x - mouse.prevX
      const dy = mouse.y - mouse.prevY
      const instantSpeed = Math.hypot(dx, dy)
      // Smooth velocity accumulator
      mouse.vx = mouse.vx * 0.4 + dx * 0.6
      mouse.vy = mouse.vy * 0.4 + dy * 0.6
      mouse.speed = Math.min(mouse.speed * 0.3 + instantSpeed * 0.7, 80)
    }

    const onMouseLeave = () => {
      mouse.isInside = false
      mouse.speed = 0
    }

    window.addEventListener('resize', setCanvasSize)
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    setCanvasSize()

    let rafId: number
    let isVisible = true

    const onVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibilityChange)

    // Physics parameters for soft liquid / rubber spring behavior
    const influenceRadius = isMobile ? 0 : 220
    const springStrength = 0.038 // Return force toward base position
    const damping = 0.82 // Liquid viscosity damping

    const render = () => {
      rafId = requestAnimationFrame(render)
      if (!isVisible) return

      ctx.clearRect(0, 0, W, H)

      // Decay mouse velocity gradually when paused
      mouse.speed *= 0.92
      mouse.vx *= 0.9
      mouse.vy *= 0.9

      // 1. Update node physics
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Ambient gentle fluid breathing
        n.phase += n.phaseSpeed
        const ambientX = Math.sin(n.phase) * n.amplitude
        const ambientY = Math.cos(n.phase * 0.8) * n.amplitude

        const targetBaseX = n.baseX + ambientX
        const targetBaseY = n.baseY + ambientY

        if (!prefersReduced && !isMobile && mouse.isInside) {
          const dx = n.x - mouse.x
          const dy = n.y - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < influenceRadius && dist > 0.01) {
            // Smooth bell-curve / cosine falloff without harsh edges
            const normalizedDist = dist / influenceRadius
            const falloff = 0.5 * (1 + Math.cos(Math.PI * normalizedDist)) // 1.0 at center -> 0.0 at edge

            // Displacement strength influenced by velocity & distance
            const velocityMultiplier = Math.min(mouse.speed * 0.045 + 1.0, 3.2)
            const repelForce = (1 - normalizedDist) * 38 * velocityMultiplier

            const forceX = (dx / dist) * repelForce * falloff
            const forceY = (dy / dist) * repelForce * falloff

            // Tangential fluid wake effect
            const wakeForceX = mouse.vx * 0.12 * falloff
            const wakeForceY = mouse.vy * 0.12 * falloff

            n.vx += forceX * 0.08 + wakeForceX
            n.vy += forceY * 0.08 + wakeForceY
          }
        }

        // Spring force pulling back to targetBase
        const springX = (targetBaseX - n.x) * springStrength
        const springY = (targetBaseY - n.y) * springStrength

        n.vx += springX
        n.vy += springY

        // Fluid friction/damping
        n.vx *= damping
        n.vy *= damping

        n.x += n.vx
        n.y += n.vy
      }

      // 2. Draw connecting lines between nodes with proximity and tension
      const maxLineDist = isMobile ? 120 : 160

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i]
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const dx = n1.x - n2.x
          const dy = n1.y - n2.y
          const dist = Math.hypot(dx, dy)

          if (dist < maxLineDist) {
            const normalized = 1 - dist / maxLineDist
            // Check if either node is close to mouse for slightly higher opacity (subtle liquid tension)
            let proximityAlpha = 0
            if (mouse.isInside) {
              const dMouse = Math.min(Math.hypot(n1.x - mouse.x, n1.y - mouse.y), Math.hypot(n2.x - mouse.x, n2.y - mouse.y))
              if (dMouse < influenceRadius) {
                proximityAlpha = (1 - dMouse / influenceRadius) * 0.08
              }
            }

            const alpha = 0.04 * (normalized * normalized) + proximityAlpha

            ctx.beginPath()
            ctx.moveTo(n1.x, n1.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = `rgba(18, 18, 18, ${alpha})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }
      }

      // 3. Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Proximity glow to cursor
        let nodeAlpha = 0.22
        if (mouse.isInside) {
          const dMouse = Math.hypot(n.x - mouse.x, n.y - mouse.y)
          if (dMouse < influenceRadius) {
            nodeAlpha += (1 - dMouse / influenceRadius) * 0.3
          }
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(18, 18, 18, ${nodeAlpha})`
        ctx.fill()
      }
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
