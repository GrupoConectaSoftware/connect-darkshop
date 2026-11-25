import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function CarouselControls({ scrollRef, className = '' }) {
  const move = direction => scrollRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' })
  return <div className={`flex items-center gap-2 ${className}`}>
    <button type="button" aria-label="Desplazar a la izquierda" onClick={() => move(-1)} className="rounded-full border border-neutral-300 p-1 dark:border-neutral-600"><ChevronLeft size={18} /></button>
    <button type="button" aria-label="Desplazar a la derecha" onClick={() => move(1)} className="rounded-full border border-neutral-300 p-1 dark:border-neutral-600"><ChevronRight size={18} /></button>
  </div>
}
