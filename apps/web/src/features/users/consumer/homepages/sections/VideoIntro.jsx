import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import presentation from '../../../../../movies/Presentation/moviePresentacion.mp4'

export default function VideoIntro({ onFinish }) {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (!isClosing) return undefined
    const timer = window.setTimeout(onFinish, 1000)
    return () => window.clearTimeout(timer)
  }, [isClosing, onFinish])

  const handleClose = () => {
    if (isClosing) return
    try { sessionStorage.setItem('introPlayed', 'true') } catch { /* Continue if storage is unavailable. */ }
    setIsClosing(true)
  }

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:duration-0 ${isClosing ? '-translate-y-full' : 'translate-y-0'}`}>
      <video src={presentation} autoPlay muted playsInline onEnded={handleClose} onError={handleClose} className="h-full w-full object-cover" />
      <button type="button" onClick={handleClose} disabled={isClosing} className="absolute bottom-12 left-1/2 z-50 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-2 text-white/80 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:pointer-events-none">
        <span className="animate-bounce-three rounded-full border border-white/30 bg-black/30 p-2 motion-reduce:animate-none"><ChevronUp size={22} /></span>
        <span className="text-[0.65rem] font-bold uppercase tracking-widest">Omitir intro</span>
      </button>
    </div>
  )
}
