import { useEffect, useRef } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { officialChannels } from '../../../data/officialChannels'

export default function OfficialChannels({ isOpen, onClose }) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!isOpen) return undefined
    closeRef.current?.focus()
    const key = event => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [isOpen, onClose])
  if (!isOpen) return null
  return <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
    <section role="dialog" aria-modal="true" aria-labelledby="channels-title" onClick={event => event.stopPropagation()} className="max-h-[90dvh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-white/20 bg-neutral-950 p-5 text-white shadow-2xl sm:p-8">
      <header className="mb-6 flex justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-red-500">DarkShop</p><h2 id="channels-title" className="mt-2 text-2xl font-black sm:text-3xl">Nuestros canales oficiales</h2><p className="mt-2 text-sm text-neutral-400">Conecta con nuestra comunidad.</p></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar canales" className="self-start rounded-full p-2 hover:bg-neutral-800"><X /></button></header>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{officialChannels.map(({ name, icon: Icon, image, description, url }) => <article key={name} className="overflow-hidden rounded-2xl border border-white/15 bg-neutral-900">
        <div className="group relative aspect-[9/16] overflow-hidden"><img src={image} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">{url ? <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">Visitar sitio <ExternalLink size={16} /></a> : <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black">Visitar sitio <ExternalLink size={16} /></span>}</div></div>
        <div className="p-4"><h3 className="flex items-center gap-2 font-bold"><Icon size={19} />{name}</h3><p className="mt-2 text-sm text-neutral-400">{description}</p></div>
      </article>)}</div>
    </section>
  </div>
}
