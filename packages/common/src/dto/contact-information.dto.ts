import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';

const TEN_DIGIT_PHONE_REGEX = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
const OPTIONAL_TEN_DIGIT_PHONE_REGEX = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

export class ContactInformationDTO {
  @IsString()
  @Matches(TEN_DIGIT_PHONE_REGEX, {
    message: 'Phone number must be a 10 digit number',
  })
  primaryPhone!: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  primaryPhoneExt!: string;

  @IsString()
  @Matches(OPTIONAL_TEN_DIGIT_PHONE_REGEX, {
    message: 'Phone number must be a 10 digit number',
  })
  @IsOptional()
  secondaryPhone!: string;

  @IsString()
  @IsOptional()
  @Length(0, 255)
  secondaryPhoneExt!: string;

  @IsString()
  @IsEmail()
  @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
  @IsNotEmpty({ message: 'Email is Required' })
  @Matches(/[^ ]+/, { message: 'Email is Required' })
  email!: string;
}
