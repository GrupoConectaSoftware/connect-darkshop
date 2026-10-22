import LoggedNavLayout from '../../consumer/logged/layouts/navLayout'

const BRAND_NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Recomendados', href: '#recomendados' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Conjuntos', href: '#conjuntos' },
  { label: 'Galería', href: '#galeria' },
]

export default function NavLayout() {
  return <LoggedNavLayout customNavLinks={BRAND_NAV_LINKS} />
}
