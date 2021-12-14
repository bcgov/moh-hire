import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormEntity } from './entity/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FormDTO, PersonalInformationDTO } from '@ehpr/common';
import { booleanToYesNo } from 'src/common/helper/csv/casting';
import { FormExportColumns } from 'src/common/helper/csv/formExport';
import { MailService } from 'src/mail/mail.service';
import { ConfirmationMailable } from 'src/mail/mailables/confirmation.mailable';
import { Recipient } from 'src/mail/types/recipient';

@Injectable()
export class FormService {
  constructor(
    @Inject(Logger) private readonly logger: LoggerService,
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    @Inject(MailService)
    private readonly mailService: MailService,
  ) {}
  async saveForm(dto: FormDTO, confirmationId: string): Promise<FormEntity> {
    const newForm = this.formRepository.create({
      ...dto,
      confirmationId,
    } as Partial<FormEntity>);

    const savedForm = await this.formRepository.save(newForm);

    const notifiedForm = await this.sendFormConfirmationEmail(savedForm);

    return notifiedForm;
  }

  /**
   * Uses form object as payload to send confirmation email
   * @param form form object to use for sending confirmation email
   * @returns modified form object with ches transaction id
   */
  private async sendFormConfirmationEmail(form: FormEntity): Promise<FormEntity> {
    const { payload } = form;
    const { email } = payload.contactInformation;
    const mailable = new ConfirmationMailable({ email } as Recipient, {
      firstName: (payload.personalInformation as PersonalInformationDTO).firstName,
      confirmationId: form.confirmationId,
    });

    try {
      const { txId } = await this.mailService.sendMailable(mailable);
      form.chesTransactionId = txId;
      form = await this.formRepository.save(form);
    } catch (e) {
      this.logger.warn(e);
    }

    return form;
  }

  async getForms(): Promise<FormEntity[]> {
    return await this.formRepository.find();
  }
  async getFormById(id: string): Promise<FormEntity> {
    return await this.formRepository.findOneOrFail({
      confirmationId: id,
    });
  }

  async getAllForms(): Promise<FormEntity[]> {
    return await this.formRepository.find({});
  }

  async flattenAndTransformFormData(forms: FormEntity[]): Promise<FormExportColumns[]> {
    return forms.map(({ payload }) => {
      return {
        ...payload.contactInformation,
        ...payload.personalInformation,
        deployAnywhere: booleanToYesNo(payload.availabilityInformation.deployAnywhere),
        deploymentDuration: payload.availabilityInformation.deploymentDuration.toString(),
        deploymentLocations: payload.availabilityInformation.deploymentLocations.join(', '),
        isImmunized: booleanToYesNo(payload.availabilityInformation.isImmunized),
        C19ClinicSupport: booleanToYesNo(
          payload.availabilityInformation.placementPrefs.C19ClinicSupport,
        ),
        C19CommunityCare: booleanToYesNo(
          payload.availabilityInformation.placementPrefs.C19CommunityCare,
        ),
        C19LowRisk: booleanToYesNo(payload.availabilityInformation.placementPrefs.C19LowRisk),
        C19PatientCare: booleanToYesNo(
          payload.availabilityInformation.placementPrefs.C19PatientCare,
        ),
        WildFireOrOther: booleanToYesNo(
          payload.availabilityInformation.placementPrefs.WildFireOrOther,
        ),
        currentEmploymentType: payload.skillInformation.currentEmployment,
        registrationNumber: payload.skillInformation.registrationNumber.toString(),
        registrationStatus: payload.skillInformation.registrationStatus,
        streamTypes: payload.skillInformation.stream,
        additionalComments: payload.skillInformation.additionalComments,
      };
    });
  }
}
