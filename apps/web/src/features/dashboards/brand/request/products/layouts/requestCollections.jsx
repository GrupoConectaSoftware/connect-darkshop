import { collectionsData } from '../../../../../../data/collections'
import ChoiceCard from '../components/ChoiceCard'
import { useRef, useState } from 'react'
import CarouselControls from '../../../../../../components/ui/carousel/CarouselControls'

const options = [
  ['angelicales', 'Estilo limpio y etéreo.'], ['overside', 'Siluetas amplias y urbanas.'],
  ['filosoficas', 'Conceptos y simbolismo.'], ['difuminadas', 'Texturas y transiciones.'],
]

export default function RequestCollections({ data, update }) {
  const scrollRef = useRef(null)
  const [search, setSearch] = useState('')
  return <div className="space-y-5">
    <fieldset><legend className="text-2xl font-black">Submarcas</legend>
      <div className="mb-3 flex items-center justify-end gap-3"><input aria-label="Buscar submarca" placeholder="Buscar marca" value={search} onChange={e => setSearch(e.target.value)} className="w-40 rounded-lg border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-600" /><CarouselControls scrollRef={scrollRef} /></div>
      <div ref={scrollRef} className="flex gap-2 overflow-x-auto">{['DARK', 'Nike', 'Adidas', 'Puma', 'Reebok', 'New Balance'].filter(brand => brand.toLowerCase().includes(search.toLowerCase())).map(brand => (
        <button type="button" key={brand} aria-pressed={data.brand === brand} onClick={() => update({ brand })}
          className="min-w-32 grow rounded-xl border border-neutral-300 px-4 py-3 font-bold aria-pressed:bg-black aria-pressed:text-white dark:border-neutral-600 dark:aria-pressed:bg-white dark:aria-pressed:text-black">{brand}</button>
      ))}</div>
    </fieldset>
    <fieldset><legend className="mb-4 text-2xl font-black">Colecciones</legend>
      <div className="grid auto-rows-[14rem] grid-cols-2 gap-2 p-1 sm:auto-rows-[19rem] sm:grid-cols-4">
        {options.map(([id, description]) => <ChoiceCard key={id} item={collectionsData.find(c => c.id === id)}
          description={description} selected={data.collection === id} onSelect={collection => update({ collection })} />)}
      </div>
    </fieldset>
  </div>
}
