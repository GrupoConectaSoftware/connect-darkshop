import { SearchX } from 'lucide-react'

export default function EmptyClothes() {
  return (
    <section className="grid min-h-80 place-items-center border border-dashed border-dark-300 bg-dark-50 px-6 text-center">
      <div className="max-w-sm"><SearchX className="mx-auto size-9 text-dark-red" /><h2 className="mt-4 text-2xl font-black uppercase tracking-[-0.05em]">No encontramos piezas</h2><p className="mt-2 text-sm leading-relaxed text-dark-500">Prueba con otra selección de filtros para descubrir nuevas referencias.</p></div>
    </section>
  )
}
