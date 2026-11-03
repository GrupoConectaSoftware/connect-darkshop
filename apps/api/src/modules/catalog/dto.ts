import { Type } from 'class-transformer';
import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, IsString, IsUrl, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { Gender, ProductStatus } from '../../generated/prisma/client.js';
import { PaginationQueryDto } from '../../common/pagination.js';

export class ProductQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() @MaxLength(120) q?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() store?: string;
  @IsOptional() @IsString() gender?: string;
  @IsOptional() @IsString() sizes?: string;
  @IsOptional() @IsString() colors?: string;
  @IsOptional() @IsString() references?: string;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) minPrice?: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) maxPrice?: number;
  @IsOptional() @IsEnum(['newest', 'price_asc', 'price_desc']) sort?: 'newest' | 'price_asc' | 'price_desc';
}

export class VariantDto {
  @IsString() @Matches(/^[A-Za-z0-9_-]{3,100}$/) sku!: string;
  @IsString() @MaxLength(20) size!: string;
  @IsString() @MaxLength(50) colorName!: string;
  @Matches(/^#[0-9A-Fa-f]{6}$/) colorHex!: string;
  @Type(() => Number) @IsInt() @Min(0) @Max(1_000_000) stock!: number;
}

export class ImageDto {
  @IsUrl({ require_tld: false }) @MaxLength(500) url!: string;
  @IsOptional() @IsString() @MaxLength(200) alt?: string;
}

export class CreateProductDto {
  @IsString() @MinLength(3) @MaxLength(191) slug!: string;
  @IsString() @MinLength(3) @MaxLength(180) name!: string;
  @IsString() @MinLength(10) @MaxLength(10_000) description!: string;
  @IsString() @MaxLength(191) categorySlug!: string;
  @IsEnum(Gender) gender!: Gender;
  @Type(() => Number) @IsInt() @Min(0) price!: number;
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) compareAtPrice?: number;
  @IsOptional() @IsString() @MaxLength(80) badge?: string;
  @IsOptional() @IsArray() @ArrayMaxSize(12) @IsString({ each: true }) @MaxLength(50, { each: true }) referenceTags?: string[];
  @IsArray() @ArrayMaxSize(8) @ValidateNested({ each: true }) @Type(() => ImageDto) images!: ImageDto[];
  @IsArray() @ArrayMaxSize(100) @ValidateNested({ each: true }) @Type(() => VariantDto) variants!: VariantDto[];
}

export class UpdateProductDto extends CreateProductDto {
  @IsOptional() @IsEnum(ProductStatus) status?: ProductStatus;
}
