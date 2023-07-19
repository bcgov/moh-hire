import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { POSTAL_CODE_REGEX } from '../helper';

export class PersonalInformationDTO {
  constructor(base?: PersonalInformationDTO) {
    if (base) {
      this.firstName = base.firstName;
      this.lastName = base.lastName;
      this.postalCode = base.postalCode;
    }
  }
  @IsString()
  @Length(1, 255, { message: 'First Name must be between 1 and 255 characters' })
  @IsNotEmpty({ message: 'First Name is Required' })
  @Matches(/[^ ]+/, { message: 'First Name is Required' })
  firstName!: string;

  @IsString()
  @Length(1, 255, { message: 'Last Name must be between 1 and 255 characters' })
  @IsNotEmpty({ message: 'Last Name is Required' })
  @Matches(/[^ ]+/, { message: 'Last Name is Required' })
  lastName!: string;

  @IsString()
  @Matches(POSTAL_CODE_REGEX, {
    message: 'Postal Code must be in the format A1A 1A1',
  })
  @IsNotEmpty({ message: 'Postal Code is Required' })
  postalCode!: string;
}
