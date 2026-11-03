import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { PaginationQueryDto } from '../../common/pagination.js';

export class StoreQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() @MaxLength(120) q?: string;
  @IsOptional() @IsString() @MaxLength(100) city?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() reference?: string;
}

export class CreateStoreDto {
  @IsString() @MinLength(3) @MaxLength(191) slug!: string;
  @IsString() @MinLength(2) @MaxLength(120) name!: string;
  @IsOptional() @IsString() @MaxLength(180) subtitle?: string;
  @IsOptional() @IsString() @MaxLength(10_000) description?: string;
  @IsString() @MinLength(2) @MaxLength(100) city!: string;
  @IsOptional() @IsUrl({ require_tld: false }) @MaxLength(500) imageUrl?: string;
}
