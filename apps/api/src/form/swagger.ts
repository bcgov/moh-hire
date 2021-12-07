import {
  CurrentEmploymentTypes,
  DeploymentDurations,
  HealthAuthorities,
  RegistrationStatus,
  StreamTypes,
} from '@ehpr/common';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

const primaryInformationSchema = {
  type: 'object',
  nullable: false,
  properties: {
    firstName: { type: 'string', nullable: false, example: 'First Name' },
    lastName: { type: 'string', nullable: false, example: 'Last Name' },
    postalCode: { type: 'string', nullable: false, example: 'A1A1A1' },
  },
};

const contactInformation = {
  type: 'object',
  nullable: false,
  properties: {
    primaryPhone: { type: 'string', nullable: false, example: '2345678909' },
    secondaryPhone: { type: 'string', nullable: true },
    email: { type: 'string', nullable: false, example: 'hello@example.com' },
  },
};

const skillInformation: SchemaObject = {
  type: 'object',
  nullable: false,
  properties: {
    streamTypes: { type: typeof StreamTypes, nullable: false, example: StreamTypes.NURSE },
    registrationStatus: {
      type: 'enum',
      nullable: false,
      example: RegistrationStatus.REGISTERED,
    },
    registrationNumber: { type: 'number', nullable: false, example: 12345 },
    currentEmploymentType: {
      type: 'enum',
      nullable: false,
      example: CurrentEmploymentTypes.HP_HA_EMPLOYED,
    },
    additionalComments: { type: 'string', nullable: true },
  },
};

const availabilityInformation = {
  type: 'object',
  nullable: false,
  properties: {
    deployAnywhere: { type: 'boolean', nullable: false, example: false },
    deploymentLocations: {
      type: 'string',
      nullable: true,
      isArray: true,
      example: [HealthAuthorities.VANCOUVER_COASTAL, HealthAuthorities.VANCOUVER_ISLAND],
    },
    placementPrefs: {
      type: 'object',
      nullable: false,
      example: { C19PatientCare: true },
    },
    isImmunized: { type: 'boolean', nullable: false, example: false },
    deploymentDuration: {
      type: 'enum',
      nullable: false,
      example: DeploymentDurations.ZERO_TO_TWO,
    },
  },
};

export const SwaggerSchema: SchemaObject = {
  type: 'object',
  properties: {
    payload: {
      nullable: false,
      type: 'object',
      properties: {
        primaryInformationSchema,
        contactInformation,
        skillInformation,
        availabilityInformation,
      },
    },
    version: { type: 'string', nullable: false, example: 'v1' },
  },
};
