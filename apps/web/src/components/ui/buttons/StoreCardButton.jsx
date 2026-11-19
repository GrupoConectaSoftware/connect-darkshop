import { ArrowRight, Store } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StoreCardButton({ storeName = 'DARK' }) {
  return <Link to="/brand" aria-label={`Visitar tienda ${storeName}`} data-product-store-row className="flex w-full items-center gap-3 border border-dark-200 p-2 text-left transition-colors hover:bg-dark-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red dark:border-[#2a2a2d]"><span className="grid h-9 w-9 shrink-0 place-items-center bg-dark-200 text-dark-950 dark:bg-neutral-700 dark:text-white"><Store size={17} /></span><span className="min-w-0 flex-1 leading-tight"><span className="block text-[9px] uppercase tracking-wider text-dark-500 dark:text-gray-400">Disponible en</span><span className="mt-0.5 block truncate text-xs font-bold uppercase text-dark-950 dark:text-white">{storeName}</span><span className="mt-0.5 block text-[9px] uppercase tracking-wide text-dark-500 dark:text-gray-400">Tienda Oficial</span></span><ArrowRight size={16} className="shrink-0 text-dark-950 dark:text-white" /></Link>
}
