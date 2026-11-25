import { useState } from 'react'
import { Pencil, Plus, Trash2, X, ZoomIn } from 'lucide-react'
import { catalogImageSets } from '../../../../../../data/products'

export default function RequestVariants({ data, update }) {
  const [preview, setPreview] = useState(null)
  const [zoom, setZoom] = useState(false)
  const [editing, setEditing] = useState(null)
  const edit = (id, changes) => update({ variants: data.variants.map(v => v.id === id ? { ...v, ...changes } : v) })
  const field = 'w-20 rounded-lg border border-neutral-300 bg-neutral-50 p-2 dark:border-neutral-600 dark:bg-neutral-800'
  return <section>
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><p>Este producto tiene <strong>{data.variants.length} variantes registradas</strong>.</p><button type="button" onClick={() => { const id = crypto.randomUUID(); update({ variants: [...data.variants, { id, size: 'S', color: 'Negro', stock: 0, gallery: 0 }] }); setEditing(id) }} className="flex items-center gap-2 rounded-xl bg-black px-4 py-3 font-bold text-white"><Plus size={18} />Añadir variante</button></div>
    <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-700"><table className="w-full text-left text-sm"><thead className="bg-neutral-100 dark:bg-neutral-800"><tr>{['Talla', 'Color', 'Stock', 'Imágenes', 'Acciones'].map(label => <th key={label} className="p-3">{label}</th>)}</tr></thead>
      <tbody>{data.variants.map(v => {
        const set = catalogImageSets[v.gallery] || catalogImageSets[0]
        const images = [...set.imagesModel, ...set.imagesClothes].filter(Boolean)
        return <tr key={v.id} className="border-t border-neutral-200 dark:border-neutral-700">
          <td className="p-3">{editing === v.id ? <select aria-label="Talla" className={field} value={v.size} onChange={e => edit(v.id, { size: e.target.value })}>{['XS','S','M','L','XL','XXL'].map(s => <option key={s}>{s}</option>)}</select> : v.size}</td>
          <td className="p-3"><div className="flex items-center gap-2"><span className={`size-4 rounded-full border border-neutral-400 ${v.color === 'Negro' ? 'bg-black' : 'bg-white'}`} />{editing === v.id ? <select aria-label="Color" className={field} value={v.color} onChange={e => edit(v.id, { color: e.target.value })}><option>Negro</option><option>Blanco</option></select> : v.color}</div></td>
          <td className="p-3"><input aria-label="Stock" type="number" min="0" step="1" className={field} value={v.stock} onChange={e => edit(v.id, { stock: e.target.value })} /></td>
          <td className="p-3"><div className="flex justify-start gap-1">{images.map((src, i) => <button type="button" key={src} onClick={() => { setPreview(src); setZoom(false) }} aria-label={`Visualizar imagen ${i + 1}`}><img src={src} alt="" className="size-10 rounded-md object-cover" /></button>)}</div></td>
          <td className="p-3"><div className="flex gap-3"><button type="button" aria-label={editing === v.id ? 'Finalizar edición' : 'Editar variante'} onClick={() => setEditing(editing === v.id ? null : v.id)}><Pencil size={18} /></button><button type="button" aria-label="Eliminar variante" onClick={() => update({ variants: data.variants.filter(row => row.id !== v.id) })}><Trash2 size={18} /></button></div></td>
        </tr>
      })}</tbody></table></div>
    {preview && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6" onClick={() => setPreview(null)}><div className="relative max-h-full max-w-xl overflow-auto" onClick={e => e.stopPropagation()}><button type="button" aria-label="Cerrar imagen" onClick={() => setPreview(null)} className="absolute right-2 top-2 z-10 rounded-full bg-black p-2 text-white"><X /></button><button type="button" aria-label="Ampliar imagen" onClick={() => setZoom(!zoom)} className="absolute left-2 top-2 z-10 rounded-full bg-black p-2 text-white"><ZoomIn /></button><img src={preview} alt="Vista previa de la variante" className={`max-h-[80vh] object-contain ${zoom ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setZoom(!zoom)} /></div></div>}
  </section>
}
