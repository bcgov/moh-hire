import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Brackets, Repository, getRepository } from 'typeorm';
import { SubmissionEntity } from './entity/submission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  SubmissionDTO,
  PersonalInformationDTO,
  UpdateSubmissionDTO,
  SubmissionRO,
  RegistrantFilterDTO,
  CondensedRegionLocations,
  Authorities,
  isMoh,
} from '@ehpr/common';
import { MailService } from 'src/mail/mail.service';
import { ConfirmationMailable } from 'src/mail/mailables/confirmation.mailable';
import { Recipient } from 'src/mail/types/recipient';
import { generateConfirmationId } from './id-generator';
import { AppLogger } from 'src/common/logger.service';
import { UpdateConfirmationMailable } from 'src/mail/mailables/update-confirmation.mailable';
import { HealthAuthoritiesEntity } from 'src/user/entity/ha.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @Inject(Logger) private readonly logger: AppLogger,
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    @InjectRepository(HealthAuthoritiesEntity)
    private readonly healthAuthoritiesRepository: Repository<HealthAuthoritiesEntity>,
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

  async getSubmissions() {
    return this.submissionRepository.find();
  }

  async getSubmissionsFilterQuery(filter: RegistrantFilterDTO, haId?: number, userEmail?: string) {
    const queryBuilder = getRepository(SubmissionEntity).createQueryBuilder('submission');
    const { firstName, lastName, email, skip, limit, anyRegion } = filter;

    // find HA
    const ha = await this.healthAuthoritiesRepository.findOne({ where: { id: haId } });

    //TODO: confirm Providence has no region filter access,
    // exclude any filtering for MoH users
    if (ha?.name !== Authorities.PHC.name && !isMoh(userEmail)) {
      console.log('otuside');
      // submission values are saved using the condensed HA name
      const haLocations = CondensedRegionLocations[
        ha?.name as keyof typeof CondensedRegionLocations
      ]
        .map(name => `'${name}'`)
        .join(', ');

      // created nested where clauses for filtering by HA locations and registrants who will deploy anywhere
      queryBuilder.andWhere(
        // check if a row exists that matches filter
        // extract jsonb fields into usable data
        // check if extracted text matches any location values within users HA
        new Brackets(qb => {
          qb.where(
            `EXISTS (
                SELECT 1
                FROM jsonb_array_elements_text("submission"."payload"->'preferencesInformation'->'deploymentLocations') AS dep
                WHERE dep::text = ANY(ARRAY[${haLocations}])
            )`,
          );
          // any region filter selected
          if (anyRegion) {
            qb.orWhere("submission.payload->'preferencesInformation'->>'deployAnywhere' = 'true'");
          }
        }),
      );
    }

    if (firstName) {
      queryBuilder.andWhere(
        "submission.payload->'personalInformation'->>'firstName' ILIKE :firstName",
        {
          firstName: `%${firstName}%`,
        },
      );
    }

    if (lastName) {
      queryBuilder.andWhere(
        "submission.payload->'personalInformation'->>'lastName' ILIKE :lastName",
        {
          lastName: `%${lastName}%`,
        },
      );
    }

    if (email) {
      queryBuilder.andWhere("submission.payload->'contactInformation'->>'email' ILIKE :email", {
        email: `%${email}%`,
      });
    }

    return queryBuilder.skip(skip).take(limit).getManyAndCount();
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
    if (process.env.ENABLE_UPDATE_CONFIRMATION === 'true') {
      const updateConformationMailable = new UpdateConfirmationMailable(
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
