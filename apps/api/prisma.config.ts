import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // `prisma generate` does not connect to the database. The fallback only lets
    // generation work before the developer creates a local `.env` file.
    url: process.env.DATABASE_URL ?? 'mysql://darkshop:darkshop@localhost:3306/darkshop',
  },
});
