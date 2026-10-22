import { useEffect, useRef, useState } from 'react'
import storeOne from '../../../../../assets/Sections/stores/business/businessUno.webp'
import storeTwo from '../../../../../assets/Sections/stores/business/businessDos.webp'
import storeThree from '../../../../../assets/Sections/stores/business/businessTres.webp'
import storeFour from '../../../../../assets/Sections/stores/business/businessCuatro.webp'
import storeFive from '../../../../../assets/Sections/stores/business/businessCinco.webp'
import storeSix from '../../../../../assets/Sections/stores/business/businessSeis.webp'
import storeSeven from '../../../../../assets/Sections/stores/business/businessSiete.webp'

const SLIDES = [
  { id: 'adrissa', brandName: 'ADRISSA', brandSubline: 'ESTILO Y DETALLE', tagline: 'Piezas para cada ocasión.', image: storeOne, alt: 'Interior de tienda Adrissa' },
  { id: 'dark', brandName: 'DARK', brandSubline: 'UNDERGROUND CLOTHING', tagline: 'Viste lo que te representa.', image: storeTwo, alt: 'Colección de ropa urbana Dark' },
  { id: 'urban-district', brandName: 'URBAN DISTRICT', brandSubline: 'STREET CULTURE', tagline: 'La ciudad también es tuya.', image: storeThree, alt: 'Espacio de moda urbana Urban District' },
  { id: 'nomada', brandName: 'NÓMADA', brandSubline: 'OBJETOS CON CARÁCTER', tagline: 'Detalles que hablan de ti.', image: storeFour, alt: 'Selección de accesorios Nómada' },
  { id: 'distrito-90', brandName: 'DISTRITO 90', brandSubline: 'CLÁSICOS REIMAGINADOS', tagline: 'Otra época. Tu propia actitud.', image: storeFive, alt: 'Tienda Distrito 90' },
  { id: 'paso-firme', brandName: 'PASO FIRME', brandSubline: 'CALZADO URBANO', tagline: 'Cada paso abre camino.', image: storeSix, alt: 'Selección de calzado Paso Firme' },
  { id: 'casa-negra', brandName: 'CASA NEGRA', brandSubline: 'MODA CON IDENTIDAD', tagline: 'Encuentra tu próxima pieza.', image: storeSeven, alt: 'Tienda Casa Negra' },
]

const AUTOPLAY_DELAY = 5500
const MANUAL_PAUSE_DELAY = 6500

export default function IntroductionSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const manualPauseTimer = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  useEffect(() => () => window.clearTimeout(manualPauseTimer.current), [])

  useEffect(() => {
    if (isHovered || isManuallyPaused || prefersReducedMotion) return undefined
    const interval = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % SLIDES.length)
    }, AUTOPLAY_DELAY)
    return () => window.clearInterval(interval)
  }, [isHovered, isManuallyPaused, prefersReducedMotion])

  const pauseAfterInteraction = () => {
    setIsManuallyPaused(true)
    window.clearTimeout(manualPauseTimer.current)
    manualPauseTimer.current = window.setTimeout(() => setIsManuallyPaused(false), MANUAL_PAUSE_DELAY)
  }

  const goTo = (index) => {
    setCurrentIndex((index + SLIDES.length) % SLIDES.length)
    pauseAfterInteraction()
  }

  return (
    <section
      id="inicio"
      aria-label="Tiendas destacadas"
      aria-roledescription="carrusel"
      role="region"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative isolate h-[70vh] min-h-[500px] overflow-hidden bg-dark-950 text-white outline-none lg:h-[85vh] lg:min-h-[620px]"
    >
      {SLIDES.map((slide, index) => {
        const isActive = index === currentIndex
        return (
          <div
            key={slide.id}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${index + 1} de ${SLIDES.length}: ${slide.brandName}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${isActive ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              className={`absolute inset-0 size-full object-cover object-center transition-transform duration-[6000ms] ease-out ${isActive ? 'scale-100' : 'scale-105'}`}
            />
            <span aria-hidden="true" className="absolute inset-0 bg-black/45" />
            {/* La introducción muestra únicamente la imagen y los indicadores. */}
              {/* <div className="max-w-4xl">
                <p className="font-display text-[clamp(4rem,12vw,9rem)] font-black uppercase leading-[0.78] tracking-[-0.075em] text-white">
                  {slide.brandName}<sup className="ml-2 align-top font-body text-[clamp(0.7rem,1.4vw,1.25rem)] font-medium tracking-normal">®</sup>
                </p>
                <p className="mt-4 text-sm font-light uppercase tracking-[0.32em] text-white/80 sm:text-lg sm:tracking-[0.4em]">{slide.brandSubline}</p>
                <p className="mt-7 max-w-2xl text-lg font-light uppercase leading-snug tracking-[0.12em] text-white sm:mt-8 sm:text-2xl sm:tracking-[0.16em]">{slide.tagline}</p>
                <span aria-hidden="true" className="mt-6 block h-px w-16 bg-white sm:w-20" />
                <Link
                  to={`/stores#${slide.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className="group mt-8 inline-flex items-center gap-5 bg-white px-7 py-4 text-xs font-bold uppercase tracking-[0.16em] text-dark-950 transition-colors hover:bg-dark-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  Ver tienda
                  <ArrowUpRight size={17} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div> */}
          </div>
        )
      })}

      <div className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 sm:bottom-14" aria-label="Seleccionar diapositiva">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Ir al slide ${index + 1}`}
            aria-current={index === currentIndex ? 'true' : undefined}
            onClick={() => goTo(index)}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/45 hover:bg-white/75'}`}
          />
        ))}
      </div>
    </section>
  )
}
