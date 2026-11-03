# Arquitectura del backend

## Contexto

`apps/api` es un monolito modular NestJS. Expone un único proceso HTTP con Express, Swagger y una sola base de datos MySQL 8. Prisma 7 es la capa de acceso a datos y emplea el adaptador `@prisma/adapter-mariadb`, compatible con el protocolo de MySQL. No hay microservicios, mensajería, caché distribuido, API Gateway ni bases de datos por módulo.

```text
Cliente HTTP / apps-web
        │
        ▼
 NestJS: middleware → validación → controller → servicio → Prisma
        │                         │                │
        │                         │                └─ MySQL 8
        │                         └─ reglas y autorización de recurso
        ├─ Swagger /docs
        └─ Health /api/v1/health
```

## Estructura física

```text
apps/api/
  src/common/             Guard JWT, paginación y filtro de excepciones
  src/modules/
    auth/                 Identidad, sesiones y perfil
    catalog/              Categorías, productos, imágenes y variantes
    stores/               Tiendas y propiedad de publicaciones
    favorites/            Favoritos por usuario
    cart/                 Carrito y comprobación de disponibilidad
    orders/               Checkout transaccional y snapshots de pedido
    collections/          Curaduría de productos
    newsletter/           Suscripciones de email
    health/               Disponibilidad de proceso y base de datos
    prisma/               Cliente Prisma compartido
  prisma/                 Schema, migración inicial y seed
  scripts/                Inicialización opcional de MySQL local
  .env.example            Configuración sin credenciales reales
```

`Controller` traduce HTTP a DTO; `Service` contiene reglas de negocio y coordina transacciones; `PrismaService` concentra el acceso a persistencia. Ningún controlador consulta Prisma de manera directa. Los DTO no exponen modelos internos de Prisma en los contratos públicos.

## Módulos y límites

| Módulo | Responsabilidad | Dependencias funcionales |
|---|---|---|
| Auth | Registro, login, tokens, sesiones, perfil y roles. | Prisma, JWT, bcrypt. |
| Catalog | Lectura pública y administración de productos, variantes e imágenes. | Prisma; consulta la tienda para comprobar propiedad. |
| Stores | Lectura y creación de tiendas. | Prisma; incluye productos activos al mostrar una tienda. |
| Favorites | Relación usuario-producto, idempotente por clave compuesta. | Prisma y catálogo activo. |
| Cart | Carrito de usuario, líneas, subtotal y validación de stock. | Prisma; lee variante y producto activo. |
| Orders | Checkout, reserva atómica, snapshots y cancelación. | Prisma; consume el carrito y las variantes. |
| Collections | Listas curatoriales de productos activos. | Prisma y catálogo. |
| Newsletter | Suscripción de email idempotente. | Prisma. |
| Health | Comprueba conectividad real mediante `SELECT 1`. | Prisma. |

Los módulos se comunican mediante servicios públicos o relaciones de lectura explícitas. Si Catalog o Cart se extraen más adelante, su dependencia de datos de Store/Catalog debe pasar a un puerto de lectura; no se debe compartir acceso indiscriminado a repositorios internos.

## Flujo de una petición protegida

1. Helmet y CORS se aplican antes del enrutamiento.
2. `ValidationPipe` transforma, elimina campos no declarados y rechaza campos inesperados.
3. `JwtAuthGuard` lee `Authorization: Bearer <accessToken>`, valida firma/expiración y adjunta `sub`, `email` y `role` al request.
4. El guard comprueba `@Roles` cuando existe; el servicio verifica además propiedad del recurso cuando aplica.
5. El servicio usa Prisma y devuelve un DTO/objeto público.
6. `ApiExceptionFilter` normaliza la respuesta de error y no expone trazas internas.

## Evolución prevista

El siguiente incremento funcional es Payments: debe ser un puerto de proveedor con tokenización, webhooks autenticados e idempotencia; nunca un estado enviado libremente por el cliente. Los pedidos actuales ya toman snapshots y reservan stock dentro de una transacción. Las imágenes de avatar usan almacenamiento local validado para desarrollo; una futura carga de media de catálogo debe pasar por un puerto de almacenamiento de objetos.
