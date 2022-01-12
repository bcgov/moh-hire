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
  FIRST_NATIONS_HA = 'firstNationsHa',
  PROVIDENCE = 'providence',
  PROVINCIAL_HSA = 'provincialHsa',
  FRASER = 'fraser',
  INTERIOR = 'interior',
  VANCOUVER_ISLAND = 'vancouverIsland',
  NORTHEREN = 'northern',
  VANCOUVER_COASTAL = 'vancouverCoastal',
  PRIVATE_EMPLOYER = 'privateEmployer',
}

export enum EmploymentCircumstances {
  RETIRED = 'retired',
  STUDENT = 'student',
  OTHER = 'other',
}

export enum PlacementOptions {
  CRITICAL_CARE_ICU = 'criticalCareICU',
  EMERGENCY_DEPARTMENTS = 'emergencyDepartments',
  LONG_TERM_CARE = 'longTermCare',
  HOME_SUPPORT = 'homeSupport',
  COVID_19_SUPPORT = 'covid19Support',
  ANYWHERE = 'anywhere',
  OTHER = 'other',
}

export enum DeploymentDurations {
  TWO_TO_FOUR_WEEKS = 'twoToFour',
  FOUR_TO_EIGHT = 'fourToEight',
  EIGHT_PLUS = 'eightPlus',
}

export enum DeploymentTypes {
  FULL_TIME = 'fullTime',
  PART_TIME = 'partTime',
}
