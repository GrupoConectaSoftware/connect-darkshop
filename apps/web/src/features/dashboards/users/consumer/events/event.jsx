import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { eventsData } from '../../../../../data/events.data'
import PresentationLayout from './layout/presentationLayout'
import BentogLayout from './layout/bentogLayout'
import BadgeLayout from './layout/badgeLayout'
export default function Event({ onClose }) {
  const [index, setIndex] = useState(0)
  const closeRef = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const handleKey = event => { if (event.key === 'Escape') onClose(); if (event.key === 'ArrowLeft') setIndex(i => (i + eventsData.length - 1) % eventsData.length); if (event.key === 'ArrowRight') setIndex(i => (i + 1) % eventsData.length) }
    window.addEventListener('keydown', handleKey)
    return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', handleKey); previous?.focus() }
  }, [onClose])
  const slide = eventsData[index]
  return createPortal(<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-3 backdrop-blur-md sm:p-6" onMouseDown={onClose}><section role="dialog" aria-modal="true" aria-label="Eventos de tiendas" onMouseDown={e => e.stopPropagation()} className="relative flex max-h-[90dvh] w-full max-w-[1400px] flex-col overflow-y-auto rounded-3xl border border-white/20 bg-[#171717]/95 p-4 shadow-2xl sm:p-6 md:h-[min(700px,80dvh)]"><button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar eventos" className="absolute right-5 top-5 z-30 rounded-full bg-black/70 p-2 text-white hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-white"><X size={20}/></button><div className="relative flex min-h-0 flex-1 flex-col gap-2 md:flex-row"><PresentationLayout data={slide.main}/><BentogLayout data={slide}/><button type="button" aria-label="Evento anterior" onClick={() => setIndex(i => (i + eventsData.length - 1) % eventsData.length)} className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-black/70 p-2 text-white transition hover:bg-white hover:text-black sm:p-3"><ChevronLeft/></button><button type="button" aria-label="Siguiente evento" onClick={() => setIndex(i => (i + 1) % eventsData.length)} className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/40 bg-black/70 p-2 text-white transition hover:bg-white hover:text-black sm:p-3"><ChevronRight/></button></div><div className="mt-3 flex shrink-0 justify-center gap-2" aria-label={`Evento ${index + 1} de ${eventsData.length}`}>{eventsData.map((event, i) => <button key={event.id} type="button" aria-label={`Ver evento ${i + 1}`} aria-current={i === index ? 'true' : undefined} onClick={() => setIndex(i)} className={`size-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-neutral-500'}`}/>)}</div><BadgeLayout/></section></div>, document.body)
}
