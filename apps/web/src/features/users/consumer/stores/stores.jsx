import { useMemo, useState } from 'react'
import storesSection from '../../../../assets/Sections/stores/catalogo/storesSection.webp'
import { storesCatalogData } from '../../../../data/storesCatalog'
import { EMPTY_STORE_FILTERS, STORE_REFERENCES } from '../../../../data/storeFilters.js'
import StoresContent from './components/storesContent'
import StoresFiltrer from './components/storesFiltrer'
import StoresHero from './components/storesHero'
import NavStores from './layouts/navStores'

// TODO: reemplazar este mock por la consulta de tiendas cuando esté disponible el backend.
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
const matchesAny = (storeValues, selectedValues) => selectedValues.length === 0 || selectedValues.some((value) => storeValues.includes(value))

export default function Stores() {
  const [filters, setFilters] = useState(() => ({ ...EMPTY_STORE_FILTERS, categories: [], references: [] }))

  const filteredStores = useMemo(() => storesCatalogData.filter((store) => {
    const storeSearchMatch = !filters.storeSearch || normalize(`${store.name} ${store.subtitle} ${store.description}`).includes(normalize(filters.storeSearch))
    const citySearchMatch = !filters.citySearch || normalize(store.city).includes(normalize(filters.citySearch))
    const cityMatch = !filters.inMyCity || normalize(store.city).startsWith('cali')
    const selectedReferenceValues = filters.references.map((referenceId) => STORE_REFERENCES.find((reference) => reference.id === referenceId)?.value).filter(Boolean)
    return storeSearchMatch && citySearchMatch && cityMatch && matchesAny(store.categories, filters.categories) && matchesAny(store.references, selectedReferenceValues)
  }), [filters])

  const clearFilters = () => {
    const clearedFilters = { ...EMPTY_STORE_FILTERS, categories: [], references: [] }
    setFilters(clearedFilters)
  }

  return (
    <div className="min-h-dvh bg-dark-white text-dark-950 dark:bg-[#1a1a1d] dark:text-white">
      <NavStores />
      <main className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <StoresHero image={storesSection} />
        <div className="mt-10 grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[19rem_minmax(0,1fr)] xl:gap-10">
          <StoresFiltrer filters={filters} onChange={setFilters} onClear={clearFilters} onApply={setFilters} />
          <StoresContent stores={filteredStores} onClear={clearFilters} />
        </div>
      </main>
    </div>
  )
}
