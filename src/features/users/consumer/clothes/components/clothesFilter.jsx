import { Check } from 'lucide-react'

const categories = ['Camisetas', 'Chaquetas', 'Zapatos', 'Pantalones', 'Accesorios', 'Exclusivo']
const genders = ['Hombre', 'Mujer', 'Unisex']
const references = ['Oversize', 'Underground', 'Streetwear', 'Urbano', 'Casual', 'Vintage', 'Techwear', 'Y2K', 'Básico', 'Minimalista', 'Estampado', 'Gótico', 'Deportivo', 'Grunge', 'Oversize', 'Elegante', 'Athleisure', 'SmartCasual', 'Old Money', 'Workwear', 'DTF']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const colors = [
  { value: 'gris', className: 'bg-dark-200' },
  { value: 'vinotinto', className: 'bg-dark-burgundy' },
  { value: 'blanco', className: 'bg-dark-white' },
  { value: 'negro', className: 'bg-dark-950' },
]

function CheckboxOption({ id, label, checked, onChange }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-sm font-light text-dark-500 transition-colors hover:text-dark-950">
      <input id={id} type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
      <span className="grid size-5 shrink-0 place-items-center border border-dark-300 bg-dark-white text-transparent transition-colors peer-checked:border-dark-950 peer-checked:bg-dark-950 peer-checked:text-dark-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dark-red"><Check size={12} strokeWidth={3} /></span>
      {label}
    </label>
  )
}

function FilterBlock({ title, children, separated = true }) {
  return <section className={separated ? 'border-t border-dark-200 pt-7' : ''}><h2 className="mb-4 text-xs font-bold uppercase tracking-wide text-dark-950">{title}</h2>{children}</section>
}

export default function ClothesFilter({ filters, onChange, onClear }) {
  const toggle = (key, value) => onChange({ ...filters, [key]: filters[key].includes(value) ? filters[key].filter((item) => item !== value) : [...filters[key], value] })
  const updatePrice = (position, value) => {
    const amount = Number(value)
    const [min, max] = filters.price
    onChange({ ...filters, price: position === 'min' ? [Math.min(amount, max), max] : [min, Math.max(amount, min)] })
  }

  return (
    <aside className="h-fit border border-dark-200 bg-dark-white p-6 lg:sticky lg:top-5 xl:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-bold uppercase tracking-wide text-dark-red">Filtros</p>
        <button type="button" onClick={onClear} className="cursor-pointer text-[10px] font-medium uppercase tracking-wide text-dark-300 transition-colors hover:text-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red">Limpiar filtros</button>
      </div>

      <div className="mt-8 space-y-8">
        <FilterBlock title="Categorías" separated={false}><div className="space-y-4">{categories.map((item) => <CheckboxOption key={item} id={`clothes-category-${item}`} label={item} checked={filters.categories.includes(item)} onChange={() => toggle('categories', item)} />)}</div></FilterBlock>
        <FilterBlock title="Género"><div className="space-y-4">{genders.map((item) => <CheckboxOption key={item} id={`clothes-gender-${item}`} label={item} checked={filters.genders.includes(item)} onChange={() => toggle('genders', item)} />)}</div></FilterBlock>
        <FilterBlock title="Referencia"><div className="grid grid-cols-3 gap-2">{references.map((item, index) => <button key={`${item}-${index}`} type="button" aria-pressed={filters.references.includes(item)} onClick={() => toggle('references', item)} className={`h-9 w-full cursor-pointer truncate rounded-lg border px-2 text-[10px] font-light uppercase transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red ${filters.references.includes(item) ? 'border-dark-950 bg-dark-950 text-dark-white' : 'border-dark-300 bg-dark-white text-dark-400 hover:border-dark-700 hover:text-dark-950'}`}>{item}</button>)}</div></FilterBlock>
        <FilterBlock title="Tallas"><div className="grid grid-cols-6 gap-1.5">{sizes.map((size) => <button key={size} type="button" onClick={() => toggle('sizes', size)} aria-pressed={filters.sizes.includes(size)} className={`h-9 cursor-pointer rounded-sm border text-[10px] transition-colors ${filters.sizes.includes(size) ? 'border-dark-950 bg-dark-950 text-dark-white' : 'border-dark-300 text-dark-400 hover:border-dark-700 hover:text-dark-950'}`}>{size}</button>)}</div></FilterBlock>
        <FilterBlock title="Color"><div className="flex gap-2.5">{colors.map((color) => <button key={color.value} type="button" onClick={() => toggle('colors', color.value)} aria-label={`Filtrar por color ${color.value}`} aria-pressed={filters.colors.includes(color.value)} className={`size-6 cursor-pointer rounded-full border-2 ${color.class} ${filters.colors.includes(color.value) ? 'border-dark-red ring-2 ring-dark-red/25' : 'border-dark-300'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red`} />)}</div></FilterBlock>
        <FilterBlock title="Precio">
          <div className="relative h-7"><span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-dark-400" /><input aria-label="Precio mínimo" type="range" min="0" max="250000" step="5000" value={filters.price[0]} onChange={(event) => updatePrice('min', event.target.value)} className="pointer-events-none absolute inset-0 z-10 h-7 w-full cursor-pointer appearance-none bg-transparent accent-dark-950 [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto" /><input aria-label="Precio máximo" type="range" min="0" max="250000" step="5000" value={filters.price[1]} onChange={(event) => updatePrice('max', event.target.value)} className="pointer-events-none absolute inset-0 z-20 h-7 w-full cursor-pointer appearance-none bg-transparent accent-dark-950 [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto" /></div>
          <div className="mt-2 flex justify-between text-[11px] text-dark-500"><span>${filters.price[0].toLocaleString('es-CO')}</span><span>${filters.price[1].toLocaleString('es-CO')}</span></div>
        </FilterBlock>
        <FilterBlock title="Ciudad"><div className="space-y-4">{['Cali', 'Medellín'].map((city) => <CheckboxOption key={city} id={`clothes-city-${city}`} label={city} checked={filters.cities.includes(city)} onChange={() => toggle('cities', city)} />)}</div></FilterBlock>
      </div>
    </aside>
  )
}
