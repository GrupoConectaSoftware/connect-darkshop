import { AtSign, Mail, Phone, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import presentationImage from '../../../../assets/Brand/presentation/presentationSection.webp'
import darkshopLogo from '../../../../assets/Brand/logo/logoSection.webp'
import Reveal from '../../../../components/ux/Reveal'

const STORE = {
  slug: 'dark',
  name: 'DARK',
  tags: ['UNDERGROUND', 'OVERSIZE', 'TELA FRÍA'],
  description: 'Somos una tienda de prendas de vestir diferente. Buscamos tendencias distintas y resaltamos una marca que se sale de los estándares de la moda políticamente correcta.',
  representative: 'DIANA CAROLINA GIL DIAZ',
  phone: '(602) 445 6937',
  email: 'DIANA@BEAUTY.COM',
  instagram: '@BEAUTYSALON',
}

function ContactItem({ icon: Icon, children }) {
  return <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.13em] text-dark-red sm:text-[11px]"><Icon size={15} strokeWidth={1.8} aria-hidden="true" />{children}</span>
}

export default function IntroductionSection() {
  return (
    <section id="inicio" aria-labelledby="brand-store-title" className="overflow-hidden bg-white pb-55 text-dark-950">
      <Reveal effect="clip" className="relative isolate h-[42svh] min-h-80 max-h-128 overflow-hidden sm:h-[48svh] sm:min-h-92 lg:h-[55svh] lg:min-h-120 lg:max-h-156">
        <img src={presentationImage} alt="Editorial de la colección Dark" fetchPriority="high" className="absolute inset-0 z-0 size-full object-cover object-center" />
      </Reveal>

      <Reveal effect="scale" className="relative z-10 mx-auto -mt-24 w-[calc(100%-2rem)] max-w-355 border border-dark-300 bg-white shadow-[0_20px_55px_rgba(0,0,0,0.16)] sm:-mt-32 sm:w-[calc(100%-4rem)] lg:-mt-40 lg:w-[calc(100%-8rem)]">
        <div className="grid gap-6 border-t-4 border-dark-950 p-5 sm:p-7 lg:grid-cols-[10rem_minmax(0,1fr)_12rem] lg:items-start lg:gap-8 lg:p-9 xl:grid-cols-[11rem_minmax(0,1fr)_13rem] xl:p-10">
          <div className="grid size-28 place-items-center overflow-hidden border border-dark-300 bg-white p-2 sm:size-36 sm:p-3 lg:size-40 lg:p-4">
            <img src={darkshopLogo} alt="Logo oficial de Dark" className="size-full object-contain object-center" />
          </div>

          <div className="min-w-0">
            <p className="flex min-h-12 flex-wrap content-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.12em] text-dark-950 sm:text-xs">{STORE.tags.map((tag) => <span key={tag}>{tag}</span>)}</p>
            <h1 id="brand-store-title" className="mt-3 font-display text-4xl uppercase leading-none tracking-[-0.06em] text-black sm:text-5xl">{STORE.name}</h1>
            <p className="mt-3 max-w-3xl text-sm font-light leading-tight text-dark-500 sm:text-base lg:text-lg">{STORE.description}</p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-dark-200 pt-4">
              <ContactItem icon={UserRound}>{STORE.representative}</ContactItem>
              <ContactItem icon={Phone}>{STORE.phone}</ContactItem>
              <ContactItem icon={Mail}>{STORE.email}</ContactItem>
              <ContactItem icon={AtSign}>{STORE.instagram}</ContactItem>
            </div>
          </div>

          <Link to={`/catalog?store=${STORE.slug}`} aria-label={`Descubre el catálogo de ${STORE.name}`} className="inline-flex min-h-12 items-center justify-center self-start border border-black bg-black px-6 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white transition duration-200 hover:bg-transparent hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dark-red lg:justify-self-end">Descubre catálogo</Link>
        </div>
      </Reveal>
    </section>
  )
}
