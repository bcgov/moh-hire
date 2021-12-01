import { createValidator } from 'class-validator-formik';

export type { FormPayload as SubmissionType } from '@ehpr/common';

import { PersonalInformationDTO, personalDefaultValues } from './personal';

export const initialSubmissionValues = {
  ...personalDefaultValues,
};

export const personalSchema = createValidator(PersonalInformationDTO);
