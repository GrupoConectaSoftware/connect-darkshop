import { productsData } from './products'

const entries = [
 ['pedido','Tu pedido fue confirmado','Recibimos tu pedido y comenzamos a prepararlo.'],
 ['ropa','Nueva colección disponible','Descubre las últimas prendas de DarkShop.'],
 ['pago','Pago aprobado','Tu pago se procesó correctamente.'],
 ['pedido','Tu pedido está en camino','La transportadora recibió tu pedido.'],
 ['ropa','Tu favorito volvió','Una prenda de tu lista está disponible de nuevo.'],
 ['reporte','Reporte recibido','Estamos revisando el reporte que enviaste.'],
 ['pago','Pago rechazado','No fue posible completar el pago. Revisa tu método de pago.'],
 ['pedido','Pedido entregado','Tu pedido fue entregado en la dirección registrada.'],
 ['ropa','Nuevas camisetas','Explora los diseños que acaban de llegar.'],
 ['reporte','Actualización de reporte','Tu reporte de una reseña está en revisión.'],
 ['pago','Error al procesar el pago','Puedes intentar de nuevo desde tu compra.'],
 ['ropa','Reposición de tallas','Ya están disponibles nuevas tallas de una prenda que te interesa.'],
 ['pedido','Preparando tu pedido','Estamos reuniendo tus productos para el envío.'],
 ['reporte','Reporte resuelto','Finalizamos la revisión de tu reporte.'],
 ['pago','Confirmación de pago','Registramos el pago de tu compra.'],
 ['ropa','Descubre nuevas chaquetas','Conoce las novedades para completar tu estilo.'],
 ['pedido','Actualización de entrega','Consulta el seguimiento para conocer el estado de tu envío.'],
 ['reporte','Aviso de la comunidad','Revisa las normas de convivencia de DarkShop.'],
 ['ropa','Una colección para ti','Encontramos prendas relacionadas con tus preferencias.'],
 ['pedido','Pedido listo para envío','Tu compra está lista para llegar a la transportadora.'],
]
export const notificationsData = entries.map(([type, title, message], index) => ({
  id: String(index + 1), type, title, message,
  date: `${String(19 - Math.floor(index / 2)).padStart(2, '0')} nov. 2026 · ${index % 2 ? '10:30' : '14:20'}`,
  isRead: index >= 7,
  ...(type === 'ropa' && productsData[index % productsData.length]?.image ? { image: productsData[index % productsData.length].image } : {}),
}))
