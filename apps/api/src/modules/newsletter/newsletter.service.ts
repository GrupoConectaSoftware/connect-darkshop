import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
@Injectable()
export class NewsletterService {
  constructor(private readonly prisma: PrismaService) {}
  async subscribe(email: string): Promise<Record<string, boolean>> {
    await this.prisma.newsletterSubscription.upsert({ where: { email: email.trim().toLowerCase() }, create: { email: email.trim().toLowerCase() }, update: { unsubscribedAt: null } });
    return { subscribed: true };
  }
}
