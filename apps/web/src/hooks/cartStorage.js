export const CART_UPDATED_EVENT = 'darkshop:cart-updated'

const CART_STORAGE_KEY = 'darkshop:cart'

const canUseLocalStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const getProductKey = (product) => String(product.id ?? product.slug ?? product.name)

const getColorClass = (color) => {
  if (color === '#f5f5f3' || color === '#d9d9d9') return 'bg-dark-white'
  if (color === '#1f3653') return 'bg-[#1f3653]'
  if (color === '#491c25') return 'bg-dark-burgundy'
  return 'bg-dark-950'
}

const toCartItem = (product, options = {}) => ({
  id: getProductKey(product),
  name: product.name,
  description: product.description,
  price: product.price,
  quantity: options.quantity ?? 1,
  size: options.size ?? product.sizes?.[0] ?? 'M',
  colorName: options.colorName ?? 'Negro',
  colorClass: options.colorClass ?? getColorClass(options.color ?? product.colors?.[0]),
  image: options.image ?? product.image ?? product.images?.[0],
  store: product.store ?? { name: product.brand ?? 'DARK' },
  inStock: true,
})

export function getCart(fallback = []) {
  if (!canUseLocalStorage()) return fallback

  try {
    const savedCart = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? 'null')
    return Array.isArray(savedCart) ? savedCart : fallback
  } catch {
    return fallback
  }
}

export function saveCart(items) {
  if (!canUseLocalStorage()) return

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: items }))
}

export function addToCart(product, options) {
  const cartItem = toCartItem(product, options)
  const currentCart = getCart()
  const existingItem = currentCart.find((item) => item.id === cartItem.id && item.size === cartItem.size && item.colorClass === cartItem.colorClass)
  const nextCart = existingItem
    ? currentCart.map((item) => (item === existingItem ? { ...item, quantity: item.quantity + cartItem.quantity } : item))
    : [...currentCart, cartItem]

  saveCart(nextCart)
  return nextCart
}
