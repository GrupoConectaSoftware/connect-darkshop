import StoreShowcaseCard from '../components/StoreShowcaseCard'
import rankingImage from '../../../../../assets/Sections/ranking/rankingSection.webp'
import storeOne from '../../../../../assets/Sections/stores/business/businessUno.webp'
import storeTwo from '../../../../../assets/Sections/stores/business/businessDos.webp'
import storeThree from '../../../../../assets/Sections/stores/business/businessTres.webp'
import storeFour from '../../../../../assets/Sections/stores/business/businessCuatro.webp'
import storeFive from '../../../../../assets/Sections/stores/business/businessCinco.webp'

const STORES = [
  { id: 1, name: 'Dark', subtitle: 'Underground elegante algodón', description: 'Somos una tienda especializada en prendas principalmente monocromáticas con estilos y estampados únicos para cada ocasión.', location: 'Cali, Colombia', productsCount: 140, image: storeOne, initial: 'D' },
  { id: 2, name: 'Dark', subtitle: 'Underground elegante algodón', location: 'Cali, Colombia', productsCount: 140, image: storeTwo, initial: 'D' },
  { id: 3, name: 'Dark', subtitle: 'Underground elegante algodón', location: 'Cali, Colombia', productsCount: 140, image: storeThree, initial: 'D' },
  { id: 4, name: 'Dark', subtitle: 'Underground elegante algodón', location: 'Cali, Colombia', productsCount: 140, image: storeFour, initial: 'D' },
  { id: 5, name: 'Dark', subtitle: 'Underground elegante algodón', location: 'Cali, Colombia', productsCount: 140, image: storeFive, initial: 'D' },
]

export default function StoresSection() {
  const [featuredStore, ...secondaryStores] = STORES

  return <section id="tiendas" className="bg-white pb-14 text-dark-950 sm:pb-20 lg:pb-24">
    <div className="grid lg:h-[440px] lg:grid-cols-2">
      <div className="bg-white px-6 pt-10 sm:px-10 lg:pl-16 lg:pr-24 lg:pt-14"><p className="text-xs font-bold uppercase tracking-[0.15em] text-dark-red">Las tiendas más destacadas</p><h2 className="mb-6 mt-4 max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">Las cinco marcas que están vistiendo la calle</h2><p className="max-w-xl text-base font-light leading-snug text-dark-500 sm:text-lg">Descubre prendas creadas para quienes no necesitan encajar. Explora la colección y encuentra la pieza que representa tu esencia.</p></div>
      <div className="mt-8 mr-[5px] aspect-[5/4] overflow-hidden bg-dark-950 lg:mt-[5px] lg:aspect-auto"><img src={rankingImage} alt="Estilo Darkshop para una misma actitud" loading="lazy" className="h-full w-full object-cover object-center" /></div>
    </div>
    <div className="mt-16 grid gap-4 px-6 sm:px-10 md:grid-cols-2 lg:mt-8 lg:grid-cols-4 lg:auto-rows-[410px] lg:px-16"><div className="md:col-span-2 lg:row-span-2"><StoreShowcaseCard store={featuredStore} variant="large" /></div>{secondaryStores.map((store) => <StoreShowcaseCard key={store.id} store={store} variant="small" />)}</div>
  </section>
}
