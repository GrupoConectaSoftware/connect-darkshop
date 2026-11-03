import { Link } from 'react-router-dom'
import invitationImage from '../../../../../assets/Sections/homespages/invitation/ImagesInvitation.webp'

export default function CtaSection() {
  return <section className="relative isolate mt-16 overflow-hidden bg-black px-6 py-16 text-white sm:mt-20 sm:px-10 sm:py-20 lg:mt-24 lg:px-16"><img src={invitationImage} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55" /><span className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/75 to-black/20" /><div className="mx-auto max-w-[1600px]"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Tu próxima prenda está aquí</p><h2 className="mt-3 max-w-3xl font-display text-4xl font-black uppercase leading-none sm:text-6xl">Encuentra algo que hable de ti</h2><Link to="/catalog" className="mt-7 inline-flex border border-white px-6 py-3 text-xs font-bold uppercase tracking-[0.15em] transition hover:bg-white hover:text-black">Explorar catálogo →</Link></div></section>
}
