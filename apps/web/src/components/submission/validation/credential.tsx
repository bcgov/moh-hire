import { OptionType } from '@components';
import {
  EmploymentTypes,
  HealthAuthorities,
  EmploymentCircumstances,
  RegistrationStatus,
  SkillInformationDTO,
  getStreams,
  getSpecialtiesByStreamId,
  getSubSpecialtiesBySpecialtyId,
  StreamId,
} from '@ehpr/common';

export { SkillInformationDTO } from '@ehpr/common';

export const defaultSpecialtyValue = {
  name: '',
  subspecialties: [],
};

export const credentialDefaultValues: Partial<SkillInformationDTO> = {
  stream: undefined,
  registrationStatus: undefined,
  registrationNumber: undefined,
  currentEmployment: undefined,
  specialties: [defaultSpecialtyValue],
  healthAuthorities: [],
  employmentCircumstance: undefined,
  additionalComments: undefined,
};

export const streamOptions = getStreams().map(({ id, name }) => ({
  value: id,
  label: name,
}));

export const getSpecialtyOptions = (streamSelection: StreamId): OptionType[] => {
  const specialties = getSpecialtiesByStreamId(streamSelection);

  return specialties.map(({ id, name }) => ({
    value: id,
    label: name,
  }));
};

export const getSubspecialtyOptions = (specialties: string[]): Array<OptionType[] | null> => {
  const subspecialties = specialties.map(specialty => {
    const subspecialty = getSubSpecialtiesBySpecialtyId(specialty);
    if (!subspecialty) return null;
    return subspecialty.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  });

  return subspecialties;
};

export const registrationStatusOptions = [
  { value: RegistrationStatus.REGISTERED, label: 'Registered with good standing' },
  { value: RegistrationStatus.TEMP, label: 'Temporary emergency registrant' },
  { value: RegistrationStatus.NOT_REGISTERED, label: 'Not registered with college' },
  { value: RegistrationStatus.NA, label: 'Not applicable' },
];

export const employmentOptions = [
  {
    label: 'Employed in the health sector',
    value: EmploymentTypes.HEALTH_SECTOR_EMPLOYED,
  },
  {
    label: 'Practicum/residency in the health sector',
    value: EmploymentTypes.HEALTH_SECTORY_RESIDENCY,
  },
  {
    label: 'Not currently employed in the health sector',
    value: EmploymentTypes.NOT_HEALTH_SECTOR_EMPLOYED,
  },
];

export const healthAuthorityOptions = [
  {
    value: HealthAuthorities.FIRST_NATION_HA,
    label: 'First Nation Health Authority',
  },
  {
    value: HealthAuthorities.PROVIDENCE,
    label: 'Providence Health Care',
  },
  {
    value: HealthAuthorities.PROVINCIAL_HSA,
    label: 'Provincial Health Services Authority',
  },
  {
    value: HealthAuthorities.FRASER,
    label: 'Fraser Health',
  },
  {
    value: HealthAuthorities.INTERIOR,
    label: 'Interior Health',
  },
  {
    value: HealthAuthorities.NORTHEREN,
    label: 'Northern Health',
  },
  {
    value: HealthAuthorities.VANCOUVER_COASTAL,
    label: 'Vancouver Costal Health',
  },
  {
    value: HealthAuthorities.VANCOUVER_ISLAND,
    label: 'Vancouver Island Health',
  },
];

export const employmentCircumstanceOptions = [
  {
    value: EmploymentCircumstances.RETIRED,
    label: 'Retired',
  },
  {
    value: EmploymentCircumstances.STUDENT,
    label: 'Student',
  },
  {
    value: EmploymentCircumstances.OTHER,
    label: 'Other',
  },
];
