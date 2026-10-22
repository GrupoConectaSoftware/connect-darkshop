import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import galleryUno from '../../../../assets/Brand/gallery/galleryUno.webp'
import galleryDos from '../../../../assets/Brand/gallery/galleryDos.webp'
import galleryTres from '../../../../assets/Brand/gallery/galleryTres.webp'
import galleryCuatro from '../../../../assets/Brand/gallery/galleryCuatro.webp'
import galleryCinco from '../../../../assets/Brand/gallery/galleryCinco.webp'
import gallerySeis from '../../../../assets/Brand/gallery/gallerySeis.webp'
import gallerySiete from '../../../../assets/Brand/gallery/gallerySiete.webp'
import Reveal from '../../../../components/ux/Reveal'

const GALLERY = [
  { id: 'gallery-uno', src: galleryUno, alt: 'Modelo DARK sentado frente a una vitrina', category: 'callejero' },
  { id: 'gallery-dos', src: galleryDos, alt: 'Modelo DARK con camisa blanca en una terraza', category: 'callejero' },
  { id: 'gallery-tres', src: galleryTres, alt: 'Retrato editorial en blanco y negro con gafas oscuras', category: 'editorial' },
  { id: 'gallery-cuatro', src: galleryCuatro, alt: 'Retrato de estudio en blanco y negro con camiseta oscura', category: 'underground' },
  { id: 'gallery-cinco', src: galleryCinco, alt: 'Modelo DARK frente a una fachada urbana', category: 'callejero' },
  { id: 'gallery-seis', src: gallerySeis, alt: 'Retrato de estudio en blanco y negro con camiseta clara', category: 'studio' },
  { id: 'gallery-siete', src: gallerySiete, alt: 'Modelo DARK de perfil en un entorno urbano', category: 'callejero' },
]

const FILTERS = ['TODOS', 'EDITORIAL', 'CALLEJERO', 'STUDIO', 'UNDERGROUND']

