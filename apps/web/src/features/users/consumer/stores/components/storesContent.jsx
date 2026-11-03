import StoreCard from '../../../../../components/ui/cards/StoreCard'
import EmptyStores from './emptyStores'

export default function StoresContent({ stores, onClear }) {
  if (stores.length === 0) return <EmptyStores onClear={onClear} />

  return (
    <section aria-label="Tiendas aliadas" className="grid min-w-0 grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
      {stores.map((store) => <StoreCard key={store.id} store={store} />)}
    </section>
  )
}
