import {
  PersonalInformationDTO,
  PreferencesInformationDTO,
  ContactInformationDTO,
  SubmissionPayloadDTO,
} from '@ehpr/common';
import { createValidator } from 'class-validator-formik';
import { contactDefaultValues } from './contact';
import { credentialDefaultValues } from './credential';
import { personalDefaultValues } from './personal';
import { CredentialInformationDTO } from './credential';
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
  credentialInformation: credentialDefaultValues,
  preferencesInformation: preferencesDefaultValues,
  confirm: false,
};

export const personalSchema = createValidator(PersonalInformationDTO);
export const contactSchema = createValidator(ContactInformationDTO);
export const credentialSchema = createValidator(CredentialInformationDTO);
export const preferencesSchema = createValidator(PreferencesInformationDTO);
export { reviewSchema } from './review';

export * from './credential';
