import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StoreVisitButton({ slug }) {
  return (
    <Link to={`/stores#${slug}`} className="flex h-12 w-full items-center justify-between rounded-lg border border-dark-500 px-4 text-xs font-bold uppercase tracking-wide text-dark-950 transition-colors duration-200 hover:bg-dark-50 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-dark-red">
      Visitar la tienda
      <ArrowRight size={21} strokeWidth={1.6} />
    </Link>
  )
}
