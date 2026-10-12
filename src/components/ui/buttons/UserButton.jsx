import { User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function UserButton({
  subtitle = 'Únete a la comunidad',
  label = 'Iniciar sesión',
  onClick,
}) {
  return (
    <Link
      to="/login"
      onClick={onClick}
      className="flex h-11 cursor-pointer items-center gap-3 border-l border-dark-200 px-4 py-2 text-left transition-opacity hover:opacity-80"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-dark-700 bg-dark-900 text-dark-white">
        <User width="100%" height="100%" className="p-2" aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap leading-tight">
        <span className="block text-xs text-dark-600">{subtitle}</span>
        <span className="block text-sm font-semibold text-dark-950">{label}</span>
      </span>
    </Link>
  )
}
