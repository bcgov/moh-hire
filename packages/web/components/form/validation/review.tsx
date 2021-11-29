import * as yup from 'yup';

export const reviewFields = {
  certify: yup
    .boolean()
    .required('Please confirm before submit')
    .oneOf([true], 'Please confirm before submit'),
};

export interface ReviewType {
  certify: boolean;
}

export const reviewDefaultValues = {
  certify: false,
};
