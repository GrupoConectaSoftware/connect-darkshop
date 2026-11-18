import { useMemo } from 'react'
import { preferencesOptionsData } from '../../../../../data/users.js'
import CarouselSelector from './CarouselSelector'
import CategoryCards from './CategoryCards'
import SizeCarousel from './SizeCarousel'

export default function PreferencesForm({ sets, onChange, sizes, onSizeChange, onColorChange }) {
  const selectedGarments = useMemo(() => sets.garments.filter((id) => id !== 'otro'), [sets.garments])
  const update = (key, value) => onChange((current) => ({ ...current, [key]: current[key].includes(value) ? current[key].filter((item) => item !== value) : [...current[key], value] }))
  return <section className="space-y-4">
    <CategoryCards options={preferencesOptionsData.dashboardGarments} selected={sets.garments} onToggle={(value) => update('garments', value)}/>
    <CarouselSelector title="Estilos de moda" subtitle="Escoge los estilos que más te representan." options={preferencesOptionsData.styles} selected={sets.styles} onToggle={(value) => update('styles', value)}/>
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"><h2 className="text-base font-bold text-gray-900">Colores preferidos</h2><p className="mt-1 text-xs text-gray-500">Selecciona los colores que más usas.</p><div className="mt-5 flex flex-wrap gap-x-6 gap-y-4">{preferencesOptionsData.colors.filter((color) => color.id !== 'other' && color.id !== 'otro').map((color) => <button key={color.id} type="button" aria-pressed={sets.colors.includes(color.id)} onClick={() => onColorChange(color.id)} aria-label={color.label} title={color.label} className="rounded-full focus-visible:outline-2 focus-visible:outline-red-700"><span className={`size-9 block rounded-full border border-gray-300 ${color.colorClass || 'bg-gray-200'} ${sets.colors.includes(color.id) ? 'ring-2 ring-black ring-offset-2' : ''}`}/></button>)}</div></section>
    <CarouselSelector title="Marcas de interés" subtitle="Opcional: selecciona tus marcas favoritas." options={preferencesOptionsData.brands} selected={sets.brands} onToggle={(value) => update('brands', value)}/>
    <SizeCarousel selectedCategories={selectedGarments} value={sizes} onChange={onSizeChange}/>
  </section>
}
