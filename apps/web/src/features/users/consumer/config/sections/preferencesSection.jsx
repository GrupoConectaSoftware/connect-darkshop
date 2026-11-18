import { useState } from 'react'
import { preferencesOptionsData } from '../../../../../data/users.js'
import CarouselSelector from '../components/CarouselSelector'
import OnboardingSection, { actionRowClass, primaryActionClass, skipActionClass } from '../components/OnboardingSection'

const toggle = (items, value) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]

export default function PreferencesSection({ initialData, onNext, onLogout }) {
  const [styles, setStyles] = useState(initialData.styles || [])
  const [categories, setCategories] = useState(initialData.categories || [])
  const [brands, setBrands] = useState(initialData.brands || [])
  const save = () => onNext({ styles, categories, brands })
  return <OnboardingSection activeStep={5} eyebrow="Paso 05 de 06" title="Tus preferencias" subtitle="Selecciona tus gustos para que DarkShop pueda mostrarte colecciones y productos relevantes." onLogout={onLogout}><div className="space-y-3"><CarouselSelector title="Estilos de moda" subtitle="Escoge los estilos que más te representan." items={preferencesOptionsData.styles} selectedItems={styles} onToggle={(id) => setStyles((current) => toggle(current, id))}/><CarouselSelector title="Tipos de prendas" subtitle="Selecciona las categorías que más te interesan." items={preferencesOptionsData.onboardingCategories} selectedItems={categories} onToggle={(id) => setCategories((current) => toggle(current, id))}/><CarouselSelector title="Marcas de interés" subtitle="Opcional: selecciona las marcas que te gustan." items={preferencesOptionsData.brands} selectedItems={brands} onToggle={(id) => setBrands((current) => toggle(current, id))}/></div><div className={actionRowClass}><button type="button" onClick={save} className={skipActionClass}>Omitir</button><button type="button" onClick={save} className={`${primaryActionClass} hover:bg-neutral-200`}>Guardar preferencias</button></div></OnboardingSection>
}
