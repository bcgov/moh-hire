import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

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

  @IsString()
  @Length(6, 12)
  primaryPhone!: string;

  @IsString()
  @IsOptional()
  @Length(6, 12)
  secondaryPhone!: string;

  @IsString()
  @IsEmail()
  @Length(6, 30)
  email!: string;
}
