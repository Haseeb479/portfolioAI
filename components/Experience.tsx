'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { experience, ExperienceEntry } from '@/data/experience'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!itemsRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReduced) {
      const items = itemsRef.current.querySelectorAll('.exp-item')
      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        )
      })
    }
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--gray-100)',
        padding: 'clamp(4rem, 8vw, 8rem) 2.5rem',
      }}
      aria-label="Experience"
    >
      <p
        className="font-mono text-xs tracking-[0.2em] uppercase mb-12 font-medium"
        style={{ color: 'var(--gray-600)' }}
      >
        05 / Experience
      </p>

      <div ref={itemsRef} className="space-y-0">
        {experience.map((entry: ExperienceEntry, index: number) => (
          <div
            key={index}
            className="exp-item border-t py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            style={{ borderColor: 'var(--gray-200)' }}
          >
            {/* Year & Period */}
            <div className="lg:col-span-3 font-mono">
              <span
                className="text-3xl lg:text-4xl font-light block mb-2"
                style={{ color: 'var(--black)' }}
              >
                {entry.year}
              </span>
              <span className="text-xs uppercase tracking-wider block font-medium" style={{ color: 'var(--gray-600)' }}>
                {entry.period}
              </span>
              <span className="text-xs uppercase tracking-widest px-2.5 py-1 border mt-3 inline-block font-semibold" style={{ borderColor: 'var(--gray-300)', color: 'var(--gray-700)', background: 'rgba(8,8,8,0.02)' }}>
                {entry.type}
              </span>
            </div>

            {/* Role & Org */}
            <div className="lg:col-span-4 font-mono">
              <h3
                className="text-xl lg:text-2xl font-normal tracking-tight mb-1"
                style={{ color: 'var(--black)' }}
              >
                {entry.role}
              </h3>
              <p className="text-sm mb-4 font-medium" style={{ color: 'var(--gray-600)' }}>
                {entry.organization}
              </p>
              <p className="text-sm leading-relaxed font-normal" style={{ color: 'var(--gray-700)' }}>
                {entry.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="lg:col-span-5 font-mono">
              <p className="text-xs uppercase tracking-widest mb-3 font-semibold" style={{ color: 'var(--gray-600)' }}>
                Key Contributions
              </p>
              <ul className="space-y-2.5">
                {entry.highlights.map((h, hi) => (
                  <li key={hi} className="text-sm leading-relaxed flex gap-3 font-normal" style={{ color: 'var(--gray-700)' }}>
                    <span style={{ color: 'var(--gray-400)' }}>—</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
        <div className="border-t" style={{ borderColor: 'var(--gray-200)' }} />
      </div>
    </section>
  )
}
