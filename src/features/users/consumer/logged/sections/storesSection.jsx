import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDownUp, ArrowLeft, ArrowRight, ChevronDown, Folder, MapPin, Shirt } from 'lucide-react'
import { Link } from 'react-router-dom'
import StoreCard from '../../../../../components/ui/cards/StoreCard'
import storeOne from '../../../../../assets/Sections/stores/business/businessUno.webp'
import storeTwo from '../../../../../assets/Sections/stores/business/businessDos.webp'
import storeThree from '../../../../../assets/Sections/stores/business/businessTres.webp'
import storeFour from '../../../../../assets/Sections/stores/business/businessCuatro.webp'
import storeFive from '../../../../../assets/Sections/stores/business/businessCinco.webp'
import storeSix from '../../../../../assets/Sections/stores/business/businessSeis.webp'
import storeSeven from '../../../../../assets/Sections/stores/business/businessSiete.webp'

const STORE_IMAGES = [storeOne, storeTwo, storeThree, storeFour, storeFive, storeSix, storeSeven]
const STORES = [
  { name: 'Adrissa', subtitle: 'Elegancia para cada ocasión', category: 'Ropa', style: 'Elegante', cityName: 'Cali', productsCount: 140, initial: 'A' },
  { name: 'Dark', subtitle: 'Underground elegante algodón', category: 'Ropa', style: 'Underground', cityName: 'Cali', productsCount: 140, initial: 'D' },
  { name: 'Urban District', subtitle: 'Streetwear para todos los días', category: 'Ropa', style: 'Urbano', cityName: 'Bogotá', productsCount: 96, initial: 'U' },
  { name: 'Nómada', subtitle: 'Accesorios con carácter', category: 'Accesorios', style: 'Casual', cityName: 'Medellín', productsCount: 78, initial: 'N' },
  { name: 'Distrito 90', subtitle: 'Clásicos con otra actitud', category: 'Ropa', style: 'Vintage', cityName: 'Cali', productsCount: 112, initial: 'D' },
  { name: 'Paso Firme', subtitle: 'Calzado para abrir camino', category: 'Calzado', style: 'Urbano', cityName: 'Bogotá', productsCount: 64, initial: 'P' },
  { name: 'Casa Negra', subtitle: 'Piezas para vestir distinto', category: 'Ropa', style: 'Underground', cityName: 'Medellín', productsCount: 88, initial: 'C' },
].map((store, index) => ({
  ...store,
  id: index + 1,
  slug: store.name.toLowerCase().replace(/\s+/g, '-'),
  description: 'Somos una tienda especializada en prendas seleccionadas para expresar tu estilo y vivir la moda de otra manera.',
  city: `${store.cityName}, Colombia`,
  image: STORE_IMAGES[index],
  badge: 'En tu ciudad',
}))

const FILTERS = [
  { key: 'category', label: 'Categorías', Icon: Folder, options: ['Todas', 'Ropa', 'Accesorios', 'Calzado'], defaultValue: 'Todas' },
  { key: 'style', label: 'Estilo', Icon: Shirt, options: ['Todos', 'Underground', 'Elegante', 'Urbano', 'Casual', 'Vintage'], defaultValue: 'Todos' },
  { key: 'city', label: 'Ciudad', Icon: MapPin, options: ['Todas', 'Cali', 'Bogotá', 'Medellín'], defaultValue: 'Todas' },
  { key: 'sort', label: 'Ordenar por', Icon: ArrowDownUp, options: ['Destacadas', 'Más productos', 'Menos productos', 'A - Z'], defaultValue: 'Destacadas' },
]

