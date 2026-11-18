import { useLocation } from 'react-router-dom'

const VALID_GENDERS = new Set(['mujer', 'hombre', 'todo'])

export default function useGender() {
  // Las rutas de género son estáticas ("/hombre", "/mujer", "/todo"),
  // por eso useParams no contiene el slug. Léelo de la ruta actual.
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean)[0]?.toLowerCase() ?? null

  return { gender: VALID_GENDERS.has(slug) ? slug : null }
}
