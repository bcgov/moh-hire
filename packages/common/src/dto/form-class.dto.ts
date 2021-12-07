import {
  PersonalInformationDTO,
  ContactInformationDTO,
  SkillInformationDTO,
  AvailabilityDTO,
} from '.';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class FormClass {
  constructor(base: FormClass) {
    this.personalInformation = new PersonalInformationDTO(base.personalInformation);
    this.availabilityInformation = new AvailabilityDTO(base.availabilityInformation);
    this.skillInformation = new SkillInformationDTO(base.skillInformation);
    this.contactInformation = new ContactInformationDTO(base.contactInformation);
  }
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PersonalInformationDTO)
  personalInformation: PersonalInformationDTO;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => ContactInformationDTO)
  contactInformation!: ContactInformationDTO;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => SkillInformationDTO)
  skillInformation!: SkillInformationDTO;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => AvailabilityDTO)
  availabilityInformation!: AvailabilityDTO;
}
