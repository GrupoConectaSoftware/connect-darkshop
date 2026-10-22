import { Link } from 'react-router-dom'
import InstagramIcon from '../../../../../commons/ui/icons/social/InstagramIcon'
import TiktokIcon from '../../../../../commons/ui/icons/social/TiktokIcon'
import FacebookIcon from '../../../../../commons/ui/icons/social/FacebookIcon'

const GROUPS = [
  { title: 'Explora', links: [['Inicio', '/logged'], ['Outlet', '/catalog?outlet=true'], ['Categorías', '/catalog'], ['Tiendas', '/stores'], ['Conjuntos', '/catalog?category=conjuntos']] },
  { title: 'Tu cuenta', links: [['Mi perfil', '/logged'], ['Favoritos', '/favorites'], ['Mis pedidos', '/cart'], ['Ayuda', '/legal']] },
  { title: 'Información', links: [['Sobre Darkshop', '/legal'], ['Términos y condiciones', '/legal#terminos-y-condiciones'], ['Política de privacidad', '/legal#politicas-de-privacidad'], ['Contacto', 'mailto:darkshop@reportas.com']] },
]

export default function Footer() {
  return <footer className="bg-footer px-6 pb-6 pt-14 text-white sm:px-10 sm:pt-20 lg:px-16 lg:pt-24">
    <div className="mx-auto grid max-w-[1600px] gap-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_2fr] lg:gap-20">
      <div><Link to="/logged" className="font-display text-2xl font-black tracking-tight">DARKSHOP</Link><p className="mt-5 max-w-md text-sm leading-7 text-neutral-400 sm:text-base">Underground essentials. Diseñado en Cali para quienes visten con identidad.</p><div className="mt-7 flex items-center gap-5"><a href="#instagram" aria-label="Instagram" className="text-white transition hover:text-dark-red"><InstagramIcon size={22} /></a><a href="#tiktok" aria-label="TikTok" className="text-white transition hover:text-dark-red"><TiktokIcon size={22} /></a><a href="#facebook" aria-label="Facebook" className="text-white transition hover:text-dark-red"><FacebookIcon size={22} /></a></div></div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">{GROUPS.map((group) => <nav key={group.title} aria-label={group.title}><h2 className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-white">{group.title}</h2><ul className="space-y-3">{group.links.map(([label, href]) => <li key={label}>{href.startsWith('mailto:') ? <a href={href} className="text-sm text-neutral-400 transition hover:text-white">{label}</a> : <Link to={href} className="text-sm text-neutral-400 transition hover:text-white">{label}</Link>}</li>)}</ul></nav>)}</div>
    </div>
    <div className="mx-auto mt-14 flex max-w-[1600px] flex-col gap-2 border-t border-white/20 pt-6 text-xs text-neutral-400 sm:flex-row sm:justify-between sm:text-sm"><p>© {new Date().getFullYear()} DARKSHOP — Todos los derechos reservados.</p><p>Elaborado por Grupo Conecta Software</p></div>
  </footer>
}
