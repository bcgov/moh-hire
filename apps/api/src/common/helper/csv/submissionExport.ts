// Order determines the CSV column order

export enum SubmissionExportColumnHeaders {
  firstName = 'First Name',
  lastName = 'Last Name',

  stream = 'Stream',

  email = 'Email',

  primaryPhone = 'Primary Phone',
  primaryPhoneExt = 'Primary Phone Ext',

  postalCode = 'Postal Code',

  isImmunized = 'Immunization',

  registrationNumber = 'Registration Number',
  registrationStatus = 'Registration Status',

  deployAnywhere = 'Deploy Anywhere',
  C19ClinicSupport = 'C19 Clinic Support',
  C19CommunityCare = 'C19 Community Care',
  C19LowRisk = 'C19 Low Risk',
  C19PatientCare = 'C19 Patient Care',
  WildFireOrOther = 'Wildfire Or Other',

  deploymentDuration = 'Deployment Duration',
  deploymentLocations = 'Deployment Location',

  secondaryPhone = 'Secondary Phone',
  secondaryPhoneExt = 'secondaryPhoneExt',

  currentEmployment = 'Current Employment Type',
  employmentCircumstance = 'Employment Circumstance',

  nonClinicalJobTitle = 'Non Clinical Job Title',
}

export interface SubmissionExportColumns {
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

  currentEmployment?: string;
  registrationNumber?: string;
  registrationStatus?: string;
  stream?: string;
  nonClinicalJobTitle?: string;
  employmentCircumstance?: string;
}
