import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import buyerImage from '../../../../assets/Sections/auth/selectAccount/Options/OptionsSesionUno.webp'
import sellerImage from '../../../../assets/Sections/auth/selectAccount/Options/OptionsSesionDos.webp'
import ImageZoom from '../../../../components/ux/ImageZoom'
import SessionButton from '../../../../components/ui/buttons/SessionButton'

const options = [
  {
    id: 'buyer',
    eyebrow: 'Comprar',
    title: 'Soy comprador',
    description: 'Encuentra piezas únicas y descubre marcas que conectan con tu estilo.',
    image: buyerImage,
  },
  {
    id: 'seller',
    eyebrow: 'Vender',
    title: 'Construye tu espacio',
    description: 'Presenta tus colecciones y conecta tu propuesta con nuevas personas.',
    image: sellerImage,
  },
]

function OptionCard({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isSelected}
      className={`group relative flex aspect-video w-full min-w-0 cursor-pointer flex-col justify-end overflow-hidden border bg-dark-950 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-white/60 sm:aspect-4/5 ${isSelected ? 'border-dark-white opacity-100' : 'border-dark-700/40 opacity-40 hover:opacity-70'}`}
    >
      <ImageZoom className="absolute inset-0">
        <img src={option.image} alt="" className="size-full object-cover grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0" />
      </ImageZoom>
      <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/95 via-black/35 to-transparent" />
      <span className="relative z-10 min-w-0 p-3 sm:p-4">
        <span className="mb-1.5 block font-body text-[9px] font-bold uppercase tracking-[0.2em] text-dark-300 sm:text-[10px]">{option.eyebrow}</span>
        <span className="block font-display text-sm uppercase leading-tight tracking-[-0.02em] text-dark-white sm:text-base">{option.title}</span>
        <span className="mt-1.5 block font-body text-[10px] font-light leading-snug text-dark-300 sm:text-xs">{option.description}</span>
        <span aria-hidden="true" className="mt-2 block text-base leading-none text-dark-white transition-transform duration-300 group-hover:translate-x-1">→</span>
      </span>
    </button>
  )
}

export default function FormSelect() {
  const [selected, setSelected] = useState(null)
  const navigate = useNavigate()

  const handleContinue = () => {
    if (!selected) return
    navigate(selected === 'buyer' ? '/register/buyer' : '/register/seller')
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <p className="mb-2 font-body text-[10px] font-bold uppercase tracking-[0.22em] text-dark-300 sm:text-xs">Empieza por aquí</p>
      <h1 className="font-display text-[clamp(1.8rem,3.5vw,2.4rem)] uppercase leading-[1.05] tracking-[-0.03em] text-dark-white">Dos formas de ser parte</h1>
      <p className="mb-6 mt-3 max-w-xl font-body text-base font-light leading-snug text-dark-300 sm:mb-8 sm:text-lg">
        Descubre nuevas propuestas o construye la tuya; elige cómo quieres comenzar la experiencia.
      </p>

      <div role="group" aria-label="Elige cómo quieres usar DARKSHOP" className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {options.map((option) => (
          <OptionCard key={option.id} option={option} isSelected={selected === option.id} onSelect={() => setSelected(option.id)} />
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <SessionButton type="button" fullWidth disabled={!selected} onClick={handleContinue}>Continuar</SessionButton>
      </div>
      <p className="mt-4 text-center font-body text-xs text-dark-400 sm:mt-6 sm:text-sm">
        Dos caminos. Una experiencia <span className="font-bold text-dark-white">hecha a tu manera.</span>
      </p>
    </div>
  )
}

export function RolePlaceholder({ role }) {
  return (
    <main className="grid min-h-screen place-items-center bg-dark-950 px-6 py-12 text-dark-white">
      <section className="w-full max-w-lg text-center">
        <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.2em] text-dark-300">DARKSHOP · {role}</p>
        <h1 className="font-display text-3xl uppercase tracking-[-0.03em] sm:text-4xl">Tu espacio está en camino</h1>
        <p className="mt-4 font-body text-sm text-dark-400">Este paso de registro estará disponible próximamente.</p>
        <Link to="/select-account" className="mt-8 inline-flex font-body text-sm font-semibold text-dark-white underline underline-offset-4 transition-colors hover:text-dark-red">Volver a elegir perfil</Link>
      </section>
    </main>
  )
}
