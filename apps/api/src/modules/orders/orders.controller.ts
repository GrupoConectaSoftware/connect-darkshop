import { BadRequestException, Controller, Get, Headers, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { Authenticated, type AuthenticatedRequest } from '../../common/auth.js';
import { OrdersService } from './orders.service.js';
@ApiTags('Orders') @ApiBearerAuth() @Authenticated() @Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}
  @Post('checkout') @ApiHeader({ name: 'Idempotency-Key', required: true })
  checkout(@Req() request: AuthenticatedRequest, @Headers('idempotency-key') key?: string): Promise<Record<string, unknown>> {
    if (!key || key.length < 8 || key.length > 191) throw new BadRequestException('Idempotency-Key debe tener entre 8 y 191 caracteres.');
    return this.orders.checkout(request.user.sub, key);
  }
  @Get() list(@Req() request: AuthenticatedRequest): Promise<Record<string, unknown>[]> { return this.orders.list(request.user.sub); }
  @Get(':id') get(@Req() request: AuthenticatedRequest, @Param('id') id: string): Promise<Record<string, unknown>> { return this.orders.get(request.user.sub, id); }
  @Post(':id/cancel') @HttpCode(HttpStatus.OK) cancel(@Req() request: AuthenticatedRequest, @Param('id') id: string): Promise<Record<string, unknown>> { return this.orders.cancel(request.user.sub, id); }
}
