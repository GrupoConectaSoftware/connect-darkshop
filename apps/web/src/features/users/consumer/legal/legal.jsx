import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import NavegationLayout from './layout/navegationLayout'
import SidebarComponent from './components/sidebarComponent'
import LegalContent from './components/legalContent'

export default function Legal() {
  const [query, setQuery] = useState('')

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-dark-white text-dark-950">
      <NavegationLayout />

      <main className="min-h-0 flex-1 scroll-smooth overflow-y-auto overscroll-contain px-4 py-7 sm:px-7 sm:py-10 lg:px-10 xl:px-16" data-scroll-ignore>
        <div className="mx-auto w-full max-w-[1400px] pb-10">
          <div className="border-b border-dark-200 pb-7 sm:pb-9">
            <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide">
              <Link to="/" className="text-dark-red transition-colors hover:text-dark-950">Inicio</Link>
              <span aria-hidden="true" className="text-dark-400">/</span>
              <span className="text-dark-600">Conozca todo acerca de información</span>
            </nav>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] uppercase tracking-[-0.05em] text-dark-950">Información legal</h1>
            <p className="mt-3 max-w-2xl text-sm font-light text-dark-500 sm:text-base">Consulta las condiciones, políticas y reglas que regulan el uso de Darkshop.</p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="relative block w-full max-w-2xl">
                <span className="sr-only">Buscar en información legal</span>
                <Search aria-hidden="true" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Consultarás tus dudas sobre nuestra términos legales."
                  className="h-12 w-full border border-dark-200 bg-dark-50 pl-11 pr-4 text-sm text-dark-950 outline-none transition-colors placeholder:text-dark-400 focus:border-dark-950 focus:bg-dark-white"
                />
              </label>
              <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.16em] text-dark-red">Última actualización: 12 de octubre de 2026</p>
            </div>
          </div>

          <div className="grid gap-8 pt-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-24 xl:grid-cols-[19rem_minmax(0,1fr)] xl:gap-32">
            <SidebarComponent />
            <LegalContent query={query} />
          </div>
        </div>
      </main>
    </div>
  )
}
