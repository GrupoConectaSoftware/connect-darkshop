# Guía de integración frontend

Base URL local: `http://localhost:3000/api/v1`. La especificación navegable está en `http://localhost:3000/docs`. Puede ejecutarse contra MySQL instalado localmente o mediante Docker Compose; ambos modos producen los mismos contratos. Todas las respuestas de colección usan `{ data, meta }`, con `meta.page`, `limit`, `total` y `totalPages`. Los errores usan `{ statusCode, code, message, timestamp }`.

Autenticación: tras `POST /auth/register` (incluye `acceptedTerms: true`) o `POST /auth/login`, conservar `accessToken` en memoria y enviar `Authorization: Bearer <accessToken>`. El refresh token se rota mediante `POST /auth/refresh`. No guardar tokens en los datos de producto ni enviar roles desde la interfaz.

| Pantalla | Llamadas |
|---|---|
| Catálogo `/catalog` | `GET /products?category=camisetas&gender=MEN&sizes=M,L&minPrice=30000&maxPrice=80000&page=1&limit=24`; `GET /categories` |
| Ficha `/preview/:slug` | `GET /products/:slug`; usar `variants` para asociar selección talla/color con `variantId` |
| Tiendas `/stores` | `GET /stores?q=dark&city=Cali&category=camisetas&page=1` y `GET /stores/:slug` |
| Favoritos `/favorites` | `GET /favorites`; `PUT /favorites/:productId`; `DELETE /favorites/:productId` |
| Carrito `/cart` | `GET /cart`; `POST /cart/items` con `{ "variantId": "...", "quantity": 1 }`; `PATCH /cart/items/:id`; `DELETE /cart/items/:id`; `DELETE /cart` para «Vaciar carrito» |
| Checkout y pedidos | `POST /orders/checkout` con `Idempotency-Key`; `GET /orders`; `GET /orders/:id`; `POST /orders/:id/cancel` |
| Colecciones | `GET /collections`; `GET /collections/:slug` |
| Newsletter | `POST /newsletter/subscriptions` con `{ "email": "..." }` |
| Registro/login/configuración | `POST /auth/register`, `POST /auth/login`, `GET/PATCH /auth/me`, `POST /auth/me/avatar`, `GET/PATCH /auth/me/address`, `GET/PATCH /auth/me/preferences` |

Ejemplo de respuesta de producto:

```json
{"id":"...","slug":"camiseta-oversize-demo","name":"Camiseta oversize de muestra","price":35000,"compareAtPrice":75500,"category":{"slug":"camisetas","name":"Camisetas"},"store":{"slug":"dark-demo","name":"DARK Demo","city":"Cali, Colombia"},"images":[{"url":"https://...","position":0}],"variants":[{"id":"...","size":"M","colorName":"Negro","colorHex":"#080808","stock":10}]}
```

La interfaz actual usa `price`, `originalPrice`, `brand`, arrays `sizes`/`colors` e imágenes importadas localmente; la API entrega `price`, `compareAtPrice`, `store`, `variants` e `images`. La adaptación corresponde al integrador frontend. Las cantidades y precios visuales no deben reutilizarse como valores autoritativos.

Flujo de carrito: cargar producto → elegir una variante con stock → añadir con `POST /cart/items` → renderizar el subtotal devuelto por `GET /cart`/mutación. Para checkout, generar un `Idempotency-Key` criptográficamente aleatorio por intento y reutilizarlo ante reintentos de red; llamar `POST /orders/checkout` con el Bearer token. La respuesta es una orden `PENDING_PAYMENT`, no una confirmación de cobro. No enviar PAN, vencimiento ni CVV: la tokenización y el pago real requieren la pasarela acordada.

La auditoría detallada de elementos conectados, estáticos y bloqueados por decisiones externas está en [Reauditoría frontend-backend](frontend-backend-reaudit.md). En particular, recuperación de contraseña requiere proveedor de correo; los conjuntos requieren definir SKU/precio/stock; y las rutas visuales aún ausentes en `App.jsx` no se activan modificando este frontend.
