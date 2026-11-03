import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductStatus, Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

const cartInclude = { items: { include: { product: { include: { store: true, images: { orderBy: { position: 'asc' as const } } } }, variant: true }, orderBy: { createdAt: 'asc' as const } } };
type CartResult = Prisma.CartGetPayload<{ include: typeof cartInclude }>;
const serialize = (cart: CartResult) => {
  const items = cart.items.map((item) => ({ id: item.id, quantity: item.quantity, product: { id: item.product.id, slug: item.product.slug, name: item.product.name, price: Number(item.product.price.toString()), imageUrl: item.product.images[0]?.url ?? null, store: { slug: item.product.store.slug, name: item.product.store.name } }, variant: { id: item.variant.id, sku: item.variant.sku, size: item.variant.size, colorName: item.variant.colorName, colorHex: item.variant.colorHex, stock: item.variant.stock }, lineTotal: Number(item.product.price.toString()) * item.quantity }));
  return { id: cart.id, items, subtotal: items.reduce((sum, item) => sum + item.lineTotal, 0), currency: 'COP', updatedAt: cart.updatedAt };
};

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async get(userId: string): Promise<Record<string, unknown>> {
    const cart = await this.prisma.cart.upsert({ where: { userId }, create: { userId }, update: {}, include: cartInclude });
    return serialize(cart);
  }
  async add(userId: string, variantId: string, quantity: number): Promise<Record<string, unknown>> {
    await this.prisma.$transaction(async (tx) => {
      const variant = await tx.productVariant.findFirst({ where: { id: variantId, product: { status: ProductStatus.ACTIVE } }, include: { product: true } });
      if (!variant) throw new NotFoundException('Variante no encontrada.');
      const cart = await tx.cart.upsert({ where: { userId }, create: { userId }, update: {} });
      const current = await tx.cartItem.findUnique({ where: { cartId_variantId: { cartId: cart.id, variantId } } });
      const requested = (current?.quantity ?? 0) + quantity;
      if (requested > variant.stock) throw new BadRequestException('La cantidad solicitada supera el inventario disponible.');
      await tx.cartItem.upsert({ where: { cartId_variantId: { cartId: cart.id, variantId } }, create: { cartId: cart.id, productId: variant.productId, variantId, quantity }, update: { quantity: requested } });
    });
    return this.get(userId);
  }
  async update(userId: string, itemId: string, quantity: number): Promise<Record<string, unknown>> {
    const item = await this.prisma.cartItem.findFirst({ where: { id: itemId, cart: { userId } }, include: { variant: true } });
    if (!item) throw new NotFoundException('Artículo del carrito no encontrado.');
    if (quantity > item.variant.stock) throw new BadRequestException('La cantidad solicitada supera el inventario disponible.');
    await this.prisma.cartItem.update({ where: { id: itemId }, data: { quantity } });
    return this.get(userId);
  }
  async remove(userId: string, itemId: string): Promise<void> {
    const result = await this.prisma.cartItem.deleteMany({ where: { id: itemId, cart: { userId } } });
    if (!result.count) throw new NotFoundException('Artículo del carrito no encontrado.');
  }
  async clear(userId: string): Promise<void> {
    await this.prisma.cartItem.deleteMany({ where: { cart: { userId } } });
  }
}
