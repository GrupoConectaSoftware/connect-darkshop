import { useEffect, useRef, useState } from 'react'
import { Truck } from 'lucide-react'

export default function OrderComponent({ orders = [] }) {
  const [selected, setSelected] = useState(0)
  const track = useRef(null)
  const timer = useRef(null)
  const order = orders[selected] ?? orders[0]
  const ordered = orders.length ? [...orders.slice(selected), ...orders.slice(0, selected)] : []

  useEffect(() => () => clearTimeout(timer.current), [])

  const selectOrder = (item, event) => {
    const next = orders.findIndex((candidate) => candidate.number === item.number)
    if (next < 0 || next === selected) return
    clearTimeout(timer.current)
    const list = track.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    list?.scrollTo({ top: list.scrollTop + event.currentTarget.getBoundingClientRect().top - list.getBoundingClientRect().top, behavior: reducedMotion ? 'auto' : 'smooth' })
    timer.current = setTimeout(() => {
      setSelected(next)
      if (list) list.scrollTop = 0
    }, reducedMotion ? 0 : 320)
  }

  return <section className="h-full rounded-xl bg-neutral-950 p-5 text-white shadow-md sm:p-6">{order ? <><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex gap-3"><Truck size={28} /><div><h2 className="font-bold">Último pedido activo</h2><p className="mt-1 text-xs text-neutral-400">{order.date}</p></div></div><div ref={track} aria-label="Seleccionar pedido" tabIndex={0} className="max-h-16.5 overflow-y-auto text-right scrollbar-none focus-visible:outline focus-visible:outline-red-600 [&::-webkit-scrollbar]:hidden"><div className="flex flex-col items-end gap-1 pb-12">{ordered.map((item) => <button key={item.number} type="button" onClick={(event) => selectOrder(item, event)} aria-pressed={item.number === order.number} className={`rounded px-1 py-0.5 text-right font-bold transition-all duration-300 hover:text-white focus-visible:outline focus-visible:outline-red-600 ${item.number === order.number ? 'text-xs text-white' : 'text-[9px] text-neutral-500'}`}>{item.number}</button>)}</div></div></div><div className="relative mt-8 flex justify-between gap-1 before:absolute before:left-2 before:right-2 before:top-4 before:h-px before:bg-red-900">{order.steps.map((step, index) => { const active = index === (order.currentStep ?? 0); return <div key={step} aria-current={active ? 'step' : undefined} className="relative flex w-1/6 flex-col items-center gap-3 text-center"><span className="relative grid h-8 w-8 place-items-center">{active && <span className="absolute inset-0 animate-ping rounded-full bg-red-700/30 motion-reduce:animate-none" />}<span className={`relative rounded-full transition-all ${active ? 'h-8 w-8 bg-red-700 shadow-[0_0_18px_rgba(185,28,28,.5)]' : 'h-5 w-5 bg-[#800b1a]'}`} /></span><span className={`text-[9px] ${active ? 'font-semibold text-white' : 'text-neutral-400'}`}>{step}</span></div> })}</div></> : <p className="text-sm text-neutral-300">Aún no tienes pedidos activos.</p>}</section>
}
