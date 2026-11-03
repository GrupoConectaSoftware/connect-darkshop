import { useEffect, useState } from 'react'

export default function useHideOnScroll(threshold = 0.2) {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollThreshold = window.innerHeight * threshold

      if (currentScrollY > scrollThreshold) {
        setIsHidden(currentScrollY > lastScrollY)
      } else {
        setIsHidden(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return isHidden
}
