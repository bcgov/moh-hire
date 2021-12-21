import { ContactInformationDTO, SubmissionPayloadDTO } from '@ehpr/common';
import { createValidator } from 'class-validator-formik';
import { contactDefaultValues } from './contact';
import { credentialDefaultValues } from './credential';
import { PersonalInformationDTO, personalDefaultValues } from './personal';
import { SkillInformationDTO } from './credential';

export type { SubmissionPayloadDTO as SubmissionType } from '@ehpr/common';

// @todo remove DeepPartial when all form steps are implemented
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const initialSubmissionValues: DeepPartial<SubmissionPayloadDTO> = {
  personalInformation: personalDefaultValues,
  contactInformation: contactDefaultValues,
  skillInformation: credentialDefaultValues,
  availabilityInformation: undefined,
};

export const personalSchema = createValidator(PersonalInformationDTO);
export const contactSchema = createValidator(ContactInformationDTO);
export const credentialSchema = createValidator(SkillInformationDTO);

export * from './credential';
