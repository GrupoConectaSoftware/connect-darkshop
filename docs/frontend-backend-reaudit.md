# Reauditoría completa del frontend

Fecha de reauditoría: 2 de noviembre de 2026. Se inspeccionaron los 161 archivos JavaScript/JSX de `apps/web/src`, sus rutas, formularios, almacenamiento de navegador, constantes y `TODO` explícitos. Este documento reemplaza cualquier interpretación basada solo en que una pantalla sea visualmente atractiva.

## Funcionalidades persistentes confirmadas

| Evidencia frontend | Acción y datos | Backend resultante | Estado |
|---|---|---|---|
| `auth/register`, `login`, `account` | Cuenta, credenciales, rol comprador/vendedor y términos. | Auth, JWT, sesiones revocables. | Implementado |
| `auth/recovery`, `send`, `code`, `identity`, `reset` | Solicitud, envío y validación de códigos, cambio de contraseña. | Requiere proveedor de correo y política de verificación. | Pendiente de proveedor |
| `config/profileSection` | Nombre, email visual, teléfono y foto de avatar. | Perfil, teléfono y `POST /auth/me/avatar` con almacenamiento local validado. Cambiar email requiere flujo de reverificación. | Implementado / email pendiente |
| `config/locationSection` | Dirección de entrega y ciudad. | Dirección predeterminada por usuario. | Implementado |
| `config/preferencesSection` | Estilos, categorías y marcas. | Preferencias por usuario. | Implementado |
| `config/paymentSection` | Captura local de PAN, vencimiento y CVV. | No se almacenan ni transmiten datos de tarjeta; requiere tokenización de Wompi/proveedor. | Pendiente de proveedor |
| `clothes`, `preview`, `ProductCard` | Catálogo, filtros, detalle, color, talla, cantidad y stock. | Categorías, productos, variantes, filtros y stock. | Implementado |
| `stores` | Búsqueda, ciudad, categorías, referencias y detalle de tienda. | Tiendas y filtros. | Implementado |
| `collection` | Colecciones navegables, productos y compartir mediante API nativa del navegador. | Colecciones y relaciones con productos. Compartir no necesita servidor. | Implementado |
| `favorites` | Añadir/quitar favoritos. | Favoritos de usuario. | Implementado |
| `shopping` | Añadir, editar cantidad, eliminar y vaciar carrito. | Carrito persistente y `DELETE /cart`. | Implementado |
| `shopping/calculateComponent` | Botón «Continuar con el pago» navega a `/checkout`. | Checkout, pedidos, snapshots, idempotencia, reserva de stock y cancelación. | Implementado, pago pendiente |
| `homepages/NewsletterSection` | Email de suscripción; TODO de endpoint explícito. | Suscripción idempotente. | Implementado |
| `logged/sections/setSection` | Conjuntos con 3 prendas, selección única talla/color y añadido local a carrito. | No hay identidad estable de las prendas, reglas de precio de bundle ni modelo de publicación vendedor; no se puede persistir fielmente sin decidir si es SKU compuesto o tres líneas. | Pendiente de definición |

## Elementos sin necesidad de backend propia

| Evidencia | Motivo |
|---|---|
| Carruseles, zoom, tabs, filtros de galería y marquillas de marca | Estado exclusivamente de presentación. |
| `PqrComponent` | FAQ estática y enlace `mailto`; no es formulario de PQR. |
| Share de producto/colección/conjunto | Usa `navigator.share`/clipboard; no registra actividad. |
| Buscador global del navbar | No tiene callback de submit, navegación ni TODO de datos; es un campo visual no conectado. |
| Legal, footer, ayudas, promociones y ventajas | Texto o navegación estática. |
| Galería, videos y studio de la marca | Contenido editorial estático, no CMS visible. |

## Navegación sin pantalla funcional asociada

`/account/orders`, `/account/reports`, `/account/payment-methods`, `/account/shipping`, `/account/settings`, `/help` y `/checkout` se enlazan desde menús o botones, pero no tienen rutas específicas en `App.jsx`; actualmente caen en la página por defecto. El backend ya ofrece pedidos, dirección y preferencias para las futuras pantallas, pero no se modifica el frontend por la restricción del proyecto. Reportes, ayuda y métodos de pago tokenizados requieren una definición de producto/proveedor.

## Conclusión de alcance

No quedan flujos persistentes confirmados sin una contraparte backend salvo: recuperación/verificación de identidad (bloqueada por proveedor de correo), tokenización/pago real (bloqueado por proveedor Wompi) y conjuntos/bundles (bloqueado por decisión de producto sobre precio, SKU y stock). Estos límites están documentados, no se simulan como funcionalidad completada.
