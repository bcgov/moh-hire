import { RegistrantRO } from '@ehpr/common';
import { SubmissionEntity } from './entity/submission.entity';

export const formatRegistrants = (submissions: SubmissionEntity[]): RegistrantRO[] => {
  const flatNormalizedRegistrants: RegistrantRO[] = [];

  submissions.forEach(({ payload }) => {
    const {
      personalInformation,
      credentialInformation,
      preferencesInformation,
      contactInformation,
    } = payload;

    const payloadData = {
      firstName: personalInformation?.firstName,
      lastName: personalInformation?.lastName,
      email: contactInformation?.email,
      specialty: '',
      deploymentLocations: preferencesInformation?.deploymentLocations,
      placementOptions: preferencesInformation?.placementOptions,
    };

    if (!credentialInformation?.specialties.length) {
      flatNormalizedRegistrants.push({ ...payloadData });
    } else {
      // handle multiple specialties
      const specialtiesId = credentialInformation?.specialties.map(item => item.id);
      flatNormalizedRegistrants.push({ ...payloadData, specialty: specialtiesId });
    }
  });

  return flatNormalizedRegistrants;
};
