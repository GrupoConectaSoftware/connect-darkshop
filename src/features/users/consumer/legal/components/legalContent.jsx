import { LEGAL_SECTIONS } from '../data/legal'
import LegalSection from './legalSection'

export default function LegalContent({ query = '' }) {
  const normalizedQuery = query.trim().toLocaleLowerCase('es')
  const sections = normalizedQuery
    ? LEGAL_SECTIONS.filter((section) => JSON.stringify(section).toLocaleLowerCase('es').includes(normalizedQuery))
    : LEGAL_SECTIONS

  if (sections.length === 0) {
    return (
      <div className="grid min-h-72 place-items-center border border-dashed border-dark-300 p-8 text-center">
        <div>
          <p className="font-display text-2xl uppercase tracking-tight text-dark-950">Sin resultados</p>
          <p className="mt-2 text-sm text-dark-500">Prueba con otra palabra o revisa el índice de contenido.</p>
        </div>
      </div>
    )
  }

  return <article className="min-w-0">{sections.map((section) => <LegalSection key={section.id} section={section} />)}</article>
}
