import { PackageOpen } from 'lucide-react'

export default function EmptyState({ icon: Icon = PackageOpen, title = 'Aún no hay información', description = 'Cuando tengas novedades, las verás aquí.', actionLabel, onAction }) {
  return <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm"><Icon className="mb-4 size-16 text-gray-300" aria-hidden="true"/><h2 className="text-lg font-bold text-gray-900">{title}</h2><p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">{description}</p>{actionLabel && <button type="button" onClick={onAction} className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">{actionLabel}</button>}</div>
}
