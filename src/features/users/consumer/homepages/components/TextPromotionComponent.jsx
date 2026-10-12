import Carousel from '../../../../../components/ux/Carousel'

const PROMOTION_TEXTS = [
  'Envíos nacionales · Consulta tiempos de entrega y personalización',
  '10% de descuento en tu primera compra al registrarte',
  'Nuevos drops cada semana · Compra antes de que se agoten',
  'Envío gratis en pedidos seleccionados',
]

export default function TextPromotionComponent({ className = 'w-140 overflow-hidden text-right' }) {
  return (
    <Carousel
      items={PROMOTION_TEXTS}
      interval={4500}
      className={className}
      renderItem={(promotion) => <p className="truncate">{promotion}</p>}
    />
  )
}
