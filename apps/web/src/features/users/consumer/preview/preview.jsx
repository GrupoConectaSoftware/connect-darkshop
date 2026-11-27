import { Link, useLocation, useParams } from 'react-router-dom'
import NavLayout from './layouts/navLayout'
import ImagesComponents from './components/imagesComponents'
import DescriptionComponents from './components/descriptionComponents'
import AdventageComponents from './components/adventageComponents'
import { productsData } from '../../../../data/products'
export default function Preview() {
  const { slug } = useParams()
  const { state } = useLocation()
  const slugFor = p => p.slug || `${p.name}-${p.id}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const product = state?.product && slugFor(state.product) === slug ? state.product : productsData.find(p => slugFor(p) === slug)
  if (!product) return <div className="min-h-screen bg-white dark:bg-[#1a1a1d]"><NavLayout/><main className="mx-auto max-w-4xl p-10 dark:text-white"><h1 className="text-2xl font-bold">Producto no encontrado</h1><Link to="/catalog" className="mt-4 inline-block underline">Volver al catálogo</Link></main></div>
  const images = state?.imagesModel || product.catalogImages?.imagesModel || product.imagesModel || [product.image]
  const clothesImages = state?.imagesClothes || product.catalogImages?.imagesClothes || product.imagesGarment || images
  return <div className="min-h-screen bg-dark-white text-dark-950 dark:bg-[#1a1a1d] dark:text-white"><NavLayout/><main><section className="mx-auto w-full max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 xl:px-16"><nav aria-label="Miga de pan" className="mb-8 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase text-dark-500"><Link to="/" className="text-dark-red">Inicio</Link><span>/</span><Link to="/catalog">Todo el catálogo</Link><span>/</span><span>{product.category}</span><span>/</span><span className="text-dark-950 dark:text-white">{product.name}</span></nav><div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.92fr)] lg:gap-12"><ImagesComponents key={slug} images={images} clothesImages={clothesImages} productName={product.name}/><DescriptionComponents key={slug} product={{ ...product, sizes: product.sizes || [], colors: product.colors || [], unavailableSizes: product.unavailableSizes || [] }}/></div><div className="my-14 h-px bg-dark-200 sm:my-20"/><AdventageComponents/></section></main></div>
}
