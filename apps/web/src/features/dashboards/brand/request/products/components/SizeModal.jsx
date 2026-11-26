import { useEffect, useState } from 'react'
import { Tag, X } from 'lucide-react'
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
export default function SizeModal({ value, onSave, onClose }) {
  const [rows, setRows] = useState(() => sizes.map(size => value.find(v => v.size === size) || { size, quantity: '', price: '' }))
  const [position, setPosition] = useState(null)
  useEffect(() => { const close = e => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])
  function drag(e) {
    if (e.button !== 0 || e.target.closest('button')) return
    const rect = e.currentTarget.parentElement.getBoundingClientRect(), dx = e.clientX - rect.left, dy = e.clientY - rect.top
    setPosition({ x: rect.left, y: rect.top })
    const move = event => setPosition({ x: Math.max(0, Math.min(window.innerWidth - rect.width, event.clientX - dx)), y: Math.max(0, Math.min(window.innerHeight - 60, event.clientY - dy)) })
    const end = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', end) }
    document.addEventListener('mousemove', move); document.addEventListener('mouseup', end)
  }
  return <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm" onClick={onClose}><div role="dialog" aria-modal="true" aria-labelledby="sizes-title" onClick={e => e.stopPropagation()} style={position ? { left: position.x, top: position.y } : undefined} className={`absolute w-[min(94vw,600px)] max-h-[94dvh] overflow-auto rounded-3xl bg-white p-6 text-neutral-950 shadow-2xl ${position ? '' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}`}>
    <header onMouseDown={drag} className="mb-6 flex cursor-move items-start gap-4"><span className="rounded-xl bg-neutral-100 p-3"><Tag /></span><div className="flex-1"><h2 id="sizes-title" className="text-xl font-bold">Registrar tallas y precios</h2><p className="text-sm text-neutral-500">Define la cantidad en stock y el precio por cada talla.</p></div><button type="button" onClick={onClose} aria-label="Cerrar"><X /></button></header>
    <div className="overflow-hidden rounded-xl border border-neutral-200"><div className="grid grid-cols-3 gap-2 bg-neutral-100 p-3 font-bold"><span>Talla</span><span>Cantidad</span><span>Precio COP</span></div>{rows.map((row,i) => <div key={row.size} className="grid grid-cols-3 items-center gap-2 border-t border-neutral-100 p-2"><span className="w-fit rounded-lg bg-neutral-100 px-4 py-2 font-bold">{row.size}</span>{['quantity','price'].map(field => <input key={field} aria-label={`${field === 'price' ? 'Precio' : 'Cantidad'} ${row.size}`} type="number" min="0" step="1" placeholder="0" value={row[field]} onChange={e => setRows(rows.map((r,j) => j === i ? { ...r, [field]: e.target.value } : r))} className="min-w-0 rounded-lg border border-neutral-300 p-2" />)}</div>)}</div>
    <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl border px-5 py-3">Cancelar</button><button type="button" onClick={() => onSave(rows.filter(r => r.quantity !== '' && Number(r.quantity) > 0 && r.price !== '' && Number(r.price) >= 0))} className="rounded-xl bg-black px-5 py-3 font-bold text-white">Guardar tallas</button></div>
  </div></div>
}
