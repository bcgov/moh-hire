import { OptionType } from '@components';
import {
  EmploymentTypes,
  HealthAuthorities,
  RegistrationStatus,
  SkillInformationDTO,
  streamData,
} from '@ehpr/common';

export { SkillInformationDTO } from '@ehpr/common';

export const defaultSpecialtyValue = {
  name: '',
  subSpecialties: [],
};

export const credentialDefaultValues: Partial<SkillInformationDTO> = {
  stream: undefined,
  registrationStatus: undefined,
  registrationNumber: undefined,
  currentEmployment: undefined,
  specialties: [defaultSpecialtyValue],
  healthAuthorities: [],
  additionalComments: undefined,
};

export const streamOptions = Object.entries(streamData).map(([key, value]) => ({
  value: key,
  label: value.name,
}));

export const getSpecialtyOptions = (stream: keyof typeof streamData): OptionType[] | null => {
  const specialties = streamData[stream]?.specialties;

  if (!specialties) return null;

  return Object.entries(specialties).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));
};

export const getSubSpecialtyOptions = (
  stream: string,
  specialties: string[],
): Array<OptionType[] | null> | null => {
  if (specialties.length === 0) return [];

  const currentStream = streamData[stream];
  if (!currentStream) return null;

  const subSpecialties: Array<OptionType[] | null> = [];

  for (const specialty of specialties) {
    const currentSpecialty = currentStream.specialties?.[specialty];
    // if selected specialtiy isn't found, don't return subspecialties
    const currentSubSpecialties = currentSpecialty?.subSpecialties;

    if (!currentSpecialty || !currentSubSpecialties) {
      subSpecialties.push(null);
      continue;
    }

    const currentSubSpecialtyOption: OptionType[] = [];

    Object.entries(currentSubSpecialties).forEach(([key, value]) =>
      currentSubSpecialtyOption.push({
        value: key,
        label: value.name,
      }),
    );

    subSpecialties.push(currentSubSpecialtyOption);
  }

  return subSpecialties;
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
