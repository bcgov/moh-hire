import { Inject, Injectable } from '@nestjs/common';
import { RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import { SubmissionService } from 'src/submission/submission.service';
import { formatRegistrants } from 'src/submission/submission.util';

@Injectable()
export class RegistrantService {
  constructor(@Inject(SubmissionService) private readonly submissionService: SubmissionService) {}

  async getRegistrants(
    filter: RegistrantFilterDTO,
  ): Promise<[data: RegistrantRO[], count: number]> {
    const [data, count] = await this.submissionService.getSubmissionsFilterQuery(filter);

    const registrants = formatRegistrants(data);
    return [registrants, count];
  }
}
