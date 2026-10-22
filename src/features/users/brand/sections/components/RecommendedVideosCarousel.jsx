import { useEffect, useRef, useState } from 'react'

export default function RecommendedVideosCarousel({ videos, className = '' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const videoRef = useRef(null)
  const nextVideo = () => setActiveIndex((index) => (index + 1) % videos.length)

  useEffect(() => {
    if (isPaused || videos.length < 2) return undefined
    const timer = window.setTimeout(nextVideo, 7000)
    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, videos.length])

  useEffect(() => {
    videoRef.current?.play().catch(() => {})
  }, [activeIndex])

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false) }} className={`relative aspect-[9/16] w-full overflow-hidden bg-black ${className}`}>
      <video ref={videoRef} key={videos[activeIndex]} src={videos[activeIndex]} muted autoPlay playsInline onEnded={nextVideo} className="absolute inset-0 size-full object-cover" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 to-transparent" />
      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {videos.map((video, index) => <button key={video} type="button" aria-label={`Ver video ${index + 1}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => setActiveIndex(index)} className={`h-1.5 cursor-pointer rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${index === activeIndex ? 'w-7 bg-white' : 'w-1.5 bg-white/55 hover:bg-white'}`} />)}
      </div>
    </div>
  )
}
