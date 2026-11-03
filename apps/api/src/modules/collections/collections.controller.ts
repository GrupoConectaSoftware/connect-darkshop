import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CollectionsService } from './collections.service.js';
@ApiTags('Collections') @Controller('collections')
export class CollectionsController {
  constructor(private readonly collections: CollectionsService) {}
  @Get() list(): Promise<Record<string, unknown>[]> { return this.collections.list(); }
  @Get(':slug') get(@Param('slug') slug: string): Promise<Record<string, unknown>> { return this.collections.get(slug); }
}
