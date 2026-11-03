import { BadRequestException } from '@nestjs/common';
import { describe, expect, it, jest } from '@jest/globals';
import { OrdersService } from './orders.service.js';

describe('OrdersService', () => {
  it('does not create an order from an empty cart', async () => {
    const tx = { cart: { findUnique: jest.fn().mockResolvedValue({ id: 'cart-1', items: [] } as never) } };
    const prisma = {
      order: { findFirst: jest.fn().mockResolvedValue(null as never) },
      $transaction: async (work: (client: typeof tx) => Promise<unknown>) => work(tx),
    };
    const service = new OrdersService(prisma as never);

    await expect(service.checkout('user-1', 'idempotency-key-1')).rejects.toBeInstanceOf(BadRequestException);
  });
});
