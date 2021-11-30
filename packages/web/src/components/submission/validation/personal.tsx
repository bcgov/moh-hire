import * as yup from 'yup';
import { FieldsType } from '.';

export const personalFields: FieldsType<PersonalInformationType> = {
  personalFoo: yup.string(),
};

export interface PersonalInformationType {
  personalFoo: string;
}

export const primaryDefaultValues = {
  personalFoo: '',
};
