import { useState } from 'react'
import { SlidersHorizontal, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function PreferencesComponent() {
  const [preferences, setPreferences] = useState(['OVERSIZE', 'OLD MONEY', 'ANGELICALES'])
  return <section className="flex h-full flex-col rounded-xl bg-neutral-200 p-6"><div className="flex gap-3"><SlidersHorizontal size={26} /><div><h2 className="font-bold">Preferencias</h2><p className="text-sm text-neutral-500">Edita y consulta tus referencias favoritas</p></div></div><div className="mt-7 flex flex-wrap gap-2">{preferences.map((item) => <button type="button" key={item} onClick={() => setPreferences(preferences.filter((value) => value !== item))} aria-label={`Quitar ${item}`} className="flex items-center gap-4 rounded-md bg-black px-3 py-2 text-xs font-bold text-white"><X size={13} />{item}</button>)}</div><Link to="/config" className="mt-auto flex items-center justify-end gap-2 pt-6 text-xs text-neutral-600">Editar preferencias <ArrowRight size={18} /></Link></section>
}
