import { useEffect, useRef } from 'react'

export default function InfiniteMarquee({ children, speed = 50, direction = 'left', gapClass = 'gap-5', className = '' }) {
  const trackRef = useRef(null)
  const groupRef = useRef(null)
  const motionRef = useRef({ speed, direction })

  useEffect(() => {
    motionRef.current = { speed, direction }
  }, [speed, direction])

  useEffect(() => {
    const track = trackRef.current
    const group = groupRef.current
    if (!track || !group) return undefined

    let frameId
    let lastTimestamp
    let offset = motionRef.current.direction === 'right' ? -group.scrollWidth : 0

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const delta = (timestamp - lastTimestamp) / 1000
      const loopWidth = group.scrollWidth
      const { speed: currentSpeed, direction: currentDirection } = motionRef.current

      if (loopWidth > 0) {
        offset += (currentDirection === 'left' ? -1 : 1) * currentSpeed * delta

        if (offset <= -loopWidth) offset += loopWidth
        if (offset > 0) offset -= loopWidth

        track.style.transform = `translate3d(${offset}px, 0, 0)`
      }
      lastTimestamp = timestamp
      frameId = window.requestAnimationFrame(animate)
    }

    frameId = window.requestAnimationFrame(animate)
    return () => window.cancelAnimationFrame(frameId)
  }, [])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1, 2].map((groupIndex) => <div key={groupIndex} ref={groupIndex === 0 ? groupRef : undefined} className={`flex shrink-0 ${gapClass}`}>{children}</div>)}
      </div>
    </div>
  )
}
