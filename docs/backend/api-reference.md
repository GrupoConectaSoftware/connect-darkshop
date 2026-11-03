# Referencia de API

Base local: `http://localhost:3000/api/v1`. Swagger/OpenAPI: `http://localhost:3000/docs`.

## Convenciones HTTP

- JSON UTF-8; fechas ISO-8601; importe en COP.
- Las colecciones responden `200` con `{ "data": [], "meta": { "page", "limit", "total", "totalPages" } }`.
- Los errores responden `{ "statusCode", "code", "message", "timestamp" }`. Para errores de validación `message` puede ser una lista de campos.
- `401` significa token ausente/inválido/expirado o rol insuficiente; `404` recurso no disponible; `409` conflicto de unicidad; `400` entrada o regla de negocio inválida.
- El encabezado protegido es `Authorization: Bearer <accessToken>`.

## Auth

| Método y ruta | Autenticación | Descripción |
|---|---|---|
| `POST /auth/register` | Pública | Crea BUYER o SELLER; requiere `fullName`, `email`, contraseña fuerte y `acceptedTerms: true`. Nunca crea ADMIN. |
| `POST /auth/login` | Pública | Valida email/contraseña y crea sesión. |
| `POST /auth/refresh` | Pública | Rota refresh token válido y emite un nuevo par. |
| `POST /auth/logout` | Bearer | Revoca las sesiones activas del usuario. |
| `GET /auth/me` | Bearer | Devuelve perfil seguro, sin hashes. |
| `PATCH /auth/me` | Bearer | Actualiza `fullName`, `phone` y/o `city`. |
| `POST /auth/me/avatar` | Bearer | Recibe `multipart/form-data` campo `file`; JPEG, PNG o WebP hasta el máximo configurado. |
| `GET/PATCH /auth/me/address` | Bearer | Obtiene/guarda dirección predeterminada (`line1`, `city`). |
| `GET/PATCH /auth/me/preferences` | Bearer | Obtiene/guarda arreglos `styles`, `categories`, `brands`. |

Ejemplo de registro:

```json
{
  "fullName": "Nombre de ejemplo",
  "email": "buyer@example.test",
  "password": "ClaveSegura123",
  "acceptedTerms": true,
  "role": "BUYER"
}
```

Registro, login y refresh responden `accessToken`, `refreshToken` y `user`. El cliente debe tratar ambos tokens como datos sensibles.

## Catálogo público

| Método y ruta | Descripción |
|---|---|
| `GET /categories` | Categorías y conteo de productos activos. |
| `GET /products` | Listado paginado de productos activos. |
| `GET /products/:slug` | Detalle de producto activo. |

Parámetros de `GET /products`: `page` (1), `limit` (24, máximo 100), `q`, `category`, `store`, `gender`, `sizes`, `colors`, `references`, `minPrice`, `maxPrice`, `sort` (`newest`, `price_asc`, `price_desc`). Los filtros de valores múltiples usan coma: `sizes=M,L`.

Un producto devuelve `category`, `store`, imágenes ordenadas, variantes y `availableSizes`. Para añadir al carrito se utiliza el `id` de la variante, nunca su posición en el arreglo.

## Tiendas

| Método y ruta | Autenticación | Descripción |
|---|---|---|
| `GET /stores` | Pública | Lista tiendas activas. Filtros: `q`, `city`, `category`, `reference`, `page`, `limit`. |
| `GET /stores/:slug` | Pública | Tienda activa y sus productos activos. |
| `POST /stores` | SELLER | Crea la única tienda permitida por vendedor en este MVP. |

El cuerpo de creación usa `slug`, `name`, `city` y opcionalmente `subtitle`, `description`, `imageUrl`.

## Colecciones y newsletter

| Método y ruta | Autenticación | Descripción |
|---|---|---|
| `GET /collections` | Pública | Colecciones activas con cantidad de productos. |
| `GET /collections/:slug` | Pública | Metadatos y productos activos ordenados de una colección. |
| `POST /newsletter/subscriptions` | Pública | Suscribe o reactiva `{ "email": "..." }` de forma idempotente. |

## Gestión de catálogo de vendedor

| Método y ruta | Autenticación | Descripción |
|---|---|---|
| `POST /seller/products` | SELLER o ADMIN | Crea un producto para la tienda del vendedor. |
| `PATCH /seller/products/:id` | SELLER dueño o ADMIN | Reemplaza los datos editables, imágenes y variantes. |

El cuerpo de producto requiere `slug`, `name`, `description`, `categorySlug`, `gender`, `price`, `images` y `variants`. Una variante requiere `sku`, `size`, `colorName`, `colorHex` (`#RRGGBB`) y `stock` entero no negativo. `compareAtPrice`, `badge` y `referenceTags` son opcionales. En actualización se puede enviar `status` (`DRAFT`, `ACTIVE`, `ARCHIVED`).

## Favoritos y carrito

| Método y ruta | Descripción |
|---|---|
| `GET /favorites` | Lista favoritos del usuario autenticado. |
| `PUT /favorites/:productId` | Añade de forma idempotente un producto activo. |
| `DELETE /favorites/:productId` | Quita un favorito. |
| `GET /cart` | Obtiene o crea el carrito del usuario y calcula subtotal de servidor. |
| `POST /cart/items` | Añade `{ "variantId": "...", "quantity": 1 }`; rechaza más stock del disponible. |
| `PATCH /cart/items/:id` | Reemplaza cantidad, validando stock. |
| `DELETE /cart/items/:id` | Elimina una línea propia. |
| `DELETE /cart` | Vacía las líneas del carrito propio. |

Todos los endpoints de favoritos/carrito requieren Bearer token. No se reciben `price`, `subtotal`, `stock`, `role` ni estado de pago desde el cliente.

## Órdenes y checkout

| Método y ruta | Descripción |
|---|---|
| `POST /orders/checkout` | Convierte el carrito en orden pendiente de pago; requiere header `Idempotency-Key` de 8–191 caracteres. |
| `GET /orders` | Historial de pedidos del usuario autenticado. |
| `GET /orders/:id` | Detalle de pedido propio. |
| `POST /orders/:id/cancel` | Cancela un pedido pendiente y repone inventario. |

Checkout ejecuta una transacción serializable, vuelve a comprobar productos/variantes y descuenta stock de forma condicional. Crea snapshots de nombre, slug, SKU, color, talla y precio de cada línea; después vacía el carrito. La orden queda `PENDING_PAYMENT` con `PENDING_PROVIDER`: no se ha cobrado ni debe mostrarse como pagada. El integrador debe generar un identificador idempotente por intento de checkout y reutilizarlo al reintentar.

## Operación

| Ruta | Descripción |
|---|---|
| `GET /health` | Ejecuta `SELECT 1`; responde `200` si MySQL está disponible y `503` si no. |

No hay endpoint de captura de tarjeta ni de pago confirmado. La pasarela debe integrarse mediante tokenización y webhook autenticado; no envíe PAN, CVV ni estado `PAID` a esta API.
