import axios from 'axios';
import { DeepPartial, SubmissionType } from 'src/components/submission/validation';

export const submitForm = async (form: DeepPartial<SubmissionType>) => {
  // @todo when the form is fully implemented this object should be of type FormDTO
  const formData = {
    payload: form,
    version: 'v1',
  };
  return await axios.post(`/form`, formData);
};
