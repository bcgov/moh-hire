import axios from 'axios';
import { DeepPartial, SubmissionType } from 'src/components/submission/validation';

export const submitForm = async (form: DeepPartial<SubmissionType>) => {
  return await axios.post(`/form`, form);
};
