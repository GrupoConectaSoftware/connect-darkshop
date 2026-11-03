import { useEffect, useState } from 'react'
import { Check, Copy, Share2, X } from 'lucide-react'

export default function ShareCollectionModal({ collection, isOpen, onClose }) {
  const [copied, setCopied] = useState(false)
  const url = `${window.location.origin}/collection/${collection.slug}`

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const copyLink = async () => {
    await navigator.clipboard?.writeText(url)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  const nativeShare = async () => {
    if (navigator.share) await navigator.share({ title: `DARK · ${collection.label}`, text: collection.tagline, url }).catch(() => {})
    else copyLink()
  }

  return (
    <div role="presentation" onMouseDown={onClose} className="fixed inset-0 z-[90] grid place-items-center bg-black/60 px-5 backdrop-blur-sm">
      <section role="dialog" aria-modal="true" aria-labelledby="share-collection-title" onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-md bg-white p-6 shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-dark-red">Compartir colección</p><h2 id="share-collection-title" className="mt-2 text-3xl font-black uppercase leading-none text-neutral-950">{collection.label}</h2></div>
          <button type="button" onClick={onClose} aria-label="Cerrar" className="grid size-9 place-items-center text-neutral-500 transition-colors hover:text-neutral-950"><X size={20} /></button>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-neutral-600">Comparte esta colección con quien quieras descubrirla.</p>
        <div className="mt-6 flex min-w-0 items-center border border-neutral-200 bg-neutral-50 p-2">
          <span className="min-w-0 flex-1 truncate px-2 text-xs text-neutral-600">{url}</span>
          <button type="button" onClick={copyLink} className="inline-flex shrink-0 items-center gap-2 bg-neutral-950 px-4 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-dark-red">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copiado' : 'Copiar'}</button>
        </div>
        <button type="button" onClick={nativeShare} className="mt-3 inline-flex w-full items-center justify-center gap-2 border border-neutral-950 px-5 py-3 text-xs font-bold uppercase tracking-wide text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white"><Share2 size={16} />Compartir</button>
      </section>
    </div>
  )
}
