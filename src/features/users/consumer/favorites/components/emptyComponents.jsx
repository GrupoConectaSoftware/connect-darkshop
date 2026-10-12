import { ArrowRight, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyComponents() {
  return (
    <section className="grid overflow-hidden border border-dark-200 bg-dark-white lg:grid-cols-[minmax(15rem,.72fr)_minmax(0,1.28fr)]">
      <div className="relative min-h-56 overflow-hidden bg-dark-950 p-7 text-dark-white sm:p-9 lg:min-h-[420px] lg:p-11">
        <p className="relative z-10 text-[10px] font-semibold uppercase tracking-[0.22em] text-dark-300">01 — Archivo personal</p>
        <Heart aria-hidden="true" strokeWidth={1} className="absolute -bottom-12 -right-10 size-64 text-dark-white/10 sm:size-72" />
        <div className="relative z-10 mt-16 lg:mt-44">
          <span className="block h-px w-11 bg-dark-red" />
          <p className="mt-4 font-display text-3xl uppercase leading-[0.86] tracking-[-0.045em] sm:text-4xl">Tu selección<br />empieza hoy.</p>
        </div>
      </div>

      <div className="flex min-h-72 items-center px-7 py-12 sm:px-10 lg:min-h-[420px] lg:px-14">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dark-red">Nada guardado todavía</p>
          <h2 className="mt-4 font-display text-[clamp(2.2rem,5vw,4.3rem)] uppercase leading-[0.87] tracking-[-0.055em] text-dark-950">Elige lo que<br />te representa.</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-dark-600 sm:text-base">Cada prenda que guardes construye un archivo temporal para volver a tus piezas favoritas cuando quieras.</p>
          <Link to="/#coleccion" className="mt-8 inline-flex h-12 items-center gap-3 border border-dark-950 bg-dark-950 px-5 text-xs font-semibold uppercase tracking-wide text-dark-white transition-colors hover:border-dark-burgundy hover:bg-dark-burgundy">
            Explorar colección <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
