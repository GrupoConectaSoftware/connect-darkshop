import { UnauthorizedException } from '@nestjs/common';
import { describe, expect, it, jest } from '@jest/globals';
import { UserRole } from '../../generated/prisma/client.js';
import { AuthService } from './auth.service.js';

describe('AuthService', () => {
  it('rejects public attempts to register an administrator', async () => {
    const service = new AuthService({ user: { findUnique: jest.fn() } } as never, { signAsync: jest.fn() } as never);
    await expect(service.register({ fullName: 'Admin Test', email: 'admin@example.test', password: 'ValidPassword1', acceptedTerms: true, role: UserRole.ADMIN })).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
