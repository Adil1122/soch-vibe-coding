import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly defaultAdminUser = process.env.ADMIN_USER || 'admin';
  private readonly defaultAdminPass = process.env.ADMIN_PASS || 'admin123';
  private readonly secretKey = process.env.JWT_SECRET || 'soch_vibe_coding_secret_key_2026';

  login(username?: string, password?: string) {
    if (!username || !password) {
      throw new UnauthorizedException('Username and password are required.');
    }

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (
      (cleanUser.toLowerCase() === this.defaultAdminUser.toLowerCase() ||
        cleanUser.toLowerCase() === 'admin@soch.pk' ||
        cleanUser.toLowerCase() === 'admin@vibeacademy.info') &&
      cleanPass === this.defaultAdminPass
    ) {
      const payload = {
        username: cleanUser,
        role: 'admin',
        issuedAt: Date.now(),
      };
      const token = this.generateToken(payload);

      return {
        success: true,
        token,
        user: {
          username: cleanUser,
          role: 'admin',
          displayName: 'SOCH Administrator',
        },
      };
    }

    throw new UnauthorizedException('Invalid admin credentials.');
  }

  generateToken(payload: object): string {
    const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(data)
      .digest('base64url');
    return `${data}.${signature}`;
  }

  verifyToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 2) return null;
      const [data, signature] = parts;
      const expectedSig = crypto
        .createHmac('sha256', this.secretKey)
        .update(data)
        .digest('base64url');

      if (signature !== expectedSig) return null;

      const payload = JSON.parse(Buffer.from(data, 'base64url').toString('utf8'));
      return payload;
    } catch {
      return null;
    }
  }
}
