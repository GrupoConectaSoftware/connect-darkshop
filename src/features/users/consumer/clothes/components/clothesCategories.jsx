import { ArrowUpRight } from 'lucide-react'

export default function ClothesCategories({ categories, productCounts, selectedCategories = [], onSelect }) {
  return (
    <section aria-label="Categorías del catálogo" className="mt-1 grid grid-cols-2 gap-1 sm:grid-cols-3 xl:grid-cols-6">
      {categories.map((category) => {
        const selected = selectedCategories.includes(category.name)

        return (
          <button key={category.name} type="button" aria-label={`Ver ${category.name}, ${productCounts[category.name]} artículos`} aria-pressed={selected} onClick={() => onSelect(category.name)} className={`group relative aspect-square cursor-pointer overflow-hidden bg-dark-950 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red sm:aspect-[4/5] ${selected ? 'ring-2 ring-inset ring-dark-red' : ''}`}>
            <img src={category.image} alt="" className="absolute inset-0 size-full object-cover object-bottom transition-transform duration-500 group-hover:scale-105" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/95" />
            <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-dark-white sm:inset-x-5 sm:bottom-5">
              <span className="min-w-0">
                <span className="block font-display text-lg uppercase leading-none tracking-wide sm:text-xl">{category.name}</span>
                <span className="mt-1.5 block text-[9px] font-medium uppercase tracking-[0.13em] text-white/75 sm:text-[10px]">{productCounts[category.name]} artículos</span>
              </span>
              <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full border border-white/80 transition-all duration-300 group-hover:translate-x-1 group-hover:border-white group-hover:bg-white group-hover:text-dark-950"><ArrowUpRight size={16} /></span>
            </span>
          </button>
        )
      })}
    </section>
  )
}
