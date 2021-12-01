import { IsString, Length, Matches } from 'class-validator';

export class PersonalInformationDTO {
  @IsString()
  @Length(1, 255)
  firstName!: string;

  @IsString()
  @Length(1, 255)
  lastName!: string;

  @IsString()
  @Matches(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i)
  postalCode!: string;
}
