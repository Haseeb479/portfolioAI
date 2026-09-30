'use client'

import { useEffect } from 'react'
import { initCursor, destroyCursor } from '@/animations/cursor'

export default function CustomCursor() {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (isMobile) return
    initCursor()
    return () => destroyCursor()
  }, [])

  return (
    <>
      <div
        id="cursor-dot"
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          background: 'var(--black)',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'transform 0.1s ease',
        }}
      />
      <div
        id="cursor-ring"
        aria-hidden="true"
        style={{
          position: 'fixed',
          width: 30,
          height: 30,
          border: '1px solid rgba(8,8,8,0.35)',
          borderRadius: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.15s cubic-bezier(0.23,1,0.32,1)',
        }}
      >
        <span
          id="cursor-label"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.45rem',
            letterSpacing: '0.12em',
            color: 'var(--black)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        />
      </div>
    </>
  )
}
