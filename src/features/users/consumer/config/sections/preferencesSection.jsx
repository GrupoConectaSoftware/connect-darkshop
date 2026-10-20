import { useState } from 'react'
import { Backpack, Footprints, Glasses, ShoppingBag, Shirt, Trophy } from 'lucide-react'
import OnboardingSection from '../components/OnboardingSection'

const STYLES = [
  { id: 'urban', label: 'Urbano', icon: Shirt },
  { id: 'elegant', label: 'Elegante', icon: ShoppingBag },
  { id: 'sport', label: 'Deportivo', icon: Trophy },
  { id: 'oversize', label: 'Oversize', icon: Backpack },
]
const CATEGORIES = [
  { id: 'shirts', label: 'Camisetas', icon: Shirt },
  { id: 'pants', label: 'Pantalones', icon: ShoppingBag },
  { id: 'shorts', label: 'Shorts', icon: Trophy },
  { id: 'socks', label: 'Medias', icon: Footprints },
  { id: 'glasses', label: 'Gafas', icon: Glasses },
  { id: 'shoes', label: 'Zapatos', icon: Footprints },
]
const BRANDS = ['DARK', 'NIKE', 'ADIDAS', 'PUMA', 'NEW BALANCE', 'VANS']
const toggle = (items, value) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]

function ChoiceButton({ selected, label, icon: Icon, onClick }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`relative flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${selected ? 'border-red-700 bg-red-950/20 text-white' : 'border-neutral-800 bg-neutral-900 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300'}`}>
      <Icon size={18} aria-hidden="true" /><span className="text-[0.62rem] font-medium">{label}</span>
      {selected && <span aria-hidden="true" className="absolute right-2 top-2 size-2 rounded-full bg-red-600" />}
    </button>
  )
}

export default function PreferencesSection({ initialData, onNext, onLogout }) {
  const [styles, setStyles] = useState(initialData.styles)
  const [categories, setCategories] = useState(initialData.categories)
  const [brands, setBrands] = useState(initialData.brands)

  return (
    <OnboardingSection activeStep={5} eyebrow="Paso 05 de 06" title="Tus preferencias" subtitle="Selecciona tus gustos para que DarkShop pueda mostrarte colecciones y productos relevantes." onLogout={onLogout}>
      <fieldset>
        <legend className="mb-3 text-sm font-bold text-white">Estilos</legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STYLES.map((item) => <ChoiceButton key={item.id} {...item} selected={styles.includes(item.id)} onClick={() => setStyles((current) => toggle(current, item.id))} />)}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-bold text-white">Categorías</legend>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((item) => <ChoiceButton key={item.id} {...item} selected={categories.includes(item.id)} onClick={() => setCategories((current) => toggle(current, item.id))} />)}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-bold text-white">Marcas de interés <span className="font-normal text-neutral-500">(opcional)</span></legend>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {BRANDS.map((brand) => {
            const selected = brands.includes(brand)
            return <button key={brand} type="button" aria-label={`Seleccionar marca ${brand}`} aria-pressed={selected} onClick={() => setBrands((current) => toggle(current, brand))} className={`relative shrink-0 rounded-lg border px-4 py-3 text-xs font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${selected ? 'border-red-700 bg-red-950/20 text-white' : 'border-neutral-800 bg-neutral-900 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300'}`}>{brand}{selected && <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-600" />}</button>
          })}
        </div>
      </fieldset>

      <div className="mt-8 flex w-full gap-4">
        <button type="button" onClick={() => onNext({ styles, categories, brands })} className="flex-1 rounded-lg bg-white px-4 py-4 text-sm font-bold uppercase text-black transition-colors hover:bg-neutral-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Continuar</button>
        <button type="button" onClick={() => onNext({ styles, categories, brands })} className="w-32 rounded-lg border border-neutral-700 bg-transparent px-4 py-4 text-sm font-bold uppercase text-neutral-400 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600">Omitir</button>
      </div>
    </OnboardingSection>
  )
}
