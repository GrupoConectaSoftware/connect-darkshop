import { useMemo, useState } from 'react'
import storesSection from '../../../../assets/Sections/stores/catalogo/storesSection.webp'
import businessUno from '../../../../assets/Sections/stores/business/businessUno.webp'
import businessDos from '../../../../assets/Sections/stores/business/businessDos.webp'
import businessTres from '../../../../assets/Sections/stores/business/businessTres.webp'
import businessCuatro from '../../../../assets/Sections/stores/business/businessCuatro.webp'
import businessCinco from '../../../../assets/Sections/stores/business/businessCinco.webp'
import businessSeis from '../../../../assets/Sections/stores/business/businessSeis.webp'
import businessSiete from '../../../../assets/Sections/stores/business/businessSiete.webp'
import { EMPTY_STORE_FILTERS, STORE_REFERENCES } from '../../../../components/ui/filters/StoreFilters'
import StoresContent from './components/storesContent'
import StoresFiltrer from './components/storesFiltrer'
import StoresHero from './components/storesHero'
import NavStores from './layouts/navStores'

// TODO: reemplazar este mock por la consulta de tiendas cuando esté disponible el backend.
const STORES = [
  { id: 1, slug: 'dark', name: 'Dark', subtitle: 'Underground elegante algodón', description: 'Somos una tienda especializada en prendas principalmente monocromáticas con estilos y estampados únicos para cada ocasión.', image: businessUno, city: 'Cali, Colombia', productsCount: 140, badge: 'En tu ciudad', initial: 'D', categories: ['Camisetas', 'Accesorios', 'Exclusivo'], references: ['Oversize', 'Casual', 'Gótico', 'Grunge'] },
  { id: 2, slug: 'void-district', name: 'Void District', subtitle: 'Streetwear de autor', description: 'Piezas esenciales con siluetas amplias, materiales honestos y una identidad pensada para la ciudad.', image: businessDos, city: 'Cali, Colombia', productsCount: 86, badge: 'En tu ciudad', initial: 'V', categories: ['Camisetas', 'Chaquetas'], references: ['Oversize', 'Streetwear', 'Casual'] },
  { id: 3, slug: 'north-archive', name: 'North Archive', subtitle: 'Archivo contemporáneo', description: 'Una selección de prendas atemporales que une cultura urbana, capas y detalles funcionales.', image: businessTres, city: 'Bogotá, Colombia', productsCount: 92, badge: 'En tu ciudad', initial: 'N', categories: ['Camisetas', 'Pantalones'], references: ['Oversize', 'Minimalista', 'Grunge'] },
  { id: 4, slug: 'noche-studio', name: 'Noche Studio', subtitle: 'Minimalismo oscuro', description: 'Diseños de líneas limpias y tonos profundos para construir un uniforme con carácter propio.', image: businessCuatro, city: 'Medellín, Colombia', productsCount: 58, badge: null, initial: 'N', categories: ['Camisetas', 'Zapatos'], references: ['Casual', 'Gótico', 'Minimalista'] },
  { id: 5, slug: 'taller-11', name: 'Taller 11', subtitle: 'Hecho en Colombia', description: 'Prendas hechas para durar, con procesos locales y acabados que revelan el detalle de cada pieza.', image: businessCinco, city: 'Cali, Colombia', productsCount: 71, badge: 'En tu ciudad', initial: 'T', categories: ['Camisetas', 'Chaquetas', 'Exclusivo'], references: ['Oversize', 'Grunge', 'Underground'] },
  { id: 6, slug: 'forma-sur', name: 'Forma Sur', subtitle: 'Diseño sin ruido', description: 'Una tienda dedicada a básicos elevados, texturas sobrias y proporciones que se sienten actuales.', image: businessSeis, city: 'Pasto, Colombia', productsCount: 64, badge: null, initial: 'F', categories: ['Camisetas', 'Pantalones'], references: ['Casual', 'Básico', 'Minimalista'] },
  { id: 7, slug: 'blackroom', name: 'Blackroom', subtitle: 'Cultura alternativa', description: 'Referencias underground, gráficos expresivos y una curaduría para looks que no siguen el molde.', image: businessSiete, city: 'Bogotá, Colombia', productsCount: 113, badge: null, initial: 'B', categories: ['Camisetas', 'Accesorios'], references: ['Gótico', 'Grunge', 'Streetwear'] },
  { id: 8, slug: 'linea-cero', name: 'Línea Cero', subtitle: 'Esenciales urbanos', description: 'Una colección directa de prendas cómodas y versátiles para usar todos los días sin repetir fórmula.', image: businessUno, city: 'Barranquilla, Colombia', productsCount: 78, badge: null, initial: 'L', categories: ['Camisetas', 'Pantalones'], references: ['Casual', 'Urbano', 'Básico'] },
  { id: 9, slug: 'circuito', name: 'Circuito', subtitle: 'Diseño experimental', description: 'Volúmenes, gráficos y accesorios seleccionados para quienes buscan otra forma de vestir la ciudad.', image: businessDos, city: 'Manizales, Colombia', productsCount: 49, badge: null, initial: 'C', categories: ['Camisetas', 'Accesorios'], references: ['Oversize', 'Gótico', 'Techwear'] },
]

const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
const matchesAny = (storeValues, selectedValues) => selectedValues.length === 0 || selectedValues.some((value) => storeValues.includes(value))

export default function Stores() {
  const [filters, setFilters] = useState(() => ({ ...EMPTY_STORE_FILTERS, categories: [], references: [] }))

  const filteredStores = useMemo(() => STORES.filter((store) => {
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
    <div className="min-h-dvh bg-dark-white text-dark-950">
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
