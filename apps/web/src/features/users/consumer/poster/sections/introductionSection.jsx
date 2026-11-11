import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function IntroductionSection({ collections, categories, category, onCategoryChange, activeIndex, onMove }) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-[1600px] shrink-0 flex-col gap-5 px-6 pt-6 sm:px-10 sm:pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:px-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-900 sm:text-xs">Colecciones</p>
        <h1 className="font-serif text-[clamp(2.1rem,4.3vw,5rem)] leading-[0.95] tracking-tighter text-neutral-950">Distintos estilos,<br /><span className="italic text-red-700">una misma esencia.</span></h1>
        <div className="my-3 h-0.5 w-16 bg-red-700 sm:my-4" />
        <p className="max-w-md text-sm font-medium leading-relaxed text-neutral-500">Cada colección tiene su propia identidad, pensada para que encuentres el estilo que mejor se adapte a ti.</p>
      </div>
      <div className="min-w-0 lg:w-[48%]">
        <div className="flex flex-wrap items-center justify-end gap-3">
          <p aria-live="polite" className="min-w-16 border-b-2 border-red-700 pb-2 text-sm font-semibold text-neutral-900">{String(collections.length ? activeIndex + 1 : 0).padStart(2, '0')} / {String(collections.length).padStart(2, '0')}</p>
          <button type="button" disabled={!collections.length} onClick={() => onMove(-1)} aria-label="Colección anterior" className="grid size-10 place-items-center text-neutral-500 transition-colors hover:text-neutral-950 disabled:opacity-40 focus-visible:outline focus-visible:outline-red-700"><ChevronLeft size={19} /></button>
          <button type="button" disabled={!collections.length} onClick={() => onMove(1)} aria-label="Siguiente colección" className="grid size-10 place-items-center rounded-full bg-red-700 text-white transition-colors hover:bg-red-800 disabled:opacity-40 focus-visible:outline focus-visible:outline-red-700"><ChevronRight size={19} /></button>
        </div>
        <nav aria-label="Filtrar colecciones por categoría" className="mt-4 flex justify-start gap-6 overflow-x-auto whitespace-nowrap scrollbar-none [&::-webkit-scrollbar]:hidden sm:mt-6">
          {[{ id: 'todos', label: 'Todos' }, ...categories].map((item) => <button key={item.id} type="button" onClick={() => onCategoryChange(item.id)} aria-pressed={item.id === category} className={`shrink-0 border-b-2 pb-2 text-[10px] font-bold uppercase tracking-wide transition-colors sm:text-xs ${item.id === category ? 'border-red-700 text-red-700' : 'border-transparent text-neutral-600 hover:text-neutral-950'}`}>{item.label}</button>)}
        </nav>
      </div>
    </header>
  )
}
