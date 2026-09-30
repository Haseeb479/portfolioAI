'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { Project } from '@/data/projects'

interface Props {
  project: Project
  onClose: () => void
}

export default function ProjectCaseStudy({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Open animation
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.style.overflow = 'hidden'

    if (prefersReduced) {
      if (overlayRef.current) overlayRef.current.style.opacity = '1'
      return
    }

    gsap.fromTo(overlayRef.current,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'power4.out' }
    )
    gsap.fromTo(contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.3 }
    )

    return () => { document.body.style.overflow = '' }
  }, [])

  const handleClose = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.style.overflow = ''

    if (prefersReduced) { onClose(); return }

    gsap.to(overlayRef.current, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.5, ease: 'power3.in',
      onComplete: onClose,
    })
  }

  // ESC key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[150] overflow-y-auto"
      style={{ background: 'var(--white)', clipPath: 'inset(100% 0% 0% 0%)' }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
    >
      {/* Sticky nav inside overlay */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between"
        style={{
          padding: '1.2rem 2.5rem',
          borderBottom: '1px solid var(--gray-100)',
          background: 'rgba(245,242,237,0.92)',
          backdropFilter: 'blur(16px)',
        }}
      >
        <span className="font-mono text-[0.65rem] tracking-[0.18em] uppercase" style={{ color: 'var(--gray-400)' }}>
          {project.number} / {project.category}
        </span>
        <button
          onClick={handleClose}
          className="font-mono text-[0.65rem] tracking-[0.15em] uppercase hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-1"
          style={{ color: 'var(--black)' }}
          aria-label="Close case study"
        >
          Close ✕
        </button>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        style={{ padding: 'clamp(3rem,6vw,6rem) 2.5rem clamp(4rem,8vw,8rem)', opacity: 0 }}
      >
        {/* Title */}
        <h2
          className="font-mono font-light leading-tight tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: 'var(--black)' }}
        >
          {project.title}
        </h2>

        {/* Hero image */}
        <div
          className="relative w-full overflow-hidden mb-12"
          style={{ aspectRatio: '16/8', background: 'var(--gray-100)' }}
        >
          <Image
            src={project.image}
            alt={`${project.title} interface`}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left: overview */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gray-400)' }}>
                Overview
              </p>
              <p className="font-mono text-base leading-relaxed" style={{ color: 'var(--gray-700)' }}>
                {project.caseStudy.overview}
              </p>
            </div>

            {/* Problem */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gray-400)' }}>
                Problem
              </p>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                {project.caseStudy.problem}
              </p>
            </div>

            {/* Solution */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gray-400)' }}>
                Solution
              </p>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                {project.caseStudy.solution}
              </p>
            </div>

            {/* Features */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gray-400)' }}>
                Key Features
              </p>
              <ul className="space-y-2">
                {project.caseStudy.features.map((f, i) => (
                  <li key={i} className="flex gap-3 font-mono text-sm" style={{ color: 'var(--gray-600)' }}>
                    <span style={{ color: 'var(--gray-300)' }}>—</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Architecture */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gray-400)' }}>
                Architecture
              </p>
              <div
                className="font-mono text-xs p-4 overflow-x-auto"
                style={{
                  background: 'var(--gray-50)',
                  border: '1px solid var(--gray-100)',
                  color: 'var(--gray-700)',
                  lineHeight: 1.8,
                  letterSpacing: '0.04em',
                }}
              >
                {project.caseStudy.architecture}
              </div>
            </div>

            {/* Result */}
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gray-400)' }}>
                Result
              </p>
              <p className="font-mono text-sm leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                {project.caseStudy.result}
              </p>
            </div>
          </div>

          {/* Right: meta */}
          <div className="space-y-8">
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gray-400)' }}>
                Year
              </p>
              <p className="font-mono text-sm" style={{ color: 'var(--black)' }}>{project.year}</p>
            </div>
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--gray-400)' }}>
                Category
              </p>
              <p className="font-mono text-sm" style={{ color: 'var(--black)' }}>{project.category}</p>
            </div>
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--gray-400)' }}>
                Technologies
              </p>
              <div className="flex flex-col gap-2">
                {project.technologies.map(t => (
                  <span
                    key={t}
                    className="font-mono text-[0.65rem] tracking-wide"
                    style={{ color: 'var(--gray-600)', borderBottom: '1px solid var(--gray-100)', paddingBottom: '0.4rem' }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
