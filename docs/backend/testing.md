# Pruebas y calidad

## Verificaciones disponibles

| Comando | Qué comprueba | Estado al crear esta documentación |
|---|---|---|
| `npm run lint` | TypeScript estricto sin emitir archivos. | Ejecutado correctamente. |
| `npm test` | Pruebas Jest unitarias. | Ejecutado correctamente: 3 pruebas. |
| `npm run build` | Generación Prisma y compilación NestJS. | Ejecutado correctamente. |
| `npx prisma validate` | Validez sintáctica y relacional del schema. | Ejecutado correctamente. |
| `npm --prefix apps/web run build` | Integridad de compilación del frontend preservado. | Ejecutado correctamente. |

Las pruebas actuales cubren tres reglas de alto riesgo independientes de infraestructura: el registro público no puede crear administradores, el carrito rechaza cantidades superiores al stock de la variante y checkout no permite crear una orden con un carrito vacío.

## Cobertura pendiente

No se ejecutaron pruebas de persistencia o HTTP contra MySQL porque el entorno de implementación no tiene Docker ni una instancia MySQL disponible. No se afirma esa cobertura como ejecutada. Al disponer de MySQL, añada pruebas de integración que apliquen migraciones a una base efímera y cubran:

1. Registro, login, refresh, logout y acceso a `/auth/me`.
2. Rechazo de token expirado, ruta protegida sin token y elevación de rol.
3. Propiedad: vendedor A no puede actualizar producto de vendedor B.
4. Filtros/paginación de catálogo y visibilidad exclusiva de `ACTIVE`.
5. Crear/modificar producto con variantes y restricciones SKU/combinación.
6. Checkout concurrente, reintento con la misma clave de idempotencia, cambio de stock y reposición al cancelar.
7. `GET /health` en estado saludable y no disponible.

## Criterio para cambios

- Una regla nueva en servicio requiere prueba unitaria de éxito y rechazo.
- Un endpoint nuevo requiere validar DTO, autenticación/autorización y respuesta HTTP mediante integración cuando exista base de pruebas.
- Cada migración debe revisarse como SQL además del schema y probarse sobre una copia representativa antes de producción.
- No se debe reducir cobertura ni desactivar validaciones para hacer pasar una prueba.
