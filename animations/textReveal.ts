import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function revealText(element: Element, delay = 0) {
  // Split into words wrapped in span.word > span.word-inner
  const text = element.textContent || ''
  const words = text.split(' ')
  element.innerHTML = words
    .map(w => `<span class="word" style="overflow:hidden;display:inline-block;"><span class="word-inner" style="display:inline-block;transform:translateY(105%)">${w}</span></span>`)
    .join(' ')

  const inners = element.querySelectorAll('.word-inner')

  gsap.to(inners, {
    y: 0,
    duration: 0.9,
    ease: 'power3.out',
    stagger: 0.04,
    delay,
    scrollTrigger: {
      trigger: element,
      start: 'top 88%',
    }
  })
}

export function revealTextImmediate(element: Element, delay = 0) {
  const text = element.textContent || ''
  const words = text.split(' ')
  element.innerHTML = words
    .map(w => `<span class="word" style="overflow:hidden;display:inline-block;"><span class="word-inner" style="display:inline-block;transform:translateY(105%)">${w}</span></span>`)
    .join(' ')
  const inners = element.querySelectorAll('.word-inner')
  gsap.to(inners, { y: 0, duration: 1, ease: 'power3.out', stagger: 0.05, delay })
}

export function revealLines(elements: NodeListOf<Element> | Element[], delayOffset = 0) {
  Array.from(elements).forEach((el, i) => {
    revealText(el, delayOffset + i * 0.1)
  })
}
