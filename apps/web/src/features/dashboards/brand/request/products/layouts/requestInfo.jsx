import { Link } from 'react-router-dom'
import { Tag, X } from 'lucide-react'
import { categoriesData } from '../../../../../../data/categories'
const field = 'mt-2 w-full rounded-xl border border-neutral-300 bg-neutral-50 p-3 font-normal dark:border-neutral-700 dark:bg-neutral-800'
export default function RequestInfo({ data, update }) {
  return <div className="grid gap-5 sm:grid-cols-2">
    <label className="font-bold">Código de prenda (SKU)<input className={field} placeholder="Ej. DARK-TS-001" value={data.sku} onChange={e => update({ sku: e.target.value })} /></label>
    <label className="font-bold">Nombre de la prenda<input className={field} placeholder="Ej. Camiseta Oversize Básica" value={data.name} onChange={e => update({ name: e.target.value })} /></label>
    <label className="font-bold sm:col-span-2">Categoría<select disabled value={data.category} className={field}>{categoriesData.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}</select></label>
    <label className="font-bold sm:col-span-2">Género<select value={data.gender || 'unisex'} onChange={e => update({ gender: e.target.value })} className={field}><option value="hombre">Hombre</option><option value="mujer">Mujer</option><option value="unisex">Unisex</option><option value="ninos">Niños</option></select></label>
    {data.category === 'accesorios' && <>
      <label className="font-bold">Tipo de accesorio<select className={field} value={data.accessoryType || ''} onChange={e => update({ accessoryType: e.target.value })}><option value="">Selecciona un tipo</option>{['Gorras', 'Gafas', 'Bolsos', 'Cinturones', 'Joyería'].map(v => <option key={v}>{v}</option>)}</select></label>
      <div><label className="flex items-center gap-2 font-bold"><input type="checkbox" checked={!!data.customAccessoryEnabled} onChange={e => update({ customAccessoryEnabled: e.target.checked })} />Añadir nuevo tipo de producto</label><input className={field} disabled={!data.customAccessoryEnabled} placeholder="Escribe el tipo de producto" value={data.customAccessory || ''} onChange={e => update({ customAccessory: e.target.value })} /></div>
    </>}
    <section className="border-t border-neutral-200 pt-4 sm:col-span-2 dark:border-neutral-700">
      <div className="flex items-center justify-between gap-3"><h2 className="font-bold">Etiqueta comercial</h2><Link to="/dashboard/brand/tags" className="text-sm text-neutral-500 underline underline-offset-4 dark:text-neutral-300">Añadir nuevas etiquetas</Link></div>
      {data.tags.length ? <div className="mt-4 flex flex-wrap gap-2">{data.tags.map(value => <button type="button" key={value} onClick={() => update({ tags: data.tags.filter(t => t !== value) })} className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-white">{value}<X size={14} /></button>)}</div> : <p className="mt-5 flex items-center gap-2 text-sm text-neutral-500"><Tag size={18} />Esta prenda no tiene etiquetas anexadas.</p>}
    </section>
  </div>
}
