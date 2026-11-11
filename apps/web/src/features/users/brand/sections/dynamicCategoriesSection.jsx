import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { COLLECTIONS, COLLECTION_CATEGORIES } from '../../../../components/ui/cards/collectionsData'
import Reveal from '../../../../components/ux/Reveal'

const CATEGORIES = COLLECTION_CATEGORIES.map(({ id, label }) => [id, label])
const CATEGORIES_DATA = Object.fromEntries(COLLECTION_CATEGORIES.map(({ id }) => [
  id,
  COLLECTIONS.filter((item) => item.category === id).map((item) => ({
    ...item,
    id: item.slug,
    title: item.label,
  })),
]))

export default function DynamicCategoriesSection() {
  const [activeCategory, setActiveCategory] = useState('camisetas')
  const [isChanging, setIsChanging] = useState(false)
  const [categoriesOverflow, setCategoriesOverflow] = useState(false)
  const transitionTimerRef = useRef(null)
  const categoriesViewportRef = useRef(null)
  const categoriesRowRef = useRef(null)
  const items = CATEGORIES_DATA[activeCategory]

  useEffect(() => () => window.clearTimeout(transitionTimerRef.current), [])

  useEffect(() => {
    const viewport = categoriesViewportRef.current
    const row = categoriesRowRef.current
    if (!viewport || !row) return undefined

    const measureOverflow = () => setCategoriesOverflow(row.scrollWidth > viewport.clientWidth + 1)
    const resizeObserver = new ResizeObserver(measureOverflow)
    resizeObserver.observe(viewport)
    resizeObserver.observe(row)
    measureOverflow()
    return () => resizeObserver.disconnect()
  }, [])

  const changeCategory = (category) => {
    if (category === activeCategory) return
    window.clearTimeout(transitionTimerRef.current)
    setIsChanging(true)
    transitionTimerRef.current = window.setTimeout(() => {
      setActiveCategory(category)
      window.requestAnimationFrame(() => setIsChanging(false))
    }, 180)
  }

  const scrollCategories = (direction) => {
    categoriesViewportRef.current?.scrollBy({ left: direction * 220, behavior: 'smooth' })
  }

  return (
    <section id="categorias" aria-label="Explora categorÃ­as DARK" className="bg-white text-dark-950">
      <Reveal effect="clip">
        <div className={`grid grid-cols-2 gap-0 transition-[opacity,transform] duration-300 ease-out sm:grid-cols-3 lg:grid-cols-5 ${isChanging ? 'translate-y-1 opacity-0' : 'translate-y-0 opacity-100'}`}>
          {items.map((item) => (
          <article key={item.id} className="group relative isolate h-[340px] overflow-hidden bg-dark-950 sm:h-[420px] lg:h-[500px]">
            <img
              src={item.image}
              alt={`${item.title}, colecciÃ³n ${item.categoryLabel} de DARK`}
              loading="lazy"
              className="absolute inset-0 z-0 size-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 z-10 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white sm:p-5 lg:p-6">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-neutral-300">ColecciÃ³n</p>
              <h3 className="mt-1 font-display text-lg font-black uppercase leading-tight tracking-[-0.03em] sm:text-xl">{item.title}</h3>
              <div aria-hidden="true" className="my-2 h-px w-full bg-white/30" />
              <p className="max-w-xs text-[0.65rem] font-light leading-relaxed text-neutral-200 sm:text-xs">{item.description}</p>
              <Link
                to={`/collection/${item.slug}`}
                className="mt-3 inline-flex items-center gap-2 whitespace-nowrap text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white underline decoration-white/70 underline-offset-4 transition-colors hover:text-neutral-300"
              >
                Explorar <span aria-hidden="true">â†’</span>
              </Link>
            </div>
          </article>
          ))}
        </div>
      </Reveal>

      <Reveal as="nav" effect="rise" delay={100} aria-label="CategorÃ­as de productos" className="border-y border-neutral-200 bg-white px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        <div className="relative mx-auto max-w-[1500px]">
          {categoriesOverflow && (
            <button
              type="button"
              aria-label="Desplazar categorÃ­as a la izquierda"
              onClick={() => scrollCategories(-1)}
              className="absolute left-0 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-950 shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red"
            >
              <ChevronLeft size={17} aria-hidden="true" />
            </button>
          )}
          {/* Documented scrollbar exception: horizontal category navigation remains usable without showing a bar. */}
          <div
            ref={categoriesViewportRef}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className={`hide-scrollbar overflow-x-auto scroll-smooth ${categoriesOverflow ? 'px-12' : ''}`}
          >
            <div ref={categoriesRowRef} className={`flex w-max min-w-full items-center gap-x-8 py-2 sm:gap-x-10 lg:gap-x-12 ${categoriesOverflow ? '' : 'justify-center'}`}>
              {CATEGORIES.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={activeCategory === id}
                  onClick={() => changeCategory(id)}
                  className={`shrink-0 cursor-pointer border-0 bg-transparent text-xs uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900 sm:text-sm ${activeCategory === id ? 'font-bold text-neutral-950 underline decoration-1 underline-offset-4' : id === 'obsequios' ? 'font-medium text-dark-red hover:text-dark-red/75' : 'font-medium text-neutral-400 hover:text-neutral-700'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          {categoriesOverflow && (
            <button
              type="button"
              aria-label="Desplazar categorÃ­as a la derecha"
              onClick={() => scrollCategories(1)}
              className="absolute right-0 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-neutral-300 bg-white text-neutral-950 shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red"
            >
              <ChevronRight size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </Reveal>
      <div className="bg-white px-6 pb-10 text-center">
        <Link to="/poster" className="text-xs font-bold uppercase tracking-[0.16em] text-dark-red underline underline-offset-4 transition-colors hover:text-dark-950">Ver pÃ³ster de colecciones</Link>
      </div>
    </section>
  )
}
