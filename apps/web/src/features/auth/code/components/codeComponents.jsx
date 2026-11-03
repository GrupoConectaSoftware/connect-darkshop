import { useState } from 'react'

export default function CodeComponents({ email = 'al••••••@gmail.com', onEnterCode, onResend }) {
  const [isResending, setIsResending] = useState(false)
  const [notice, setNotice] = useState('')

  const handleResend = async () => {
    if (isResending) return
    setIsResending(true)
    setNotice('')
    try {
      await onResend?.()
      setNotice('La solicitud de reenvío está lista para el servicio de correo.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="w-full max-w-xl">
      <p className="mb-4 font-body text-[0.7rem] font-bold uppercase tracking-[0.22em] text-neutral-500">Seguridad</p>
      <h1 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] uppercase leading-[1.05] tracking-[-0.04em] text-neutral-950">
        Revisa tu correo
      </h1>
      <p className="mt-5 font-body text-base font-light leading-snug text-neutral-500 sm:text-lg">
        Enviamos un código de seguridad a:
      </p>
      <p className="mt-6 break-all font-body text-sm font-bold text-neutral-950 sm:text-base">{email}</p>

      <div className="mt-7 flex items-stretch gap-3" role="note">
        <span className="w-px shrink-0 bg-neutral-950" aria-hidden="true" />
        <p className="py-1 font-body text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.14em] text-neutral-950 sm:text-xs sm:tracking-[0.18em]">
          Este código tiene un tiempo limitado para su uso
        </p>
      </div>

      <button type="button" onClick={onEnterCode} className="mt-10 inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 bg-neutral-950 px-6 py-4 font-body text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 sm:mt-12">
        Ingresar código
      </button>

      <p className="mt-6 text-center font-body text-xs font-light leading-relaxed text-neutral-500 sm:text-sm">
        Si el código no llegó a tu correo,{' '}
        <button type="button" onClick={handleResend} disabled={isResending} className="cursor-pointer font-medium text-neutral-950 underline underline-offset-4 transition-colors duration-200 hover:text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 disabled:cursor-not-allowed disabled:opacity-50">
          {isResending ? 'reenviando…' : 'reenvíalo aquí'}
        </button>
      </p>
      {notice && <p role="status" aria-live="polite" className="mt-3 text-center font-body text-xs text-neutral-500">{notice}</p>}
    </div>
  )
}
