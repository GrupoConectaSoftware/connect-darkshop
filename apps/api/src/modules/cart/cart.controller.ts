import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, type AuthenticatedRequest } from '../../common/auth.js';
import { AddCartItemDto, UpdateCartItemDto } from './dto.js';
import { CartService } from './cart.service.js';
@ApiTags('Cart') @ApiBearerAuth() @Authenticated() @Controller('cart')
export class CartController {
  constructor(private readonly cart: CartService) {}
  @Get() get(@Req() request: AuthenticatedRequest): Promise<Record<string, unknown>> { return this.cart.get(request.user.sub); }
  @Post('items') add(@Req() request: AuthenticatedRequest, @Body() body: AddCartItemDto): Promise<Record<string, unknown>> { return this.cart.add(request.user.sub, body.variantId, body.quantity); }
  @Patch('items/:id') update(@Req() request: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateCartItemDto): Promise<Record<string, unknown>> { return this.cart.update(request.user.sub, id, body.quantity); }
  @Delete('items/:id') @HttpCode(HttpStatus.NO_CONTENT) async remove(@Req() request: AuthenticatedRequest, @Param('id') id: string): Promise<void> { await this.cart.remove(request.user.sub, id); }
  @Delete() @HttpCode(HttpStatus.NO_CONTENT) async clear(@Req() request: AuthenticatedRequest): Promise<void> { await this.cart.clear(request.user.sub); }
}
