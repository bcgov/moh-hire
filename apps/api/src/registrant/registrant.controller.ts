import { Body, Controller, Get, Inject, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailTemplateDTO, RegistrantFilterDTO, RegistrantRO, Role } from '@ehpr/common';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrantService } from './registrant.service';
import { Roles } from 'src/common/decorators';
import { RoleGuard } from 'src/auth/role.guard';
import { UserRequest } from '@ehpr/common';

@Controller('registrants')
@UseGuards(AuthGuard)
@ApiTags('Registrants')
export class RegistrantController {
  constructor(@Inject(RegistrantService) private readonly registrantService: RegistrantService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(RoleGuard)
  @Get('/')
  async getRegistrants(
    @Req() { user }: UserRequest,
    @Query() filter: RegistrantFilterDTO,
  ): Promise<[data: RegistrantRO[], count: number]> {
    const registrants = await this.registrantService.getRegistrants(
      filter,
      user?.ha_id,
      user?.email,
    );
    return registrants;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RoleGuard)
  @Post('/send-mass-email')
  async sendMassEmail(@Body() payload: EmailTemplateDTO) {
    await this.registrantService.sendMassEmail(payload);
  }
}
