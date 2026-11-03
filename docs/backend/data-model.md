# Modelo de datos

El esquema ejecutable está en `apps/api/prisma/schema.prisma`; la migración inicial se encuentra en `apps/api/prisma/migrations`. Este documento explica las relaciones y restricciones relevantes.

```text
User 1 ── * Session
User 1 ── 0..1 Cart 1 ── * CartItem * ── 1 ProductVariant
User 1 ── * Order 1 ── * OrderItem * ── 1 ProductVariant
User 1 ── * UserAddress     User 1 ── 0..1 UserPreference
User 1 ── * Favorite * ── 1 Product
User 1 ── * Store 1 ── * Product 1 ── * ProductImage
                              │
                              └──────── 1 Category
                              └──────── * ProductVariant
```

## Entidades

| Entidad | Datos relevantes | Integridad |
|---|---|---|
| User | email, hash, nombre, teléfono, ciudad, rol, aceptación de términos. | Email único; rol indexado; no se persiste contraseña en claro. |
| Session | hash de refresh token, expiración y revocación. | Cascade al borrar usuario; índice usuario+expiración. |
| Store | dueño, slug, nombre, ciudad, presentación y estado. | Slug/nombre únicos; dueño restringido. |
| Category | slug y nombre. | Ambos únicos. |
| Product | tienda, categoría, presentación, género, etiquetas, precio, estado. | Slug único; índices por tienda/categoría/género/precio y estado. |
| ProductImage | URL, alt y posición. | Posición única por producto; cascade al borrar producto. |
| ProductVariant | SKU, talla, color, stock. | SKU único y producto+talla+color único. |
| Favorite | usuario y producto. | Clave primaria compuesta: un favorito por usuario/producto. |
| Cart / CartItem | carrito por usuario, variante y cantidad. | Un carrito por usuario; una línea por carrito/variante. |
| Order / OrderItem | pedido, estado de pago y snapshots de líneas. | Clave de idempotencia única; precio/nombre/SKU históricos y stock reservado. |
| UserAddress / UserPreference | dirección predeterminada y gustos de onboarding. | Dirección ligada al usuario; preferencia uno a uno. |
| NewsletterSubscription | email suscrito. | Email único; reactivar suscripción es idempotente. |
| Collection / ProductCollection | curaduría y orden de productos. | Slug/nombre de colección únicos; relación muchos a muchos. |

## Reglas de ciclo de vida

- Un producto público debe estar `ACTIVE`; `DRAFT` y `ARCHIVED` no aparecen en los listados públicos.
- El borrado de producto elimina imágenes, favoritos y líneas de carrito relacionadas; las variantes no se eliminan si una línea las referencia mediante la relación restrictiva.
- La venta no se descuenta al añadir al carrito: se comprueba stock al añadir o cambiar cantidad. Checkout descuenta/reserva inventario de forma condicional en una transacción serializable.
- El precio de cada línea se toma de `Product.price` al serializar el carrito. Al crear `OrderItem` se persisten snapshots de producto, slug, SKU, talla, color y precio para conservar el historial.

## Migraciones y seeds

Nunca use `prisma db push` como mecanismo operativo ni elimine tablas para aplicar cambios. El flujo es: ajustar schema → `npm run prisma:generate` → `npm run prisma:migrate -- --name descripcion` → revisar SQL → aplicar con `npm run prisma:deploy`.

El seed crea categorías y datos explícitamente etiquetados como demostración (`DARK Demo`, `seed-seller@example.test`). No representan vendedores, inventario ni precios reales.
