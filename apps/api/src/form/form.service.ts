import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormEntity } from './entity/form.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FormDTO } from '@ehpr/common';
import { booleanToYesNo } from 'src/common/helper/casting';
import { FormExportColumns } from 'src/common/helper/form-export';

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
    return forms.map(({ payload }) => {
      return {
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
        email: payload.contactInformation.email,
        primaryPhone: payload.contactInformation.primaryPhone,
        primaryPhoneExt: payload.contactInformation.primaryPhoneExt,
        secondaryPhone: payload.contactInformation.secondaryPhone,
        secondaryPhoneExt: payload.contactInformation.secondaryPhoneExt,
        firstName: payload.personalInformation.firstName,
        lastName: payload.personalInformation.lastName,
        postalCode: payload.personalInformation.postalCode,
        currentEmploymentType: payload.skillInformation.currentEmploymentType,
        registrationNumber: payload.skillInformation.registrationNumber.toString(),
        registrationStatus: payload.skillInformation.registrationStatus,
        streamTypes: payload.skillInformation.streamTypes,
        additionalComments: payload.skillInformation.additionalComments,
      };
    });
  }
}
