import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import FAQList from '../../components/ui/FAQList'

export default function PqrComponent({ isOpen, onClose }) {
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return undefined
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll('button:not([disabled])')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKeyDown) }
  }, [isOpen, onClose])

  if (!isOpen) return null
  const modal = <div className="fixed inset-0 z-120 grid place-items-center overflow-y-auto bg-black/70 p-3 backdrop-blur-md sm:p-6"><section ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="pqr-title" className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden border border-white/10 bg-dark-950 text-dark-white shadow-2xl sm:max-h-[calc(100dvh-3rem)]"><header className="relative shrink-0 border-b border-white/10 px-5 py-6 sm:px-9 sm:py-8"><div className="absolute left-0 top-0 h-px w-24 bg-dark-red"/><div className="flex items-start justify-between gap-6"><div><div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-dark-red sm:text-xs"><span className="h-px w-8 bg-dark-red"/><span>PQR · Soporte DARKSHOP</span></div><h2 id="pqr-title" className="mt-4 font-display text-3xl uppercase leading-[0.9] tracking-tight sm:text-5xl">¿Cómo podemos ayudarte?</h2><p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-neutral-400 sm:text-base">Encuentra información sobre prendas, pedidos y servicios de DARKSHOP.</p></div><button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Cerrar preguntas frecuentes" className="grid size-10 shrink-0 place-items-center text-neutral-400 transition-colors hover:text-white focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white"><X size={21} strokeWidth={1.4}/></button></div></header><FAQList/><footer className="flex shrink-0 flex-col gap-1 border-t border-white/10 px-5 py-4 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between sm:px-9"><span>¿Aún necesitas ayuda?</span><a className="font-medium uppercase tracking-wide text-neutral-200 transition-colors hover:text-dark-red" href="mailto:darkshop@reportas.com">darkshop@reportas.com ↗</a></footer></section></div>
  return createPortal(modal, document.body)
}
