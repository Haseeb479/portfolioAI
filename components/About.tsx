'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '@/data/profile'
import { revealText } from '@/animations/textReveal'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const rightColRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReduced) {
      if (headlineRef.current) {
        revealText(headlineRef.current, 0.1)
      }

      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.children,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rightColRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--gray-100)',
        padding: 'clamp(4rem, 8vw, 8rem) 2.5rem',
      }}
      aria-label="About"
    >
      {/* Section marker */}
      <p
        className="font-mono text-xs tracking-[0.2em] uppercase mb-12 font-medium"
        style={{ color: 'var(--gray-600)' }}
      >
        01 / About
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column: Oversized editorial headline */}
        <div className="lg:col-span-7">
          <div
            ref={headlineRef}
            className="font-mono font-light leading-[1.15] tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 4.2rem)',
              color: 'var(--black)',
            }}
          >
            {profile.about}
          </div>
        </div>

        {/* Right column: Technical details, certifications, metrics */}
        <div ref={rightColRef} className="lg:col-span-5 space-y-8 font-mono">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--gray-600)' }}>
              Summary
            </p>
            <p className="text-base leading-relaxed font-normal" style={{ color: 'var(--gray-700)' }}>
              {profile.summary}
            </p>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 border-y py-6" style={{ borderColor: 'var(--gray-200)' }}>
            {profile.metrics.map((m, i) => (
              <div key={i}>
                <div
                  className="text-2xl lg:text-3xl font-light mb-1"
                  style={{ color: 'var(--black)' }}
                >
                  {m.value}
                </div>
                <div className="text-xs uppercase tracking-wider leading-tight font-medium" style={{ color: 'var(--gray-600)' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Certifications & Education */}
          <div className="space-y-5 pt-2">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--gray-600)' }}>
                Certification
              </p>
              <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>
                {profile.certifications[0]?.name}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--gray-600)' }}>
                {profile.certifications[0]?.issuer} · {profile.certifications[0]?.status}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--gray-600)' }}>
                Education
              </p>
              <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>
                {profile.education.degree}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'var(--gray-600)' }}>
                {profile.education.institution}, {profile.education.year}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--gray-600)' }}>
                Location &amp; Status
              </p>
              <div className="text-sm font-medium" style={{ color: 'var(--black)' }}>
                {profile.location} · <span style={{ color: '#15803d' }}>● Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
