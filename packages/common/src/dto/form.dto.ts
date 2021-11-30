import { IsIn, IsString, ValidateNested } from 'class-validator';
import { AvailabilityDTO } from './availability-information.dto';
import { ContactInformationDTO } from './contact-information.dto';
import { PersonalInformationDTO } from './personal-information.dto';
import { SkillInformationDTO } from './skill-information.dto';

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
