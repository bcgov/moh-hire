import { Controller, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Role } from '@ehpr/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { Roles } from '../common/decorators';
import { RoleGuard } from '../auth/role.guard';

@Controller('admin')
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@ApiTags('Admin')
export class AdminController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Patch(':id/approve')
  async approve(@Param() id: string) {
    return this.userService.changeRole(id, Role.User);
  }

  @Patch(':id/revoke')
  async revoke(@Param() id: string) {
    return this.userService.changeRole(id, Role.Pending);
  }
}
