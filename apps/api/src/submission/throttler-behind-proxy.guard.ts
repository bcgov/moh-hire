import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected async getTracker(req: Record<string, any>): Promise<string> {
    // Extract the client IP from the 'X-Forwarded-For' header
    console.log(
      '1:',
      req.headers['X-Forwarded-For'],
      '2:',
      req.headers['x-forwarded-for'],
      '3:',
      req.ips,
      '4:',
      req.ip,
      '-----',
    );
    // const clientIp = req.headers['X-Forwarded-For'] || req.ip;
    return req.ip;
  }
}
