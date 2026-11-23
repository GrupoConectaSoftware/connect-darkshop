import { useEffect, useState } from 'react'
import presentation from '../../../../../movies/Presentation/moviePresentacion.mp4'

export default function VideoIntro({ onFinish }) {
  const [phase, setPhase] = useState('playing')

  useEffect(() => {
    if (phase !== 'waiting') return undefined
    // Deja respirar el último fotograma antes de levantar la cortina.
    const timer = window.setTimeout(() => setPhase('exiting'), 900)
    return () => window.clearTimeout(timer)
  }, [phase])

  const finish = () => {
    if (phase !== 'playing') return
    try { sessionStorage.setItem('introPlayed', 'true') } catch { /* Continue if storage is unavailable. */ }
    setPhase('waiting')
  }

  return (
    <div
      onTransitionEnd={(event) => {
        if (event.target === event.currentTarget && event.propertyName === 'transform' && phase === 'exiting') onFinish()
      }}
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-black transition-transform duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] motion-reduce:duration-0 ${phase === 'exiting' ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <video src={presentation} autoPlay muted playsInline onEnded={finish} onError={finish} className="h-full w-full object-cover" />
      <button type="button" onClick={finish} disabled={phase !== 'playing'} className="absolute right-5 top-5 z-10 rounded-full border border-white/30 bg-black/40 px-5 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:pointer-events-none sm:right-8 sm:top-8">Saltar intro <span aria-hidden="true">→</span></button>
    </div>
  )
}
