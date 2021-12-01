import * as yup from 'yup';
import { FieldsType } from '.';

export const primaryFields: FieldsType<PrimaryType> = {
  primaryFoo: yup.string(),
};

export interface PrimaryType {
  primaryFoo: string;
}

export const primaryDefaultValues = {
  primaryFoo: '',
};
