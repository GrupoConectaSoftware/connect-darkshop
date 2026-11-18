export const productActionsData = [
  { icon: 'Eye', label: 'Vista r?pida' },
  { icon: 'Heart', label: 'Agregar a favoritos' },
  { icon: 'ShoppingCart', label: 'Agregar al carrito' },
  { icon: 'Share2', label: 'Compartir producto' },
]

export const passwordRequirements = [
  { id: 'length', label: 'Mínimo 8 caracteres', test: (value) => value.length >= 8 },
  { id: 'upper', label: 'Una mayúscula', test: (value) => /[A-ZÁÉÍÓÚÑ]/.test(value) },
  { id: 'lower', label: 'Una minúscula', test: (value) => /[a-záéíóúñ]/.test(value) },
  { id: 'number', label: 'Un número', test: (value) => /\d/.test(value) },
]
