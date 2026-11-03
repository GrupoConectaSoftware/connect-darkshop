import { Search } from 'lucide-react'

export default function SearchBar({
  placeholder = 'Buscar...',
  className = '',
  inputClassName = '',
}) {
  return (
    <label className={`relative block rounded-[10px] ${className || 'w-56 xl:w-120'}`}>
      <span className="sr-only">Buscar en Darkshop</span>
      <Search
        size={20}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-500"
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder={placeholder}
        className={`h-11 w-full rounded-[10px] border border-dark-200 bg-dark-50 pl-10 pr-3 text-sm text-dark-950 outline-none transition-colors placeholder:text-dark-500 focus:border-dark-200 focus:ring-0 ${inputClassName}`}
      />
    </label>
  )
}
