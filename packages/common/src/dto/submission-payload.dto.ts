import {
  PersonalInformationDTO,
  ContactInformationDTO,
  SkillInformationDTO,
  AvailabilityDTO,
} from '.';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class SubmissionPayloadDTO {
  constructor(base?: SubmissionPayloadDTO) {
    if (base) {
      this.personalInformation = new PersonalInformationDTO(base.personalInformation);
      this.availabilityInformation = new AvailabilityDTO(base.availabilityInformation);
      this.skillInformation = new SkillInformationDTO(base.skillInformation);
      this.contactInformation = new ContactInformationDTO(base.contactInformation);
    }
  }
  @ValidateNested()
  @IsNotEmpty()
  personalInformation!: PersonalInformationDTO;

  @ValidateNested()
  @IsNotEmpty()
  contactInformation!: ContactInformationDTO;

  @ValidateNested()
  @IsNotEmpty()
  skillInformation!: SkillInformationDTO;

  @ValidateNested()
  @IsNotEmpty()
  availabilityInformation!: AvailabilityDTO;
}
