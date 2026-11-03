import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, X } from 'lucide-react'

const QUESTIONS = [
  {
    question: '¿Cómo puedo comprar en DARKSHOP?',
    answer: 'Elige una prenda, revisa sus opciones disponibles y sigue los pasos de compra que aparecen en la tienda.',
  },
  {
    question: '¿Cómo elijo mi talla?',
    answer: 'Revisa la disponibilidad de tallas en cada producto. Si necesitas orientación sobre el ajuste de una prenda, contáctanos antes de realizar tu compra.',
  },
  {
    question: '¿Cómo sé si un producto está disponible?',
    answer: 'Las tallas y opciones disponibles aparecen en la tarjeta o detalle del producto. En Outlet, las unidades pueden agotarse y no siempre vuelven.',
  },
  {
    question: '¿Cómo funcionan los envíos?',
    answer: 'El costo y la información de entrega se confirman durante el proceso de compra. Si necesitas ayuda con tu destino, contáctanos antes de finalizar el pedido.',
  },
  {
    question: '¿Qué medios de pago puedo usar?',
    answer: 'Los medios disponibles se muestran durante el proceso de compra. Si tienes dudas sobre un pago, escríbenos a darkshop@reportas.com.',
  },
  {
    question: '¿Cómo consulto el estado de mi pedido?',
    answer: 'Ten a mano los datos de tu compra y comunícate con nuestro equipo en darkshop@reportas.com o al (602) 399 3893 para recibir ayuda.',
  },
  {
    question: '¿Puedo solicitar un cambio o una devolución?',
    answer: 'Consulta las condiciones vigentes antes de iniciar la solicitud. Nuestro equipo puede orientarte en darkshop@reportas.com.',
  },
  {
    question: '¿Cómo me comunico con DARKSHOP?',
    answer: 'Puedes escribir a darkshop@reportas.com o llamar al (602) 399 3893. También encontrarás nuestros canales sociales en el menú y el pie de página.',
  },
]

export default function PqrComponent({ isOpen, onClose }) {
  const [activeQuestion, setActiveQuestion] = useState(null)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

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

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const modal = isOpen ? (
    <div className="fixed inset-0 z-120 grid place-items-center overflow-y-auto bg-black/70 p-3 backdrop-blur-md [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden sm:p-6">
      <section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="pqr-title" className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden border border-white/10 bg-dark-950 text-dark-white shadow-2xl xl:max-w-6xl sm:max-h-[calc(100dvh-3rem)]">
        <header className="relative shrink-0 border-b border-white/10 px-5 py-6 sm:px-9 sm:py-8">
          <div aria-hidden="true" className="absolute left-0 top-0 h-px w-24 bg-dark-red" />
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-dark-red sm:text-xs">
                <span className="h-px w-8 bg-dark-red" />
                <span>PQR · Soporte DARKSHOP</span>
              </div>
              <h2 id="pqr-title" className="mt-4 font-display text-3xl uppercase leading-[0.9] tracking-tight sm:text-5xl">¿Cómo podemos ayudarte?</h2>
              <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-neutral-400 sm:text-base">Encuentra información sobre prendas, pedidos y servicios de DARKSHOP.</p>
            </div>
            <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Cerrar preguntas frecuentes" className="grid size-10 shrink-0 cursor-pointer place-items-center text-neutral-400 transition-colors hover:text-dark-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white">
              <X size={21} strokeWidth={1.4} />
            </button>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden sm:px-9">
          <div className="flex items-center justify-between border-b border-white/10 py-4 text-[10px] font-medium uppercase tracking-widest text-neutral-500">
            <span>Preguntas frecuentes</span>
            <span>08 respuestas</span>
          </div>
          {QUESTIONS.map(({ question, answer }, index) => {
            const expanded = activeQuestion === index
            const answerId = `pqr-answer-${index}`
            return (
              <article key={question} className={`border-b border-white/10 transition-colors duration-300 last:border-b-0 ${expanded ? 'bg-white/[0.035]' : ''}`}>
                <h3>
                  <button type="button" aria-expanded={expanded} aria-controls={answerId} onClick={() => setActiveQuestion(expanded ? null : index)} className="group flex w-full cursor-pointer items-center gap-4 px-1 py-4 text-left sm:gap-5 sm:px-3 sm:py-5">
                    <span className={`w-7 shrink-0 font-body text-[10px] tracking-widest transition-colors ${expanded ? 'text-dark-red' : 'text-neutral-500'}`}>0{index + 1}</span>
                    <span className={`flex-1 text-sm font-medium leading-snug transition-colors sm:text-base ${expanded ? 'text-dark-white' : 'text-neutral-200 group-hover:text-dark-white'}`}>{question}</span>
                    <span className={`grid size-7 shrink-0 place-items-center border transition-colors ${expanded ? 'border-dark-red text-dark-red' : 'border-white/10 text-neutral-500 group-hover:border-white/40 group-hover:text-dark-white'}`}>
                      <ChevronDown size={15} aria-hidden="true" className={`transition-transform duration-300 motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`} />
                    </span>
                  </button>
                </h3>
                <div id={answerId} aria-hidden={!expanded} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${expanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-5 pl-12 pr-9 text-sm font-light leading-relaxed text-neutral-400 sm:pb-6 sm:pl-14">{answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <footer className="flex shrink-0 flex-col gap-1 border-t border-white/10 px-5 py-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <span>¿Aún necesitas ayuda?</span>
          <a className="font-medium uppercase tracking-wide text-neutral-200 transition-colors hover:text-dark-red" href="mailto:darkshop@reportas.com">darkshop@reportas.com ↗</a>
        </footer>
      </section>
    </div>
  ) : null

  return modal && createPortal(modal, document.body)
}
