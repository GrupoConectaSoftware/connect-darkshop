import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import feminineImage from '../../../../../assets/Genero/Femenino.webp'
import masculineImage from '../../../../../assets/Genero/Masculino.webp'
import unisexImage from '../../../../../assets/Genero/Unisex.webp'

const OPTIONS = [
  { slug: 'hombre', label: 'Hombre', collection: 'SS25 · Homme', index: '01 / 03', image: masculineImage },
  { slug: 'mujer', label: 'Mujer', collection: 'SS25 · Femme', index: '02 / 03', image: feminineImage },
  { slug: 'todo', label: 'Ver todo', collection: 'Colección completa', index: '03 / 03', image: unisexImage },
]

export default function GenderComponents() {
  const dialogRef = useRef(null)
  const firstOptionRef = useRef(null)
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const animationFrame = window.requestAnimationFrame(() => {
      setIsVisible(true)
      firstOptionRef.current?.focus()
    })

    const trapFocus = (event) => {
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled])')
      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', trapFocus)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', trapFocus)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/60 p-3 backdrop-blur-lg sm:p-6 lg:p-10">
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="gender-gate-title" className={`w-full max-w-[1600px] origin-center transition duration-500 ease-out motion-reduce:transform-none motion-reduce:transition-none ${isVisible ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-0'}`}>
        <div className="overflow-hidden bg-black text-dark-cream shadow-2xl">
          <header className="border-b border-neutral-900 px-6 py-6 sm:px-10 sm:py-7 lg:px-12 lg:py-8">
            <div className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-widest text-neutral-400 sm:text-xs">
              <span aria-hidden="true" className="h-px w-10 bg-neutral-500 sm:w-12" />
              <span>Bienvenido · Darkshop SS25</span>
            </div>
            <h2 id="gender-gate-title" className="mt-4 font-body text-3xl font-extrabold uppercase leading-none tracking-tighter sm:text-4xl lg:mt-5 lg:text-5xl xl:text-5xl">
              ¿Qué vas a vestir <span className="text-dark-burgundy">hoy</span>?
            </h2>
          </header>

          <div className="grid gap-px bg-neutral-900 md:grid-cols-3">
            {OPTIONS.map((option, index) => (
              <button
                key={option.slug}
                ref={index === 0 ? firstOptionRef : undefined}
                type="button"
                onClick={() => navigate(`/${option.slug}`)}
                className="group relative flex min-h-[17rem] cursor-pointer overflow-hidden bg-black p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dark-cream sm:min-h-[22rem] sm:p-7 lg:min-h-[23rem] lg:p-8 xl:min-h-[26rem] xl:p-10"
              >
                <img src={option.image} alt="" className="absolute inset-0 h-full w-full object-cover object-[center_25%] grayscale transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 motion-reduce:transition-none" />
                <span aria-hidden="true" className="absolute inset-0 bg-black/45 transition-colors duration-500 group-hover:bg-black/15 motion-reduce:transition-none" />
                <span className="relative z-10 flex w-full flex-col justify-between">
                  <span className="flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-widest text-neutral-400 sm:text-xs">
                    <span>{option.index}</span>
                    <span className="text-right">{option.collection}</span>
                  </span>
                  <span>
                    <span className="block font-body text-4xl font-extrabold uppercase leading-none tracking-tighter text-dark-cream sm:text-5xl lg:text-5xl xl:text-6xl">{option.label}</span>
                    <span className="mt-4 inline-flex flex-col items-start text-[10px] font-bold uppercase tracking-widest text-dark-cream sm:text-xs">
                      <span className="inline-flex items-center gap-2">
                        Entrar
                        <ArrowUpRight size={15} strokeWidth={1.8} className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:scale-x-125 motion-reduce:transition-none" />
                      </span>
                      <span aria-hidden="true" className="mt-2 h-px w-14 origin-left bg-dark-cream transition-[width] duration-300 group-hover:w-24 motion-reduce:transition-none" />
                    </span>
                  </span>
                </span>
              </button>
            ))}
          </div>

          <p className="border-t border-neutral-900 px-6 py-3 text-left text-[9px] font-medium uppercase tracking-widest text-neutral-500 sm:px-10 sm:text-[10px] lg:px-12 lg:py-4">Tu elección se recuerda solo en este dispositivo. Puedes cambiarla en cualquier momento.</p>
        </div>
      </section>
    </div>
  )
}
