import { ContactInformationDTO, FormPayload } from '@ehpr/common';
import { createValidator } from 'class-validator-formik';
import { contactDefaultValues } from './contact';

export type { FormPayload as SubmissionType } from '@ehpr/common';

import { PersonalInformationDTO, personalDefaultValues } from './personal';

// @todo remove DeepPartial when all form steps are implemented
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const initialSubmissionValues: DeepPartial<FormPayload> = {
  personalInformation: personalDefaultValues,
  contactInformation: contactDefaultValues,
  skillInformation: undefined,
  availabilityInformation: undefined,
};

export const personalSchema = createValidator(PersonalInformationDTO);
export const contactSchema = createValidator(ContactInformationDTO);
