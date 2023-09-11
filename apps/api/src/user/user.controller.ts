import { Controller, Get, Inject, Logger, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRequest } from '@ehpr/common';
import { AppLogger } from '../common/logger.service';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
@ApiTags('Users')
export class UserController {
  constructor(
    @Inject(Logger) private readonly logger: AppLogger,
    @Inject(UserService) private readonly service: UserService,
  ) {}

  @Get()
  async getUsers() {
    return this.service.findUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string, @Req() req: UserRequest) {
    if (id === 'me') {
      return req.user;
    }
    return this.service.findUser(id);
  }
}
