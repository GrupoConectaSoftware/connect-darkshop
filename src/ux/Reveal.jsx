import { useEffect, useRef, useState } from 'react'

export default function Reveal({ as: Element = 'div', children, className = '', effect = 'rise', delay = 0, style = {}, ...props }) {
  const elementRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      setVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.16 })

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Element
      ref={elementRef}
      className={`ux-reveal ux-reveal--${effect} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--ux-reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Element>
  )
}
