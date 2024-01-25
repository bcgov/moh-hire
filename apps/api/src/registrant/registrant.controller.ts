import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import { AuthGuard } from '../auth/auth.guard';
import { RegistrantService } from './registrant.service';
import { SubmissionService } from 'src/submission/submission.service';

@Controller('registrants')
@UseGuards(AuthGuard)
@ApiTags('Registrants')
export class RegistrantController {
  constructor(
    @Inject(RegistrantService) private readonly registrantService: RegistrantService,
    @Inject(SubmissionService) private readonly submissionService: SubmissionService,
  ) {}
  @Get('/')
  async getRegistrants(
    @Query() filter: RegistrantFilterDTO,
  ): Promise<[data: RegistrantRO[], count: number]> {
    const registrants = await this.registrantService.getRegistrants(filter);
    return registrants;
  }

  @Get('/emails')
  async getAllRegistrantsEmails(): Promise<string[]> {
    const submissions = await this.submissionService.getSubmissions();
    const registrantEmailArray = submissions.map(({ payload }) => payload.contactInformation.email);
    return registrantEmailArray;
  }
}
