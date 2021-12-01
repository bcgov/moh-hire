import * as yup from 'yup';

import { personalFields, personalDefaultValues, PersonalInformationType } from './personal';
import { contactFields, contactDefaultValues, ContactType } from './contact';
import { credentialFields, credentialDefaultValues, CredentialType } from './credential';
import { preferencesFields, preferencesDefaultValues, PreferencesType } from './preferences';
import { reviewFields, reviewDefaultValues, ReviewType } from './review';

export type FieldsType<T> = Record<keyof T, yup.AnySchema>;

export interface SubmissionType
  extends PersonalInformationType,
    ContactType,
    CredentialType,
    PreferencesType,
    ReviewType {}

export const initialSubmissionValues: SubmissionType = {
  ...personalDefaultValues,
  ...contactDefaultValues,
  ...credentialDefaultValues,
  ...preferencesDefaultValues,
  ...reviewDefaultValues,
};

export const personalSchema = yup.object().shape(personalFields);
export const contactSchema = yup.object().shape(contactFields);
export const credentialSchema = yup.object().shape(credentialFields);
export const preferencesSchema = yup.object().shape(preferencesFields);
// review schema is a snowflake and validates all fields at the end
export const reviewSchema = yup.object().shape({
  ...personalFields,
  ...contactFields,
  ...credentialFields,
  ...preferencesFields,
  ...reviewFields,
});
