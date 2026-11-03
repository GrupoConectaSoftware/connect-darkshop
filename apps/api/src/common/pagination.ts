import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 24;
}

export function pageMeta(page: number, limit: number, total: number): { page: number; limit: number; total: number; totalPages: number } {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}
