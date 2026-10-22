import { Link } from 'react-router-dom'
import LoggedNavLayout from '../../logged/layouts/navLayout'

export default function CollectionNavLayout({ collections, activeSlug }) {
  return (
    <>
      <LoggedNavLayout customNavLinks={[]} />
      <nav aria-label="Colecciones DARK" className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center gap-8 overflow-x-auto whitespace-nowrap px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:px-10">
          {collections.map((collection) => {
            const active = collection.slug === activeSlug
            return <Link key={collection.slug} to={`/collection/${collection.slug}`} aria-current={active ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${active ? 'text-dark-red' : 'text-neutral-500 hover:text-neutral-950'}`}>{collection.label}</Link>
          })}
        </div>
      </nav>
    </>
  )
}
