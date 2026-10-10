import { Shirt, User } from 'lucide-react'

export default function GarmentSwitch({ value = 'garment', onChange }) {
  return (
    <div className="flex items-center gap-0.5 rounded-full bg-dark-white p-1 shadow-sm">
      <button type="button" aria-label="Ver modelo" aria-pressed={value === 'model'} onClick={() => onChange('model')} className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${value === 'model' ? 'bg-dark-950 text-dark-white' : 'text-dark-500 hover:text-dark-950'}`}><User size={16} /></button>
      <button type="button" aria-label="Ver prenda" aria-pressed={value === 'garment'} onClick={() => onChange('garment')} className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${value === 'garment' ? 'bg-dark-950 text-dark-white' : 'text-dark-500 hover:text-dark-950'}`}><Shirt size={16} /></button>
    </div>
  )
}
