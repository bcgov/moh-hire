import * as yup from 'yup';
import { FieldsType } from '.';

export const credentialFields: FieldsType<CredentialType> = {
  credentialFoo: yup.string(),
};

export interface CredentialType {
  credentialFoo: string;
}

export const credentialDefaultValues = {
  credentialFoo: '',
};
