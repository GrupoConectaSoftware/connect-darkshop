# Arquitectura backend

El repositorio usa una estructura de aplicaciones explícita: `apps/web` contiene el frontend React+Vite original; `apps/api` contiene el monolito NestJS con una base MySQL 8 y Prisma 7. Los límites son: Auth (usuario, onboarding y sesiones), Catalog (categorías, productos, imágenes y variantes), Stores (propiedad de tienda), Collections, Favorites, Cart, Orders y Newsletter. `PrismaService` es infraestructura común; ningún controlador accede a Prisma directamente.

Las cantidades monetarias se almacenan en `DECIMAL(12,2)` con moneda única COP. El carrito vuelve a leer el stock y calcula el subtotal en el servidor; no acepta precio ni total del cliente. Las variantes tienen SKU único y combinación única producto/talla/color. Un vendedor solo puede editar sus productos y crear una tienda; el guard JWT aplica los roles.

Los refresh tokens se generan aleatoriamente, se guardan como hash bcrypt, tienen expiración y se revocan en logout o rotación. Las contraseñas también usan bcrypt (coste 12). La API incorpora validación por DTO, CORS configurable, Helmet, limitación básica de solicitudes y errores JSON sin trazas.

Para extraer un módulo más adelante: Catalog depende de la lectura de `Store` para propiedad y presentación; convierta esa consulta en un puerto. Cart depende de variantes/precio de Catalog; mantenga ese contrato como una lectura de catálogo. Auth es el emisor de identidad. No existen colas, bases por módulo ni comunicación distribuida.

Orders crea snapshots de nombre, precio y variante y reserva/descuenta stock dentro de una transacción serializable e idempotente. No existe un módulo Payments: la orden solo puede crearse como `PENDING_PAYMENT`; una pasarela futura debe quedar detrás de un puerto de proveedor, procesar webhooks autenticados y ser la única que transicione a `PAID`. Ningún cliente puede fijar ese estado.
