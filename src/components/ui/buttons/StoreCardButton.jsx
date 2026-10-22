import { ArrowRight, Store } from 'lucide-react'

export default function StoreCardButton({ storeName = 'DARK' }) {
  return <button type="button" className="flex w-full cursor-pointer items-center gap-3 border border-dark-200 p-2 text-left transition-colors hover:bg-dark-50"><span className="grid h-9 w-9 shrink-0 place-items-center bg-dark-200 text-dark-950"><Store size={17} /></span><span className="min-w-0 flex-1 leading-tight"><span className="block text-[9px] uppercase tracking-wider text-dark-500">Disponible en</span><span className="mt-0.5 block truncate text-xs font-bold uppercase text-dark-950">{storeName}</span><span className="mt-0.5 block text-[9px] uppercase tracking-wide text-dark-500">Tienda Oficial</span></span><ArrowRight size={16} className="shrink-0 text-dark-950" /></button>
}
