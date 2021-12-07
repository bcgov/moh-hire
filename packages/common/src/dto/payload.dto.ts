import {
  PersonalInformationDTO,
  ContactInformationDTO,
  SkillInformationDTO,
  AvailabilityDTO,
} from '.';

export class PayloadDTO {
  personalInformation!: PersonalInformationDTO;
  contactInformation!: ContactInformationDTO;
  skillInformation!: SkillInformationDTO;
  availabilityInformation!: AvailabilityDTO;
}
