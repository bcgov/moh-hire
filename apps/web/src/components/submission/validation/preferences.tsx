import * as yup from 'yup';
import { FieldsType } from '.';

export const preferencesFields: FieldsType<PreferencesType> = {
  preferencesFoo: yup.string(),
};

export interface PreferencesType {
  preferencesFoo: string;
}

export const preferencesDefaultValues = {
  preferencesFoo: '',
};
