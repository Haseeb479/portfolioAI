'use client'

import { useRef, useState } from 'react'
import { technologies, technologyCategories } from '@/data/technologies'

export default function Technology() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const grouped = technologyCategories.map(cat => ({
    category: cat,
    items: technologies.filter(t => t.category === cat),
  }))

  return (
    <section
      id="technology"
      ref={sectionRef}
      style={{ background: 'var(--white)', borderTop: '1px solid var(--gray-100)' }}
      aria-label="Technology stack"
    >
      <div style={{ padding: '4rem 2.5rem 5rem' }}>
        {/* Section marker */}
        <p
          className="font-mono text-xs tracking-[0.2em] uppercase mb-12 font-medium"
          style={{ color: 'var(--gray-600)' }}
        >
          04 / Technology
        </p>

        {/* Category rows */}
        <div className="space-y-0">
          {grouped.map(group => (
            <div
              key={group.category}
              className="border-t"
              style={{ borderColor: 'var(--gray-200)' }}
            >
              <div
                className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-7"
              >
                {/* Category label */}
                <div className="flex items-start pt-1">
                  <span
                    className="font-mono text-xs tracking-[0.18em] uppercase font-semibold"
                    style={{ color: 'var(--gray-600)' }}
                  >
                    {group.category}
                  </span>
                </div>

                {/* Technologies */}
                <div className="lg:col-span-3 flex flex-wrap gap-4 items-start">
                  {group.items.map(tech => (
                    <button
                      key={tech.name}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className="group relative focus:outline-none"
                      data-cursor="link"
                      aria-label={`${tech.name}: ${tech.description}`}
                    >
                      <span
                        className="font-mono text-base tracking-wide transition-all duration-200 block font-normal"
                        style={{
                          color: hoveredTech === tech.name ? 'var(--black)' : 'var(--gray-600)',
                          transform: hoveredTech === tech.name ? 'scale(1.06)' : 'scale(1)',
                          display: 'inline-block',
                          transformOrigin: 'left center',
                        }}
                      >
                        {tech.name}
                      </span>

                      {/* Tooltip description */}
                      {hoveredTech === tech.name && (
                        <span
                          className="absolute bottom-full left-0 mb-2 font-mono text-xs whitespace-nowrap tracking-wide pointer-events-none shadow-md"
                          style={{
                            color: 'var(--white)',
                            background: 'var(--black)',
                            border: '1px solid var(--black)',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '2px',
                            zIndex: 20,
                          }}
                        >
                          {tech.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {/* Final border */}
          <div className="border-t" style={{ borderColor: 'var(--gray-200)' }} />
        </div>
      </div>
    </section>
  )
}
