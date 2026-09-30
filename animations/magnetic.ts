export function initMagnetic(el: HTMLElement, strength = 0.4) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }
  const handleMouseLeave = () => {
    el.style.transform = 'translate(0px, 0px)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
  }
  const handleMouseEnter = () => {
    el.style.transition = 'transform 0.1s linear'
  }
  el.addEventListener('mousemove', handleMouseMove)
  el.addEventListener('mouseleave', handleMouseLeave)
  el.addEventListener('mouseenter', handleMouseEnter)
  return () => {
    el.removeEventListener('mousemove', handleMouseMove)
    el.removeEventListener('mouseleave', handleMouseLeave)
    el.removeEventListener('mouseenter', handleMouseEnter)
  }
}
