import {
  PersonalInformationDTO,
  ContactInformationDTO,
  CredentialInformationDTO,
  PreferencesInformationDTO,
} from '.';
import { IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { StatusUpdateDTO } from './status-update.dto';

export class SubmissionPayloadDTO {
  constructor(base?: SubmissionPayloadDTO) {
    if (base) {
      this.personalInformation = new PersonalInformationDTO(base.personalInformation);
      this.contactInformation = new ContactInformationDTO(base.contactInformation);
      this.credentialInformation = new CredentialInformationDTO(base.credentialInformation);
      this.preferencesInformation = new PreferencesInformationDTO(base.preferencesInformation);
      this.status = new StatusUpdateDTO(base.status);
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
  credentialInformation!: CredentialInformationDTO;

  @ValidateNested()
  @IsNotEmpty()
  preferencesInformation!: PreferencesInformationDTO;

  @IsOptional()
  status?: StatusUpdateDTO;
}
