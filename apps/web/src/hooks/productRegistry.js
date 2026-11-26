const key = 'darkshop.brand.productRequests'

export function readProducts() {
  return JSON.parse(localStorage.getItem(key) || '[]')
}

export function registerProduct(product) {
  const products = readProducts()
  const sku = product.sku.trim()
  if (products.some(item => item.sku.toLowerCase() === sku.toLowerCase())) {
    throw new Error('Ya registraste un producto con este SKU.')
  }
  const record = { ...product, sku, name: product.name.trim(), variants: product.variants }
  localStorage.setItem(key, JSON.stringify([record, ...products]))
}
