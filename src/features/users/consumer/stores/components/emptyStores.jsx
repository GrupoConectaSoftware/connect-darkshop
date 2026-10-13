import { ArrowUpRight, SearchX, SlidersHorizontal, Store } from 'lucide-react'

export default function EmptyStores({ onClear }) {
  return (
    <section className="relative col-span-full overflow-hidden border border-dark-200 bg-dark-white" aria-labelledby="empty-stores-title">
      <span aria-hidden="true" className="pointer-events-none absolute -right-5 -top-8 z-0 font-display text-[clamp(11rem,28vw,23rem)] leading-none tracking-[-0.1em] text-dark-950/[0.035]">0</span>
      <div className="relative z-10 grid min-h-[32rem] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
        <div className="flex flex-col justify-between bg-dark-950 p-7 text-dark-white sm:p-10">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-dark-red">
              <span className="h-px w-8 bg-dark-red" />Catálogo de tiendas
            </div>
            <h2 id="empty-stores-title" className="mt-7 max-w-sm font-display text-[clamp(2.25rem,5vw,4.5rem)] uppercase leading-[0.88] tracking-[-0.055em]">No encontramos tu próxima tienda.</h2>
          </div>
          <div className="mt-12 border-t border-dark-700 pt-5">
            <p className="text-xs font-light leading-relaxed text-dark-300">La selección cambia constantemente. Ajusta tus filtros para descubrir nuevas piezas, marcas y espacios aliados.</p>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-dark-400">Darkshop · Tiendas aliadas</p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
          <span className="grid size-14 place-items-center border border-dark-950 bg-dark-white text-dark-950"><SearchX size={27} strokeWidth={1.4} /></span>
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.2em] text-dark-red">Sin coincidencias</p>
          <h3 className="mt-3 max-w-md font-display text-3xl uppercase leading-[0.92] tracking-[-0.04em] text-dark-950 sm:text-4xl">Prueba otra combinación.</h3>
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-dark-500">No hay tiendas que coincidan con los filtros actuales. Elimina una categoría, cambia la ciudad o vuelve a explorar el catálogo completo.</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button type="button" onClick={onClear} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 bg-dark-950 px-5 text-xs font-bold uppercase tracking-wide text-dark-white transition-colors hover:bg-dark-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-red"><SlidersHorizontal size={16} />Limpiar filtros</button>
            <span className="inline-flex items-center gap-2 text-[11px] text-dark-500"><Store size={15} /><span>Vuelve a ver todas las tiendas.</span><ArrowUpRight size={14} /></span>
          </div>
        </div>
      </div>
    </section>
  )
}