function GalleryImage({ item, className = '' }) {
  return (
    <figure className={`group min-h-0 min-w-0 overflow-hidden bg-neutral-100 ${className}`}>
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
      />
    </figure>
  )
}

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('TODOS')
  const [galleryHasMore, setGalleryHasMore] = useState(true)
  const [filtersOverflow, setFiltersOverflow] = useState(false)
  const galleryViewportRef = useRef(null)
  const galleryContentRef = useRef(null)
  const filtersRef = useRef(null)
  const filtersContainerRef = useRef(null)
  const filteredGallery = activeFilter === 'TODOS'
    ? GALLERY
    : GALLERY.filter((item) => item.category === activeFilter.toLowerCase())
  const galleryById = Object.fromEntries(GALLERY.map((item) => [item.id, item]))

  useEffect(() => {
    if (activeFilter !== 'TODOS') return undefined

    const updateGalleryFade = () => {
      const viewport = galleryViewportRef.current
      if (!viewport) return
      setGalleryHasMore(viewport.scrollTop + viewport.clientHeight < viewport.scrollHeight - 10)
    }

    const viewport = galleryViewportRef.current
    if (!viewport) return undefined
    updateGalleryFade()
    const resizeObserver = new ResizeObserver(updateGalleryFade)
    resizeObserver.observe(viewport)
    if (galleryContentRef.current) resizeObserver.observe(galleryContentRef.current)
    viewport.addEventListener('scroll', updateGalleryFade, { passive: true })
    return () => {
      resizeObserver.disconnect()
      viewport.removeEventListener('scroll', updateGalleryFade)
    }
  }, [activeFilter])

  useEffect(() => {
    const filters = filtersRef.current
    const container = filtersContainerRef.current
    if (!filters || !container) return undefined

    const measureOverflow = () => {
      const styles = window.getComputedStyle(filters)
      const horizontalPadding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight)
      const contentWidth = filters.scrollWidth - horizontalPadding
      setFiltersOverflow(contentWidth > container.clientWidth + 1)
    }
    const resizeObserver = new ResizeObserver(measureOverflow)
    resizeObserver.observe(container)
    resizeObserver.observe(filters)
    measureOverflow()
    return () => resizeObserver.disconnect()
  }, [])

  const scrollFilters = (direction) => {
    filtersRef.current?.scrollBy({ left: direction * 180, behavior: 'smooth' })
  }

  return (
    <section id="galeria" aria-labelledby="brand-gallery-title" className="relative bg-white px-8 py-16 text-dark-950 sm:px-12 sm:py-24 lg:px-24 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        <Reveal as="header" effect="rise" className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-dark-red">Visualiza nuestras galerías</p>
            <h2 id="brand-gallery-title" className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-black">
              Galería de campaña
            </h2>
            <p className="mt-4 max-w-xl text-base font-light leading-snug text-dark-500 sm:text-lg">
              Explora nuestras galerías con nuestros modelos y sumérgete en el universo de DARK, una fusión de estilo, actitud y arquitectura urbana.
            </p>
          </div>

          <div ref={filtersContainerRef} className="relative mt-1 min-w-0 md:mt-0">
            {filtersOverflow && (
              <button
                type="button"
                aria-label="Desplazar filtros a la izquierda"
                onClick={() => scrollFilters(-1)}
                className="absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
            )}
            {/* The filter row scrolls horizontally; .hide-scrollbar is the documented scrollbar exception. */}
            <nav ref={filtersRef} aria-label="Filtrar galería" className={`hide-scrollbar flex min-w-0 items-center gap-x-7 overflow-x-auto scroll-smooth py-2 sm:gap-x-8 ${filtersOverflow ? 'px-10' : 'justify-center px-0'}`}>
              {FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`shrink-0 cursor-pointer border-b pb-1 text-xs font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-red sm:text-sm ${activeFilter === filter ? 'border-dark-red text-dark-red' : 'border-transparent text-neutral-700 hover:border-neutral-900 hover:text-neutral-950'}`}
                >
                  {filter}
                </button>
              ))}
            </nav>
            {filtersOverflow && (
              <button
                type="button"
                aria-label="Desplazar filtros a la derecha"
                onClick={() => scrollFilters(1)}
                className="absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 shadow-sm transition-colors hover:bg-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </Reveal>

        {activeFilter === 'TODOS' ? (
          <>
            <Reveal effect="clip" delay={100} className="relative mt-10">
              <div
                ref={galleryViewportRef}
                // Inline scrollbar styles are the sole documented exception to the Tailwind-only styling rule.
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                className="hide-scrollbar relative max-h-[70vh] overflow-y-auto overscroll-contain scroll-smooth lg:max-h-[800px]"
              >
                <div ref={galleryContentRef} className="grid gap-2 lg:h-[min(62vw,900px)] lg:min-h-[600px] lg:grid-cols-[1.3fr_1fr] lg:gap-2">
                  <div className="hidden min-h-0 grid-rows-[2fr_1fr] gap-2 lg:grid">
                    <div className="grid min-h-0 grid-cols-3 grid-rows-2 gap-2">
                      <GalleryImage item={galleryById['gallery-siete']} className="row-span-2" />
                      <GalleryImage item={galleryById['gallery-tres']} />
                      <GalleryImage item={galleryById['gallery-uno']} />
                      <GalleryImage item={galleryById['gallery-dos']} />
                      <GalleryImage item={galleryById['gallery-seis']} />
                    </div>
                    <GalleryImage item={galleryById['gallery-cinco']} />
                  </div>

                  <GalleryImage item={galleryById['gallery-cuatro']} className="hidden min-h-0 lg:block" />

                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:hidden">
                    {GALLERY.map((item) => <GalleryImage key={item.id} item={item} className="aspect-[4/5]" />)}
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white via-white/70 to-transparent transition-opacity duration-500 ease-out sm:h-40 ${galleryHasMore ? 'opacity-100' : 'opacity-0'}`} />
            </Reveal>

            <div className="flex items-center justify-center gap-4 py-8 text-center sm:gap-6 sm:py-10">
              <span aria-hidden="true" className="hidden h-px w-20 bg-neutral-300 sm:block sm:w-32 lg:w-48" />
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-dark-950 sm:text-xs sm:tracking-[0.16em]">Deslice hacia abajo para seguir visualizando la galería</p>
              <span aria-hidden="true" className="hidden h-px w-20 bg-neutral-300 sm:block sm:w-32 lg:w-48" />
            </div>
          </>
        ) : (
          <Reveal effect="clip" className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2 md:mt-12 md:grid-cols-3 lg:grid-cols-4">
            {filteredGallery.map((item) => <GalleryImage key={item.id} item={item} className="aspect-[4/5]" />)}
          </Reveal>
        )}
      </div>
    </section>
  )
}
