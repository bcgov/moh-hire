import { Body, Controller, Get, Inject, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as csvWriter from 'csv-writer';
import { InviteUserDTO, Role, UserRequest } from '@ehpr/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { Roles } from '../common/decorators';
import { RoleGuard } from '../auth/role.guard';
import { SubmissionService } from '../submission/submission.service';
import { flattenAndTransformFormData, formExportColumnHeaders } from '../scripts/send-data-extract';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(AuthGuard)
@ApiTags('Admin')
export class AdminController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(AdminService) private readonly adminService: AdminService,
    @Inject(SubmissionService) private readonly submissionService: SubmissionService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Patch(':id/approve')
  async approve(@Param() id: string) {
    return this.userService.approve(id);
  }

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Patch(':id/revoke')
  async revoke(@Param() id: string) {
    return this.userService.revoke(id);
  }

  @Get('/extract-submissions')
  async extractSubmissions(@Req() { user }: UserRequest) {
    const submissions = await this.submissionService.getSubmissions(user?.ha_id, user?.email);

    const flatSubmissions = flattenAndTransformFormData(submissions);
    const stringifier = csvWriter.createObjectCsvStringifier({
      header: formExportColumnHeaders,
    });
    return stringifier.getHeaderString() + stringifier.stringifyRecords(flatSubmissions);
  }

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Post('/invite')
  async invite(@Body() payload: InviteUserDTO) {
    return this.adminService.invite(payload);
  }
}
