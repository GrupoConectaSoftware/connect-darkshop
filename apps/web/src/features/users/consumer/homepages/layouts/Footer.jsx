import { Link } from 'react-router-dom'
import InstagramIcon from '../../../../../commons/ui/icons/social/InstagramIcon'
import TiktokIcon from '../../../../../commons/ui/icons/social/TiktokIcon'

const FOOTER_GROUPS = [
  {
    title: 'Tienda',
    links: [
      ['Inicio', '#inicio'],
      ['Outlet', '#coleccion'],
      ['Nosotros', '#nosotros'],
      ['Categorías', '#categorias'],
      ['Conjuntos', '#conjuntos'],
    ],
  },
  {
    title: 'Compañía',
    links: [
      ['Manifiesto', '#nosotros'],
      ['Comunidad', '#comunidad'],
      ['LookBook', '#conjuntos'],
      ['Tiendas físicas', '/stores'],
      ['Carrera', '/register'],
    ],
  },
  {
    title: 'Legalidad',
    links: [
      ['Términos y condiciones', '/legal#terminos-y-condiciones'],
      ['Políticas de privacidad', '/legal#politicas-de-privacidad'],
      ['Devoluciones', '/legal#devoluciones'],
      ['Tallas', '#coleccion'],
      ['Contacto', '#contacto'],
    ],
  },
]

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.4 11.7a8.3 8.3 0 0 1-12.3 7.2L3 20l1.2-4.9a8.3 8.3 0 1 1 16.2-3.4Z" />
      <path d="M8.5 8.1c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.2.2-.2.4 0 .6.5.8 1.2 1.5 2.1 1.9.2.1.4.1.6-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5 0 .3-.2 1.1-.7 1.5-.5.5-1.2.7-1.9.6-1-.1-2.4-.7-3.9-2-1.3-1.2-2.2-2.7-2.4-3.7-.2-.8.1-1.5.5-2.1.3-.3.6-.5.9-.5Z" />
    </svg>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a href={href} aria-label={label} target="_blank" rel="noopener noreferrer" className="inline-flex text-white transition duration-300 hover:-translate-y-1 hover:text-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none">
      {children}
    </a>
  )
}

function FooterLink({ label, href }) {
  const className = 'group relative inline-flex w-fit max-w-full items-center text-sm font-light leading-relaxed text-neutral-400 transition duration-300 hover:translate-x-1 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transform-none motion-reduce:transition-none sm:text-base lg:text-lg'
  const content = <><span>{label}</span><span aria-hidden="true" className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-dark-red transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none" /></>

  return (
    href.startsWith('/')
      ? <Link to={href} className={className}>{content}</Link>
      : <a href={href} className={className}>{content}</a>
  )
}

export default function Footer({ storeLinks = null }) {
  const year = new Date().getFullYear()
  const footerGroups = storeLinks
    ? FOOTER_GROUPS.map((group, index) => index === 0 ? { ...group, links: storeLinks } : group)
    : FOOTER_GROUPS

  return (
    <footer className="overflow-hidden bg-footer px-5 pt-10 text-white sm:px-10 sm:pt-16 lg:px-16 lg:pt-24 xl:px-28">
      <div className="mx-auto grid max-w-[1800px] gap-10 lg:grid-cols-[1.2fr_2fr] lg:gap-16">
        <div className="max-w-2xl">
          <a href="#inicio" aria-label="Darkshop, inicio" className="inline-flex font-display text-lg font-black uppercase leading-none tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-xl lg:text-3xl">
            NUESTRA ESENCIA
          </a>
          <p className="mt-5 max-w-xl font-body text-base font-light leading-snug text-neutral-300 sm:mt-8 sm:text-lg lg:mt-16 lg:text-2xl">Underground essentials. Diseñado y confeccionado en Cali, Colombia. Para los que entienden que el silencio también es una declaración.</p>
          <div className="mt-6 flex items-center gap-5 sm:mt-7">
            <SocialLink href="#tiktok" label="TikTok"><TiktokIcon size={24} /></SocialLink>
            <SocialLink href="#whatsapp" label="WhatsApp"><WhatsAppIcon size={24} /></SocialLink>
            <SocialLink href="#instagram" label="Instagram"><InstagramIcon size={24} /></SocialLink>
          </div>
        </div>

        <div className="hidden grid-cols-2 gap-x-6 gap-y-10 sm:grid sm:grid-cols-3 sm:gap-x-8 lg:gap-x-10">
          {footerGroups.map((group) => (
            <nav key={group.title} aria-label={`Enlaces de ${group.title.toLowerCase()}`}>
              <h3 className="mb-4 font-body text-base font-medium uppercase text-white sm:text-lg lg:text-2xl">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map(([label, href]) => (
                  <li key={label}><FooterLink label={label} href={href} /></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div aria-hidden="true" className="relative left-1/2 mt-12 hidden h-28 w-screen -translate-x-1/2 items-end justify-center overflow-hidden sm:flex sm:h-48 lg:mt-20 lg:h-72">
        <span className="select-none whitespace-nowrap font-display font-black leading-[0.78] tracking-[-0.07em] text-white/[0.035]" style={{ fontSize: '20vw' }}>DARKSHOP</span>
      </div>
      <div className="mx-0 mt-10 h-px bg-white/70 sm:mx-6 sm:mt-0" />

      <div className="mx-auto flex max-w-[1800px] flex-col items-center gap-2 py-6 text-center font-body text-xs sm:py-8 sm:text-sm lg:flex-row lg:justify-between lg:gap-6 lg:text-left lg:text-base">
        <p className="text-white">© {year} DARKSHOP — Todos los derechos reservados.</p>
        <p className="text-neutral-500">Elaborado por Grupo Conecta Software</p>
      </div>
    </footer>
  )
}
