'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// AI/ML glyph: SVG neural network symbol - original, not a copyrighted logo
export default function LoadingAnimation({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const glyphRef = useRef<SVGSVGElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const counterVal = useRef({ val: 0 })

  useEffect(() => {
    if (!containerRef.current || !glyphRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setTimeout(onComplete, 600)
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        })
      },
    })

    // Nodes and paths in the SVG glyph
    const nodes = glyphRef.current.querySelectorAll('.glyph-node')
    const paths = glyphRef.current.querySelectorAll('.glyph-path')
    const ring = glyphRef.current.querySelector('.glyph-ring')

    // 0.0s — blank
    gsap.set([nodes, paths, ring], { opacity: 0 })
    gsap.set(nodes, { scale: 0, transformOrigin: 'center' })

    // Counter
    tl.to(counterVal.current, {
      val: 100,
      duration: 3.2,
      ease: 'power1.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterVal.current.val)).padStart(3, '0')
        }
      },
    }, 0)

    // 0.3s — glyph node appears
    tl.to(nodes[0], { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, 0.3)

    // 0.8s — glyph morphs: more nodes appear
    tl.to(Array.from(nodes).slice(1), {
      opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.8)', stagger: 0.08,
    }, 0.8)

    // 1.2s — paths/connections emerge
    tl.to(paths, {
      opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.06,
    }, 1.2)

    // 1.8s — ring expands
    tl.fromTo(ring,
      { opacity: 0, scale: 0.5, transformOrigin: 'center' },
      { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' },
      1.8
    )

    // 2.2s — title reveals
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      2.2
    )

    // 3.5s — complete
    tl.to({}, { duration: 0.2 }, 3.5)

  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center w-screen h-screen"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--white)',
        zIndex: 99999,
      }}
      aria-label="Loading"
    >
      {/* AI/ML Neural Glyph — original SVG */}
      <svg
        ref={glyphRef}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        aria-hidden="true"
        className="mb-8"
      >
        {/* Connection paths between nodes */}
        <line className="glyph-path" x1="60" y1="20" x2="95" y2="45" stroke="var(--black)" strokeWidth="0.75" opacity="0.3"/>
        <line className="glyph-path" x1="60" y1="20" x2="25" y2="45" stroke="var(--black)" strokeWidth="0.75" opacity="0.3"/>
        <line className="glyph-path" x1="25" y1="45" x2="25" y2="75" stroke="var(--black)" strokeWidth="0.75" opacity="0.3"/>
        <line className="glyph-path" x1="95" y1="45" x2="95" y2="75" stroke="var(--black)" strokeWidth="0.75" opacity="0.3"/>
        <line className="glyph-path" x1="25" y1="75" x2="60" y2="100" stroke="var(--black)" strokeWidth="0.75" opacity="0.3"/>
        <line className="glyph-path" x1="95" y1="75" x2="60" y2="100" stroke="var(--black)" strokeWidth="0.75" opacity="0.3"/>
        <line className="glyph-path" x1="25" y1="45" x2="60" y2="60" stroke="var(--black)" strokeWidth="0.5" opacity="0.2"/>
        <line className="glyph-path" x1="95" y1="45" x2="60" y2="60" stroke="var(--black)" strokeWidth="0.5" opacity="0.2"/>
        <line className="glyph-path" x1="60" y1="60" x2="25" y2="75" stroke="var(--black)" strokeWidth="0.5" opacity="0.2"/>
        <line className="glyph-path" x1="60" y1="60" x2="95" y2="75" stroke="var(--black)" strokeWidth="0.5" opacity="0.2"/>
        {/* Outer ring */}
        <circle className="glyph-ring" cx="60" cy="60" r="52" stroke="var(--black)" strokeWidth="0.5" opacity="0.15"/>
        {/* Neural nodes */}
        <circle className="glyph-node" cx="60" cy="60" r="5" fill="var(--black)"/>
        <circle className="glyph-node" cx="60" cy="20" r="4" fill="var(--black)"/>
        <circle className="glyph-node" cx="25" cy="45" r="3.5" fill="var(--black)"/>
        <circle className="glyph-node" cx="95" cy="45" r="3.5" fill="var(--black)"/>
        <circle className="glyph-node" cx="25" cy="75" r="3.5" fill="var(--black)"/>
        <circle className="glyph-node" cx="95" cy="75" r="3.5" fill="var(--black)"/>
        <circle className="glyph-node" cx="60" cy="100" r="4" fill="var(--black)"/>
      </svg>

      {/* Title */}
      <p
        ref={titleRef}
        className="font-mono text-xs tracking-[0.2em] uppercase mb-8 opacity-0"
        style={{ color: 'var(--gray-500)' }}
      >
        AI / ML Engineer
      </p>

      {/* Counter */}
      <span
        ref={counterRef}
        className="font-mono text-xs tracking-widest"
        style={{ color: 'var(--gray-400)' }}
      >
        000
      </span>

      {/* Skip */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 font-mono text-xs tracking-widest uppercase opacity-30 hover:opacity-70 transition-opacity"
        style={{ color: 'var(--black)' }}
        aria-label="Skip intro"
      >
        Skip →
      </button>
    </div>
  )
}
