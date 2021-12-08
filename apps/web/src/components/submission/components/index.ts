import { SubmissionType } from '../validation';

export interface FormStepProps {
  formKey: keyof SubmissionType;
}

export * from './Contact';
export * from './Credential';
export * from './Preferences';
export * from './Personal';
export * from './Review';
