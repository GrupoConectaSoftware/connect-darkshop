import { useEffect, useState } from 'react'

function DigitBox({ value }) {
  return (
    <span className="flex h-16 w-10 items-center justify-center border border-neutral-300 bg-white shadow-sm sm:h-20 sm:w-14">
      <span className="font-display text-3xl leading-none text-neutral-950 sm:text-4xl">{value}</span>
    </span>
  )
}

function TimeGroup({ value }) {
  return (
    <span className="flex gap-1 sm:gap-2">
      {value.split('').map((digit, index) => <DigitBox key={`${index}-${digit}`} value={digit} />)}
    </span>
  )
}

export default function BanComponents({ onReport, onBack, initialSeconds = 5537 }) {
  const [secondsLeft, setSecondsLeft] = useState(Math.max(0, initialSeconds))
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) return undefined
    const intervalId = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1))
    }, 1000)
    return () => window.clearInterval(intervalId)
  }, [secondsLeft > 0])

  const hours = String(Math.floor(secondsLeft / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0')
  const seconds = String(secondsLeft % 60).padStart(2, '0')

  const handleReport = async () => {
    setIsSubmitting(true)
    try {
      await onReport?.()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-neutral-500">Seguridad</p>
      <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] uppercase leading-[0.95] tracking-[-0.04em] text-neutral-950">
        <span className="block">Acceso</span>
        <span className="block">bloqueado</span>
        <span className="block">temporalmente</span>
      </h1>
      <p className="mb-8 mt-4 font-body text-base font-light leading-snug text-neutral-500 sm:mb-10 sm:text-lg">
        Detectamos varios intentos fallidos de inicio de sesión.
      </p>

      <div className="border border-neutral-300 p-5 sm:p-7">
        <p className="mb-6 text-center font-body text-[0.65rem] font-bold uppercase tracking-[0.18em] text-neutral-500 sm:mb-7 sm:tracking-[0.22em]">
          Podrás intentar de nuevo en
        </p>
        <div aria-live="polite" aria-label={`${hours} horas, ${minutes} minutos y ${seconds} segundos`} className="flex items-center justify-center gap-1 sm:gap-3">
          <TimeGroup value={hours} />
          <span aria-hidden="true" className="font-display text-3xl leading-none text-neutral-950 sm:text-4xl">:</span>
          <TimeGroup value={minutes} />
          <span aria-hidden="true" className="font-display text-3xl leading-none text-neutral-950 sm:text-4xl">:</span>
          <TimeGroup value={seconds} />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:mt-10">
        <button
          type="button"
          onClick={handleReport}
          disabled={isSubmitting}
          className="inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 bg-neutral-950 px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting && <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-white border-r-transparent" />}
          Enviar reporte
        </button>
        <button
          type="button"
          onClick={onBack}
          className="min-h-14 w-full cursor-pointer border border-neutral-950 bg-transparent px-6 py-4 font-body text-xs font-medium uppercase tracking-[0.16em] text-neutral-950 transition-colors duration-200 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          Volver al comercio
        </button>
      </div>
    </div>
  )
}
