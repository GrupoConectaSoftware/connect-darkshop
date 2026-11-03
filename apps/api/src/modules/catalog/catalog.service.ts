import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, ProductStatus, UserRole } from '../../generated/prisma/client.js';
import { pageMeta } from '../../common/pagination.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto.js';

export const productInclude = { store: true, category: true, images: { orderBy: { position: 'asc' as const } }, variants: true };
type ProductResult = Prisma.ProductGetPayload<{ include: typeof productInclude }>;
const money = (value: Prisma.Decimal | null): number | null => value === null ? null : Number(value.toString());
export const serializeProduct = (product: ProductResult) => ({
  id: product.id, slug: product.slug, name: product.name, description: product.description, gender: product.gender,
  referenceTags: product.referenceTags, price: money(product.price), compareAtPrice: money(product.compareAtPrice), badge: product.badge,
  category: { slug: product.category.slug, name: product.category.name },
  store: { slug: product.store.slug, name: product.store.name, city: product.store.city },
  images: product.images.map((image) => ({ url: image.url, alt: image.alt, position: image.position })),
  variants: product.variants.map((variant) => ({ id: variant.id, sku: variant.sku, size: variant.size, colorName: variant.colorName, colorHex: variant.colorHex, stock: variant.stock })),
  availableSizes: [...new Set(product.variants.filter((variant) => variant.stock > 0).map((variant) => variant.size))],
  createdAt: product.createdAt, updatedAt: product.updatedAt,
});

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: ProductQueryDto): Promise<Record<string, unknown>> {
    const values = (value?: string) => value?.split(',').map((part) => part.trim()).filter(Boolean) ?? [];
    const category = values(query.category); const stores = values(query.store); const genders = values(query.gender); const sizes = values(query.sizes); const colors = values(query.colors); const references = values(query.references);
    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
      ...(query.q ? { OR: [{ name: { contains: query.q.trim() } }, { description: { contains: query.q.trim() } }] } : {}),
      ...(category.length ? { category: { slug: { in: category } } } : {}),
      ...(stores.length ? { store: { slug: { in: stores } } } : {}),
      ...(genders.length ? { gender: { in: genders as never[] } } : {}),
      ...(references.length ? { referenceTags: { array_contains: references } } : {}),
      ...(sizes.length || colors.length ? { variants: { some: { stock: { gt: 0 }, ...(sizes.length ? { size: { in: sizes } } : {}), ...(colors.length ? { colorName: { in: colors } } : {}) } } } : {}),
      ...((query.minPrice !== undefined || query.maxPrice !== undefined) ? { price: { ...(query.minPrice !== undefined ? { gte: query.minPrice } : {}), ...(query.maxPrice !== undefined ? { lte: query.maxPrice } : {}) } } : {}),
    };
    const orderBy = query.sort === 'price_asc' ? { price: 'asc' as const } : query.sort === 'price_desc' ? { price: 'desc' as const } : { createdAt: 'desc' as const };
    const [total, products] = await this.prisma.$transaction([this.prisma.product.count({ where }), this.prisma.product.findMany({ where, include: productInclude, orderBy, skip: (query.page - 1) * query.limit, take: query.limit })]);
    return { data: products.map(serializeProduct), meta: pageMeta(query.page, query.limit, total) };
  }

  async get(slug: string): Promise<Record<string, unknown>> {
    const product = await this.prisma.product.findFirst({ where: { slug, status: ProductStatus.ACTIVE }, include: productInclude });
    if (!product) throw new NotFoundException('Producto no encontrado.');
    return serializeProduct(product);
  }

  async categories(): Promise<Record<string, unknown>[]> {
    const categories = await this.prisma.category.findMany({ orderBy: { name: 'asc' }, include: { _count: { select: { products: { where: { status: ProductStatus.ACTIVE } } } } } });
    return categories.map((category) => ({ slug: category.slug, name: category.name, productsCount: category._count.products }));
  }

  async create(ownerId: string, role: UserRole, input: CreateProductDto): Promise<Record<string, unknown>> {
    const store = await this.ownerStore(ownerId, role);
    const category = await this.prisma.category.findUnique({ where: { slug: input.categorySlug } });
    if (!category) throw new NotFoundException('Categoría no encontrada.');
    const product = await this.prisma.product.create({ data: { storeId: store.id, categoryId: category.id, slug: input.slug, name: input.name, description: input.description, gender: input.gender, price: input.price, compareAtPrice: input.compareAtPrice, badge: input.badge, referenceTags: input.referenceTags, images: { create: input.images.map((image, position) => ({ ...image, position })) }, variants: { create: input.variants } }, include: productInclude });
    return serializeProduct(product);
  }

  async update(ownerId: string, role: UserRole, id: string, input: UpdateProductDto): Promise<Record<string, unknown>> {
    const product = await this.prisma.product.findUnique({ where: { id }, include: { store: true } });
    if (!product) throw new NotFoundException('Producto no encontrado.');
    if (role !== UserRole.ADMIN && product.store.ownerId !== ownerId) throw new ForbiddenException('No puedes modificar productos de otra tienda.');
    const category = await this.prisma.category.findUnique({ where: { slug: input.categorySlug } });
    if (!category) throw new NotFoundException('Categoría no encontrada.');
    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.productImage.deleteMany({ where: { productId: id } });
      await tx.productVariant.deleteMany({ where: { productId: id } });
      return tx.product.update({ where: { id }, data: { categoryId: category.id, slug: input.slug, name: input.name, description: input.description, gender: input.gender, price: input.price, compareAtPrice: input.compareAtPrice, badge: input.badge, referenceTags: input.referenceTags, status: input.status, images: { create: input.images.map((image, position) => ({ ...image, position })) }, variants: { create: input.variants } }, include: productInclude });
    });
    return serializeProduct(updated);
  }

  private async ownerStore(ownerId: string, role: UserRole): Promise<{ id: string }> {
    if (role === UserRole.ADMIN) {
      const store = await this.prisma.store.findFirst({ orderBy: { createdAt: 'asc' } });
      if (!store) throw new NotFoundException('No hay tiendas disponibles.');
      return store;
    }
    const store = await this.prisma.store.findFirst({ where: { ownerId, isActive: true } });
    if (!store) throw new ForbiddenException('El vendedor no tiene una tienda activa.');
    return store;
  }
}
