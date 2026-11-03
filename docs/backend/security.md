# Seguridad

## Configuración de secretos

No se versionan archivos `.env`. Parta de `apps/api/.env.example`, reemplace valores locales y mantenga secretos en el gestor apropiado del entorno de despliegue. El arranque valida `DATABASE_URL` y `JWT_ACCESS_SECRET`; este último debe tener al menos 32 caracteres.

| Variable | Uso | Recomendación |
|---|---|---|
| `DATABASE_URL` | Conexión de ejecución Prisma/MySQL. | Usuario con privilegios mínimos sobre la base de la aplicación. |
| `MYSQL_ADMIN_URL` | Solo `db:local:init`. | No usar en ejecución de API ni en producción. |
| `JWT_ACCESS_SECRET` | Firma de access tokens. | Aleatorio, 32+ caracteres, rotación controlada. |
| `JWT_ACCESS_TTL` | Duración JWT. | Mantener breve; 15 min por defecto. |
| `JWT_REFRESH_TTL_DAYS` | Expiración de sesión. | 1–90 días. |
| `CORS_ORIGINS` | Orígenes permitidos separados por coma. | Definir el dominio exacto por ambiente. |
| `UPLOAD_MAX_FILE_SIZE` | Tamaño máximo del avatar. | 5 MiB por defecto; ajustar según la política de media. |

## Autenticación y sesión

- Contraseñas: bcrypt con coste 12; no se devuelven ni se registran.
- Access token: JWT firmado, con `sub`, `email`, `role` y expiración.
- Refresh token: aleatorio, almacenado solo como hash bcrypt. Al refrescarse, la sesión previa se revoca y se emite otra.
- Logout: revoca sesiones activas del usuario. Un access token ya emitido sigue siendo válido hasta expirar; este es el compromiso de JWT corto.
- Registro: impide crear ADMIN por la ruta pública y exige aceptación explícita de términos.

## Autorización

`JwtAuthGuard` comprueba identidad y roles declarados. Las operaciones de recursos verifican propiedad en el servicio: un SELLER solo actualiza un producto cuya tienda le pertenece; las líneas y favoritos se filtran por `userId` del token. Los IDs del request no otorgan permiso por sí mismos.

## Protección de entrada y transporte

- `ValidationPipe` permite solo propiedades declaradas y rechaza las inesperadas.
- DTOs validan emails, longitudes, enum, URL, cantidades, SKU y hex de color.
- Prisma parametriza operaciones y evita SQL concatenado en los casos de uso de la API.
- El avatar acepta solo MIME JPEG, PNG o WebP, limita tamaño y genera un nombre de archivo propio; no conserva la extensión declarada por el cliente. Los archivos se sirven bajo `/uploads/avatars/` y ese directorio no se versiona.
- Helmet aplica cabeceras HTTP de seguridad. CORS es configurable.
- `@nestjs/throttler` limita la aplicación a 120 solicitudes por minuto por defecto. Para producción con múltiples instancias, cambie el almacenamiento en memoria por uno compartido antes de escalar horizontalmente.
- Sirva la API exclusivamente por HTTPS detrás del proxy/balanceador de producción y configure su terminación TLS allí.

## Registro y errores

El filtro global entrega errores con estructura consistente y evita trazas internas al cliente. No añada tokens, hashes, contraseñas, URLs administrativas ni cuerpos sensibles a logs. La observabilidad estructurada y alertas son una mejora pendiente antes de producción.

## Riesgos y acciones previas a producción

1. Añadir recuperación de contraseña con token de un uso, hash, expiración y proveedor de email real.
2. Definir política de sesión por dispositivo y revocación individual, si el producto la necesita.
3. Implementar rate limiting distribuido si se despliega más de una instancia.
4. Migrar avatar a almacenamiento de objetos y añadir inspección de contenido/antivirus antes de aceptar media binaria a escala o de exponer subida de productos.
5. Ejecutar análisis de dependencias, escaneo de secretos, HTTPS, backups y usuario MySQL de privilegio mínimo en CI/CD.
