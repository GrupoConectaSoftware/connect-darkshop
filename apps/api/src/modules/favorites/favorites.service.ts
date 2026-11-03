import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus } from '../../generated/prisma/client.js';
import { serializeProduct } from '../catalog/catalog.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

const productInclude = { store: true, category: true, images: { orderBy: { position: 'asc' as const } }, variants: true };

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}
  async list(userId: string): Promise<Record<string, unknown>[]> {
    const favorites = await this.prisma.favorite.findMany({ where: { userId, product: { status: ProductStatus.ACTIVE } }, include: { product: { include: productInclude } }, orderBy: { createdAt: 'desc' } });
    return favorites.map(({ product, createdAt }) => ({ product: serializeProduct(product), createdAt }));
  }
  async add(userId: string, productId: string): Promise<Record<string, unknown>> {
    const product = await this.prisma.product.findFirst({ where: { id: productId, status: ProductStatus.ACTIVE } });
    if (!product) throw new NotFoundException('Producto no encontrado.');
    await this.prisma.favorite.upsert({ where: { userId_productId: { userId, productId } }, create: { userId, productId }, update: {} });
    return { productId, favorited: true };
  }
  async remove(userId: string, productId: string): Promise<void> {
    await this.prisma.favorite.deleteMany({ where: { userId, productId } });
  }
}
