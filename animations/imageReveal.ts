import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function revealImage(container: Element, delay = 0) {
  gsap.fromTo(
    container,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 1.2,
      ease: 'power4.out',
      delay,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
      }
    }
  )
  // Subtle inner scale
  const img = container.querySelector('img')
  if (img) {
    gsap.fromTo(
      img,
      { scale: 1.15 },
      {
        scale: 1,
        duration: 1.4,
        ease: 'power4.out',
        delay,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
        }
      }
    )
  }
}

export function parallaxImage(img: Element, speed = 0.15) {
  gsap.to(img, {
    y: () => -window.innerHeight * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: img,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  })
}
