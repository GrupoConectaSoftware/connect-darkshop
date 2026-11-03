import { describe, expect, it, jest } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service.js';

describe('CartService', () => {
  it('does not allow adding beyond the available variant stock', async () => {
    const tx = {
      productVariant: { findFirst: jest.fn().mockResolvedValue({ id: 'variant-1', productId: 'product-1', stock: 3 } as never) },
      cart: { upsert: jest.fn().mockResolvedValue({ id: 'cart-1' } as never) },
      cartItem: { findUnique: jest.fn().mockResolvedValue({ quantity: 2 } as never), upsert: jest.fn() },
    };
    const prisma = { $transaction: async (work: (client: typeof tx) => Promise<unknown>) => work(tx) };
    const service = new CartService(prisma as never);
    await expect(service.add('user-1', 'variant-1', 2)).rejects.toBeInstanceOf(BadRequestException);
    expect(tx.cartItem.upsert).not.toHaveBeenCalled();
  });
});
