import { OUTLET_PRODUCTS_ON_SALE } from './cards/productCardData'
export const products = OUTLET_PRODUCTS_ON_SALE.slice(0, 5)
const steps = ['Sin registro', 'Confirmado', 'Transportadora', 'En reparto', 'Entregado', 'Calificado']
export const orders = [
  { number: 'PEDIDO - 001', date: '24 septiembre 2025', currentStep: 0, steps },
  { number: 'PEDIDO - 002', date: '18 septiembre 2025', currentStep: 2, steps },
  { number: 'PEDIDO - 003', date: '10 septiembre 2025', currentStep: 4, steps },
]
export const notifications = ['Tu pedido PED-001 ha sido despachado con éxito', 'Nueva colección de Dark disponible', 'Tu cupón de descuento vence pronto', 'Hay nuevas prendas en tus favoritos', 'Tu pedido PED-002 está en preparación', 'Descubre las últimas novedades de DarkShop', 'Una prenda de tu lista vuelve a estar disponible']
