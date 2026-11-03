# Connect Darkshop

Repositorio organizado como un monorepo ligero: cada aplicación conserva su ciclo de vida y dependencias, sin introducir una plataforma de monorepo adicional.

```text
apps/
  web/       Frontend React + Vite original, preservado sin cambios internos
  api/       Backend NestJS modular + Prisma
docs/        Auditoría, arquitectura e integración de la API
docker-compose.yml  MySQL 8 opcional para desarrollo
```

## Desarrollo

El frontend y el backend se instalan y ejecutan de forma independiente:

```powershell
npm --prefix apps/web install
npm --prefix apps/web run dev

npm --prefix apps/api install
npm --prefix apps/api run start:dev
```

Atajos disponibles desde la raíz: `npm run dev:web`, `npm run dev:api`, `npm run build:web`, `npm run build:api` y `npm run test:api`.

El backend puede usar MySQL local o Docker; consulte [la guía del backend](apps/api/README.md). La interfaz no se conecta todavía a la API por diseño: esa integración está descrita en [docs/frontend-integration.md](docs/frontend-integration.md). El [índice técnico del backend](docs/backend/README.md) reúne arquitectura, decisiones, datos, seguridad, operación, pruebas y contratos.
