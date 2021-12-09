export enum FormExportColumnHeaders {
  deployAnywhere = 'Deploy Anywhere',
  deploymentDuration = 'Deployment Duration',
  deploymentLocations = 'Deployment Location',
  isImmunized = 'Immunization',
  C19ClinicSupport = 'C19 Clinic Support',
  C19CommunityCare = 'C19 Community Care',
  C19LowRisk = 'C19 Low Risk',
  C19PatientCare = 'C19 Patient Care',
  WildFireOrOther = 'Wild Fire Or Other',
  email = 'Email',
  primaryPhone = 'Primary Phone',
  primaryPhoneExt = 'Primary Phone Ext',
  secondaryPhone = 'secondaryPhone',
  secondaryPhoneExt = 'secondaryPhoneExt',
  firstName = 'firstName',
  lastName = 'lastName',
  postalCode = 'postalCode',
  currentEmploymentType = 'currentEmploymentType',
  registrationNumber = 'registrationNumber',
  registrationStatus = 'registrationStatus',
  streamTypes = 'streamTypes',
  additionalComments = 'additionalComments',
}

export interface FormExportColumns {
  deployAnywhere?: string;
  deploymentDuration?: string;
  deploymentLocations?: string;
  isImmunized?: string;

  C19ClinicSupport?: string;
  C19CommunityCare?: string;
  C19LowRisk?: string;
  C19PatientCare?: string;
  WildFireOrOther?: string;

  email?: string;
  primaryPhone?: string;
  primaryPhoneExt?: string;
  secondaryPhone?: string;
  secondaryPhoneExt?: string;

  firstName?: string;
  lastName?: string;
  postalCode?: string;

  currentEmploymentType?: string;
  registrationNumber?: string;
  registrationStatus?: string;
  streamTypes?: string;
  additionalComments?: string;
}
