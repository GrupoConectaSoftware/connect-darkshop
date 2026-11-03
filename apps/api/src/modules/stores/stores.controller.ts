import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Authenticated, type AuthenticatedRequest } from '../../common/auth.js';
import { UserRole } from '../../generated/prisma/client.js';
import { CreateStoreDto, StoreQueryDto } from './dto.js';
import { StoresService } from './stores.service.js';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly stores: StoresService) {}
  @Get() list(@Query() query: StoreQueryDto): Promise<Record<string, unknown>> { return this.stores.list(query); }
  @Get(':slug') get(@Param('slug') slug: string): Promise<Record<string, unknown>> { return this.stores.get(slug); }
  @Post() @ApiBearerAuth() @Authenticated(UserRole.SELLER)
  create(@Req() request: AuthenticatedRequest, @Body() body: CreateStoreDto): Promise<Record<string, unknown>> { return this.stores.create(request.user.sub, body); }
}
