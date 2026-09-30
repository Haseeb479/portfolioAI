'use client'

import { useEffect } from 'react'
import { initSmoothScroll, destroySmoothScroll } from '@/animations/smoothScroll'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReduced) initSmoothScroll()
    return () => destroySmoothScroll()
  }, [])

  return <>{children}</>
}
