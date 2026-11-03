import { useParams } from 'react-router-dom'

const VALID_GENDERS = new Set(['mujer', 'hombre', 'todo'])

export default function useGender() {
  const { gender: slug } = useParams()

  return { gender: VALID_GENDERS.has(slug) ? slug : null }
}
