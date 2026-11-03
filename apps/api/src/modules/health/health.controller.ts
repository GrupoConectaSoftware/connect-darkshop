import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service.js';
@ApiTags('Health') @Controller('health')
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}
  @Get() async get(): Promise<Record<string, string>> { try { await this.prisma.$queryRaw`SELECT 1`; return { status: 'ok', database: 'ok' }; } catch { throw new ServiceUnavailableException('La base de datos no está disponible.'); } }
}
