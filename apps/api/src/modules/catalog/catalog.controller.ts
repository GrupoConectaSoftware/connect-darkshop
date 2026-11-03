import { Body, Controller, Get, Param, Patch, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, type AuthenticatedRequest } from '../../common/auth.js';
import { UserRole } from '../../generated/prisma/client.js';
import { CatalogService } from './catalog.service.js';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto.js';

@ApiTags('Catalog')
@Controller()
export class CatalogController {
  constructor(private readonly catalog: CatalogService) {}
  @Get('products') list(@Query() query: ProductQueryDto): Promise<Record<string, unknown>> { return this.catalog.list(query); }
  @Get('products/:slug') get(@Param('slug') slug: string): Promise<Record<string, unknown>> { return this.catalog.get(slug); }
  @Get('categories') categories(): Promise<Record<string, unknown>[]> { return this.catalog.categories(); }
  @Post('seller/products') @ApiBearerAuth() @Authenticated(UserRole.SELLER, UserRole.ADMIN)
  create(@Req() request: AuthenticatedRequest, @Body() body: CreateProductDto): Promise<Record<string, unknown>> { return this.catalog.create(request.user.sub, request.user.role, body); }
  @Patch('seller/products/:id') @ApiBearerAuth() @Authenticated(UserRole.SELLER, UserRole.ADMIN)
  update(@Req() request: AuthenticatedRequest, @Param('id') id: string, @Body() body: UpdateProductDto): Promise<Record<string, unknown>> { return this.catalog.update(request.user.sub, request.user.role, id, body); }
}
