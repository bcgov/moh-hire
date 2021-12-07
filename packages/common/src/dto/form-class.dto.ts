import {
  PersonalInformationDTO,
  ContactInformationDTO,
  SkillInformationDTO,
  AvailabilityDTO,
} from '.';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class FormPayload {
  constructor(base: FormPayload) {
    this.personalInformation = new PersonalInformationDTO(base.personalInformation);
    this.availabilityInformation = new AvailabilityDTO(base.availabilityInformation);
    this.skillInformation = new SkillInformationDTO(base.skillInformation);
    this.contactInformation = new ContactInformationDTO(base.contactInformation);
  }
  @ValidateNested()
  @IsNotEmpty()
  personalInformation: PersonalInformationDTO;

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
