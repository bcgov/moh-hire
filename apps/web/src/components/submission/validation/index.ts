import {
  PersonalInformationDTO,
  AvailabilityDTO,
  ContactInformationDTO,
  SubmissionPayloadDTO,
} from '@ehpr/common';
import { createValidator } from 'class-validator-formik';
import { contactDefaultValues } from './contact';
import { credentialDefaultValues } from './credential';
import { personalDefaultValues } from './personal';
import { SkillInformationDTO } from './credential';
import { preferencesDefaultValues } from './preferences';

export interface SubmissionType extends SubmissionPayloadDTO {
  confirm: boolean;
}

// @todo remove DeepPartial when all form steps are implemented
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const initialSubmissionValues: DeepPartial<SubmissionType> = {
  personalInformation: personalDefaultValues,
  contactInformation: contactDefaultValues,
  skillInformation: credentialDefaultValues,
  availabilityInformation: preferencesDefaultValues,
  confirm: false,
};

export const personalSchema = createValidator(PersonalInformationDTO);
export const contactSchema = createValidator(ContactInformationDTO);
export const credentialSchema = createValidator(SkillInformationDTO);
export const preferencesSchema = createValidator(AvailabilityDTO);
export { reviewSchema } from './review';

export * from './credential';
