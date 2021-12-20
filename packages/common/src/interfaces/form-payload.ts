import {
  AvailabilityDTO,
  ContactInformationDTO,
  PersonalInformationDTO,
  SkillInformationDTO,
} from 'src';

export interface SubmissionPayload {
  personalInformation: PersonalInformationDTO;
  contactInformation: ContactInformationDTO;
  skillInformation: SkillInformationDTO;
  availabilityInformation: AvailabilityDTO;
}

export enum RegistrationStatus {
  REGISTERED = 'registered',
  TEMP = 'temp',
  NOT_REGISTERED = 'notRegistered',
  NA = 'na',
}

export enum EmploymentTypes {
  HEALTH_SECTOR_EMPLOYED = 'healthSectorEmployed',
  HEALTH_SECTORY_RESIDENCY = 'healthSectorResidency',
  NOT_HEALTH_SECTOR_EMPLOYED = 'notHealthSectorEmployed',
}

export enum HealthAuthorities {
  FIRST_NATION_HA = 'firstNationHa',
  PROVIDENCE = 'providence',
  PROVINCIAL_HSA = 'provincialHsa',
  FRASER = 'fraser',
  INTERIOR = 'interior',
  NORTHEREN = 'nothern',
  VANCOUVER_COASTAL = 'vancouverCoastal',
  VANCOUVER_ISLAND = 'vancouverIsland',
}

export enum EmploymentCircumstances {
  RETIRED = 'retired',
  STUDENT = 'student',
  OTHER = 'other',
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
