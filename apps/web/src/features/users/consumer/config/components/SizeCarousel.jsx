import { CheckCircle2, ChevronLeft, ChevronRight, Ruler } from 'lucide-react'
import { useRef, useState } from 'react'

const SIZE_GROUPS = [
  { id: 'top', name: 'Parte superior', options: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'bottom', name: 'Parte inferior', options: ['28', '30', '32', '34', '36'] },
  { id: 'shoes', name: 'Calzado', options: ['38', '39', '40', '41', '42'] },
  { id: 'pants', name: 'Pantalones', options: ['Talla 4', 'Talla 6', 'Talla 8', 'Talla 10'] },
]

export default function SizeCarousel({ value = {}, onChange }) {
  const rail = useRef(null)
  const [sizes, setSizes] = useState(value)
  const selectSize = (group, size) => {
    const next = { ...sizes, [group]: size }
    setSizes(next)
    onChange?.(next)
  }
  const move = (direction) => rail.current?.scrollBy({ left: direction * 224, behavior: 'smooth' })

  return (
    <section className="rounded-xl border border-neutral-800 bg-neutral-950/50 p-4 shadow-sm transition-all duration-200 hover:border-neutral-700">
      <div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-neutral-800 text-white"><Ruler size={17}/></span><div><h2 className="text-sm font-bold text-white">Tallas habituales</h2><p className="mt-1 text-xs text-neutral-500">Desliza para elegir tu talla en cada categoría.</p></div></div>
      <div className="relative mt-4 flex items-center">
        <button type="button" onClick={() => move(-1)} aria-label="Ver tallas anteriores" className="absolute left-0 z-10 grid size-8 place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 shadow-md transition-all duration-200 hover:border-neutral-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"><ChevronLeft size={16}/></button>
        <div ref={rail} className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-10 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SIZE_GROUPS.map((group) => <article key={group.id} className="min-w-[200px] snap-start rounded-xl border border-neutral-800 bg-neutral-900 p-4 shadow-sm"><h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">{group.name}</h3><div className="mt-3 flex flex-wrap gap-1.5">{group.options.map((size) => { const selected = sizes[group.id] === size; return <button key={size} type="button" aria-pressed={selected} onClick={() => selectSize(group.id, size)} className={`relative rounded-md px-2.5 py-1.5 text-xs font-bold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${selected ? 'bg-[#111] text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white'}`}>{size}{selected && <CheckCircle2 size={12} className="ml-1 inline-block"/>}</button> })}</div></article>)}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Ver más tallas" className="absolute right-0 z-10 grid size-8 place-items-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-400 shadow-md transition-all duration-200 hover:border-neutral-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600"><ChevronRight size={16}/></button>
      </div>
    </section>
  )
}
