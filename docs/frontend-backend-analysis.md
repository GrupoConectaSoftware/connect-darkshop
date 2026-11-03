# Auditoría frontend → backend

Auditoría realizada sobre el commit `c41aa2d6610a815bb299c38fae3987515256b3b8`. El frontend se trasladó íntegramente a `apps/web` sin modificar sus archivos internos ni sus rutas relativas. Los datos de catálogo, tiendas, favoritos y carrito son mocks/almacenamiento del navegador; no se conectaron. Se verificaron 268 hashes SHA-256 antes y después del traslado: el frontend quedó intacto.

| Pantalla / evidencia | Acción | Datos y regla | Módulo / endpoint | Evidencia |
|---|---|---|---|---|
| `clothes/clothes.jsx`, `clothesFilter.jsx` | Explorar y filtrar catálogo | producto, categoría, género, talla, color, estilo, precio; paginación | Catalog · `GET /products`, `GET /categories` | Confirmado |
| `preview/preview.jsx`, `descriptionComponents.jsx` | Ver producto, elegir color/talla y cantidad | imágenes, variante, stock por combinación, precio del servidor | Catalog · `GET /products/:slug` | Confirmado |
| `stores/stores.jsx`, `storesFiltrer.jsx` | Buscar/filtrar tiendas | nombre, ciudad, categoría, referencia y conteo de productos | Stores · `GET /stores`, `GET /stores/:slug` | Confirmado |
| `ProductCard.jsx`, `favoritesStorage.js`, `favorites/favorite.jsx` | Guardar/quitar favorito | usuario autenticado y producto activo; único por usuario | Favorites · `GET/PUT/DELETE /favorites` | Confirmado |
| `cartStorage.js`, `shopping/shopping.jsx` | Añadir, cambiar cantidad y quitar carrito | variante, cantidad, inventario y total recalculado en servidor | Cart · `GET /cart`, `POST/PATCH/DELETE /cart/items` | Confirmado |
| `register/formComponents.jsx`, `login/formComponent.jsx` | Registro e inicio de sesión | email único, contraseña segura, roles comprador/vendedor, sesión | Auth · `POST /auth/register`, `/login`, `/refresh`, `/logout` | Confirmado |
| `config/sections/profileSection.jsx` | Guardar perfil y ubicación | nombre, correo visible, teléfono y ciudad | Auth · `GET/PATCH /auth/me` | Confirmado |
| `account/formSelect.jsx`, `brand/brand.jsx` | Perfil vendedor y publicar tienda/producto | vendedor solo administra sus recursos; admin excepcional | Stores/Catalog · `POST /stores`, `POST/PATCH /seller/products` | Inferido |
| `shopping/calculateComponent.jsx` | Botón de finalizar compra muestra aviso | no hay dirección, entrega, pago, ni confirmación visible | No se implementa checkout | Pendiente de definición |
| `recovery`, `identity`, `send`, `reset` | Recuperación/validación visual | proveedor de correo, tokens de un uso y política de verificación | No se implementa sin proveedor/decisión | Pendiente de definición |
| botones Google en login/registro | SSO | proveedor OAuth y consentimiento | No se implementa | Confirmado como “próximamente” |

Los modelos hallados incluyen tiendas, categorías (Camisetas, Chaquetas, Pantalones, Zapatos, Accesorios, Exclusivo), prendas, género, referencias/estilos, precios COP, imagen, colores, tallas e inventario. No se halló una pantalla funcional de administración, entrega ni pago.

La [reauditoría completa](frontend-backend-reaudit.md) se efectuó posteriormente sobre los 161 archivos de `apps/web/src`; identificó checkout, onboarding, newsletter y colecciones como requisitos persistentes y actualiza esta conclusión inicial.
