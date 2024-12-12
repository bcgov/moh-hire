import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Extract the client IP from the 'X-Forwarded-For' header
    const clientIp = req.headers['x-forwarded-for'] || req.ip;
    return Array.isArray(clientIp) ? clientIp[0] : clientIp;
  }
}
