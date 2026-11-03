import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import Joi from 'joi';
import { AuthModule } from './modules/auth/auth.module.js';
import { CartModule } from './modules/cart/cart.module.js';
import { CatalogModule } from './modules/catalog/catalog.module.js';
import { CollectionsModule } from './modules/collections/collections.module.js';
import { FavoritesModule } from './modules/favorites/favorites.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { NewsletterModule } from './modules/newsletter/newsletter.module.js';
import { OrdersModule } from './modules/orders/orders.module.js';
import { PrismaModule } from './modules/prisma/prisma.module.js';
import { StoresModule } from './modules/stores/stores.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
        PORT: Joi.number().port().default(3000),
        DATABASE_URL: Joi.string().uri({ scheme: ['mysql'] }).required(),
        JWT_ACCESS_SECRET: Joi.string().min(32).required(),
        JWT_ACCESS_TTL: Joi.string().default('15m'),
        JWT_REFRESH_TTL_DAYS: Joi.number().integer().min(1).max(90).default(30),
      }),
    }),
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 120 }]),
    PrismaModule,
    AuthModule,
    CatalogModule,
    CollectionsModule,
    StoresModule,
    FavoritesModule,
    CartModule,
    OrdersModule,
    NewsletterModule,
    HealthModule,
  ],
})
export class AppModule {}
