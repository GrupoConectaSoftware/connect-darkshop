import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ticket, Trash2 } from 'lucide-react'
import NavLayout from '../homepages/layouts/navLayout'
import PreviewComponents from './components/previewComponents'
import CalculateComponent from './components/calculateComponent'
import RecomendadedComponent from './components/recomendadedComponent'
import outletOne from '../../../../assets/Sections/homespages/outlet/products/outletUno.webp'
import outletTwo from '../../../../assets/Sections/homespages/outlet/products/ouletDos.webp'
import outletThree from '../../../../assets/Sections/homespages/outlet/products/outletTres.webp'
import outletFour from '../../../../assets/Sections/homespages/outlet/products/outletCuatro.webp'
import trousersImage from '../../../../assets/Sections/homespages/categories/categoriePantalones.webp'
import { getCart, saveCart } from '../../../../commons/storage/cartStorage'

// TODO: Reemplazar esta data mock por el estado global del carrito.
const CART_ITEMS = [
  {
    id: 'cart-1', name: 'Pantalón relaxed essential', description: 'Algodón de alto gramaje, corte amplio y acabado minimalista para un estilo urbano auténtico.', price: 45000, quantity: 1, size: 'L', colorName: 'Negro', colorClass: 'bg-dark-950', image: trousersImage, store: { name: 'Victory' }, inStock: true,
  },
  {
    id: 'cart-2', name: 'Pantalón relaxed essential', description: 'Algodón de alto gramaje, corte amplio y acabado minimalista para un estilo urbano auténtico.', price: 45000, quantity: 1, size: 'L', colorName: 'Negro', colorClass: 'bg-dark-950', image: trousersImage, store: { name: 'Smooth' }, inStock: true, badge: 'recommended',
  },
  {
    id: 'cart-3', name: 'Pantalón relaxed essential', description: 'Algodón de alto gramaje, corte amplio y acabado minimalista para un estilo urbano auténtico.', price: 27500, quantity: 1, size: 'L', colorName: 'Negro', colorClass: 'bg-dark-950', image: trousersImage, store: { name: 'Dark' }, inStock: true, badge: 'discount',
  },
]

// TODO: Reemplazar por sugerencias obtenidas desde el catálogo.
const RECOMMENDED_PRODUCTS = [
  { id: 'recommended-1', name: 'Camiseta oversize esencial', description: 'Algodón suave de alto gramaje con un corte amplio y limpio.', price: 35000, originalPrice: 75500, image: outletTwo, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#f5f5f3'], unavailableSizes: ['XL'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], badge: { label: 'Recomendado', variant: 'recommended' } },
  { id: 'recommended-2', name: 'Hoodie edición aniversario', description: 'Felpa premium, caída amplia y una silueta hecha para todos los días.', price: 65000, originalPrice: 90000, image: outletOne, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#491c25'], unavailableSizes: ['XXL'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], badge: { label: 'Recomendado', variant: 'recommended' } },
  { id: 'recommended-3', name: 'Camiseta oversize oceánica', description: 'Silueta relajada y acabado azul profundo para un look urbano.', price: 42000, originalPrice: 60000, image: outletThree, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#1f3653'], unavailableSizes: ['S'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], badge: { label: 'Recomendado', variant: 'recommended' } },
  { id: 'recommended-4', name: 'Camiseta oversize medusa', description: 'Algodón compacto, corte amplio y una actitud que se nota.', price: 58000, originalPrice: 74000, image: outletFour, brand: 'DARK', brandType: 'TIENDA OFICIAL', colors: ['#080808', '#737373'], unavailableSizes: ['L'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], badge: { label: 'Recomendado', variant: 'recommended' } },
]

export default function Shopping() {
  const [items, setItems] = useState(() => getCart(CART_ITEMS))
  const [coupon, setCoupon] = useState('')

  useEffect(() => {
    saveCart(items)
  }, [items])

  const handleQuantityChange = (itemId, quantity) => {
    setItems((currentItems) => currentItems.map((item) => (item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item)))
  }

  const handleRemove = (itemId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
  }

  const handleClear = () => {
    // TODO: Confirmar y sincronizar el vaciado con el carrito global.
    setItems([])
  }

  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return (
    <div className="min-h-screen bg-dark-white text-dark-950">
      <NavLayout cartVariant />
      <main className="mx-auto w-full max-w-[1600px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,.65fr)] lg:items-end lg:gap-12">
          <div>
            <nav aria-label="Miga de pan" className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wide text-dark-500"><Link to="/" className="text-dark-red transition-colors hover:text-dark-burgundy">Inicio</Link><span>/</span><span className="text-dark-950">Carrito de compras</span></nav>
            <h1 className="mt-5 font-display text-[clamp(2.35rem,6vw,4.7rem)] uppercase leading-[0.86] tracking-[-0.06em]">Carrito de compras</h1>
            <p className="mt-4 text-base text-dark-500 sm:text-lg">Revisa tus productos antes de finalizar tus pedidos.</p>
          </div>

          <form onSubmit={(event) => event.preventDefault()} className="border-b border-dark-200 pb-5 lg:border-0 lg:pb-0">
            <label htmlFor="coupon" className="flex items-center gap-2 text-xs text-dark-500"><Ticket size={17} className="text-dark-950" />¿Tienes algún cupón de descuento?</label>
            <div className="mt-3 flex gap-2">
              <input id="coupon" value={coupon} onChange={(event) => setCoupon(event.target.value)} placeholder="Digita el código aquí." className="h-11 min-w-0 flex-1 border border-transparent bg-dark-100 px-4 text-sm text-dark-950 outline-none transition-colors placeholder:text-dark-500 focus:border-dark-400" />
              <button type="submit" className="h-11 shrink-0 cursor-pointer bg-dark-950 px-4 text-[10px] font-semibold uppercase tracking-wide text-dark-white transition-colors hover:bg-dark-burgundy sm:px-5">Aplicar cupón</button>
            </div>
          </form>
        </div>

        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,.65fr)] lg:gap-12">
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs italic text-dark-400">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
              <button type="button" onClick={handleClear} disabled={!items.length} className="inline-flex h-9 cursor-pointer items-center gap-1.5 bg-dark-100 px-3 text-[10px] font-semibold uppercase tracking-wide text-dark-800 transition-colors hover:bg-dark-200 disabled:cursor-not-allowed disabled:opacity-50"><Trash2 size={14} />Vaciar carrito</button>
            </div>
            <PreviewComponents items={items} onQuantityChange={handleQuantityChange} onRemove={handleRemove} />
          </section>
          <CalculateComponent items={items} />
        </div>

        <RecomendadedComponent products={RECOMMENDED_PRODUCTS} />
      </main>
    </div>
  )
}
