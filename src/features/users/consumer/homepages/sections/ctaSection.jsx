import invitationImage from '../../../../../assets/Sections/homespages/invitation/ImagesInvitation.webp'
import Reveal from '../../../../../ux/Reveal'

export default function CtaSection() {
  return (
    <section id="contacto" aria-labelledby="cta-community-title" className="relative isolate flex items-center overflow-hidden bg-black px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-16 lg:py-32 xl:px-24 xl:py-36">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-20 w-full bg-cover bg-center grayscale lg:w-7/12" style={{ backgroundImage: `url(${invitationImage})` }} />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/70 lg:hidden" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden lg:block" style={{ background: 'linear-gradient(90deg, #000 0%, #000 38%, rgb(0 0 0 / 85%) 54%, transparent 100%)' }} />

      <div className="w-full max-w-5xl">
        <Reveal as="p" effect="fade" className="mb-5 font-body text-sm font-medium uppercase tracking-wide text-dark-red sm:text-base lg:mb-7 lg:text-lg">Haz parte de la comunidad</Reveal>
        <h2 id="cta-community-title" className="font-display text-4xl uppercase leading-none tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
          <Reveal as="span" effect="typewriter" className="mb-1 block text-neutral-500 lg:mb-2">El negro no define</Reveal>
          <Reveal as="span" effect="typewriter" delay={180} className="block text-white">Realmente quien eres</Reveal>
        </h2>
        <Reveal as="p" effect="rise" delay={220} className="mt-6 max-w-xl font-body text-base font-light leading-normal text-neutral-400 sm:text-lg lg:mt-10 lg:max-w-2xl lg:text-xl xl:text-2xl">Descubre prendas creadas para quienes no necesitan encajar. Explora la colección y encuentra la pieza que representa tu esencia.</Reveal>
        <Reveal effect="rise" delay={320} className="mt-9 w-full max-w-xs sm:w-72 lg:mt-14 lg:w-80 xl:w-96">
          <a href="#coleccion" className="cta-outline-button inline-flex h-14 w-full items-center rounded-sm bg-white pl-6 font-body text-sm font-semibold uppercase tracking-wide text-dark-950 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:pl-8 lg:h-16">Descubre Darkshop</a>
        </Reveal>
      </div>
    </section>
  )
}
