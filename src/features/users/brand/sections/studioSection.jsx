import panelBack from '../../../../assets/Brand/panel/panelUno.webp'
import panelFront from '../../../../assets/Brand/panel/panelDos.webp'
import Reveal from '../../../../components/ux/Reveal'

const PANELS = [
  { src: panelBack, alt: 'Modelo de espaldas con estampado DARK' },
  { src: panelFront, alt: 'Modelo de frente con camiseta DARK' },
]

export default function StudioSection() {
  return (
    <section
      id="studio"
      aria-label="Galería editorial DARK"
      className="w-full"
    >
      <div className="grid w-full grid-cols-1 gap-0 md:grid-cols-2">
        {PANELS.map((panel, index) => (
          <Reveal key={panel.src} effect="clip" delay={index * 120} className="group aspect-[9/10] overflow-hidden bg-dark-100">
            <img
              src={panel.src}
              alt={panel.alt}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
