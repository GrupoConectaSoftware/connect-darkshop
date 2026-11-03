import { ArrowRight, RotateCcw, SearchX, Sparkles } from 'lucide-react'

export default function EmptyClothes({ onClear }) {
  return (
    <section className="relative isolate flex min-h-[30rem] overflow-hidden border border-dark-200 bg-dark-950 px-6 py-12 text-center text-dark-white sm:px-10">
      <span aria-hidden="true" className="absolute -left-20 top-0 -z-10 size-64 rounded-full bg-dark-red/20 blur-3xl" />
      <span aria-hidden="true" className="absolute -bottom-28 right-0 -z-10 size-72 rounded-full bg-dark-burgundy/50 blur-3xl" />
      <div className="m-auto max-w-lg">
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-white/20 bg-white/5 text-dark-red"><SearchX size={31} strokeWidth={1.7} /></span>
        <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-dark-red">Sin coincidencias</p>
        <h2 className="mt-3 font-display text-3xl uppercase leading-[.9] tracking-wide sm:text-5xl">Aquí todavía no hay piezas</h2>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-dark-300 sm:text-base">Tus filtros son muy específicos. Limpia la búsqueda para volver a descubrir las piezas disponibles.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onClear} className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 bg-dark-white px-5 text-xs font-semibold uppercase tracking-wide text-dark-950 transition-colors hover:bg-dark-red hover:text-dark-white"><RotateCcw size={15} />Limpiar filtros</button>
          <span className="inline-flex h-11 items-center justify-center gap-2 border border-white/20 px-5 text-xs font-semibold uppercase tracking-wide text-dark-300"><Sparkles size={15} className="text-dark-red" />Explora sin límites <ArrowRight size={15} /></span>
        </div>
      </div>
    </section>
  )
}
