import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus } from '../../generated/prisma/client.js';
import { productInclude, serializeProduct } from '../catalog/catalog.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}
  async list(): Promise<Record<string, unknown>[]> {
    const collections = await this.prisma.collection.findMany({ where: { isActive: true }, include: { _count: { select: { products: { where: { product: { status: ProductStatus.ACTIVE } } } } } }, orderBy: { name: 'asc' } });
    return collections.map((item) => ({ slug: item.slug, name: item.name, tagline: item.tagline, description: item.description, productsCount: item._count.products }));
  }
  async get(slug: string): Promise<Record<string, unknown>> {
    const collection = await this.prisma.collection.findFirst({ where: { slug, isActive: true }, include: { products: { where: { product: { status: ProductStatus.ACTIVE } }, include: { product: { include: productInclude } }, orderBy: { position: 'asc' } } } });
    if (!collection) throw new NotFoundException('Colección no encontrada.');
    return { slug: collection.slug, name: collection.name, tagline: collection.tagline, description: collection.description, products: collection.products.map((item) => serializeProduct(item.product)) };
  }
}
