import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const SPECS = [
  { title: 'Descripción', content: 'La Nocturne Oversize Tee redefine el básico urbano con una silueta arquitectónica y un drapeado impecable. Construida en algodón premium de alto gramaje, mantiene una forma boxy y una caída limpia durante el uso.', highlight: 'Algodón pesado de 280 gsm. Cuello en rib grueso, hombros caídos y acabado mate profundo.' },
  { title: 'Composición', content: '100% algodón premium. Tejido de punto compacto, prelavado para conservar su estructura y tacto.' },
  { title: 'Devolución', content: 'Tienes hasta 30 días calendario desde la entrega para solicitar cambios o devoluciones, siempre que la prenda conserve etiquetas y estado original.' },
  { title: 'Envíos', content: 'Despachamos a toda Colombia. Recibirás el número de guía por correo cuando tu pedido sea entregado a la transportadora.' },
]

export default function AdventageComponents() {
  const [open, setOpen] = useState(0)

  return (
    <section aria-label="Información adicional del producto" className="mx-auto max-w-5xl">
      {SPECS.map((spec, index) => {
        const isOpen = open === index
        return (
          <article key={spec.title} className="border-b border-dark-200 first:border-t">
            <button type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left sm:py-7">
              <span className="font-body text-sm font-semibold uppercase tracking-tight text-dark-950 sm:text-base">{spec.title}</span>
              <ChevronDown size={19} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden"><div className="max-w-3xl pb-7 text-sm leading-relaxed text-dark-600 sm:text-base"><p>{spec.content}</p>{spec.highlight && <p className="mt-4 font-semibold italic text-dark-950">{spec.highlight}</p>}</div></div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
