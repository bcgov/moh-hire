import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { EmailTemplateDTO, RegistrantFilterDTO, RegistrantRO } from '@ehpr/common';
import PromisePool from '@supercharge/promise-pool';
import { SubmissionService } from 'src/submission/submission.service';
import { formatRegistrants } from 'src/submission/submission.util';
import { MailService } from 'src/mail/mail.service';
import { MailOptions } from '../mail/types/mail-options';
import { MassEmailRecordService } from 'src/mass-email-record/mass-email-record.service';
import { AppLogger } from 'src/common/logger.service';

@Injectable()
export class RegistrantService {
  constructor(
    @Inject(SubmissionService)
    private readonly submissionService: SubmissionService,
    @Inject(MailService)
    private readonly mailService: MailService,
    @Inject(MassEmailRecordService)
    private readonly massEmailRecordService: MassEmailRecordService,
    @Inject(Logger) private readonly logger: AppLogger,
  ) {}

  async getRegistrants(
    filter: RegistrantFilterDTO,
  ): Promise<[data: RegistrantRO[], count: number]> {
    const [data, count] = await this.submissionService.getSubmissionsFilterQuery(filter);

    const registrants = formatRegistrants(data);
    return [registrants, count];
  }

  async sendMassEmail(payload: EmailTemplateDTO) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // TODO: need to figure out a typing for this
    const errorsArray: any[] = [];

    try {
      // setup promise pool
      await PromisePool.withConcurrency(5)
        .for(payload.data)
        .handleError(async (error, recipient) => {
          // have to handle errors manually with this handler
          // to be able to access recipient id
          errorsArray.push({ error, recipientId: recipient.id });
        })
        .process(async item => {
          const mailOptions: MailOptions = {
            body: payload.body,
            from: process.env.MAIL_FROM ?? 'EHPRDoNotReply@dev.ehpr.freshworks.club',
            subject: payload.subject,
            to: [item.email],
          };

          await this.mailService.sendMailWithSES(mailOptions);
        });
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('There was an issue trying to send emails');
    }

    // no user id for test email
    // create a record entry regardless if errored out
    if (payload.userId) {
      const emailIds = payload.data.map(({ id }) => id);
      // format data for record entry
      const record = this.massEmailRecordService.mapRecordObject(
        payload.userId,
        emailIds,
        errorsArray,
      );

      await this.massEmailRecordService.createMassEmailRecord(record);
    }
  }
}
