import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';
import { User } from '@ehpr/common';
import { AppLogger } from '../common/logger.service';

@Injectable()
export class AuthService {
  jwksClient = jwksRsa({
    jwksUri: `${process.env.KC_URL}/realms/${process.env.KC_REALM}/protocol/openid-connect/certs`,
  });

  constructor(@Inject(Logger) private readonly logger: AppLogger) {}

  async getUserFromToken(token: string): Promise<User> {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    try {
      const kid = decoded.header.kid;
      const jwks = await this.jwksClient.getSigningKey(kid);
      const signingKey = jwks.getPublicKey();
      const verified = jwt.verify(token, signingKey);
      if (typeof verified !== 'string' && verified.azp !== 'ehpr-app') {
        throw new HttpException('Authentication token does not match', HttpStatus.FORBIDDEN);
      }

      const { sub, given_name, family_name, email } = decoded.payload as JwtPayload;
      return {
        id: sub as string,
        name: `${family_name} ${given_name}`,
        email,
      };
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new BadRequestException('Authentication token expired');
      }
      throw e;
    }
  }
}
