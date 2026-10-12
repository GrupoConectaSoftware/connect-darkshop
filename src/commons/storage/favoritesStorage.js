export const FAVORITES_UPDATED_EVENT = 'darkshop:favorites-updated'

const FAVORITES_STORAGE_KEY = 'darkshop:favorites'

const canUseSessionStorage = () => typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'

export const getFavoriteId = (product) => String(product.id ?? product.slug ?? product.name)

export function getFavorites() {
  if (!canUseSessionStorage()) return []

  try {
    const savedFavorites = JSON.parse(window.sessionStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]')
    return Array.isArray(savedFavorites) ? savedFavorites : []
  } catch {
    return []
  }
}

export function isFavorite(product) {
  const productId = getFavoriteId(product)
  return getFavorites().some((favorite) => getFavoriteId(favorite) === productId)
}

function saveFavorites(favorites) {
  if (!canUseSessionStorage()) return

  window.sessionStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  window.dispatchEvent(new CustomEvent(FAVORITES_UPDATED_EVENT, { detail: favorites }))
}

export function toggleFavorite(product) {
  const productId = getFavoriteId(product)
  const favorites = getFavorites()
  const alreadySaved = favorites.some((favorite) => getFavoriteId(favorite) === productId)
  const nextFavorites = alreadySaved
    ? favorites.filter((favorite) => getFavoriteId(favorite) !== productId)
    : [...favorites, product]

  saveFavorites(nextFavorites)

  return {
    favorites: nextFavorites,
    isFavorite: !alreadySaved,
  }
}
