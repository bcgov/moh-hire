import { IsString, Length } from 'class-validator';

export class PersonalInformationDTO {
  @IsString()
  @Length(2, 20)
  firstName!: string;

  @IsString()
  @Length(2, 20)
  lastName!: string;

  @IsString()
  @Length(6, 7)
  postalCode!: string;
}
