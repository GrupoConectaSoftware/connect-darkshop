import { ChevronRight, X } from 'lucide-react'
import { chatData } from '../../../../../data/chatData'

export default function GuideComponent({ onClose, onSelect }) {
  return <>
    <header className="flex items-start justify-between border-b border-neutral-200 px-6 py-6">
      <div className="flex gap-3"><span className="text-3xl font-black text-red-700">/</span><div><h2 id="darkmood-title" className="text-3xl font-black tracking-tight">darkmood</h2><p className="text-sm text-neutral-500">Asistente de moda IA</p></div></div>
      <button type="button" aria-label="Cerrar chat" onClick={onClose} className="rounded-full p-2 hover:bg-neutral-100"><X size={22} /></button>
    </header>
    <section className="px-6 pt-6"><h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-neutral-500">Explora y gestiona</h3><div className="space-y-2">{chatData.map(({ label, icon: Icon, ...option }) => <button key={label} type="button" onClick={() => onSelect(option)} className={`flex w-full items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-left text-sm font-semibold transition-colors hover:border-red-300 hover:bg-red-50 ${option.chat ? 'text-red-700' : ''}`}><Icon size={19} /><span className="flex-1">{label}</span><ChevronRight size={18} /></button>)}</div></section>
  </>
}
