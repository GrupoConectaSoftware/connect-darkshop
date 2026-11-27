import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { initialCardData } from '../../../../../data/target.data'
import TargetComponent from './components/targetComponent'
import PresentationLayout from './layout/presentationLayout'
import FormLayout from './layout/formLayout'
export default function AddPayment({ onClose }) {
  const [card, setCard] = useState(initialCardData)
  const [notice, setNotice] = useState(false)
  useEffect(() => { const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; const key = e => { if (e.key === 'Escape') onClose() }; window.addEventListener('keydown', key); return () => { document.body.style.overflow = overflow; window.removeEventListener('keydown', key) } }, [onClose])
  return createPortal(<div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-3 backdrop-blur-sm sm:p-6" onMouseDown={onClose}><section role="dialog" aria-modal="true" aria-label="Agregar método de pago" onMouseDown={e => e.stopPropagation()} className="relative grid max-h-[94dvh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl lg:grid-cols-[36%_64%]"><PresentationLayout/><div className="relative px-5 pb-6 pt-14 sm:px-10 sm:pb-8"><button type="button" onClick={onClose} aria-label="Cerrar" className="absolute right-5 top-4 rounded-lg border border-neutral-200 p-2 text-neutral-900 hover:bg-neutral-100"><X size={20}/></button><TargetComponent card={card}/><FormLayout card={card} update={values => setCard(previous => ({ ...previous, ...values }))} onSubmit={e => { e.preventDefault(); setNotice(true) }}/>{notice && <p role="status" className="mt-3 text-sm text-neutral-600">El registro de tarjetas estará disponible cuando se conecte el proveedor de pagos.</p>}</div></section></div>, document.body)
}
