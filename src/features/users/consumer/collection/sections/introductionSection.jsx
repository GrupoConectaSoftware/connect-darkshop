import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Share2 } from 'lucide-react'
import ShareCollectionModal from '../components/ShareCollectionModal'

export default function IntroductionSection({ collection }) {
  const [isShareOpen, setIsShareOpen] = useState(false)
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-12 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[0.65rem] font-semibold uppercase tracking-wider text-neutral-500">
        <nav aria-label="Miga de pan" className="flex flex-wrap items-center gap-2">
          <Link to="/logged" className="text-dark-red transition-colors hover:text-dark-burgundy">Inicio</Link><span>/</span><span>DARK</span><span>/</span><span>Colecciones</span><span>/</span><span className="text-neutral-950">{collection.label}</span>
        </nav>
        <p className="whitespace-nowrap font-bold tracking-[0.16em] text-neutral-500">COLECCIONES&nbsp;&nbsp; 01/10&nbsp;&nbsp; | &nbsp;&nbsp;15 PRENDAS</p>
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <h2 className="inline-flex items-center gap-3 text-6xl font-black uppercase leading-none tracking-tighter text-neutral-950 sm:text-7xl lg:text-8xl">{collection.label}<button type="button" onClick={() => setIsShareOpen(true)} aria-label={`Compartir colección ${collection.label}`} className="grid size-10 shrink-0 place-items-center text-dark-red transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-red sm:size-12 lg:size-14"><Share2 className="size-8 sm:size-10 lg:size-12" strokeWidth={1.8} /></button></h2>
        <div className="max-w-lg text-sm leading-relaxed text-neutral-600"><p className="font-semibold text-neutral-950">{collection.tagline}</p><p className="mt-2">{collection.description}</p></div>
      </div>
      <ShareCollectionModal collection={collection} isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />
    </section>
  )
}
