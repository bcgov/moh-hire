import { IsIn, IsString, ValidateNested } from 'class-validator';
import { AvailabilityDTO } from './availability-information.dto';
import { PersonalInformationDTO } from './personal-information.dto';
import { SkillInformationDTO } from './skill-information.dto';

export class FormDTO {
  @ValidateNested()
  payload!: {
    personalInformation: PersonalInformationDTO;
    skillInformation: SkillInformationDTO;
    availabilityInformation: AvailabilityDTO;
  };
  @IsString()
  @IsIn(['1'])
  version!: string;
}
