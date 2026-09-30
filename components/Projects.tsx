'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { projects, Project } from '@/data/projects'
import ProjectCaseStudy from './ProjectCaseStudy'

gsap.registerPlugin(ScrollTrigger)

function ProjectRow({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = rowRef.current
    if (!el) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReduced) {
      // Image clip-path reveal on scroll
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 },
        {
          clipPath: 'inset(0% 0% 0% 0%)', scale: 1,
          duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 82%' }
        }
      )
      // Row slide up
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          delay: index * 0.08,
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      )
    }
  }, [index])

  // Parallax on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !titleRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height
    gsap.to(imgRef.current, { x: x * 8, y: y * 6, duration: 0.4, ease: 'power2.out' })
    gsap.to(titleRef.current, { x: x * 4, duration: 0.4, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { x: 0, y: 0, duration: 0.6, ease: 'power3.out' })
    if (titleRef.current) gsap.to(titleRef.current, { x: 0, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <div
      ref={rowRef}
      className="relative border-t cursor-pointer"
      style={{ borderColor: 'var(--gray-100)', opacity: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); handleMouseLeave() }}
      onMouseMove={handleMouseMove}
      onClick={() => onOpen(project)}
      data-cursor="view"
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} case study`}
      onKeyDown={e => e.key === 'Enter' && onOpen(project)}
    >
      {/* Top meta row */}
      <div
        className="flex items-center justify-between pt-5 pb-3"
        style={{ padding: '1.2rem 2.5rem 0' }}
      >
        <span className="font-mono text-xs tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--gray-600)' }}>
          {project.number} · {project.year}
        </span>
        <span className="font-mono text-xs tracking-[0.15em] uppercase font-semibold" style={{ color: 'var(--gray-600)' }}>
          {project.category}
        </span>
      </div>

      {/* Main area: title + image */}
      <div
        className="flex flex-col lg:flex-row items-start lg:items-end gap-6 lg:gap-12"
        style={{ padding: '0 2.5rem 2.5rem' }}
      >
        <div className="flex-1">
          <h3
            ref={titleRef}
            className="font-mono font-light leading-none tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 5rem)',
              color: 'var(--black)',
              transition: 'color 0.3s ease',
            }}
          >
            {project.title}
          </h3>
          <p
            className="font-mono text-base mt-3 max-w-lg leading-relaxed font-normal"
            style={{ color: 'var(--gray-700)' }}
          >
            {project.subtitle}
          </p>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies.slice(0, 4).map(t => (
              <span
                key={t}
                className="font-mono text-xs tracking-wider uppercase px-2.5 py-1 font-medium"
                style={{ border: '1px solid var(--gray-300)', color: 'var(--gray-700)', background: 'rgba(8,8,8,0.02)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Project image */}
        <div
          ref={imgRef}
          className="relative w-full lg:w-[42%] overflow-hidden"
          style={{
            aspectRatio: '16/9',
            background: 'var(--gray-100)',
            transition: 'box-shadow 0.4s ease',
            boxShadow: hovered ? '0 20px 60px rgba(8,8,8,0.12)' : 'none',
          }}
        >
          <Image
            src={project.image}
            alt={`${project.title} project screenshot`}
            fill
            className="object-cover"
            style={{ transition: 'transform 0.6s ease', transform: hovered ? 'scale(1.03)' : 'scale(1)' }}
            sizes="(max-width: 1024px) 100vw, 42vw"
            loading="lazy"
          />
          {/* VIEW label */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              background: 'rgba(8,8,8,0.05)',
            }}
          >
            <span
              className="font-mono text-xs tracking-[0.3em] uppercase"
              style={{ color: 'var(--white)' }}
            >
              View →
            </span>
          </div>
        </div>
      </div>

      {/* Hover line accent */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
          background: 'var(--black)',
          transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      />
    </div>
  )
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <>
      <section
        id="work"
        ref={sectionRef}
        style={{ background: 'var(--white)', borderTop: '1px solid var(--gray-100)' }}
        aria-label="Selected work"
      >
        {/* Header */}
        <div
          className="flex items-end justify-between"
          style={{ padding: '3rem 2.5rem 0' }}
        >
          <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: 'var(--gray-400)' }}>
            03 / Selected Work
          </p>
          <span className="font-mono text-[0.65rem] tracking-[0.1em]" style={{ color: 'var(--gray-300)' }}>
            ( 0{projects.length} )
          </span>
        </div>

        {/* Section title */}
        <h2
          className="font-mono font-light tracking-tight"
          style={{
            fontSize: 'clamp(3rem, 9vw, 8rem)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(8,8,8,0.12)',
            padding: '0.5rem 2.5rem 2rem',
            lineHeight: 0.9,
          }}
          aria-hidden="true"
        >
          WORKS
        </h2>

        {/* Project rows */}
        <div>
          {projects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onOpen={setActiveProject}
            />
          ))}
        </div>

        {/* Bottom border */}
        <div style={{ height: 1, background: 'var(--gray-100)', margin: '0' }} />
      </section>

      {/* Case study overlay */}
      {activeProject && (
        <ProjectCaseStudy
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  )
}
