import { useEffect, useState } from 'react'
import { isNotificationRead, NOTIFICATIONS_UPDATED_EVENT } from '../../../../hooks/notificationsStorage'
import { Bell } from 'lucide-react'
import NotificationCard from '../../../../components/ui/notifications/NotificationCard'
import EmptyState from '../../../../components/ui/states/EmptyState'
import { notificationsData } from '../../../../data/notifications'
import hero from '../../../../assets/Brand/category/categoryUno.webp'

const settings = ['Nuevas colecciones y drops', 'Estado de mis pedidos', 'Promociones y ofertas exclusivas']

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState(() => notificationsData.map((item) => ({ ...item, isRead: isNotificationRead(item) })))
  useEffect(() => {
    const sync = (event) => setNotifications((current) => current.map((item) => String(item.id) === event.detail?.id ? { ...item, isRead: true } : item))
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, sync)
    return () => window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, sync)
  }, [])
  const [enabled, setEnabled] = useState(() => {
    try { return JSON.parse(localStorage.getItem('darkshop:notification-settings')) || [true, true, true] } catch { return [true, true, true] }
  })
  const toggle = (index) => setEnabled((current) => {
    const next = current.map((value, i) => i === index ? !value : value)
    try { localStorage.setItem('darkshop:notification-settings', JSON.stringify(next)) } catch { /* Keep the selection for this session. */ }
    return next
  })
  return <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-[#f6f7f8] [html.dark_&]:bg-[#121212] lg:h-screen lg:min-h-0 dark:bg-[#0f0f11]">
    <header className="relative isolate flex min-h-44 shrink-0 items-center overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-80" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white dark:from-[#0f0f11] via-white/90 dark:via-[#0f0f11]/90 to-transparent [html.dark_&]:from-[#121212] [html.dark_&]:via-[#121212]/90" />
      <div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">
        <p className="text-xs font-bold tracking-[.16em] text-gray-600 dark:text-gray-300 [html.dark_&]:text-gray-300">MI CUENTA <span className="mx-2 text-red-700">/</span> NOTIFICACIONES</p>
        <h1 className="mt-2 font-display text-4xl font-black text-gray-950 [html.dark_&]:text-white sm:text-5xl dark:text-white">Notificaciones</h1>
        <p className="mt-2 max-w-xl text-sm text-gray-500 [html.dark_&]:text-gray-300 dark:text-gray-400">Mantente al día con los movimientos de tu cuenta y novedades de DarkShop.</p>
      </div>
    </header>
    <div className="mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 gap-6 px-5 py-6 sm:px-8 lg:grid-cols-12 lg:px-10">
      <div className="min-h-0 space-y-3 lg:col-span-8 lg:overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {notifications.length ? notifications.map((item) => <NotificationCard key={item.id} {...item} />) : <EmptyState icon={Bell} title="No tienes notificaciones" description="Aquí aparecerán las novedades sobre tus compras y la comunidad." />}
      </div>
      <aside className="h-fit rounded-2xl border border-gray-100 dark:border-neutral-700 bg-white p-6 shadow-sm [html.dark_&]:border-[#2a2a2a] [html.dark_&]:bg-[#1a1a1a] lg:col-span-4 dark:bg-[#1a1a1d]">
        <h2 className="text-base font-bold text-gray-900 [html.dark_&]:text-white dark:text-white">Configuración de notificaciones</h2>
        <div className="mt-5 divide-y divide-gray-100 [html.dark_&]:divide-neutral-700">{settings.map((label, index) => <div key={label} className="flex items-center justify-between gap-4 py-4"><span className="text-sm font-medium text-gray-700 dark:text-gray-200 [html.dark_&]:text-gray-200 dark:text-gray-300">{label}</span><button type="button" role="switch" aria-label={label} aria-checked={enabled[index]} onClick={() => toggle(index)} className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-red-600 ${enabled[index] ? 'bg-red-600' : 'bg-gray-300'}`}><span className={`absolute left-0 top-1 size-4 rounded-full bg-white shadow transition-transform ${enabled[index] ? 'translate-x-6' : 'translate-x-1'}`}/></button></div>)}</div>
      </aside>
    </div>
  </div>
}
