import { collectionsData } from '../../../../../../data/collections'
import ChoiceCard from '../components/ChoiceCard'
import { useEffect, useMemo, useRef, useState } from 'react'
import CarouselControls from '../../../../../../components/ui/carousel/CarouselControls'

export default function RequestCollections({ data, update }) {
  const brandsRef = useRef(null)
  const collectionsRef = useRef(null)
  const [search, setSearch] = useState('')
  const collections = useMemo(() => collectionsData.filter(item => item.category === (data.category === 'accesorios' ? 'gorras' : data.category)), [data.category])
  useEffect(() => { if (collectionsRef.current) collectionsRef.current.scrollLeft = 0 }, [data.category])
  return <div className="space-y-5">
    <fieldset><legend className="text-2xl font-black">Submarcas</legend>
      <div className="mb-3 flex items-center justify-end gap-3"><input aria-label="Buscar submarca" placeholder="Buscar marca" value={search} onChange={e => setSearch(e.target.value)} className="w-40 rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-600"/><CarouselControls scrollRef={brandsRef}/></div>
      <div ref={brandsRef} className="flex gap-2 overflow-x-auto">{['DARK', 'Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'].filter(brand => brand.toLowerCase().includes(search.toLowerCase())).map(brand => <button type="button" key={brand} aria-pressed={data.brand === brand} onClick={() => update({ brand })} className="min-w-32 grow rounded-xl border border-neutral-300 px-4 py-3 font-bold aria-pressed:bg-black aria-pressed:text-white dark:border-neutral-600 dark:aria-pressed:bg-white dark:aria-pressed:text-black">{brand}</button>)}</div>
    </fieldset>
    <fieldset><legend className="mb-4 text-2xl font-black">Colecciones</legend>
      {collections.length ? <><div ref={collectionsRef} className="flex gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{collections.map(item => <div key={item.id} className="h-64 w-[46%] shrink-0 sm:h-72 sm:w-[24%]"><ChoiceCard item={item} description={item.tagline} selected={data.collection === item.id} onSelect={collection => update({ collection })}/></div>)}</div><CarouselControls scrollRef={collectionsRef} className="mt-3 justify-end"/></> : <p className="rounded-xl bg-neutral-100 p-5 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300">No hay colecciones disponibles para esta categoría.</p>}
    </fieldset>
  </div>
}
