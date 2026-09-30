'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { initMagnetic } from '@/animations/magnetic'

interface Props {
  href: string
  children: ReactNode
  className?: string
  target?: string
  rel?: string
  style?: React.CSSProperties
}

export default function MagneticButton({
  href,
  children,
  className = '',
  target,
  rel,
  style,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const cleanup = initMagnetic(ref.current, 0.3)
    return cleanup
  }, [])

  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
      data-cursor="link"
    >
      {children}
    </a>
  )
}
