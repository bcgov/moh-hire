import { Controller, Get, Inject, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as csvWriter from 'csv-writer';
import { Role } from '@ehpr/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from '../user/user.service';
import { Roles } from '../common/decorators';
import { RoleGuard } from '../auth/role.guard';
import { SubmissionService } from '../submission/submission.service';
import { flattenAndTransformFormData, formExportColumnHeaders } from '../scripts/send-data-extract';

@Controller('admin')
@UseGuards(AuthGuard)
@ApiTags('Admin')
export class AdminController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(SubmissionService) private readonly submissionService: SubmissionService,
  ) {}

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Patch(':id/approve')
  async approve(@Param() id: string) {
    return this.userService.changeRole(id, Role.User);
  }

  @Roles(Role.Admin)
  @UseGuards(RoleGuard)
  @Patch(':id/revoke')
  async revoke(@Param() id: string) {
    return this.userService.changeRole(id, Role.Pending);
  }

  @Get('/extract-submissions')
  async extractSubmissions() {
    const submissions = await this.submissionService.getSubmissions();

    const flatSubmissions = flattenAndTransformFormData(submissions);
    const stringifier = csvWriter.createObjectCsvStringifier({
      header: formExportColumnHeaders,
    });
    return stringifier.getHeaderString() + stringifier.stringifyRecords(flatSubmissions);
  }
}
