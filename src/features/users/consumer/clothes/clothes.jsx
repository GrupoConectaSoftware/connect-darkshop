import { useMemo, useState } from 'react'
import presentationSection from '../../../../assets/Sections/clothes/presentation/presentationSection.webp'
import camisetasSection from '../../../../assets/Sections/clothes/category/camisetasSection.webp'
import hoddiesSection from '../../../../assets/Sections/clothes/category/hoddiesSection.webp'
import pantalonesSection from '../../../../assets/Sections/clothes/category/pantalonesSection.webp'
import zapatosSection from '../../../../assets/Sections/clothes/category/zapatosSection.webp'
import accesoriosSection from '../../../../assets/Sections/clothes/category/accesoriosSection.webp'
import exclusivoSection from '../../../../assets/Sections/clothes/category/exclusivoSection.webp'
import outletOne from '../../../../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../../../../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../../../../assets/Sections/homespages/outlet/products/outletTres.webp'
import outletFour from '../../../../assets/Sections/homespages/outlet/products/outletCuatro.webp'
import ClothesCategories from './components/clothesCategories'
import ClothesContent from './components/clothesContent'
import ClothesFilter from './components/clothesFilter'
import ClothesHero from './components/clothesHero'
import NavClothes from './layouts/navClothes'

const categories = [
  { name: 'Camisetas', image: camisetasSection },
  { name: 'Chaquetas', image: hoddiesSection },
  { name: 'Pantalones', image: pantalonesSection },
  { name: 'Zapatos', image: zapatosSection },
  { name: 'Accesorios', image: accesoriosSection },
  { name: 'Exclusivo', image: exclusivoSection },
]

const templates = [
  { name: 'Camiseta oversize Nantes Blueprint', description: 'Algodón de alto gramaje, corte amplio y acabado minimalista para un estilo urbano auténtico.', image: outletTwo, brand: 'DYNAMO BRAND', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#f5f5f3'], colorFilters: ['negro', 'blanco'], unavailableSizes: ['XL'], category: 'Camisetas', gender: 'Hombre', references: ['Oversize', 'Casual'], city: 'Cali', badge: { label: 'Descuento', variant: 'descuento' } },
  { name: 'Camiseta oversize angelical Medusa', description: 'Silueta amplia y precisa, pensada para sostener el peso visual de cualquier look.', image: outletFour, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#7d0b1d'], colorFilters: ['negro', 'vinotinto'], unavailableSizes: ['L'], category: 'Camisetas', gender: 'Hombre', references: ['Oversize', 'Gótico'], city: 'Cali', badge: { label: 'Obsequio', variant: 'obsequio' } },
  { name: 'Hoodie edición 10 aniversario', description: 'Felpa premium, caída amplia y una silueta creada para todos los días.', image: outletOne, brand: 'MONCLER FRIEND', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#d9d9d9'], colorFilters: ['negro', 'gris'], unavailableSizes: ['XXL'], category: 'Chaquetas', gender: 'Hombre', references: ['Grunge', 'Underground'], city: 'Bogotá', badge: { label: 'Nuevo drop', variant: 'recommended' } },
  { name: 'Camiseta oversize mate oceánica', description: 'Algodón de alto gramaje con un tono azul profundo y un acabado limpio.', image: outletThree, brand: 'AMERICAN EAGLE', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#1f3653'], colorFilters: ['negro'], unavailableSizes: ['S'], category: 'Camisetas', gender: 'Hombre', references: ['Casual', 'Oversize'], city: 'Cali', badge: { label: 'Recomendado', variant: 'recommended' } },
  { name: 'Camiseta oversize Arcangel San Miguel', description: 'Una prenda de presencia sobria, corte amplio y detalles gráficos al reverso.', image: outletFour, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#f5f5f3'], colorFilters: ['negro', 'blanco'], unavailableSizes: ['XL'], category: 'Camisetas', gender: 'Unisex', references: ['Gótico', 'Oversize'], city: 'Medellín', badge: { label: 'Obsequio', variant: 'obsequio' } },
  { name: 'Hoodie Arcangel Black Archive', description: 'Construcción pesada, textura suave y un fit relajado para capas de ciudad.', image: outletOne, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#333333'], colorFilters: ['negro'], unavailableSizes: ['M'], category: 'Chaquetas', gender: 'Unisex', references: ['Grunge', 'Streetwear'], city: 'Cali', badge: { label: 'Recomendado', variant: 'recommended' } },
]

const products = templates.concat(templates.slice(1, 5)).map((template, index) => {
  const price = 35000 + (index % 5) * 5000
  const originalPrice = template.badge?.variant === 'descuento' ? price + 40500 : null

  return {
    ...template,
    id: `catalog-${index + 1}`,
    slug: `${template.name}-${index + 1}`,
    name: index > 5 ? `${template.name} ${String(index + 1).padStart(2, '0')}` : template.name,
    price,
    originalPrice,
    discount: originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  }
})

const INITIAL_FILTERS = {
  categories: ['Camisetas'],
  genders: ['Hombre'],
  references: ['Oversize', 'Casual', 'Gótico', 'Grunge'],
  sizes: [],
  colors: [],
  cities: ['Cali'],
  price: [0, 250000],
}

const includesAny = (values, options) => options.length === 0 || options.some((option) => values.includes(option))

export default function Clothes() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const filteredProducts = useMemo(() => products.filter((product) => (
    includesAny([product.category], filters.categories)
    && includesAny([product.gender], filters.genders)
    && includesAny(product.references, filters.references)
    && includesAny(product.sizes, filters.sizes)
    && includesAny(product.colorFilters, filters.colors)
    && includesAny([product.city], filters.cities)
    && product.price >= filters.price[0]
    && product.price <= filters.price[1]
  )), [filters])
  const clearFilters = () => setFilters({ ...INITIAL_FILTERS, categories: [], genders: [], references: [], cities: [], sizes: [], colors: [], price: [0, 250000] })
  const selectCategory = (category) => {
    setFilters((current) => ({ ...current, categories: [category] }))
    requestAnimationFrame(() => document.getElementById('catalog-products')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className="min-h-dvh bg-dark-white text-dark-950">
      <NavClothes />
      <main className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
        <ClothesHero image={presentationSection} />
        <ClothesCategories categories={categories} onSelect={selectCategory} />
        <div id="catalog-products" className="mt-10 grid scroll-mt-6 gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:items-start xl:gap-10">
          <ClothesFilter filters={filters} onChange={setFilters} onClear={clearFilters} />
          <ClothesContent products={filteredProducts} />
        </div>
      </main>
    </div>
  )
}
