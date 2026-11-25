import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { promotionsData } from '../../data/promotions'

const VISIBLE_DOTS = 3

export default function PromotionsModal({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activePromotion = promotionsData[activeIndex]
  const dotStart = Math.min(
    Math.max(activeIndex - 1, 0),
    Math.max(promotionsData.length - VISIBLE_DOTS, 0),
  )
  const visibleDots = promotionsData.slice(dotStart, dotStart + VISIBLE_DOTS)

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') setActiveIndex((index) => (index - 1 + promotionsData.length) % promotionsData.length)
      if (event.key === 'ArrowRight') setActiveIndex((index) => (index + 1) % promotionsData.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !activePromotion) return null

  const goTo = (direction) => {
    setActiveIndex((index) => (index + direction + promotionsData.length) % promotionsData.length)
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[120] flex items-end justify-start p-4 pb-6 pl-20 sm:pl-24"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}
    >
      <section
        role="dialog"
        aria-labelledby="promotions-modal-title"
        className="pointer-events-auto relative max-h-[min(80vh,680px)] w-full max-w-md overflow-y-auto rounded-3xl border border-white/20 bg-[#0a0a0a] p-4 text-white shadow-[0_28px_90px_rgba(0,0,0,0.65)] sm:p-5"
      >
        <header className="mb-4 flex items-start justify-between gap-4 px-1">
          <div>
            <p id="promotions-modal-title" className="text-sm font-black tracking-[0.2em] text-red-500">PROMOCIONES</p>
            <p className="mt-1 text-[0.62rem] font-semibold tracking-[0.18em] text-neutral-400">OFERTAS · COLECCIONES · DROPS</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar promociones" className="rounded-full p-1.5 text-neutral-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">
            <X size={20} />
          </button>
        </header>

        <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
          <img src={activePromotion.image} alt={`${activePromotion.title}: ${activePromotion.offer}`} className="aspect-square w-full object-contain" />
          <button type="button" onClick={() => goTo(-1)} aria-label="Promoción anterior" className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/75 text-white shadow-lg transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ChevronLeft size={21} />
          </button>
          <button type="button" onClick={() => goTo(1)} aria-label="Siguiente promoción" className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/75 text-white shadow-lg transition hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <ChevronRight size={21} />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{activePromotion.title}</p>
            <p className="mt-0.5 truncate text-xs text-neutral-400">{activePromotion.subtitle} · {activePromotion.offer}</p>
          </div>
          <Link to={activePromotion.href} onClick={onClose} className="shrink-0 rounded-full bg-red-700 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-white transition hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            {activePromotion.cta}
          </Link>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2" aria-label={`Promoción ${activeIndex + 1} de ${promotionsData.length}`}>
          {visibleDots.map((promotion, index) => {
            const promotionIndex = dotStart + index
            const isActive = promotionIndex === activeIndex
            return (
              <button
                key={promotion.id}
                type="button"
                onClick={() => setActiveIndex(promotionIndex)}
                aria-label={`Ver promoción ${promotionIndex + 1}`}
                aria-current={isActive ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? 'w-6 bg-red-600' : 'w-2.5 bg-neutral-500 hover:bg-neutral-300'}`}
              />
            )
          })}
        </div>
      </section>
    </div>
  )
}
