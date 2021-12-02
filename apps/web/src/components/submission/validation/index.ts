import { ContactInformationDTO } from '@ehpr/common';
import { createValidator } from 'class-validator-formik';
import { contactDefaultValues } from './contact';

export type { FormPayload as SubmissionType } from '@ehpr/common';

import { PersonalInformationDTO, personalDefaultValues } from './personal';

export const initialSubmissionValues = {
  ...personalDefaultValues,
  ...contactDefaultValues,
};

export const personalSchema = createValidator(PersonalInformationDTO);
export const contactSchema = createValidator(ContactInformationDTO);
