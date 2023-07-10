import axios from 'axios';
import { DeepPartial, SubmissionType } from 'src/components/submission/validation';
import { UpdateSubmissionDTO } from '@ehpr/common';

export const submitForm = async (submission: DeepPartial<SubmissionType>) => {
  // @todo when the form is fully implemented this object should be of type FormDTO
  const submissionData = {
    payload: submission,
    version: 'v1',
  };
  return await axios.post(`/submission`, submissionData);
};

export const getSubmission = async (confirmationId: string) => {
  const { data } = await axios.get(`/submission/${confirmationId}`);
  return data.data;
};

export const updateSubmission = async (confirmationId: string, payload: UpdateSubmissionDTO) => {
  const { data } = await axios.patch(`/submission/${confirmationId}`, payload);
  return data.data;
};
