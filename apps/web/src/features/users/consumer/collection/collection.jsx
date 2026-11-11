import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { OUTLET_PRODUCTS_ON_SALE } from '../../../../components/ui/cards/productCardData'
import { COLLECTIONS } from '../../../../components/ui/cards/collectionsData'
import CollectionNavLayout from './layout/navLayout'
import BannerSection from './sections/bannerSection'
import IntroductionSection from './sections/introductionSection'
import ContentSection from './sections/contentSection'

export function CollectionContent({ embedded = false, selectedSlug = null }) {
  const params = useParams()
  const slug = selectedSlug ?? params.slug ?? 'angelicales'
  const collection = COLLECTIONS.find((item) => item.slug === slug) ?? COLLECTIONS[0]
  const products = useMemo(() => OUTLET_PRODUCTS_ON_SALE.slice(0, 12).map((product, index) => ({
    ...product,
    id: `${collection.slug}-${product.id}-${index}`,
    brand: 'DARK',
    brandType: 'TIENDA OFICIAL',
  })), [collection.slug])

  return (
    <div className={embedded ? 'bg-white text-neutral-950' : 'min-h-dvh bg-white text-neutral-950'}>
      {!embedded && <CollectionNavLayout collections={COLLECTIONS} activeSlug={collection.slug} />}
      <main>
        <BannerSection />
        <IntroductionSection collection={collection} productCount={products.length} />
        <ContentSection products={products} collectionName={collection.label} />
      </main>
    </div>
  )
}

export default function Collection() {
  return <CollectionContent />
}
