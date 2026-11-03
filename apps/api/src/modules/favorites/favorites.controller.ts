import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Put, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, type AuthenticatedRequest } from '../../common/auth.js';
import { FavoritesService } from './favorites.service.js';
@ApiTags('Favorites') @ApiBearerAuth() @Authenticated()
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favorites: FavoritesService) {}
  @Get() list(@Req() request: AuthenticatedRequest): Promise<Record<string, unknown>[]> { return this.favorites.list(request.user.sub); }
  @Put(':productId') add(@Req() request: AuthenticatedRequest, @Param('productId') productId: string): Promise<Record<string, unknown>> { return this.favorites.add(request.user.sub, productId); }
  @Delete(':productId') @HttpCode(HttpStatus.NO_CONTENT) async remove(@Req() request: AuthenticatedRequest, @Param('productId') productId: string): Promise<void> { await this.favorites.remove(request.user.sub, productId); }
}
