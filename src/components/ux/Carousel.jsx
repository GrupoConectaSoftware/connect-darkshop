import { useEffect, useState } from 'react'

export default function Carousel({
  items,
  interval = 5000,
  className = '',
  renderItem = (item) => item,
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const itemCount = items.length

  useEffect(() => {
    if (itemCount < 2) return undefined

    const carouselTimer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % itemCount)
    }, interval)

    return () => window.clearInterval(carouselTimer)
  }, [interval, itemCount])

  if (!itemCount) return null

  return (
    <div className={className} role="region" aria-roledescription="carrusel">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${(activeIndex % itemCount) * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="w-full shrink-0" aria-hidden={index !== activeIndex % itemCount}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  )
}