export default function CommunityStoresSection() {
  const carouselRef = useRef(null)
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 })
  const [openFilter, setOpenFilter] = useState(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [filters, setFilters] = useState({ category: 'Todas', style: 'Todos', city: 'Todas', sort: 'Destacadas' })

  const visibleStores = useMemo(() => {
    const result = STORES.filter((store) => (
      (filters.category === 'Todas' || store.category === filters.category)
      && (filters.style === 'Todos' || store.style === filters.style)
      && (filters.city === 'Todas' || store.cityName === filters.city)
    ))
    if (filters.sort === 'Más productos') return result.sort((a, b) => b.productsCount - a.productsCount)
    if (filters.sort === 'Menos productos') return result.sort((a, b) => a.productsCount - b.productsCount)
    if (filters.sort === 'A - Z') return result.sort((a, b) => a.name.localeCompare(b.name, 'es'))
    return result
  }, [filters])

  const moveCarousel = (direction) => {
    const carousel = carouselRef.current
    if (!carousel) return
    const firstCard = carousel.querySelector('[data-store-card]')
    const step = firstCard ? firstCard.getBoundingClientRect().width + 20 : carousel.clientWidth * 0.8
    const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 8
    if (direction > 0 && atEnd) carousel.scrollTo({ left: 0, behavior: 'smooth' })
    else if (direction < 0 && carousel.scrollLeft <= 8) carousel.scrollTo({ left: carousel.scrollWidth, behavior: 'smooth' })
    else carousel.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  useEffect(() => {
    if (isPaused || visibleStores.length < 2) return undefined
    const timer = window.setInterval(() => moveCarousel(1), 5000)
    return () => window.clearInterval(timer)
  }, [isPaused, visibleStores])

  useEffect(() => {
    carouselRef.current?.scrollTo({ left: 0 })
  }, [visibleStores])

  const startDrag = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return
    event.currentTarget.setPointerCapture(event.pointerId)
    dragState.current = { active: true, startX: event.clientX, scrollLeft: carouselRef.current?.scrollLeft ?? 0 }
    setIsDragging(true)
    setIsPaused(true)
  }
  const drag = (event) => {
    if (dragState.current.active && carouselRef.current) {
      carouselRef.current.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX)
    }
  }
  const stopDrag = (event) => {
    if (dragState.current.active) {
      dragState.current.active = false
      setIsDragging(false)
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
      setIsPaused(false)
    }
  }

  return <section aria-labelledby="community-stores-title" className="bg-white py-14 text-dark-950 sm:py-16 lg:py-20">
    <div className="mx-auto max-w-[1800px] px-6 sm:px-10 lg:px-16">
      <div className="flex items-center justify-between gap-6"><p className="text-xs font-bold uppercase tracking-[-0.02em] text-dark-red">Tiendas que se unieron a la comunidad</p><p className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[-0.02em] text-dark-500 sm:flex"><span className="h-px w-24 bg-dark-300" />137 tiendas registradas</p></div>
      <h2 id="community-stores-title" className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.055em]">Marcas que visten<br />tu esencia</h2>
      <div className="mt-7 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <p className="max-w-2xl text-lg font-light leading-[0.95] text-dark-500 sm:text-2xl">Explora tiendas con estilos únicos, seleccionadas para vivir la moda de otra manera.</p>
        <div className="relative z-20 flex w-full gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:w-auto lg:overflow-visible">
          {FILTERS.map(({ key, label, Icon, options }) => <div key={key} className={`relative shrink-0 ${openFilter === key ? 'z-50' : 'z-0'}`}>
            <button type="button" aria-haspopup="listbox" aria-expanded={openFilter === key} onClick={() => setOpenFilter((current) => current === key ? null : key)} className="flex h-14 min-w-48 items-center gap-3 rounded-md border border-dark-200 bg-dark-50 px-4 text-left text-xs font-bold uppercase tracking-[0.13em] text-dark-950 transition-colors hover:border-dark-500 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">
              <Icon size={20} strokeWidth={1.8} /><span>{filters[key] === FILTERS.find((filter) => filter.key === key)?.defaultValue ? label : filters[key]}</span><ChevronDown size={17} className={`ml-auto text-dark-600 transition-transform ${openFilter === key ? 'rotate-180' : ''}`} />
            </button>
            {openFilter === key && <div role="listbox" aria-label={`Filtrar por ${label.toLowerCase()}`} className="absolute right-0 top-full z-50 mt-2 max-h-64 min-w-full overflow-y-auto border border-dark-200 bg-white p-1 shadow-xl">{options.map((option) => <button key={option} type="button" role="option" aria-selected={filters[key] === option} onClick={() => { setFilters((current) => ({ ...current, [key]: option })); setOpenFilter(null) }} className={`block w-full whitespace-nowrap px-4 py-2.5 text-left text-xs transition-colors hover:bg-dark-50 ${filters[key] === option ? 'font-bold text-dark-red' : 'text-dark-700'}`}>{option}</button>)}</div>}
          </div>)}
        </div>
      </div>
    </div>

    <div className="relative z-0 mt-10 lg:mt-12">
      <div ref={carouselRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onFocusCapture={() => setIsPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false) }} onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag} onPointerCancel={stopDrag} className={`overflow-x-auto overscroll-x-contain px-6 pb-5 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-10 lg:px-16 ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}>
        <div className={`flex w-max gap-5 pr-6 sm:pr-10 lg:pr-16 ${isDragging ? 'snap-none' : 'snap-x snap-mandatory'}`}>{visibleStores.map((store) => <div key={store.id} data-store-card className="w-[280px] shrink-0 snap-start sm:w-[300px] lg:w-[320px]"><StoreCard store={store} /></div>)}</div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-white via-white/85 to-transparent lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-white via-white/85 to-transparent lg:block" />
      <button type="button" aria-label="Ver tiendas anteriores" onClick={() => moveCarousel(-1)} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="absolute left-5 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-dark-200 bg-white text-dark-950 shadow-md transition hover:bg-dark-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red lg:grid"><ArrowLeft size={19} /></button>
      <button type="button" aria-label="Ver más tiendas" onClick={() => moveCarousel(1)} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="absolute right-5 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-dark-200 bg-white text-dark-950 shadow-md transition hover:bg-dark-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red lg:grid"><ArrowRight size={19} /></button>
    </div>
    {visibleStores.length === 0 && <p className="px-6 py-12 text-center text-sm text-dark-500">No encontramos tiendas con esos filtros. Prueba otra combinación.</p>}
    <div className="mx-auto flex max-w-[1800px] items-center justify-center gap-4 px-6 pt-5 text-center sm:px-10 lg:px-16"><span className="hidden h-px w-32 bg-dark-red/30 sm:block lg:w-48" /><p className="text-[10px] font-bold uppercase tracking-[0.08em] text-dark-red sm:text-xs">Si deseas ver todas las tiendas registradas disponibles <Link to="/stores" className="font-black not-italic underline decoration-2 underline-offset-4 hover:text-dark-burgundy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">PULSA AQUÍ</Link></p><span className="hidden h-px w-32 bg-dark-red/30 sm:block lg:w-48" /></div>
  </section>
}
