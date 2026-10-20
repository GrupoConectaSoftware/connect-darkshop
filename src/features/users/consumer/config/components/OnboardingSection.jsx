const STEPS = ['Bienvenida', 'Información personal', 'Contacto', 'Métodos de pago', 'Preferencias', 'Listo']

export const inputClass = 'w-full rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-neutral-600 focus:border-transparent focus:ring-2 focus:ring-red-600'
export const inputWithIconClass = `${inputClass} pl-11`
export const labelClass = 'mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-500'
export const continueClass = 'mt-8 w-full rounded-lg bg-white px-5 py-4 text-sm font-black uppercase tracking-wide text-black transition-colors hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'

export default function OnboardingSection({ activeStep, eyebrow, title, subtitle, onLogout, children }) {
  const stepper = useRef(null)
  const moveStepper = (direction) => stepper.current?.scrollBy({ left: direction * 180, behavior: 'smooth' })

  return (
    <section className="flex min-h-full w-full flex-col justify-center text-white" aria-labelledby={`onboarding-step-${activeStep}`}>
      <header className="mb-8 flex items-start justify-end gap-3">
        <p className="max-w-[14rem] text-right text-[0.65rem] leading-relaxed text-neutral-500">
          Para continuar en la plataforma debes completar este registro inicial.
        </p>
        <button type="button" onClick={onLogout} className="shrink-0 rounded-md bg-red-700 px-4 py-2.5 text-xs font-bold uppercase text-white transition-colors hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Cerrar sesión
        </button>
      </header>

      <div className="mb-10 flex w-full items-start gap-1">
        <button type="button" onClick={() => moveStepper(-1)} aria-label="Ver pasos anteriores" className="mt-1 shrink-0 text-neutral-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 sm:hidden"><ChevronLeft size={24} aria-hidden="true" /></button>
        <div ref={stepper} className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ol aria-label="Progreso de configuración" className="relative flex min-w-[34rem] items-start justify-between sm:min-w-0">
            <span aria-hidden="true" className="absolute left-4 right-4 top-4 h-px bg-neutral-800" />
            {STEPS.map((step, index) => {
              const number = index + 1
              const active = number === activeStep
              const completed = number < activeStep
              return (
                <li key={step} className="relative z-10 flex w-1/6 min-w-0 flex-col items-center text-center">
                  <span className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${active ? 'bg-red-700 text-white shadow-[0_0_15px_rgba(185,28,28,0.4)]' : completed ? 'border border-red-900 bg-neutral-900 text-red-500' : 'border border-neutral-800 bg-neutral-900 text-neutral-500'}`}>{number}</span>
                  <span className={`mt-3 text-[0.52rem] uppercase leading-tight tracking-wider ${active ? 'text-white' : 'text-neutral-500'}`}>{step}</span>
                </li>
              )
            })}
          </ol>
        </div>
        <button type="button" onClick={() => moveStepper(1)} aria-label="Ver pasos siguientes" className="mt-1 shrink-0 text-neutral-500 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 sm:hidden"><ChevronRight size={24} aria-hidden="true" /></button>
      </div>

      <div>
        <p className="mb-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-red-600">{eyebrow}</p>
        <h1 id={`onboarding-step-${activeStep}`} className="mb-2 font-display text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mb-8 text-sm leading-relaxed text-neutral-400">{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

