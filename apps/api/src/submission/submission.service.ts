import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SubmissionEntity } from './entity/submission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SubmissionDTO,
  PersonalInformationDTO,
  UpdateSubmissionDTO,
  SubmissionRO,
} from '@ehpr/common';
import { MailService } from 'src/mail/mail.service';
import { ConfirmationMailable } from 'src/mail/mailables/confirmation.mailable';
import { Recipient } from 'src/mail/types/recipient';
import { generateConfirmationId } from './id-generator';
import { AppLogger } from 'src/common/logger.service';
import { UpdateConfirmationMailable } from 'src/mail/mailables/update-confirmation.mailable';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject(Logger) private readonly logger: AppLogger,
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {}
  async saveSubmission(dto: SubmissionDTO): Promise<SubmissionEntity> {
    const confirmationId = generateConfirmationId();
    const newSubmission = this.submissionRepository.create({
      ...dto,
      confirmationId,
    } as Partial<SubmissionEntity>);
    const savedSubmission = await this.submissionRepository.save(newSubmission);
    this.logger.log(`Saved submission: ${savedSubmission.id}`, SubmissionService.name);

    return this.sendSubmissionConfirmation(savedSubmission);
  }

  private async sendSubmissionConfirmation(submission: SubmissionEntity) {
    const { payload } = submission;
    const { email } = payload.contactInformation;

    const mailable = new ConfirmationMailable({ email } as Recipient, {
      firstName: (payload.personalInformation as PersonalInformationDTO).firstName,
      confirmationId: this.convertIdToDashedId(submission.confirmationId),
    });

    this.logger.log(
      `Sending confirmation email for submission: ${submission.id}`,
      SubmissionService.name,
    );
    const mailResponse = await this.mailService.sendMailable(mailable);
    submission.chesId = mailResponse?.txId;
    submission = await this.submissionRepository.save(submission);
    this.logger.log(
      `Confirmation email sent for submission: ${submission.id}`,
      SubmissionService.name,
    );

    return submission;
  }

  private convertIdToDashedId(id: string): string {
    return (
      id.substring(0, 3) +
      '-' +
      id.substring(3, 6) +
      '-' +
      id.substring(6, 9) +
      '-' +
      id.substring(9)
    );
  }

  async getSubmission(confirmationId: string) {
    return this.submissionRepository.findOne({ confirmationId });
  }

  async updateSubmission(
    confirmationId: string,
    payload: UpdateSubmissionDTO,
  ): Promise<SubmissionRO> {
    confirmationId = confirmationId.replace(/-/gm, '').toUpperCase();
    const record = await this.submissionRepository.findOne({ confirmationId });
    if (!record) {
      throw new NotFoundException(`No submission record for ${confirmationId}`);
    }

    const update: Partial<SubmissionEntity> = {
      payload: { ...record.payload, ...payload },
      withdrawn: !payload.status.interested,
    };

    await this.submissionRepository.update(record.id, update);
    console.log(process.env.ENABLE_UPDATE_CONFIRMATION);
    if (process.env.ENABLE_UPDATE_CONFIRMATION === 'true') {
      let updateConformationMailable = new UpdateConfirmationMailable(
        { email: payload.contactInformation.email } as Recipient,
        {
          firstName: (payload.personalInformation as PersonalInformationDTO).firstName,
          confirmationId: this.convertIdToDashedId(confirmationId),
        },
      );
      await this.mailService.sendMailable(updateConformationMailable);
    }

    return { id: record.id, confirmationId };
  }
}
