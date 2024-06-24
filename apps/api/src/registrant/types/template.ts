export type SubmissionMap = {
  confirmationId: string;
  firstName: string;
  lastName: string;
  fullName: string;
};

export type ProcessTemplate = {
  templateBody: string;
  email: string;
  domain: string;
  submissionData: SubmissionMap;
};
