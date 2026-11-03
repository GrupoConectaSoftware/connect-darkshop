import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { UserRole } from '../../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
import type { LoginDto, RegisterDto, UpdateProfileDto } from './dto.js';

const safeUser = (user: { id: string; email: string; fullName: string; phone: string | null; city: string | null; avatarUrl: string | null; role: UserRole; createdAt: Date }) => ({
  id: user.id, email: user.email, fullName: user.fullName, phone: user.phone, city: user.city, avatarUrl: user.avatarUrl, role: user.role, createdAt: user.createdAt,
});

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

  async register(input: RegisterDto): Promise<Record<string, unknown>> {
    const email = input.email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('Ya existe una cuenta con este correo.');
    if (input.role === UserRole.ADMIN) throw new UnauthorizedException('No es posible crear administradores mediante el registro público.');
    const user = await this.prisma.user.create({ data: { email, fullName: input.fullName.trim(), passwordHash: await bcrypt.hash(input.password, 12), role: input.role ?? UserRole.BUYER, acceptedTermsAt: new Date() } });
    return this.createSession(user);
  }

  async login(input: LoginDto): Promise<Record<string, unknown>> {
    const user = await this.prisma.user.findUnique({ where: { email: input.email.trim().toLowerCase() } });
    if (!user || !user.isActive || !(await bcrypt.compare(input.password, user.passwordHash))) throw new UnauthorizedException('Correo o contraseña incorrectos.');
    return this.createSession(user);
  }

  async refresh(refreshToken: string): Promise<Record<string, unknown>> {
    const sessions = await this.prisma.session.findMany({ where: { revokedAt: null, expiresAt: { gt: new Date() } }, include: { user: true } });
    const session = (await Promise.all(sessions.map(async (candidate) => (await bcrypt.compare(refreshToken, candidate.refreshTokenHash)) ? candidate : undefined))).find(Boolean);
    if (!session || !session.user.isActive) throw new UnauthorizedException('La sesión no es válida o expiró.');
    await this.prisma.session.update({ where: { id: session.id }, data: { revokedAt: new Date() } });
    return this.createSession(session.user);
  }

  async logout(userId: string): Promise<void> {
    await this.prisma.session.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
  }

  async profile(userId: string): Promise<Record<string, unknown>> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id: userId } });
    return safeUser(user);
  }

  async updateProfile(userId: string, input: UpdateProfileDto): Promise<Record<string, unknown>> {
    const user = await this.prisma.user.update({ where: { id: userId }, data: { ...input, fullName: input.fullName?.trim(), city: input.city?.trim(), phone: input.phone?.trim() } });
    return safeUser(user);
  }

  async address(userId: string): Promise<Record<string, unknown> | null> {
    const address = await this.prisma.userAddress.findFirst({ where: { userId, isDefault: true }, orderBy: { updatedAt: 'desc' } });
    return address ? { id: address.id, line1: address.line1, city: address.city, country: address.country } : null;
  }
  async saveAddress(userId: string, input: import('./dto.js').UpsertAddressDto): Promise<Record<string, unknown>> {
    const current = await this.prisma.userAddress.findFirst({ where: { userId, isDefault: true } });
    const address = current
      ? await this.prisma.userAddress.update({ where: { id: current.id }, data: { line1: input.line1.trim(), city: input.city?.trim() } })
      : await this.prisma.userAddress.create({ data: { userId, line1: input.line1.trim(), city: input.city?.trim() } });
    return { id: address.id, line1: address.line1, city: address.city, country: address.country };
  }
  async preferences(userId: string): Promise<Record<string, unknown>> {
    const preferences = await this.prisma.userPreference.findUnique({ where: { userId } });
    return { styles: preferences?.styles ?? [], categories: preferences?.categories ?? [], brands: preferences?.brands ?? [] };
  }
  async savePreferences(userId: string, input: import('./dto.js').UpdatePreferencesDto): Promise<Record<string, unknown>> {
    const preferences = await this.prisma.userPreference.upsert({ where: { userId }, create: { userId, styles: input.styles, categories: input.categories, brands: input.brands }, update: { styles: input.styles, categories: input.categories, brands: input.brands } });
    return { styles: preferences.styles ?? [], categories: preferences.categories ?? [], brands: preferences.brands ?? [] };
  }
  async updateAvatar(userId: string, avatarUrl: string): Promise<Record<string, unknown>> {
    const user = await this.prisma.user.update({ where: { id: userId }, data: { avatarUrl } });
    return safeUser(user);
  }

  private async createSession(user: { id: string; email: string; fullName: string; phone: string | null; city: string | null; avatarUrl: string | null; role: UserRole; createdAt: Date }): Promise<Record<string, unknown>> {
    const accessToken = await this.jwt.signAsync({ sub: user.id, email: user.email, role: user.role });
    const refreshToken = randomUUID() + randomUUID();
    const expiresAt = new Date(Date.now() + Number(process.env.JWT_REFRESH_TTL_DAYS ?? 30) * 86_400_000);
    await this.prisma.session.create({ data: { userId: user.id, refreshTokenHash: await bcrypt.hash(refreshToken, 12), expiresAt } });
    return { accessToken, refreshToken, user: safeUser(user) };
  }
}
