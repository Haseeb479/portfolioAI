'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { profile } from '@/data/profile'
import MagneticButton from './MagneticButton'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLHeadingElement>(null)
  const line2Ref = useRef<HTMLHeadingElement>(null)
  const line3Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReduced) {
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current]
      gsap.fromTo(
        lines,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'var(--black)',
        color: 'var(--white)',
        padding: 'clamp(5rem, 10vw, 10rem) 2.5rem',
      }}
      aria-label="Contact"
    >
      <p
        className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-12 opacity-40"
      >
        06 / Contact
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        {/* Left: Oversized statement */}
        <div className="lg:col-span-8">
          <div className="font-mono font-light leading-none tracking-tight">
            <h2
              ref={line1Ref}
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: 'var(--white)' }}
            >
              LET&apos;S BUILD
            </h2>
            <h2
              ref={line2Ref}
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: 'var(--white)' }}
            >
              SOMETHING
            </h2>
            <h2
              ref={line3Ref}
              style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)', color: 'var(--gray-400)' }}
            >
              INTELLIGENT.
            </h2>
          </div>

          <div className="mt-12">
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-lg sm:text-2xl tracking-tight border-b pb-2 inline-block transition-colors hover:border-white"
              style={{ borderColor: 'rgba(245,242,237,0.3)', color: 'var(--white)' }}
              data-cursor="link"
            >
              {profile.email} ↗
            </a>
          </div>
        </div>

        {/* Right: Meta & CTAs */}
        <div className="lg:col-span-4 space-y-8 font-mono">
          <div className="space-y-3 border-t pt-6" style={{ borderColor: 'rgba(245,242,237,0.1)' }}>
            <div className="flex justify-between text-xs">
              <span className="opacity-40 uppercase tracking-widest text-[0.65rem]">Location</span>
              <span>{profile.location}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="opacity-40 uppercase tracking-widest text-[0.65rem]">Availability</span>
              <span style={{ color: '#4ade80' }}>● Immediate</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="opacity-40 uppercase tracking-widest text-[0.65rem]">Languages</span>
              <span>English, Urdu</span>
            </div>
          </div>

          {/* Magnetic Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <MagneticButton
              href={`mailto:${profile.email}`}
              className="px-6 py-3 border font-mono text-xs uppercase tracking-widest transition-colors duration-200"
              style={{
                borderColor: 'var(--white)',
                background: 'var(--white)',
                color: 'var(--black)',
              }}
            >
              Send Email →
            </MagneticButton>

            <MagneticButton
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:bg-white/10"
              style={{
                borderColor: 'rgba(245,242,237,0.3)',
                color: 'var(--white)',
              }}
            >
              LinkedIn ↗
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  )
}
