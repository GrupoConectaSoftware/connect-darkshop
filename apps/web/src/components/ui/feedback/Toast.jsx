import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle, AlertCircle, Loader2, X } from 'lucide-react'

const icons = { success: CheckCircle2, error: XCircle, info: AlertCircle, loading: Loader2 }

export default function Toast({ id, type = 'info', message, onClose, duration = 4000 }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const close = () => {
    if (type === 'loading') return
    setVisible(false)
    window.setTimeout(() => onClose?.(id), 300)
  }

  useEffect(() => {
    if (type === 'loading' || !onClose) return
    const timer = window.setTimeout(() => {
      setVisible(false)
      window.setTimeout(onClose, 300)
    }, duration)
    return () => window.clearTimeout(timer)
  }, [type, duration, onClose])

  const Icon = icons[type] || AlertCircle

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`pointer-events-auto flex w-full items-center gap-3 rounded-xl border border-white/10 bg-neutral-950/95 px-4 py-3.5 text-sm text-white shadow-xl backdrop-blur-md transition-all duration-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
    >
      <Icon size={19} aria-hidden="true" className={`shrink-0 text-white ${type === 'loading' ? 'animate-spin' : ''}`} />
      <span className="min-w-0 flex-1">{message}</span>
      {type !== 'loading' && onClose && (
        <button
          type="button"
          onClick={close}
          aria-label="Cerrar notificación"
          className="grid size-7 shrink-0 place-items-center text-neutral-300 transition-colors hover:text-white"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
