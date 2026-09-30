'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { profile } from '@/data/profile'

const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (href: string) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  // Compact nav on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 40) {
        navRef.current.style.padding = '0.9rem 3rem'
        navRef.current.style.background = 'rgba(245, 242, 237, 0.85)'
        navRef.current.style.borderBottomColor = 'rgba(8, 8, 8, 0.12)'
      } else {
        navRef.current.style.padding = '1.2rem 3rem'
        navRef.current.style.background = 'rgba(245, 242, 237, 0.65)'
        navRef.current.style.borderBottomColor = 'rgba(8, 8, 8, 0.08)'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animate menu open/close
  useEffect(() => {
    if (!menuRef.current) return
    if (menuOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
        { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5, ease: 'power3.out' }
      )
    } else {
      gsap.to(menuRef.current, {
        opacity: 0, clipPath: 'inset(0% 0% 100% 0%)', duration: 0.35, ease: 'power2.in'
      })
    }
  }, [menuOpen])

  // ESC closes menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.2rem 3rem',
          background: 'rgba(245, 242, 237, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(8, 8, 8, 0.08)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s ease',
          boxSizing: 'border-box',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Name / Logo - Left */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); scrollTo('#hero') }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--black)',
              textDecoration: 'none',
            }}
            data-cursor="link"
          >
            {profile.name}
          </a>
        </div>

        {/* Right Action & Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {/* Desktop Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--black)',
                  opacity: 0.6,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                data-cursor="link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Menu Button - Far Right */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--black)',
              background: 'rgba(8, 8, 8, 0.05)',
              border: '1px solid rgba(8, 8, 8, 0.1)',
              padding: '0.45rem 0.9rem',
              borderRadius: '2px',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(8, 8, 8, 0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(8, 8, 8, 0.05)')}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            data-cursor="link"
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 4px)', gap: '3px' }} aria-hidden="true">
              <span style={{ width: '4px', height: '4px', background: 'var(--black)', display: 'block' }}/>
              <span style={{ width: '4px', height: '4px', background: 'var(--black)', display: 'block' }}/>
              <span style={{ width: '4px', height: '4px', background: 'var(--black)', display: 'block' }}/>
              <span style={{ width: '4px', height: '4px', background: 'var(--black)', display: 'block' }}/>
            </span>
          </button>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[90] flex flex-col justify-end"
        style={{
          background: 'var(--black)',
          opacity: 0,
          clipPath: 'inset(0% 0% 100% 0%)',
          pointerEvents: menuOpen ? 'auto' : 'none',
          padding: '3rem 2.5rem',
        }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-4" aria-label="Menu navigation">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={e => { e.preventDefault(); scrollTo(link.href) }}
              tabIndex={menuOpen ? 0 : -1}
              className="font-mono uppercase tracking-[0.08em] hover:opacity-60 transition-opacity"
              style={{
                color: 'var(--white)',
                fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                lineHeight: 0.95,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-12 font-mono text-xs tracking-widest opacity-30" style={{ color: 'var(--white)' }}>
          {profile.email}
        </div>
      </div>
    </>
  )
}
