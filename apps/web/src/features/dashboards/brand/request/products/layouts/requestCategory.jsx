import { categoriesData } from '../../../../../../data/categories'
import ChoiceCard from '../components/ChoiceCard'
const order = ['camisetas', 'pantalones', 'zapatos', 'accesorios', 'chaquetas']
export default function RequestCategory({ data, update }) {
  return <div className="grid h-full min-h-0 w-full grid-cols-5 gap-1 overflow-hidden p-1 sm:gap-4">{order.map(id => <ChoiceCard key={id} item={categoriesData.find(item => item.id === id)} selected={data.category === id} onSelect={category => update({ category, collection: category === data.category ? data.collection : '' })}/>)}</div>
}
