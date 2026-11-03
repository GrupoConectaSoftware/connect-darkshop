import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus, Prisma } from '../../generated/prisma/client.js';
import { pageMeta } from '../../common/pagination.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateStoreDto, StoreQueryDto } from './dto.js';

const storeInclude = { _count: { select: { products: { where: { status: ProductStatus.ACTIVE } } } } };
type StoreResult = Prisma.StoreGetPayload<{ include: typeof storeInclude }>;
const serialize = (store: StoreResult) => ({ id: store.id, slug: store.slug, name: store.name, subtitle: store.subtitle, description: store.description, city: store.city, imageUrl: store.imageUrl, productsCount: store._count.products, createdAt: store.createdAt });

@Injectable()
export class StoresService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: StoreQueryDto): Promise<Record<string, unknown>> {
    const where: Prisma.StoreWhereInput = {
      isActive: true,
      ...(query.q ? { OR: [{ name: { contains: query.q.trim() } }, { subtitle: { contains: query.q.trim() } }, { description: { contains: query.q.trim() } }] } : {}),
      ...(query.city ? { city: { contains: query.city.trim() } } : {}),
      ...(query.category ? { products: { some: { status: ProductStatus.ACTIVE, category: { slug: query.category } } } } : {}),
      ...(query.reference ? { products: { some: { status: ProductStatus.ACTIVE, referenceTags: { array_contains: [query.reference] } } } } : {}),
    };
    const [total, stores] = await this.prisma.$transaction([this.prisma.store.count({ where }), this.prisma.store.findMany({ where, include: storeInclude, orderBy: { name: 'asc' }, skip: (query.page - 1) * query.limit, take: query.limit })]);
    return { data: stores.map(serialize), meta: pageMeta(query.page, query.limit, total) };
  }

  async get(slug: string): Promise<Record<string, unknown>> {
    const store = await this.prisma.store.findFirst({ where: { slug, isActive: true }, include: { ...storeInclude, products: { where: { status: ProductStatus.ACTIVE }, include: { category: true, images: { orderBy: { position: 'asc' } }, variants: true, store: true }, orderBy: { createdAt: 'desc' } } } });
    if (!store) throw new NotFoundException('Tienda no encontrada.');
    const { serializeProduct } = await import('../catalog/catalog.service.js');
    return { ...serialize(store), products: store.products.map(serializeProduct) };
  }

  async create(ownerId: string, input: CreateStoreDto): Promise<Record<string, unknown>> {
    const existing = await this.prisma.store.findFirst({ where: { ownerId } });
    if (existing) throw new ConflictException('Un vendedor solo puede tener una tienda en este MVP.');
    const store = await this.prisma.store.create({ data: { ownerId, ...input }, include: storeInclude });
    return serialize(store);
  }
}
