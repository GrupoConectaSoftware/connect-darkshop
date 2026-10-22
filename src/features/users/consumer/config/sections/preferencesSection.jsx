import { useState } from 'react'
import OnboardingSection, { actionRowClass, primaryActionClass, skipActionClass } from '../components/OnboardingSection'

const STYLES = [
  { id: 'urban', label: 'Urbano' },
  { id: 'elegant', label: 'Elegante' },
  { id: 'sport', label: 'Deportivo' },
  { id: 'oversize', label: 'Oversize' },
]
const CATEGORIES = [
  { id: 'shirts', label: 'Camisetas' },
  { id: 'pants', label: 'Pantalones' },
  { id: 'shorts', label: 'Shorts' },
  { id: 'socks', label: 'Medias' },
  { id: 'glasses', label: 'Gafas' },
  { id: 'shoes', label: 'Zapatos' },
]
const BRANDS = ['DARK', 'NIKE', 'ADIDAS', 'PUMA', 'NEW BALANCE', 'VANS']
const toggle = (items, value) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]

function ChoiceButton({ selected, label, onClick }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onClick} className={`relative flex min-h-16 flex-col items-center justify-center gap-1.5 rounded-lg border px-2 py-3 text-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${selected ? 'border-red-700 bg-red-950/20 text-white' : 'border-neutral-800 bg-neutral-900 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300'}`}>
      <span className="text-[0.62rem] font-medium">{label}</span>
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
        <div className="flex max-h-[4.25rem] snap-y snap-mandatory flex-col gap-2 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {STYLES.map((item) => <ChoiceButton key={item.id} {...item} selected={styles.includes(item.id)} onClick={() => setStyles((current) => toggle(current, item.id))} />)}
        </div>
      </fieldset>

      <fieldset className="mt-3">
        <legend className="mb-3 text-sm font-bold text-white">Categorías</legend>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((item) => <ChoiceButton key={item.id} {...item} selected={categories.includes(item.id)} onClick={() => setCategories((current) => toggle(current, item.id))} />)}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-3 text-sm font-bold text-white">Marcas de interés <span className="font-normal text-neutral-500">(opcional)</span></legend>
        <div className="flex max-h-[3.5rem] snap-y snap-mandatory flex-col gap-2 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {BRANDS.map((brand) => {
            const selected = brands.includes(brand)
            return <button key={brand} type="button" aria-label={`Seleccionar marca ${brand}`} aria-pressed={selected} onClick={() => setBrands((current) => toggle(current, brand))} className={`relative shrink-0 rounded-lg border px-4 py-3 text-xs font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${selected ? 'border-red-700 bg-red-950/20 text-white' : 'border-neutral-800 bg-neutral-900 text-neutral-500 hover:border-neutral-700 hover:text-neutral-300'}`}>{brand}{selected && <span aria-hidden="true" className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-red-600" />}</button>
          })}
        </div>
      </fieldset>

      <div className={actionRowClass}>
        <button type="button" onClick={() => onNext({ styles, categories, brands })} className={skipActionClass}>Omitir</button>
        <button type="button" onClick={() => onNext({ styles, categories, brands })} className={primaryActionClass}>Continuar</button>
      </div>
    </OnboardingSection>
  )
}
