import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { OUTLET_PRODUCTS_ON_SALE } from '../../../../components/ui/cards/productCardData'
import CollectionNavLayout from './layout/navLayout'
import BannerSection from './sections/bannerSection'
import IntroductionSection from './sections/introductionSection'
import ContentSection from './sections/contentSection'

const COLLECTIONS = [
  { slug: 'angelicales', label: 'Angelicales', index: '01', tagline: 'Diseños inspirados en lo celestial, creados con carácter.', description: 'La colección Angelicales reúne figuras, símbolos y composiciones inspiradas en una estética urbana con identidad propia.' },
  { slug: 'overside', label: 'Overside', index: '02', tagline: 'Proporciones amplias para moverse con libertad.', description: 'Siluetas generosas, telas de alto gramaje y detalles precisos que definen una presencia relajada.' },
  { slug: 'multicolor', label: 'Multicolor', index: '03', tagline: 'Contrastes que transforman lo esencial.', description: 'Color, textura y capas visuales para crear piezas que no pasan desapercibidas.' },
  { slug: 'basicas', label: 'Básicas', index: '04', tagline: 'Los esenciales construidos para durar.', description: 'Prendas limpias, versátiles y bien resueltas para sostener cualquier combinación.' },
  { slug: 'estampadas', label: 'Estampadas', index: '05', tagline: 'Gráficos que cuentan historias sin pedir permiso.', description: 'Ilustraciones y mensajes que llevan la identidad DARK directamente al frente y al reverso.' },
  { slug: 'difuminadas', label: 'Difuminadas', index: '06', tagline: 'Tonos en transición para salir de lo predecible.', description: 'Degradados y acabados visuales que convierten cada pieza en una composición distinta.' },
  { slug: 'filosoficas', label: 'Filosóficas', index: '07', tagline: 'Ideas y símbolos que se llevan puestos.', description: 'Una selección que mezcla pensamiento, gráfica y una actitud urbana directa.' },
]

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
