import axios from 'axios';
import { DeepPartial, SubmissionType } from 'src/components/submission/validation';
import { UpdateSubmissionDTO } from '@ehpr/common';
import { isValidConfirmationId } from '../util';

export const submitForm = async (submission: DeepPartial<SubmissionType>) => {
  // @todo when the form is fully implemented this object should be of type FormDTO
  const submissionData = {
    payload: submission,
    version: 'v1',
  };
  return await axios.post(`/submission`, submissionData);
};

export const updateSubmission = async (confirmationId: string, payload: UpdateSubmissionDTO) => {
  if (!isValidConfirmationId(confirmationId)) {
    throw new Error('Invalid confirmation ID format');
  }

  const { data } = await axios.patch(`/submission/${confirmationId}`, payload);
  return data.data;
};
