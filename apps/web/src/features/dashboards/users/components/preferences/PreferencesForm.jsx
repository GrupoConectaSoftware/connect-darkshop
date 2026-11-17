import { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { preferencesOptionsData } from '../../../../../data/user'
import CarouselSelector from './CarouselSelector'
import CategoryCards from './CategoryCards'
import SizeCarousel from './SizeCarousel'

const toggle = (list, value) => list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

export default function PreferencesForm() {
  const [sets, setSets] = useState({ styles: ['urban', 'sport', 'oversize'], garments: ['camisetas', 'sudaderas', 'chaquetas'], colors: ['black', 'gray', 'wine'], brands: ['dark', 'adidas'] })
  const [sizes, setSizes] = useState({ camisetas: 'L', sudaderas: 'L', chaquetas: 'L' })
  const selectedGarments = useMemo(() => sets.garments.filter((id) => id !== 'otro'), [sets.garments])
  const update = (key, value) => setSets((current) => ({ ...current, [key]: toggle(current[key], value) }))
  return <section className="space-y-4"><CarouselSelector title="Estilos de moda" subtitle="Escoge los estilos que más te representan." options={preferencesOptionsData.styles} selected={sets.styles} onToggle={(value) => update('styles', value)}/><CategoryCards options={preferencesOptionsData.dashboardGarments} selected={sets.garments} onToggle={(value) => update('garments', value)}/><CarouselSelector title="Colores preferidos" subtitle="Selecciona los colores que más usas." options={preferencesOptionsData.colors} selected={sets.colors} onToggle={(value) => update('colors', value)}/><CarouselSelector title="Marcas de interés" subtitle="Opcional: selecciona tus marcas favoritas." options={preferencesOptionsData.brands} selected={sets.brands} onToggle={(value) => update('brands', value)}/><SizeCarousel selectedCategories={selectedGarments} value={sizes} onChange={setSizes}/><button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-red-700">Guardar preferencias <ArrowRight size={15}/></button></section>
}
