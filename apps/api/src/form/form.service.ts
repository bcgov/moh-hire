import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormEntity } from './entity/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FormDTO, FormExportColumns } from '@ehpr/common';
import { booleanToYesNo } from 'src/helpers/casting';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
  ) {}
  async saveForm(dto: FormDTO, confirmationId: string): Promise<FormEntity> {
    const newForm = this.formRepository.create({
      ...dto,
      confirmationId,
    } as Partial<FormEntity>);

    return await this.formRepository.save(newForm);
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
    return forms.map(form => {
      return {
        deployAnywhere: booleanToYesNo(form.payload.availabilityInformation.deployAnywhere),
        deploymentDuration: form.payload.availabilityInformation.deploymentDuration.toString(),
        deploymentLocations: form.payload.availabilityInformation.deploymentLocations.join(', '),
        isImmunized: booleanToYesNo(form.payload.availabilityInformation.isImmunized),
        C19ClinicSupport: booleanToYesNo(
          form.payload.availabilityInformation.placementPrefs.C19ClinicSupport,
        ),
        C19CommunityCare: booleanToYesNo(
          form.payload.availabilityInformation.placementPrefs.C19CommunityCare,
        ),
        C19LowRisk: booleanToYesNo(form.payload.availabilityInformation.placementPrefs.C19LowRisk),
        C19PatientCare: booleanToYesNo(
          form.payload.availabilityInformation.placementPrefs.C19PatientCare,
        ),
        WildFireOrOther: booleanToYesNo(
          form.payload.availabilityInformation.placementPrefs.WildFireOrOther,
        ),
        email: form.payload.contactInformation.email,
        primaryPhone: form.payload.contactInformation.primaryPhone,
        primaryPhoneExt: form.payload.contactInformation.primaryPhoneExt,
        secondaryPhone: form.payload.contactInformation.secondaryPhone,
        secondaryPhoneExt: form.payload.contactInformation.secondaryPhoneExt,
        firstName: form.payload.personalInformation.firstName,
        lastName: form.payload.personalInformation.lastName,
        postalCode: form.payload.personalInformation.postalCode,
        currentEmploymentType: form.payload.skillInformation.currentEmploymentType,
        registrationNumber: form.payload.skillInformation.registrationNumber.toString(),
        registrationStatus: form.payload.skillInformation.registrationStatus,
        streamTypes: form.payload.skillInformation.streamTypes,
        additionalComments: form.payload.skillInformation.additionalComments,
      };
    });
  }
}
