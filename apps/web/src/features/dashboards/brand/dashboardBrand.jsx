import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { readProducts } from '../../../hooks/productRegistry'

export default function DashboardBrand() {
  let products
  try {
    products = readProducts()
  } catch {
    products = null
  }
  return <main className="min-h-screen bg-neutral-100 p-6 text-neutral-950 sm:p-12 dark:bg-neutral-950 dark:text-white">
    <section className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-sm sm:p-10 dark:bg-neutral-900">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-700">
        <div><p className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">Panel de marca</p><h1 className="mt-2 text-3xl font-black">Productos</h1></div>
        <Link to="/dashboard/brand/products/new" className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-bold text-white"><Plus size={18} />Registrar producto</Link>
      </header>
      {products?.length ? <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">{products.map(p => <li className="flex justify-between gap-4 py-4" key={p.sku}><strong>{p.name}</strong><span>{p.sku}</span></li>)}</ul>
        : <p className="mt-6">{products ? 'Aún no tienes productos registrados en este dispositivo.' : 'No se pudieron leer los productos guardados.'}</p>}
    </section>
  </main>
}
