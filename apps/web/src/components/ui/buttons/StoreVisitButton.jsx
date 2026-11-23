import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function StoreVisitButton() {
  return (
    <Link to="/brand" className="flex h-12 w-full items-center justify-between rounded-lg border border-dark-500 px-4 text-xs font-bold uppercase tracking-wide text-dark-950 transition-colors duration-200 hover:bg-dark-50 hover:text-dark-950 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-dark-red dark:text-white dark:hover:bg-white dark:hover:text-black">
      Visitar la tienda
      <ArrowRight size={21} strokeWidth={1.6} />
    </Link>
  )
}
