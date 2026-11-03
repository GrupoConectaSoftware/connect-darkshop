import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { OrderStatus, PaymentStatus, Prisma, ProductStatus } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';

const orderInclude = { items: true };
type OrderResult = Prisma.OrderGetPayload<{ include: typeof orderInclude }>;
const number = (value: Prisma.Decimal): number => Number(value.toString());
const serialize = (order: OrderResult) => ({ id: order.id, status: order.status, paymentStatus: order.paymentStatus, currency: order.currency, subtotal: number(order.subtotal), shipping: number(order.shipping), discount: number(order.discount), total: number(order.total), expiresAt: order.expiresAt, createdAt: order.createdAt, items: order.items.map((item) => ({ id: item.id, productId: item.productId, variantId: item.variantId, productName: item.productName, productSlug: item.productSlug, variantSku: item.variantSku, size: item.size, colorName: item.colorName, unitPrice: number(item.unitPrice), quantity: item.quantity, lineTotal: number(item.lineTotal) })) });

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async checkout(userId: string, idempotencyKey: string): Promise<Record<string, unknown>> {
    const previous = await this.prisma.order.findFirst({ where: { userId, idempotencyKey }, include: orderInclude });
    if (previous) return serialize(previous);
    try {
      const order = await this.prisma.$transaction(async (tx) => {
        const cart = await tx.cart.findUnique({ where: { userId }, include: { items: { include: { product: true, variant: true } } } });
        if (!cart?.items.length) throw new BadRequestException('No puedes crear un pedido con el carrito vacío.');
        for (const item of cart.items) {
          if (item.product.status !== ProductStatus.ACTIVE || item.variant.productId !== item.productId) throw new BadRequestException('El carrito contiene un producto no disponible.');
          const decremented = await tx.productVariant.updateMany({ where: { id: item.variantId, productId: item.productId, stock: { gte: item.quantity } }, data: { stock: { decrement: item.quantity } } });
          if (decremented.count !== 1) throw new ConflictException(`No hay inventario suficiente para ${item.product.name}.`);
        }
        const subtotal = cart.items.reduce((sum, item) => sum.add(item.product.price.mul(item.quantity)), new Prisma.Decimal(0));
        const created = await tx.order.create({ data: { userId, idempotencyKey, subtotal, total: subtotal, expiresAt: new Date(Date.now() + 15 * 60_000), items: { create: cart.items.map((item) => ({ productId: item.productId, variantId: item.variantId, productName: item.product.name, productSlug: item.product.slug, variantSku: item.variant.sku, size: item.variant.size, colorName: item.variant.colorName, unitPrice: item.product.price, quantity: item.quantity, lineTotal: item.product.price.mul(item.quantity) })) } }, include: orderInclude });
        await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
        return created;
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
      return serialize(order);
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof ConflictException) throw error;
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const order = await this.prisma.order.findFirst({ where: { userId, idempotencyKey }, include: orderInclude });
        if (order) return serialize(order);
      }
      throw error;
    }
  }

  async list(userId: string): Promise<Record<string, unknown>[]> {
    return (await this.prisma.order.findMany({ where: { userId }, include: orderInclude, orderBy: { createdAt: 'desc' } })).map(serialize);
  }
  async get(userId: string, id: string): Promise<Record<string, unknown>> {
    const order = await this.prisma.order.findFirst({ where: { id, userId }, include: orderInclude });
    if (!order) throw new NotFoundException('Pedido no encontrado.');
    return serialize(order);
  }
  async cancel(userId: string, id: string): Promise<Record<string, unknown>> {
    const order = await this.prisma.$transaction(async (tx) => {
      const current = await tx.order.findFirst({ where: { id, userId }, include: { items: true } });
      if (!current) throw new NotFoundException('Pedido no encontrado.');
      if (current.status !== OrderStatus.PENDING_PAYMENT || current.paymentStatus !== PaymentStatus.PENDING_PROVIDER) throw new BadRequestException('Este pedido ya no puede cancelarse.');
      for (const item of current.items) await tx.productVariant.update({ where: { id: item.variantId }, data: { stock: { increment: item.quantity } } });
      return tx.order.update({ where: { id }, data: { status: OrderStatus.CANCELLED, paymentStatus: PaymentStatus.CANCELLED }, include: orderInclude });
    });
    return serialize(order);
  }
}
