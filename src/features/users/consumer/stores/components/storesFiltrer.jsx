import { Search } from 'lucide-react'
import { STORE_CATEGORIES, STORE_REFERENCES } from '../data/storeFilters'

function SearchField({ id, label, placeholder, value, onChange }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-dark-950">{label}</span>
      <span className="relative block">
        <Search size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-dark-800" strokeWidth={1.8} />
        <input id={id} value={value} onChange={onChange} placeholder={placeholder} className="h-11 w-full rounded-lg border border-transparent bg-dark-50 pl-11 pr-3 text-xs font-light text-dark-950 shadow-sm outline-none transition focus:border-dark-500 focus:bg-dark-white" />
      </span>
    </label>
  )
}

function CheckboxOption({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="group flex cursor-pointer items-center gap-3 text-[13px] font-light uppercase tracking-[0.08em] text-dark-400">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span aria-hidden="true" className="grid size-5 shrink-0 place-items-center border border-dark-400 bg-dark-white text-xs font-bold text-transparent transition-colors after:content-['✓'] group-hover:border-dark-700 peer-checked:border-dark-950 peer-checked:bg-dark-950 peer-checked:text-dark-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dark-red" />
      {label}
    </label>
  )
}

export default function StoresFiltrer({ filters, onChange, onClear, onApply }) {
  const updateFilter = (key, value) => onChange({ ...filters, [key]: value })
  const toggle = (key, value) => updateFilter(key, filters[key].includes(value) ? filters[key].filter((item) => item !== value) : [...filters[key], value])

  return (
    <aside className="h-fit lg:sticky lg:top-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-dark-red">Filtros</p>
        <button type="button" onClick={onClear} className="cursor-pointer text-[10px] font-medium uppercase tracking-wide text-dark-300 transition-colors hover:text-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">Limpiar filtros</button>
      </div>

      <div className="mt-7 space-y-7">
        <SearchField id="search-store" label="Buscar tienda" placeholder="Busca el establecimiento de tu estilo" value={filters.storeSearch} onChange={(event) => updateFilter('storeSearch', event.target.value)} />
        <SearchField id="search-city" label="Busca tu ciudad" placeholder="Busca con exactitud la ciudad" value={filters.citySearch} onChange={(event) => updateFilter('citySearch', event.target.value)} />

        <fieldset>
          <legend className="mb-3 text-[11px] font-bold uppercase tracking-wide text-dark-950">Categorías</legend>
          <div className="space-y-3">
            {STORE_CATEGORIES.map((category) => <CheckboxOption key={category} id={`category-${category}`} label={category} checked={filters.categories.includes(category)} onChange={() => toggle('categories', category)} />)}
          </div>
        </fieldset>

        <div className="border-t border-dark-700 pt-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-dark-950">Referencia</p>
          <div className="grid grid-cols-3 gap-2">
            {STORE_REFERENCES.map((reference) => {
              const checked = filters.references.includes(reference.id)
              return <button key={reference.id} type="button" aria-pressed={checked} onClick={() => toggle('references', reference.id)} className={`h-8 w-full min-w-0 cursor-pointer truncate rounded-md border px-1 text-center text-[11px] font-light transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red ${checked ? 'border-dark-950 bg-dark-950 text-dark-white' : 'border-dark-400 bg-dark-white text-dark-400 hover:border-dark-700 hover:text-dark-950'}`}>{reference.label}</button>
            })}
          </div>
        </div>

        <div className="border-t border-dark-700 pt-6">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-dark-950">Ciudad</p>
          <CheckboxOption id="my-city" label="En mi ciudad" checked={filters.inMyCity} onChange={(event) => updateFilter('inMyCity', event.target.checked)} />
        </div>

        <button type="button" onClick={() => onApply(filters)} className="flex h-10 w-full cursor-pointer items-center justify-center bg-dark-950 px-4 text-[11px] font-bold uppercase tracking-[0.12em] text-dark-white transition-colors hover:bg-dark-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">
          Aplicar filtros
        </button>
      </div>
    </aside>
  )
}
