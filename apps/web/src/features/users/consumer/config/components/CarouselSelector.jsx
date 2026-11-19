import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

export default function CarouselSelector({ title, subtitle, items, selectedItems, onToggle, ariaLabel }) {
  const rail = useRef(null)
  const move = (direction) => rail.current?.scrollBy({ left: direction * 240, behavior: 'smooth' })

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 shadow-sm transition-all duration-200 hover:border-neutral-700">
      <div className="flex items-start justify-between gap-4">
        <div><h2 className="text-sm font-bold text-white">{title}</h2><p className="mt-1 text-xs text-neutral-500 dark:text-gray-400">{subtitle}</p></div>
        <span className="shrink-0 text-xs text-neutral-500 dark:text-gray-400">{selectedItems.length}/{items.length}</span>
      </div>
      <div className="relative mt-4">
        <button type="button" onClick={() => move(-1)} aria-label={`Ver opciones anteriores de ${ariaLabel || title}`} className="absolute left-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 shadow-md transition-all duration-200 hover:border-neutral-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"><ChevronLeft size={16}/></button>
        <div ref={rail} aria-label={ariaLabel || title} className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth px-10 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((item) => {
            const selected = selectedItems.includes(item.id)
            return <button key={item.id} type="button" aria-pressed={selected} onClick={() => onToggle(item.id)} className={`relative min-w-28 snap-start rounded-xl border px-4 py-3 text-xs font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${selected ? 'border-neutral-950 bg-[#111] text-white shadow-sm' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-600 hover:text-white hover:shadow-sm'}`}>
              <span>{item.label}</span>{selected && <CheckCircle2 aria-hidden="true" size={15} className="absolute right-2 top-2 text-white"/>}
            </button>
          })}
        </div>
        <button type="button" onClick={() => move(1)} aria-label={`Ver más opciones de ${ariaLabel || title}`} className="absolute right-0 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 shadow-md transition-all duration-200 hover:border-neutral-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"><ChevronRight size={16}/></button>
      </div>
    </section>
  )
}
