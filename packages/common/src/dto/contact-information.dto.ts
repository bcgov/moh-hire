import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator';

const TEN_DIGIT_PHONE_REGEX = /^\(?([0-9]{3})\)?[ -.●]?([0-9]{3})[ -.●]?([0-9]{4})$/;
const EXTENSION_REGEX = /^[0-9]{0,3}$/;

export class ContactInformationDTO {
  constructor(base?: ContactInformationDTO) {
    if (base) {
      this.primaryPhone = base.primaryPhone;
      this.primaryPhoneExt = base.primaryPhoneExt;
      this.email = base.email;
      this.secondaryPhone = base.secondaryPhone;
      this.secondaryPhoneExt = base.secondaryPhoneExt;
    }
  }
  @IsString()
  @Matches(TEN_DIGIT_PHONE_REGEX, {
    message: 'Phone number must be a 10 digit number',
  })
  primaryPhone!: string;

  @IsString()
  @IsOptional()
  @Length(0, 3, {
    message: '4 character limit',
  })
  @Matches(EXTENSION_REGEX, {
    message: 'Extension must be a number with up to 3 digits.',
  })
  primaryPhoneExt!: string;

  @ValidateIf(o => !!o.secondaryPhone)
  @IsString()
  @Matches(TEN_DIGIT_PHONE_REGEX, {
    message: 'Phone number must be a 10 digit number',
  })
  secondaryPhone!: string;

  @IsString()
  @IsOptional()
  @Length(0, 3, {
    message: 'Extensions can be a maximum of 3 digits',
  })
  @Matches(EXTENSION_REGEX, {
    message: 'Extension must be a number with up to 3 digits.',
  })
  secondaryPhoneExt!: string;

  @IsString()
  @IsEmail()
  @Length(1, 255, { message: 'Email must be between 1 and 255 characters' })
  @IsNotEmpty({ message: 'Email is Required' })
  @Matches(/[^ ]+/, { message: 'Email is Required' })
  email!: string;
}
