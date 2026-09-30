'use client'

import { profile } from '@/data/profile'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        background: 'var(--black)',
        borderTop: '1px solid rgba(245, 242, 237, 0.08)',
        padding: '1.5rem 2.5rem',
      }}
      className="font-mono text-[0.65rem] tracking-wider text-white/40 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <div>
        <span>{profile.name}</span> — <span>{profile.title}</span>
      </div>

      <div className="uppercase tracking-[0.2em] text-[0.6rem]">
        BUILT WITH CODE, AI &amp; CURIOSITY.
      </div>

      <div>
        © {currentYear} ALL RIGHTS RESERVED
      </div>
    </footer>
  )
}
