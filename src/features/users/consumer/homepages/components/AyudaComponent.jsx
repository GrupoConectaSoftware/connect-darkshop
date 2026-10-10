import { ChevronDown } from 'lucide-react'

const LEGAL_LINKS = [
  { label: 'Términos y condiciones', href: '#terminos' },
  { label: 'Política de privacidad', href: '#privacidad' },
  { label: 'Tratamiento de datos', href: '#datos' },
  { label: 'Cambios y devoluciones', href: '#devoluciones' },
]

export default function AyudaComponent() {
  return (
    <div className="group relative inline-block">
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded="false"
        className="flex flex-row items-center gap-1.5 text-sm font-medium text-dark-200 transition-colors hover:text-dark-white"
      >
        <span>Ayuda</span>
        <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" aria-hidden="true" />
      </button>

      <div className="invisible absolute right-0 top-full z-80 mt-3 w-56 translate-y-1 border border-dark-700 bg-dark-950 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        {LEGAL_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="block px-4 py-2.5 text-[11px] font-medium text-dark-300 transition-colors hover:bg-dark-900 hover:text-dark-white"
          >
            {link.label}
          </a>
        ))}
      </div>

    </div>
  )
}
