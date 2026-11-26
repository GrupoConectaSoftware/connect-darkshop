import { AlertTriangle, Bell, CreditCard, Info, Package, Shirt } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isNotificationRead, markNotificationRead, NOTIFICATIONS_UPDATED_EVENT } from '../../../hooks/notificationsStorage'

const icons = { ropa: Shirt, pedido: Package, pago: CreditCard, reporte: AlertTriangle }

export default function NotificationCard({ id, title, message, date, type, isRead, image, icon: IconOverride }) {
  const Icon = IconOverride || icons[type] || Bell
  const [read, setRead] = useState(() => isNotificationRead({ id, isRead }))
  const markRead = () => { markNotificationRead(id); setRead(true) }
  useEffect(() => {
    const sync = (event) => { if (event.detail?.id === String(id)) setRead(true) }
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, sync)
    return () => window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, sync)
  }, [id])
  return <article className="relative flex items-start gap-4 rounded-xl border border-gray-100 dark:border-neutral-700 bg-white p-4 transition-colors hover:bg-gray-50 dark:bg-[#1a1a1d]">
    <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-gray-100 text-gray-700 dark:text-gray-200 dark:bg-[#27272a] dark:text-gray-300">
      {image ? <img src={image} alt="" className="size-full object-cover" /> : <Icon size={21} aria-hidden="true" />}
    </div>
    <div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h3><p className="mt-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">{message}</p><p className="mt-1 text-xs text-gray-400">{date}</p></div>
    <div className="relative flex shrink-0 flex-col items-center gap-2">
      <span aria-label={read ? 'Leída' : 'No leída'} className={`size-2.5 rounded-full ${read ? 'bg-transparent' : 'bg-red-500'}`} />
      <div className="group relative">
        <button type="button" onPointerEnter={markRead} onFocus={markRead} aria-label={`Información sobre ${title}`} className="rounded p-1 text-gray-400 transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600"><Info size={16} /></button>
        <div role="tooltip" className="pointer-events-none absolute right-0 top-full z-20 mt-2 hidden w-64 max-w-[70vw] rounded-lg border border-gray-200 dark:border-neutral-700 bg-white p-4 text-left text-xs leading-relaxed text-gray-600 dark:text-gray-300 shadow-xl group-hover:block group-focus-within:block dark:border-[#2a2a2d] dark:bg-[#1a1a1d]"><p className="font-bold text-gray-900 dark:text-white">{title}</p><p className="mt-2">{message}</p><p className="mt-2 text-gray-400">{date}</p></div>
      </div>
    </div>
  </article>
}
