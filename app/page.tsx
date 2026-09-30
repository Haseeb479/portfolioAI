'use client'

import { useState } from 'react'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import LoadingAnimation from '@/components/LoadingAnimation'
import SmoothScroll from '@/components/SmoothScroll'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Capabilities from '@/components/Capabilities'
import Projects from '@/components/Projects'
import Technology from '@/components/Technology'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && <LoadingAnimation onComplete={() => setLoaded(true)} />}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s ease',
          pointerEvents: loaded ? 'auto' : 'none',
        }}
      >
        <CustomCursor />

        <SmoothScroll>
          <Navigation />

          <main id="main-content">
            <Hero />
            <About />
            <Capabilities />
            <Projects />
            <Technology />
            <Experience />
            <Contact />
          </main>

          <Footer />
        </SmoothScroll>
      </div>
    </>
  )
}
