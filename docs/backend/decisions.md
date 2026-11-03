# Decisiones de diseño (ADR)

Las decisiones se registran para que cambios futuros puedan evaluar explícitamente sus consecuencias.

## ADR-001 — Monolito modular

**Estado:** aceptada.  
**Contexto:** el producto es un MVP y el frontend muestra pocas capacidades conectables.  
**Decisión:** una aplicación NestJS y una sola base MySQL, organizada por capacidades.  
**Consecuencias:** despliegue y depuración simples; los módulos mantienen límites para una futura extracción, pero no se resuelven fallos distribuidos porque no existen servicios distribuidos.

## ADR-002 — NestJS con Express y TypeScript estricto

**Estado:** aceptada.  
**Contexto:** se requieren API REST, DTOs, inyección de dependencias, Swagger y un ecosistema estable.  
**Decisión:** NestJS 12 sobre Express con TypeScript estricto y decoradores de validación.  
**Consecuencias:** estructura homogénea y documentación automática; el equipo debe mantener controladores pequeños y evitar ocultar reglas de negocio en decoradores.

## ADR-003 — MySQL 8 y Prisma 7

**Estado:** aceptada.  
**Contexto:** MySQL es un requisito, se necesitan migraciones reproducibles y tipos de base de datos.  
**Decisión:** Prisma 7, schema versionado y adaptador MariaDB para el protocolo MySQL.  
**Consecuencias:** consultas tipadas y migraciones; cualquier cambio persistente exige modificar schema, generar cliente, crear migración y probarla. No se usa sincronización destructiva.

## ADR-004 — Variantes como unidad de inventario

**Estado:** aceptada.  
**Contexto:** el frontend permite elegir talla y color.  
**Decisión:** `ProductVariant` representa la combinación talla/color, tiene SKU único y stock propio.  
**Consecuencias:** el carrito recibe `variantId`, no talla/color libres. La combinación producto+talla+color es única.

## ADR-005 — COP y `DECIMAL(12,2)` para dinero

**Estado:** aceptada.  
**Contexto:** los mocks del frontend se muestran en pesos colombianos y no hay requerimiento multidivisa.  
**Decisión:** una moneda única COP y `DECIMAL`, nunca float en persistencia.  
**Consecuencias:** el valor se convierte cuidadosamente a número solo en el borde JSON; añadir múltiples monedas requerirá moneda explícita y reglas de redondeo.

## ADR-006 — JWT corto más refresh tokens con hash

**Estado:** aceptada.  
**Contexto:** se necesita sesión revocable sin guardar contraseñas ni refresh tokens en claro.  
**Decisión:** access JWT configurable (15 min por defecto) y refresh token aleatorio, hasheado con bcrypt, rotado en refresh y revocado en logout.  
**Consecuencias:** autenticación sin estado para acceso y revocación de sesiones almacenada. El cliente debe gestionar refresh token de forma segura.

## ADR-007 — Autorización por rol y recurso

**Estado:** aceptada.  
**Contexto:** compradores, vendedores y administradores tienen límites diferentes.  
**Decisión:** roles se validan en guard y la propiedad se valida dentro del servicio (`store.ownerId`).  
**Consecuencias:** un rol SELLER no puede editar productos ajenos; no basta con ocultar botones. Un administrador no se crea por registro público.

## ADR-008 — Órdenes sin proveedor de pago simulado

**Estado:** aceptada.  
**Contexto:** el carrito navega explícitamente a `/checkout`, pero no hay credenciales ni contrato Wompi.  
**Decisión:** crear la orden en estado `PENDING_PAYMENT`/`PENDING_PROVIDER`, con snapshot, idempotencia y reserva atómica de inventario. No se captura tarjeta, ni se marca pago exitoso.  
**Consecuencias:** checkout es consistente y cancelable; integrar Wompi exige un puerto de proveedor, webhook autenticado y transición segura a `PAID`.

## ADR-009 — MySQL local y Docker como alternativas

**Estado:** aceptada.  
**Contexto:** el desarrollo no debe depender de Docker.  
**Decisión:** `DATABASE_URL` permite apuntar a MySQL local; `db:local:init` prepara base/usuario con una cuenta admin. Docker Compose queda como opción reproducible.  
**Consecuencias:** ambos modos usan las mismas migraciones y seeds. `MYSQL_ADMIN_URL` solo se necesita para inicializar instalación local.
