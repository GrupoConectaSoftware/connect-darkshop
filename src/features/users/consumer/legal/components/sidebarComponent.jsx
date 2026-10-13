import { LEGAL_SECTIONS } from '../data/legal'

export default function SidebarComponent() {
  return (
    <aside className="h-fit lg:sticky lg:top-0">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-dark-red">Contenido</p>
      <nav aria-label="Índice de contenido" className="grid grid-cols-1 gap-x-5 gap-y-1 sm:grid-cols-2 lg:grid-cols-1">
        {LEGAL_SECTIONS.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="group flex items-center gap-3 border-b border-dark-200 px-1 py-2.5 text-[11px] font-medium uppercase tracking-wide text-dark-500 transition-colors hover:text-dark-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">
            <span className="text-[9px] tabular-nums text-dark-400 group-hover:text-dark-red">{section.number}</span>
            <span>{section.title}</span>
            <span aria-hidden="true" className="ml-auto text-dark-red opacity-0 transition-opacity group-hover:opacity-100">✓</span>
          </a>
        ))}
      </nav>
    </aside>
  )
}
