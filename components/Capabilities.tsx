'use client'

import { useState } from 'react'

const CAPABILITIES = [
  {
    num: '01',
    title: 'AI SYSTEMS',
    desc: 'Production LLM applications, Agentic RAG pipelines & multi-agent systems designed for scale and zero hallucinations.',
  },
  {
    num: '02',
    title: 'GENERATIVE AI',
    desc: 'Azure OpenAI, Groq LLaMA-3.3, context engineering, prompt engineering and systematic model evaluation.',
  },
  {
    num: '03',
    title: 'ML ENGINEERING',
    desc: 'QLoRA fine-tuning, domain-specific adaptation, MLflow experiment tracking, and end-to-end MLOps.',
  },
  {
    num: '04',
    title: 'AI AUTOMATION',
    desc: 'MCP protocol orchestration, tool use, function calling, and automated A2A multi-step pipelines.',
  },
  {
    num: '05',
    title: 'DATA SYSTEMS',
    desc: 'Vector embeddings, chunking strategies, Azure AI Search, and hybrid semantic retrieval architectures.',
  },
  {
    num: '06',
    title: 'CLOUD NATIVE AI',
    desc: 'FastAPI microservices, Docker containerization, Azure App Service, and robust inference endpoints.',
  },
]

export default function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="capabilities"
      style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--gray-100)',
        padding: 'clamp(4rem, 8vw, 8rem) 2.5rem',
      }}
      aria-label="Capabilities"
    >
      <div className="flex items-end justify-between mb-12">
        <p
          className="font-mono text-xs tracking-[0.2em] uppercase font-medium"
          style={{ color: 'var(--gray-600)' }}
        >
          02 / Capabilities
        </p>
        <span className="font-mono text-xs tracking-[0.1em]" style={{ color: 'var(--gray-500)' }}>
          ( 06 )
        </span>
      </div>

      <div className="space-y-0">
        {CAPABILITIES.map((cap, i) => {
          const isHovered = hoveredIndex === i

          return (
            <div
              key={cap.num}
              className="border-t py-6 md:py-8 cursor-pointer transition-colors duration-300"
              style={{
                borderColor: 'var(--gray-200)',
                background: isHovered ? 'rgba(8,8,8,0.02)' : 'transparent',
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              data-cursor="explore"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                <div className="flex items-baseline gap-6 lg:gap-12">
                  <span
                    className="font-mono text-xs tracking-widest font-semibold"
                    style={{ color: isHovered ? 'var(--black)' : 'var(--gray-500)' }}
                  >
                    {cap.num}
                  </span>
                  <h3
                    className="font-mono font-normal tracking-tight transition-transform duration-300"
                    style={{
                      fontSize: 'clamp(1.9rem, 4.2vw, 4rem)',
                      color: 'var(--black)',
                      transform: isHovered ? 'translateX(8px)' : 'none',
                    }}
                  >
                    {cap.title}
                  </h3>
                </div>

                <div
                  className="font-mono text-sm max-w-md transition-all duration-300 leading-relaxed font-normal"
                  style={{
                    color: isHovered ? 'var(--black)' : 'var(--gray-600)',
                    opacity: isHovered ? 1 : 0.85,
                  }}
                >
                  {cap.desc}
                </div>
              </div>
            </div>
          )
        })}
        <div className="border-t" style={{ borderColor: 'var(--gray-200)' }} />
      </div>
    </section>
  )
}
