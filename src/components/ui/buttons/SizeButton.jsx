export default function SizeButton({ size, selected, unavailable = false, onSelect }) {
  return (
    <button
      type="button"
      disabled={unavailable}
      aria-pressed={selected}
      aria-label={unavailable ? `Talla ${size} no disponible` : `Seleccionar talla ${size}`}
      onClick={() => onSelect(size)}
      className={`relative inline-flex h-6 min-w-7 items-center justify-center overflow-hidden border px-1.5 text-[10px] font-medium transition-colors duration-200 ${
        unavailable
          ? 'cursor-not-allowed border-dark-200 text-dark-300 opacity-65'
          : selected
            ? 'cursor-pointer border-dark-950 bg-dark-950 text-dark-white'
            : 'cursor-pointer border-dark-200 text-dark-600 hover:border-dark-950 hover:text-dark-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dark-red'
      }`}
    >
      {unavailable && <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-1/2 h-px -rotate-45 bg-dark-400" />}
      <span className="relative">{size}</span>
    </button>
  )
}
