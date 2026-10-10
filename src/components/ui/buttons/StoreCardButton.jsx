import { ArrowRight, Store } from 'lucide-react'

export default function StoreCardButton({ storeName, brandType = 'PRESENCIAL' }) {
  return <button type="button" className="flex w-full items-center gap-2 border border-dark-200 p-2 text-left transition-colors hover:bg-dark-50"><span className="grid h-9 w-9 shrink-0 place-items-center bg-dark-200 text-dark-950"><Store size={17} /></span><span className="min-w-0 flex-1"><span className="block text-[9px] uppercase tracking-wider text-dark-500">Disponible en</span><span className="block truncate text-xs font-bold text-dark-950">{storeName}</span><span className="block text-[9px] text-dark-500">{brandType}</span></span><ArrowRight size={16} className="shrink-0 text-dark-950" /></button>
}
