import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class ContactInformationDTO {
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
