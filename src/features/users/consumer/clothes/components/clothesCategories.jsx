import { ArrowUpRight } from 'lucide-react'

export default function ClothesCategories({ categories, onSelect }) {
  return (
    <section aria-label="Categorías del catálogo" className="mt-1 grid grid-cols-2 gap-1 sm:grid-cols-3 xl:grid-cols-6">
      {categories.map((category) => (
        <button key={category.name} type="button" aria-label={`Ver ${category.name}`} onClick={() => onSelect(category.name)} className="group relative aspect-square cursor-pointer overflow-hidden bg-dark-950 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red sm:aspect-[4/5]">
          <img src={category.image} alt="" className="h-full w-full object-cover object-bottom transition-transform duration-300 group-hover:scale-105" />
          <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 grid size-6 place-items-center rounded-full bg-dark-950/65 text-dark-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"><ArrowUpRight size={13} /></span>
        </button>
      ))}
    </section>
  )
}
