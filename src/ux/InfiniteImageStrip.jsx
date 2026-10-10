import InfiniteMarquee from './InfiniteMarquee'

export default function InfiniteImageStrip({ imageSrc, speed = 80, direction = 'right' }) {
  return <InfiniteMarquee speed={speed} direction={direction} gapClass="gap-4" className="border-y border-dark-700 bg-dark-950 py-3"><div className="relative h-24 w-80 shrink-0 overflow-hidden"><img src={imageSrc} alt="Outlet Darkshop" className="h-full w-full object-cover opacity-45" /><span className="absolute inset-0 grid place-items-center text-4xl font-black tracking-[0.2em] text-dark-white">OUTLET</span></div></InfiniteMarquee>
}
