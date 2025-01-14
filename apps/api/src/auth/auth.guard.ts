import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { isMoh } from '@ehpr/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    // const request = context.switchToHttp().getRequest();

    // const token = this.extractTokenFromHeader(request);
    // if (!token) {
    //   return false;
    // }

    // const kcUser = await this.authService.getUserFromToken(token);
    // let user = await this.userService.findUser(kcUser.id, kcUser.email);
    // if (!user) {
    //   user = await this.userService.createUser(kcUser);
    // } else if (
    //   (!user.revokedDate && (!user.email || !user.name)) ||
    //   (!isMoh(user.email) && !user.ha_id)
    // ) {
    //   const { email, name } = kcUser;
    //   user = await this.userService.updateUser(user, { email, name, active: true });
    // }
    // request.user = user;

    // return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
