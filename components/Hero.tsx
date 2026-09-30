'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { revealTextImmediate } from '@/animations/textReveal'
import { profile } from '@/data/profile'
import LiquidNeuralField from './LiquidNeuralField'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const line3Ref = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      if (line1Ref.current) line1Ref.current.style.opacity = '1'
      if (metaRef.current) metaRef.current.style.opacity = '1'
      return
    }

    // Staggered hero text reveal
    const delay = 0.1
    if (line1Ref.current) revealTextImmediate(line1Ref.current, delay)
    if (line2Ref.current) revealTextImmediate(line2Ref.current, delay + 0.12)
    if (line3Ref.current) revealTextImmediate(line3Ref.current, delay + 0.24)

    gsap.fromTo(
      metaRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: delay + 0.6 }
    )
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: 'var(--white)' }}
      aria-label="Hero"
    >
      {/* Layer 0: Liquid Neural Field background */}
      <LiquidNeuralField />

      {/* Layer 2: Hero typography and protected UI */}
      <div
        className="relative z-10"
        style={{ padding: 'clamp(6rem, 10vw, 8rem) 3rem clamp(3rem, 6vw, 5rem)' }}
      >
        {/* Tag */}
        <p
          className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-6 select-none"
          style={{ color: 'var(--gray-500)' }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#22c55e',
              marginRight: 8,
              verticalAlign: 'middle',
              animation: 'pulse 2s infinite',
            }}
          />
          Available · Remote · Worldwide
        </p>

        {/* Main headline - Protected from distortion */}
        <div aria-label={profile.tagline}>
          <h1
            ref={line1Ref}
            className="font-mono font-light leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)', color: 'var(--black)' }}
            aria-hidden="true"
          >
            I BUILD
          </h1>
          <h1
            ref={line2Ref}
            className="font-mono font-light leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)', color: 'var(--black)' }}
            aria-hidden="true"
          >
            INTELLIGENT
          </h1>
          <h1
            ref={line3Ref}
            className="font-mono font-light leading-none tracking-tight select-none"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 10rem)', color: 'var(--black)' }}
            aria-hidden="true"
          >
            SYSTEMS.
          </h1>
        </div>

        {/* Meta row */}
        <div
          ref={metaRef}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mt-8 gap-6 opacity-0 select-none"
        >
          <p
            className="font-mono text-xs leading-relaxed max-w-xs"
            style={{ color: 'var(--gray-500)' }}
          >
            {profile.title}
            <br />
            {profile.subtagline}
          </p>
          <div className="flex items-center gap-2" style={{ color: 'var(--gray-400)' }}>
            <span className="font-mono text-[0.6rem] tracking-[0.15em] uppercase">Scroll</span>
            <div style={{ width: 40, height: 1, background: 'var(--gray-300)' }} />
          </div>
        </div>
      </div>
    </section>
  )
}
