import { useState } from 'react'
import CarouselSelector from '../components/CarouselSelector'
import OnboardingSection, { actionRowClass, primaryActionClass, skipActionClass } from '../components/OnboardingSection'
import SizeCarousel from '../components/SizeCarousel'

const STYLES = [
  { id: 'urban', label: 'Urbano' }, { id: 'elegant', label: 'Elegante' }, { id: 'sport', label: 'Deportivo' }, { id: 'oversize', label: 'Oversize' }, { id: 'minimalist', label: 'Minimalista' }, { id: 'techwear', label: 'Techwear' }, { id: 'other', label: 'Otro' },
]
const CATEGORIES = [
  { id: 'shirts', label: 'Camisetas' }, { id: 'pants', label: 'Pantalones' }, { id: 'shorts', label: 'Shorts' }, { id: 'jackets', label: 'Chaquetas' }, { id: 'socks', label: 'Medias' }, { id: 'glasses', label: 'Gafas' }, { id: 'shoes', label: 'Zapatos' }, { id: 'other', label: 'Otro' },
]
const COLORS = [
  { id: 'black', label: 'Negro' }, { id: 'gray', label: 'Gris' }, { id: 'white', label: 'Blanco' }, { id: 'wine', label: 'Rojo vino' }, { id: 'beige', label: 'Beige' }, { id: 'other', label: 'Otro' },
]
const BRANDS = [
  { id: 'dark', label: 'DARK' }, { id: 'nike', label: 'NIKE' }, { id: 'adidas', label: 'ADIDAS' }, { id: 'puma', label: 'PUMA' }, { id: 'new-balance', label: 'NEW BALANCE' }, { id: 'vans', label: 'VANS' }, { id: 'other', label: 'Otro' },
]
const toggle = (items, value) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]

export default function PreferencesSection({ initialData, onNext, onLogout }) {
  const [styles, setStyles] = useState(initialData.styles || [])
  const [categories, setCategories] = useState(initialData.categories || [])
  const [colors, setColors] = useState(initialData.colors || [])
  const [brands, setBrands] = useState(initialData.brands || [])
  const [sizes, setSizes] = useState(initialData.sizes || {})
  const save = () => onNext({ styles, categories, colors, brands, sizes })

  return (
    <OnboardingSection activeStep={5} eyebrow="Paso 05 de 06" title="Tus preferencias" subtitle="Selecciona tus gustos para que DarkShop pueda mostrarte colecciones y productos relevantes." onLogout={onLogout}>
      <div className="space-y-3">
        <CarouselSelector title="Estilos de moda" subtitle="Escoge los estilos que más te representan." items={STYLES} selectedItems={styles} onToggle={(id) => setStyles((current) => toggle(current, id))} />
        <CarouselSelector title="Tipos de prendas" subtitle="Selecciona las categorías que más te interesan." items={CATEGORIES} selectedItems={categories} onToggle={(id) => setCategories((current) => toggle(current, id))} />
        <CarouselSelector title="Colores preferidos" subtitle="Elige los colores que más usas." items={COLORS} selectedItems={colors} onToggle={(id) => setColors((current) => toggle(current, id))} />
        <CarouselSelector title="Marcas de interés" subtitle="Opcional: selecciona las marcas que te gustan." items={BRANDS} selectedItems={brands} onToggle={(id) => setBrands((current) => toggle(current, id))} />
        <SizeCarousel value={sizes} onChange={setSizes} />
      </div>
      <div className={actionRowClass}>
        <button type="button" onClick={save} className={skipActionClass}>Omitir</button>
        <button type="button" onClick={save} className={`${primaryActionClass} hover:bg-neutral-200`}>Guardar preferencias</button>
      </div>
    </OnboardingSection>
  )
}
