import communityImage from '../../../../../assets/Sections/homespages/community/imagesCommunity.webp'

export default function CommunitySection() {
  return <section id="comunidad" className="mx-auto mt-16 w-full max-w-[1600px] px-6 sm:mt-20 sm:px-10 lg:mt-24 lg:px-16"><div className="grid overflow-hidden bg-dark-950 text-white md:grid-cols-2"><div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Más que una tienda</p><h2 className="mt-3 font-display text-3xl font-black uppercase leading-tight sm:text-5xl">La comunidad viste con identidad</h2><p className="mt-5 max-w-xl text-sm leading-7 text-white/65 sm:text-base">Descubre estilos, comparte inspiración y encuentra nuevas formas de expresar quién eres.</p></div><img src={communityImage} alt="Comunidad Darkshop" className="h-full min-h-64 w-full object-cover" /></div></section>
}
