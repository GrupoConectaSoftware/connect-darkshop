import { Check } from 'lucide-react'

export default function ChoiceCard({ item, selected, onSelect, description }) {
  return (
    <button type="button" aria-pressed={selected} onClick={() => onSelect(item.id)}
      className={`group relative isolate h-full min-h-0 w-full overflow-hidden rounded-xl bg-neutral-900 text-white focus-visible:outline-red-600 ${selected ? 'ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-neutral-900' : ''}`}>
      <img src={item.image} alt="" className="absolute inset-0 -z-20 size-full object-cover transition-transform group-hover:scale-105" />
      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/15 to-transparent" />
      {selected && <Check aria-hidden="true" className="absolute right-3 top-3 size-7 rounded-full bg-white p-1 text-black" />}
      <span className="absolute inset-x-2 bottom-4 flex flex-col items-center gap-2">
        <strong className="break-words text-[clamp(0.55rem,1.5vw,1.125rem)] font-black uppercase">{item.label}</strong>
        {description ? <span className="text-sm">{description}</span> : <span className={`h-1 w-8 rounded-full ${selected ? 'bg-red-600' : 'bg-white/70'}`} />}
      </span>
    </button>
  )
}
