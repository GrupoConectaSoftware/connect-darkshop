import { productsData } from '../../data/products'
import { dashboardNotifications, userOrders } from '../../data/user'

export const products = productsData.slice(0, 5)
export const orders = userOrders.map((order, index) => ({ number: `PEDIDO - ${String(index + 1).padStart(3, '0')}`, date: order.date, currentStep: index === 0 ? 0 : index === 1 ? 2 : 4, steps: ['Sin registro', 'Confirmado', 'Transportadora', 'En reparto', 'Entregado', 'Calificado'] }))
export const notifications = dashboardNotifications
