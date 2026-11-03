# Connect Darkshop API

Monolito modular NestJS para el marketplace. Requiere Node.js 24+ y MySQL 8; Docker Desktop es opcional.

## MySQL local (sin Docker)

Instala e inicia MySQL 8 como servicio local. Copia `.env.example` a `.env`, sustituye `MYSQL_ADMIN_URL` por las credenciales administrativas locales y ejecuta:

```powershell
npm install
npm run db:local:init
npm run prisma:deploy
$env:SEED_SELLER_PASSWORD = 'una-clave-local-distinta-y-segura'
npm run prisma:seed
npm run start:dev
```

`db:local:init` crea la base y el usuario definidos en `DATABASE_URL`, exclusivamente usando la cuenta indicada en `MYSQL_ADMIN_URL`. No se ejecuta al iniciar la API ni se necesita en Docker.

## MySQL con Docker

```powershell
Copy-Item .env.example .env
docker compose -f ../../docker-compose.yml up -d mysql
npm install
npm run prisma:generate
npm run prisma:deploy
$env:SEED_SELLER_PASSWORD = 'una-clave-local-distinta-y-segura'
npm run prisma:seed
npm run start:dev
```

La API queda en `http://localhost:3000/api/v1`; Swagger en `http://localhost:3000/docs`.

Comandos de comprobación: `npm run build`, `npm test`, `npm run lint`. Para crear una migración de desarrollo: `npm run prisma:migrate -- --name nombre-del-cambio`. Las pruebas de integración con MySQL se deben ejecutar después de levantar MySQL, local o mediante Docker. Este entorno no incluye Docker.

No use el usuario y contraseña de seed fuera de un entorno local. Consulte `../../docs/frontend-integration.md` y `../../docs/architecture.md` antes de conectar la interfaz.
