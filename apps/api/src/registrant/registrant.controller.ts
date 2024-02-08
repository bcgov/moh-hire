import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EmailTemplateDTO, RegistrantFilterDTO, RegistrantRO, Role } from '@ehpr/common';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrantService } from './registrant.service';
import { SubmissionService } from 'src/submission/submission.service';
import { Roles } from 'src/common/decorators';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('registrants')
@UseGuards(AuthGuard)
@ApiTags('Registrants')
export class RegistrantController {
  constructor(
    @Inject(RegistrantService) private readonly registrantService: RegistrantService,
    @Inject(SubmissionService) private readonly submissionService: SubmissionService,
  ) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(RoleGuard)
  @Get('/')
  async getRegistrants(
    @Query() filter: RegistrantFilterDTO,
  ): Promise<[data: RegistrantRO[], count: number]> {
    const registrants = await this.registrantService.getRegistrants(filter);
    return registrants;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(RoleGuard)
  @Post('/send-mass-email')
  async sendMassEmail(@Body() payload: EmailTemplateDTO) {
    await this.registrantService.sendMassEmail(payload);
  }
}
