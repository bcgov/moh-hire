export interface FormPayload {
  personalInformation: {
    firstName: string;
    lastName: string;
    postalCode: string;
    primaryPhone: string;
    secondaryPhone: string;
    email: string;
  };

  skillInformation: {
    streamTypes: StreamTypes;
    registrationStatus: RegistrationStatus;
    registrationNumber: number;
    currentEmploymentType: CurrentEmploymentTypes;
    additionalComments?: string;
  };

  availabilityInformation: {
    deployAnywhere: boolean;
    deploymentLocations: HealthAuthorities[];
    placementPrefs: PlacementPreferences;
    isImmunized: boolean;
    deploymentDuration: DeploymentDurations;
  };
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
  HP_HA_EMPLOYED = 'Health Professional employed by a Health Authority',
  // Needs rewording on the FE
  HP_NOT_HA_EMPLOYED = 'Health Professional not employed by HA',
  RETIRED = 'Retired Health Professional',
  STUDENT_EMPLOYED = 'Student currently employed',
  STUDENT_UNEMPLOYED = 'Student currently not employed',
  OTHER = 'Other',
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
  ZERO_TO_TWO = 1,
  TWO_TO_FOUR,
  FOUR_TO_EIGHT,
  EIGHT_PLUS,
}
