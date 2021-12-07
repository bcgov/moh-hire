import {
  AvailabilityDTO,
  ContactInformationDTO,
  PersonalInformationDTO,
  SkillInformationDTO,
} from '.';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class PayloadDTO {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PersonalInformationDTO)
  personalInformation!: PersonalInformationDTO;

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
