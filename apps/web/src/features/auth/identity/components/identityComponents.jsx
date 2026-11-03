import { useEffect, useRef, useState } from 'react'

const CODE_LENGTH = 6

export default function IdentityComponents({
  email = 'al****@gmail.com',
  onVerify,
  onResend,
  expiresIn = 272,
}) {
  const [code, setCode] = useState(Array(CODE_LENGTH).fill(''))
  const [secondsLeft, setSecondsLeft] = useState(expiresIn)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState('')
  const inputRefs = useRef([])
  const completeCode = code.every(Boolean)

  useEffect(() => {
    if (secondsLeft <= 0) return undefined
    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [secondsLeft > 0])

  const formattedTime = `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(secondsLeft % 60).padStart(2, '0')}`

  const updateCode = (startIndex, rawValue) => {
    const digits = rawValue.replace(/\D/g, '').slice(0, CODE_LENGTH - startIndex)
    if (!digits && rawValue) return

    setCode((current) => {
      const next = [...current]
      digits.split('').forEach((digit, offset) => { next[startIndex + offset] = digit })
      if (!rawValue) next[startIndex] = ''
      return next
    })
    setNotice('')

    if (digits) {
      const nextFocusIndex = Math.min(startIndex + digits.length, CODE_LENGTH - 1)
      inputRefs.current[nextFocusIndex]?.focus()
    }
  }

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (event.key === 'ArrowRight' && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const pastedDigits = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH)
    if (!pastedDigits) return
    const next = Array(CODE_LENGTH).fill('')
    pastedDigits.split('').forEach((digit, index) => { next[index] = digit })
    setCode(next)
    setNotice('')
    inputRefs.current[Math.min(pastedDigits.length, CODE_LENGTH - 1)]?.focus()
  }

  const handleVerify = async (event) => {
    event.preventDefault()
    if (!completeCode) return
    setIsSubmitting(true)
    setNotice('')
    try {
      await onVerify?.(code.join(''))
      setNotice('Código listo para validar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResend = async () => {
    setNotice('')
    await onResend?.()
    setCode(Array(CODE_LENGTH).fill(''))
    setSecondsLeft(expiresIn)
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-neutral-500">Seguridad</p>
      <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] uppercase leading-[1.05] tracking-[-0.04em] text-neutral-950">
        Verifica tu identidad
      </h1>
      <p className="mb-8 mt-4 font-body text-base font-light leading-snug text-neutral-500 sm:mb-10 sm:text-lg">
        Ingresa el código de seis dígitos que enviamos a tu correo{' '}
        <span className="font-medium text-neutral-900">{email}</span>
      </p>

      <form onSubmit={handleVerify}>
        <div className="border border-neutral-300 p-4 sm:p-6">
          <p className="mb-5 font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-500 sm:tracking-[0.22em]">
            Código de verificación
          </p>
          <div className="flex items-center justify-center gap-1.5 sm:gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(element) => { inputRefs.current[index] = element }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={CODE_LENGTH}
                autoComplete={index === 0 ? 'one-time-code' : 'off'}
                value={digit}
                onChange={(event) => updateCode(index, event.target.value)}
                onKeyDown={(event) => handleKeyDown(index, event)}
                onPaste={handlePaste}
                aria-label={`Dígito ${index + 1} del código`}
                className="h-12 w-9 min-w-0 border border-neutral-300 bg-white text-center font-display text-xl text-neutral-950 outline-none transition-colors duration-200 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 sm:h-16 sm:w-14 sm:text-2xl"
              />
            ))}
          </div>
          <p aria-live="polite" className="mt-5 font-body text-xs font-light text-neutral-600">
            {secondsLeft > 0 ? <>El código vence en <span className="font-semibold text-neutral-900">{formattedTime}</span></> : 'El código expiró. Puedes solicitar uno nuevo.'}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:mt-10">
          <button type="submit" disabled={!completeCode || isSubmitting} className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 bg-neutral-950 px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white border-r-transparent" />}
            Verificar código
          </button>
          <button type="button" onClick={handleResend} className="min-h-14 w-full cursor-pointer border border-neutral-950 bg-transparent px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.16em] text-neutral-950 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
            Reenviar código
          </button>
        </div>
        {notice && <p role="status" aria-live="polite" className="mt-4 font-body text-xs text-neutral-600">{notice}</p>}
      </form>
    </div>
  )
}
