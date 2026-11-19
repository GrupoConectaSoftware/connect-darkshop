import { useMemo, useState } from 'react'
import posterImage from '../../../../assets/Poster/imagesPoster.webp'
import { Link } from 'react-router-dom'
import { LayoutGrid, GalleryHorizontal } from 'lucide-react'
import IntroductionSection from './sections/introductionSection'
import CarouselSection from './sections/carouselSection'
import { COLLECTIONS, COLLECTION_CATEGORIES } from '../../../../data/collections.js'

export default function Poster() {
  const [cursor, setCursor] = useState(0)
  const [viewMode, setViewMode] = useState('carousel')
  const [category, setCategory] = useState('todos')
  const visibleCollections = useMemo(() => COLLECTIONS.filter((item) => category === 'todos' || item.category === category), [category])
  const activeIndex = visibleCollections.length ? ((cursor % visibleCollections.length) + visibleCollections.length) % visibleCollections.length : 0
  const move = (direction) => { if (visibleCollections.length) setCursor((current) => current + direction) }
  const selectCategory = (nextCategory) => {
    setCategory(nextCategory)
    setCursor(0)
  }
  return (
    <main className="relative flex h-dvh min-h-0 flex-col overflow-hidden bg-[#e5e5e5]">
      <img src={posterImage} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 size-full object-cover object-center" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 h-75 w-75 -translate-x-1/2 translate-y-1/2 rounded-full bg-black/40 blur-[80px]" />
      <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-75 w-75 translate-x-1/2 translate-y-1/2 rounded-full bg-black/40 blur-[80px]" />
      <div aria-hidden="true" className="pointer-events-none absolute right-4 top-8 z-0 hidden items-start gap-3 lg:flex"><span className="h-28 w-px bg-neutral-400" /><span className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500 [writing-mode:vertical-rl] dark:text-gray-400">Más que una prenda. Un estilo</span></div>
      <IntroductionSection collections={visibleCollections} categories={COLLECTION_CATEGORIES} category={category} onCategoryChange={selectCategory} activeIndex={activeIndex} onMove={move} />
      <button type="button" onClick={() => setViewMode(viewMode === 'carousel' ? 'grid' : 'carousel')} aria-label={viewMode === 'carousel' ? 'Ver colecciones en cuadrícula' : 'Ver colecciones en carrusel'} className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-neutral-300 bg-white/90 text-neutral-900 transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700 lg:right-10 lg:top-10 dark:text-white">
        {viewMode === 'carousel' ? <LayoutGrid size={19} /> : <GalleryHorizontal size={19} />}
      </button>
      {viewMode === 'carousel' ? <CarouselSection collections={visibleCollections} cursor={cursor} onMove={move} /> : <div className="relative z-10 mx-auto mt-6 min-h-0 w-full max-w-[1600px] flex-1 overflow-y-auto px-6 pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-10 lg:px-16"><div className="grid auto-rows-[250px] grid-cols-2 gap-4 lg:grid-cols-4">{visibleCollections.map((collection) => <Link key={collection.id} to={`/collection/${collection.slug}`} className={`group relative overflow-hidden rounded-xl bg-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-700 ${['estampadas', 'filosoficas'].includes(collection.slug) ? 'lg:row-span-2' : ''}`}><img src={collection.image} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent"/><span className="absolute bottom-4 left-4 text-lg font-black uppercase text-white sm:text-2xl">{collection.label}</span></Link>)}</div></div>}

    </main>
  )
}
