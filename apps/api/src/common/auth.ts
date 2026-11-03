import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { UserRole } from '../generated/prisma/client.js';

export interface AuthenticatedRequest extends Request {
  user: { sub: string; role: UserRole; email: string };
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService, private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedException('Se requiere un token Bearer.');
    try {
      const payload = await this.jwt.verifyAsync<{ sub: string; role: UserRole; email: string }>(token);
      const allowedRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
      if (allowedRoles?.length && !allowedRoles.includes(payload.role)) throw new UnauthorizedException('No tienes permisos para esta operación.');
      request.user = payload;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('El token no es válido o expiró.');
    }
  }
}

export const Authenticated = (...roles: UserRole[]) => applyDecorators(UseGuards(JwtAuthGuard), ...(roles.length ? [Roles(...roles)] : []));
