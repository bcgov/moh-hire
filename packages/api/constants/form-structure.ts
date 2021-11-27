export interface FormData {
  // Page 1
  first_name: string;
  last_name: string;
  postal_code: string;
  // Page 2
  primary_phone: string;
  secondary_phone: string;
  email: string;
  // Page 3
  stream_types: StreamTypes;
  registration_status: RegistrationStatus;
  registration_number: number;
  current_employment_type: CurrentEmploymentTypes;
  additional_comments?: string;

  // Page 4
  deploy_anywhere: boolean;
  deployment_locations: HealthAuthorities[];
  placement_prefs: PlacementPreferences;
  is_immunized: boolean;
  deployment_duration: DeploymentDurations;
}

// TODO get Stream types
export enum StreamTypes {
  NURSE = 'Nurse',
  // ...
}

export enum RegistrationStatus {
  REGISTERED = 'Registered with good standing',
  TEMP = 'Tempoarary emergency registrant',
  NOT_REGISTERED = 'Not registered with college',
  NA = 'Not applicable',
}

export enum CurrentEmploymentTypes {
  HP_HA_EMPLOYED = '',
  HP_NOT_HA_EMPLOYED = '',
  RETIRED = '',
  STUDENT_EMPLOYED = '',
  STUDENT_UNEMPLOYED = '',
}

export enum HealthAuthorities {
  FIRST_NATION_HA = 'First Nation Health Authority',
  PROVIDENCE = 'Providence Health Care',
  PROVINCIAL_HSA = 'Provincial Health Services Authority',
  FRASER = 'Fraser Health',
  INTERIOR = 'Interior Health',
  NORTHEREN = 'Northern Health',
  VANCOUVER_COASTAL = 'Vancouver Costal Health',
  VANCOUVER_ISLAND = 'Vancouver Island Health',
}

// TODO get values
export enum MainSpecilaization {
  SPEC_1 = 'Specialization 1',
  SPEC_2 = 'Specialization 2',
  SPEC_3 = 'Specialization 3',
}

// TODO get values
export enum SubSpecialization {
  SUBSPEC_1 = 'Sub specialization 1',
  SUBSPEC_2 = 'Sub specialization 2',
  SUBSPEC_3 = 'Sub specialization 3',
}
export interface PlacementPreferences {
  C19PatientCare: boolean;
  C19CommunityCare: boolean;
  C19LowRisk: boolean;
  C19ClinicSupport: boolean;
  WildFireOrOther: boolean;
}

export enum DeploymentDurations {
  ZeroToTwo = 1,
  TwoToFour = 2,
  FourToEight = 3,
  EightPlus = 4,
}
