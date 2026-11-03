# Operación y desarrollo

## Requisitos

- Node.js 24 o superior.
- npm 11 o superior.
- MySQL 8 disponible localmente **o** Docker Desktop para el servicio opcional.
- No se requiere Docker para ejecutar la API contra un MySQL instalado localmente.

## Instalación inicial

Desde la raíz:

```powershell
npm --prefix apps/api install
Copy-Item apps/api/.env.example apps/api/.env
```

Genere una clave segura para `JWT_ACCESS_SECRET` y ajuste `DATABASE_URL` antes de continuar.

### Opción A: MySQL local

Inicie el servicio MySQL local y configure `MYSQL_ADMIN_URL` con una cuenta administradora local. Después:

```powershell
npm --prefix apps/api run db:local:init
npm --prefix apps/api run prisma:deploy
$env:SEED_SELLER_PASSWORD = 'una-clave-local-distinta-y-segura'
npm --prefix apps/api run prisma:seed
npm --prefix apps/api run start:dev
```

`db:local:init` crea la base y el usuario de `DATABASE_URL`; no se ejecuta como parte del arranque normal.

### Opción B: Docker Compose

```powershell
docker compose up -d mysql
npm --prefix apps/api run prisma:deploy
$env:SEED_SELLER_PASSWORD = 'una-clave-local-distinta-y-segura'
npm --prefix apps/api run prisma:seed
npm --prefix apps/api run start:dev
```

El servicio MySQL queda en `localhost:3306`; API en `localhost:3000`; Swagger en `http://localhost:3000/docs`.

Los avatares locales se guardan en `apps/api/uploads/avatars` cuando la API se inicia desde `apps/api`; la carpeta se excluye de Git. En un despliegue con disco efímero, use almacenamiento de objetos antes de habilitar esta función para usuarios reales.

## Comandos

| Comando desde `apps/api` | Finalidad |
|---|---|
| `npm run start:dev` | API en modo watch. |
| `npm run build` | Genera cliente Prisma y compila NestJS. |
| `npm run start` | Ejecuta `dist/src/main.js`. |
| `npm run prisma:generate` | Regenera cliente Prisma tras cambiar schema. |
| `npm run prisma:migrate -- --name nombre` | Crea y aplica una migración local de desarrollo. |
| `npm run prisma:deploy` | Aplica migraciones ya versionadas. |
| `npm run prisma:seed` | Inserta datos de demostración idempotentes. |
| `npm run db:local:init` | Prepara MySQL local desde URLs de entorno. |
| `npm test` / `npm run lint` | Pruebas y chequeo estático. |

## Migraciones

En desarrollo, cambie `schema.prisma`, regenere cliente, cree migración con nombre descriptivo y revise el SQL antes de versionarlo. En entornos compartidos o despliegue use exclusivamente `prisma:deploy`; no use `migrate dev`, `db push`, `reset` ni comandos destructivos. Haga backup antes de migraciones que transformen o eliminen datos.

## Seed

El seed es repetible y solo crea datos demostrativos. Requiere definir `SEED_SELLER_PASSWORD`; no use una cuenta, nombre, stock ni precio del seed como información real. En producción normalmente no se ejecuta.

## Diagnóstico

1. `GET /api/v1/health` devuelve `503`: confirme que MySQL esté iniciado, que la base exista, y que `DATABASE_URL` sea válida.
2. Prisma no genera: ejecute `npm run prisma:generate` desde `apps/api` y confirme Node 24+.
3. CORS falla desde el frontend: añada exactamente el origen de Vite a `CORS_ORIGINS`, por ejemplo `http://localhost:5173`.
4. Error de JWT al arrancar: configure un `JWT_ACCESS_SECRET` de 32 o más caracteres.
