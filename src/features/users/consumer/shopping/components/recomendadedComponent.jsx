import OutletCarousel from '../../../../../components/ux/OutletCarousel'

export default function RecomendadedComponent({ products }) {
  return (
    <section aria-labelledby="cart-recommendations-title" className="mt-16 border-t border-dark-200 pt-10 sm:mt-20 sm:pt-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dark-red">Selección Darkshop</p>
      <h2 id="cart-recommendations-title" className="mt-3 font-display text-[clamp(2rem,4vw,3.7rem)] uppercase leading-[0.88] tracking-[-0.055em] text-dark-950">También te puede interesar</h2>
      <p className="mt-3 text-base text-dark-500 sm:text-lg">Productos que combinan con tu carrito de compras.</p>
      <div className="mt-7 -mx-5 sm:mt-9 sm:-mx-8 lg:-mx-12 xl:-mx-16"><OutletCarousel products={products} /></div>
    </section>
  )
}
