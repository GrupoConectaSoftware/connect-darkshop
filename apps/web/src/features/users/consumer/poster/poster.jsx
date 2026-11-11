import { useMemo, useState } from 'react'
import posterImage from '../../../../assets/Poster/imagesPoster.webp'
import IntroductionSection from './sections/introductionSection'
import CarouselSection from './sections/carouselSection'
import { COLLECTIONS, COLLECTION_CATEGORIES } from '../../../../components/ui/cards/collectionsData'

export default function Poster() {
  const [cursor, setCursor] = useState(0)
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
      <div aria-hidden="true" className="pointer-events-none absolute right-4 top-8 z-0 hidden items-start gap-3 lg:flex"><span className="h-28 w-px bg-neutral-400" /><span className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-500 [writing-mode:vertical-rl]">MÃ¡s que una prenda. Un estilo</span></div>
      <IntroductionSection collections={visibleCollections} categories={COLLECTION_CATEGORIES} category={category} onCategoryChange={selectCategory} activeIndex={activeIndex} onMove={move} />
      <CarouselSection collections={visibleCollections} cursor={cursor} onMove={move} />

    </main>
  )
}
