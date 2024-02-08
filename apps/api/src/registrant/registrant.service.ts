import { Inject, Injectable } from '@nestjs/common';
import { EmailTemplateDTO, RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import { SubmissionService } from 'src/submission/submission.service';
import { formatRegistrants } from 'src/submission/submission.util';
import { MailService } from 'src/mail/mail.service';
import { MailOptions } from '../mail/types/mail-options';

@Injectable()
export class RegistrantService {
  constructor(
    @Inject(SubmissionService)
    private readonly submissionService: SubmissionService,
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {}

  async getRegistrants(
    filter: RegistrantFilterDTO,
  ): Promise<[data: RegistrantRO[], count: number]> {
    const [data, count] = await this.submissionService.getSubmissionsFilterQuery(filter);

    const registrants = formatRegistrants(data);
    return [registrants, count];
  }

  async sendMassEmail(payload: EmailTemplateDTO) {
    const mailOptions: MailOptions = {
      body: payload.body,
      from: process.env.MAIL_FROM ?? 'EHPRDoNotReply@dev.ehpr.freshworks.club',
      subject: payload.subject,
      to: payload.emails,
    };

    await this.mailService.sendMailWithSES(mailOptions);
  }
}
