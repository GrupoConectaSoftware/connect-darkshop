# Manual técnico del backend

Este directorio documenta el backend de `apps/api`. La fuente de verdad de rutas y esquemas HTTP es Swagger/OpenAPI; estos documentos explican el porqué, el modelo operativo y las restricciones que no se aprecian solo desde un endpoint.

| Documento | Lectura recomendada para |
|---|---|
| [Arquitectura](architecture.md) | Entender la estructura, módulos y dependencias. |
| [Decisiones de diseño](decisions.md) | Evaluar las elecciones técnicas y sus consecuencias. |
| [Modelo de datos](data-model.md) | Implementar migraciones, consultas o casos de uso persistentes. |
| [Referencia de API](api-reference.md) | Consumir o ampliar los contratos REST. |
| [Seguridad](security.md) | Revisar autenticación, autorización y operación segura. |
| [Operación y desarrollo](operations.md) | Instalar, configurar, migrar, seedear y desplegar. |
| [Pruebas y calidad](testing.md) | Ejecutar verificaciones y ampliar la cobertura. |

## Alcance actual

El MVP incluye identidad, perfil, avatar, dirección, preferencias, catálogo, tiendas, colecciones, variantes, favoritos, newsletter, carrito y creación/cancelación de pedidos. No incluye pago real, tokenización de tarjetas, recuperación de contraseña, verificación de email, OAuth ni bundles/conjuntos persistentes; requieren proveedor externo o una decisión de producto documentada.

## Tecnologías en uso

| Tecnología | Uso | Motivo de elección |
|---|---|---|
| Node.js 24+ | Runtime. | Plataforma LTS compatible con las dependencias actuales. |
| TypeScript estricto | Código de API, DTOs y scripts. | Detecta contratos incoherentes antes de ejecutar. |
| NestJS 12 + Express | Proceso HTTP modular. | Módulos, DI, validación, Swagger y ecosistema maduro. |
| MySQL 8 | Persistencia relacional única. | Requisito del producto y buen ajuste para relaciones transaccionales. |
| Prisma 7 | Schema, cliente tipado y migraciones. | Reduce desajustes entre modelo y consultas; usa adaptador MySQL. |
| Swagger/OpenAPI | Contrato navegable. | Permite a frontend verificar rutas y DTOs sin leer implementación. |
| class-validator / transformer | Validación y transformación de DTO. | Rechaza entrada no permitida en el límite HTTP. |
| JWT + bcrypt | Acceso y sesiones. | Access breve verificable y refresh revocable sin tokens en claro. |
| Helmet / Throttler | Seguridad HTTP básica. | Cabeceras seguras y protección elemental ante abuso. |

## Convenciones

- La API se versiona bajo `/api/v1` y responde JSON.
- Los importes se expresan en COP y se almacenan como `DECIMAL(12,2)`; los clientes reciben números JSON.
- Las fechas se serializan como ISO-8601.
- Los identificadores son CUID y los recursos navegables usan además `slug`.
- Las colecciones devuelven `data` y `meta`; los fallos pasan por el manejador de errores común.
