import { useEffect, useRef, useState } from 'react'
import { Check, Circle, CircleHelp, X } from 'lucide-react'

const requirements = [
  { id: 'length', label: 'Mínimo 8 caracteres', test: (value) => value.length >= 8 },
  { id: 'upper', label: 'Una mayúscula', test: (value) => /[A-ZÁÉÍÓÚÑ]/.test(value) },
  { id: 'lower', label: 'Una minúscula', test: (value) => /[a-záéíóúñ]/.test(value) },
  { id: 'number', label: 'Un número', test: (value) => /\d/.test(value) },
]

function RequirementsList({ results }) {
  return (
    <>
      <p className="mb-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-dark-300">
        Tu contraseña debe incluir:
      </p>
      <ul className="space-y-2">
        {results.map(({ id, label, passed }) => {
          const Icon = passed ? Check : Circle
          return (
            <li key={id} className="flex items-center gap-2 text-xs">
              <Icon aria-hidden="true" className={`size-3.5 shrink-0 ${passed ? 'text-emerald-500' : 'text-dark-500'}`} />
              <span className={passed ? 'text-dark-200' : 'text-dark-400'}>{label}</span>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default function PasswordValidation({ password = '', error = '' }) {
  const [isDesktop, setIsDesktop] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const closeTimeout = useRef(null)
  const results = requirements.map((rule) => ({ ...rule, passed: rule.test(password) }))
  const hasStarted = password.length > 0
  const allValid = results.every((rule) => rule.passed)

  const cancelClose = () => window.clearTimeout(closeTimeout.current)
  const scheduleClose = () => {
    cancelClose()
    closeTimeout.current = window.setTimeout(() => setIsOpen(false), 120)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const updateBreakpoint = (event) => {
      setIsDesktop(event.matches)
      setIsOpen(false)
    }

    setIsDesktop(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateBreakpoint)
    return () => {
      mediaQuery.removeEventListener('change', updateBreakpoint)
      window.clearTimeout(closeTimeout.current)
    }
  }, [])

  useEffect(() => {
    if (isDesktop || !isOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [isDesktop, isOpen])

  const helpIconColor = hasStarted && !allValid
    ? 'text-red-500 hover:text-red-400'
    : 'text-dark-400 hover:text-dark-white'

  return (
    <div className="relative mt-3 w-full min-w-0">
      <div className="flex w-full min-w-0 flex-nowrap items-center gap-2">
        <p id="register-password-error" aria-live="polite" className="min-w-0 flex-1 truncate font-body text-[9px] leading-tight text-red-500 sm:text-[10px]">
          {error}
        </p>
        <div className="flex w-28 shrink-0 flex-nowrap items-center gap-1 sm:w-32">
          {results.map(({ id, passed }) => (
            <span
              key={id}
              aria-hidden="true"
              className={`h-1.5 min-w-0 flex-1 rounded-full transition-colors duration-300 ease-out ${passed ? 'bg-emerald-500' : 'bg-dark-700/60'}`}
            />
          ))}
          <button
            type="button"
            className={`ml-1 flex size-5 shrink-0 items-center justify-center transition-colors duration-200 ${helpIconColor} focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-dark-white`}
            aria-label="Ver requisitos de contraseña"
            aria-expanded={isOpen}
            aria-controls="password-rules-popover"
            onFocus={() => isDesktop && setIsOpen(true)}
            onBlur={(event) => {
              if (isDesktop && !event.currentTarget.parentElement?.contains(event.relatedTarget)) setIsOpen(false)
            }}
            onMouseEnter={() => {
              if (isDesktop) {
                cancelClose()
                setIsOpen(true)
              }
            }}
            onMouseLeave={() => isDesktop && scheduleClose()}
            onClick={() => !isDesktop && setIsOpen((open) => !open)}
          >
            <CircleHelp aria-hidden="true" className="size-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      {isDesktop && (
        <div
          id="password-rules-popover"
          role="tooltip"
          aria-hidden={!isOpen}
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
          className={`absolute bottom-full right-0 z-50 mb-2 min-w-[220px] rounded-md border border-dark-700 bg-dark-900 p-4 shadow-xl transition-all duration-200 ease-out ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible pointer-events-none translate-y-1 opacity-0'}`}
        >
          <RequirementsList results={results} />
        </div>
      )}

      {!isDesktop && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-200 ease-out ${isOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}
          onClick={() => setIsOpen(false)}
          aria-hidden={!isOpen}
        >
          <div
            id="password-rules-popover"
            role="dialog"
            aria-modal={isOpen ? 'true' : undefined}
            aria-labelledby="password-rules-title"
            className={`relative w-full max-w-sm rounded-lg border border-dark-700 bg-dark-900 p-5 shadow-2xl transition-all duration-200 ease-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Cerrar requisitos"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              className="absolute right-3 top-3 flex size-7 items-center justify-center text-dark-400 transition-colors duration-200 hover:text-dark-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-dark-white"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
            <div id="password-rules-title" className="pr-8">
              <RequirementsList results={results} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
