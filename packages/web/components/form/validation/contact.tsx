import * as yup from 'yup';
import { FieldsType } from '.';

export const contactFields: FieldsType<ContactType> = {
  contactFoo: yup.string(),
};

export interface ContactType {
  contactFoo: string;
}

export const contactDefaultValues = {
  contactFoo: '',
};
