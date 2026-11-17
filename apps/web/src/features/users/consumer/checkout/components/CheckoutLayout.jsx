import checkoutImage from '../../../../../assets/Chekout/imagesChekout.webp'

export default function CheckoutLayout({ children }) {
  return <main className="relative h-screen w-full overflow-hidden bg-black"><img src={checkoutImage} alt="" className="absolute inset-0 h-full w-full object-cover object-center"/><span className="absolute inset-0 bg-black/55"/><span className="absolute inset-0 bg-linear-to-l from-black/20 via-transparent to-black/50"/><section className="absolute right-4 top-1/2 z-10 w-[calc(100%-2rem)] max-w-[420px] -translate-y-1/2 sm:right-8 lg:right-12"><div className="w-full rounded-2xl border border-white/30 bg-white p-7 shadow-2xl sm:p-8">{children}</div></section></main>
}
