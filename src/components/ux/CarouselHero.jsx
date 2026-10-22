import { useEffect, useRef, useState } from 'react'

export default function CarouselHero({
  images = [],
  delay = 3000,
  duration = 1000,
  className = '',
  id,
}) {
  const [slide, setSlide] = useState({ index: 0, direction: 1 })
  const hasStarted = useRef(false)
  const imageCount = images.length
  const activeIndex = imageCount ? slide.index % imageCount : 0

  useEffect(() => {
    if (imageCount < 2) return undefined

    const timer = window.setTimeout(() => {
      hasStarted.current = true

      setSlide(({ index, direction }) => {
        let nextDirection = direction

        if (index === imageCount - 1) nextDirection = -1
        if (index === 0) nextDirection = 1

        return {
          index: index + nextDirection,
          direction: nextDirection,
        }
      })
    }, hasStarted.current ? delay + duration : delay)

    return () => window.clearTimeout(timer)
  }, [activeIndex, delay, duration, imageCount])

  if (!imageCount) return null

  return (
    <section
      className={`relative overflow-hidden ${className}`}
      id={id}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Imágenes destacadas"
    >
      <div
        className="flex h-full transition-transform ease-in-out"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transitionDuration: `${duration}ms`,
        }}
      >
        {images.map((image, index) => {
          const imageData = typeof image === 'string' ? { src: image, alt: '' } : image

          return (
            <div
              key={`${imageData.src}-${index}`}
              className="h-full w-full shrink-0"
              aria-hidden={index !== activeIndex}
            >
              <picture className="block h-full w-full">
                {imageData.mobileSrc && (
                  <source media="(max-width: 767px)" srcSet={imageData.mobileSrc} />
                )}
                <img
                  src={imageData.src}
                  alt={imageData.alt || ''}
                  className="block h-full w-full object-cover object-center"
                />
              </picture>
            </div>
          )
        })}
      </div>
    </section>
  )
}
