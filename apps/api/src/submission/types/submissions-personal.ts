export type SubmissionPersonalInfo = {
  id: string;
  confirmationId: string;
  firstName: string;
  lastName: string;
};

export type GetSubmissionsPersonalInfoResponse = {
  submissions: SubmissionPersonalInfo[];
  missingIds: string[];
};
