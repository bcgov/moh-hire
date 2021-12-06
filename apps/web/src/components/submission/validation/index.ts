import { ContactInformationDTO, FormPayloadDTO } from '@ehpr/common';
import { createValidator } from 'class-validator-formik';
import { contactDefaultValues } from './contact';
import { credentialDefaultValues } from './credential';
import { PersonalInformationDTO, personalDefaultValues } from './personal';

export type { FormPayloadDTO as SubmissionType } from '@ehpr/common';

// @todo remove DeepPartial when all form steps are implemented
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const initialSubmissionValues: DeepPartial<FormPayloadDTO> = {
  personalInformation: personalDefaultValues,
  contactInformation: contactDefaultValues,
  skillInformation: credentialDefaultValues,
  availabilityInformation: undefined,
};

export const personalSchema = createValidator(PersonalInformationDTO);
export const contactSchema = createValidator(ContactInformationDTO);

export * from './credential';
