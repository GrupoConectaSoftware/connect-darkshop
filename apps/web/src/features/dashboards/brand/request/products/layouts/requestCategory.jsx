import { categoriesData } from '../../../../../../data/categories'
import ChoiceCard from '../components/ChoiceCard'
import { useRef } from 'react'
import CarouselControls from '../../../../../../components/ui/carousel/CarouselControls'

const order = ['camisetas', 'pantalones', 'zapatos', 'accesorios', 'chaquetas']

export default function RequestCategory({ data, update }) {
  const scrollRef = useRef(null)
  return (
    <div><CarouselControls scrollRef={scrollRef} className="mb-3 justify-end" />
    <div ref={scrollRef} className="grid grid-flow-col auto-cols-[45%] gap-3 overflow-x-auto p-1 sm:auto-cols-[19.2%] sm:[grid-auto-rows:clamp(17rem,44vh,30rem)]">
      {order.map(id => <ChoiceCard key={id} item={categoriesData.find(item => item.id === id)}
        selected={data.category === id} onSelect={category => update({ category })} />)}
    </div></div>
  )
}
