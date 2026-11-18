export default function ColorDot({ color, selected, onSelect }) {
  const colors = { '#080808': 'bg-[#080808]', '#121212': 'bg-[#121212]', '#f5f5f3': 'bg-[#f5f5f3]', '#491c25': 'bg-[#491c25]', '#1f3653': 'bg-[#1f3653]', '#d9d9d9': 'bg-[#d9d9d9]', '#333333': 'bg-[#333333]', '#737373': 'bg-[#737373]' }
  return <button type="button" aria-label={`Seleccionar color ${color}`} aria-pressed={selected} onClick={() => onSelect(color)} className={`h-4 w-4 cursor-pointer rounded-full border border-dark-300 transition-transform ${colors[color] || 'bg-neutral-400'} ${selected ? 'scale-110 ring-2 ring-dark-950 ring-offset-1' : 'hover:scale-110'}`} />
}
