import { IsIn, IsString, ValidateNested } from 'class-validator';
import {
  AvailabilityDTO,
  ContactInformationDTO,
  PersonalInformationDTO,
  SkillInformationDTO,
} from '.';

export class FormDTO {
  @ValidateNested()
  payload!: {
    personalInformation: PersonalInformationDTO;
    contactInformation: ContactInformationDTO;
    skillInformation: SkillInformationDTO;
    availabilityInformation: AvailabilityDTO;
  };

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
