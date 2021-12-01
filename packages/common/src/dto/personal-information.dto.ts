import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class PersonalInformationDTO {
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
  @Matches(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i, {
    message: 'Postal Code must be in the format A1A1A1',
  })
  @IsNotEmpty({ message: 'Postal Code is Required' })
  postalCode!: string;
}
