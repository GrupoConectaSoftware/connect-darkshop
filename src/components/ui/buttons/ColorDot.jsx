export default function ColorDot({ color, selected, onSelect }) {
  return <button type="button" aria-label={`Seleccionar color ${color}`} aria-pressed={selected} onClick={onSelect} className={`h-4 w-4 cursor-pointer rounded-full border border-dark-300 transition-transform ${selected ? 'scale-110 ring-2 ring-dark-950 ring-offset-1' : 'hover:scale-110'}`} style={{ backgroundColor: color }} />
}
