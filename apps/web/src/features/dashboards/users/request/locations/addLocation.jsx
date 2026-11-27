import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { initialLocationData } from '../../../../../data/locations.data'
import PresentationComponent from './layout/presentationComponent'
import FormComponent from './layout/formComponent'
export default function AddLocation({ onClose, onSave }) {
  const [locationData, setLocationData] = useState(initialLocationData)
  useEffect(() => { const previous = document.body.style.overflow; document.body.style.overflow = 'hidden'; const key = e => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', key); return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', key) } }, [onClose])
  return createPortal(<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onMouseDown={onClose}><section role="dialog" aria-modal="true" aria-labelledby="location-title" onMouseDown={e => e.stopPropagation()} className="relative flex h-[min(860px,96dvh)] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:flex-row"><button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"><X size={20}/></button><PresentationComponent/><FormComponent locationData={locationData} setLocationData={setLocationData} onClose={onClose} onSave={onSave}/></section></div>, document.body)
}
