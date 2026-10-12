import { useState } from 'react'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function RecoveryComponents({ maskedEmail = 'al****@gmail.com', onSubmit, onBack }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const normalizedEmail = email.trim()

    if (!normalizedEmail) {
      setError('El correo es obligatorio.')
      return
    }
    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      setError('Ingresa un correo válido.')
      return
    }

    setError('')
    setIsSubmitting(true)
    try {
      await onSubmit?.(normalizedEmail)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-neutral-500">Seguridad</p>
      <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] uppercase leading-[1.05] tracking-[-0.04em] text-neutral-950">
        Recuperamos tu acceso
      </h1>
      <p className="mb-8 mt-4 font-body text-base font-light leading-snug text-neutral-500 sm:mb-12 sm:text-lg">
        Ingresa el correo de recuperación asociado a tu cuenta{' '}
        <span className="font-medium text-neutral-900">{maskedEmail}</span>. Allí recibirás el código de verificación.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="recovery-email" className="mb-3 block font-body text-[0.7rem] font-bold uppercase tracking-[0.14em] text-neutral-950">
          Confirma tu correo de recuperación
        </label>
        <input
          id="recovery-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            if (error) setError('')
          }}
          onBlur={() => {
            const value = email.trim()
            if (value && !EMAIL_PATTERN.test(value)) setError('Ingresa un correo válido.')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'recovery-email-error' : undefined}
          placeholder="Tú@ejemplo.com"
          className={`w-full border bg-white px-4 py-4 font-body text-sm text-neutral-950 outline-none transition-colors duration-200 placeholder:text-neutral-400 ${error ? 'border-red-500' : 'border-neutral-300 focus:border-neutral-900'}`}
        />
        {error && <p id="recovery-email-error" aria-live="polite" className="mt-2 font-body text-xs text-red-500">{error}</p>}

        <div className="mt-8 flex flex-col gap-3 sm:mt-12">
          <button type="submit" disabled={!EMAIL_PATTERN.test(email.trim()) || isSubmitting} className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 bg-neutral-950 px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white border-r-transparent" />}
            Enviar código
          </button>
          <button type="button" onClick={onBack} className="min-h-14 w-full cursor-pointer border border-neutral-950 bg-transparent px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.16em] text-neutral-950 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
            Volver a mi cuenta
          </button>
        </div>
      </form>
    </div>
  )
}
