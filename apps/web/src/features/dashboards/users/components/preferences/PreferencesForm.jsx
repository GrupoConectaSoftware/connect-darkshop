import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import CarouselSelector from './CarouselSelector'
import SizeCarousel from './SizeCarousel'

const initialSets = { styles: ['Urbano', 'Deportivo', 'Oversize'], garments: ['Camisetas', 'Sudaderas', 'Chaquetas'], colors: ['Negro', 'Gris', 'Rojo vino'], brands: ['DARK', 'Adidas'] }
const data = { styles: ['Urbano', 'Elegante', 'Deportivo', 'Oversize', 'Minimalista', 'Techwear', 'Otro'], garments: ['Camisetas', 'Polos', 'Sudaderas', 'Chaquetas', 'Pantalones', 'Jeans', 'Zapatos', 'Accesorios', 'Lociones', 'Otro'], colors: ['Negro', 'Gris', 'Blanco', 'Rojo vino', 'Beige', 'Otro'], brands: ['DARK', 'Nike', 'Adidas', 'Puma', 'New Balance', 'Jordan', 'Converse', 'Otro'] }
const toggle = (list, value) => list.includes(value) ? list.filter((item) => item !== value) : [...list, value]

export default function PreferencesForm() {
  const [sets, setSets] = useState(initialSets)
  const [sizes, setSizes] = useState({ top: 'L', bottom: '32', shoes: '41' })
  const update = (key, value) => setSets((current) => ({ ...current, [key]: toggle(current[key], value) }))
  return <section className="space-y-4"><CarouselSelector title="Estilos de moda" subtitle="Escoge los estilos que más te representan." options={data.styles} selected={sets.styles} onToggle={(value) => update('styles', value)}/><CarouselSelector title="Tipos de prendas" subtitle="Selecciona las categorías que más te interesan." options={data.garments} selected={sets.garments} onToggle={(value) => update('garments', value)}/><CarouselSelector title="Colores preferidos" subtitle="Selecciona los colores que más usas." options={data.colors} selected={sets.colors} onToggle={(value) => update('colors', value)}/><CarouselSelector title="Marcas de interés" subtitle="Opcional: selecciona tus marcas favoritas." options={data.brands} selected={sets.brands} onToggle={(value) => update('brands', value)}/><SizeCarousel value={sizes} onChange={setSizes}/><button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-950 px-5 py-4 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md focus-visible:outline-2 focus-visible:outline-red-700">Guardar preferencias <ArrowRight size={15}/></button></section>
}
