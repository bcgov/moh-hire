import { EmploymentTypes, RegistrationStatus, HealthAuthorities } from '../interfaces';
import { streamData } from '../data/applicant_stream_data';
import { IsIn, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class SkillInformationDTO {
  constructor(base?: SkillInformationDTO) {
    if (base) {
      this.streamTypes = base.streamTypes;
      this.registrationNumber = base.registrationNumber;
      this.registrationStatus = base.registrationStatus;
      this.currentEmploymentType = base.currentEmploymentType;
      this.additionalComments = base.additionalComments;
    }
  }

  @IsString()
  @IsIn(Object.keys(streamData))
  stream!: keyof typeof streamData;

  @IsString()
  @IsIn(Object.values(RegistrationStatus))
  registrationStatus!: RegistrationStatus;

  @IsNumber()
  @Max(99999999)
  @Min(0)
  registrationNumber!: number;

  @IsString()
  @IsIn(Object.values(EmploymentTypes))
  currentEmployment!: EmploymentTypes;

  specialties!: SpecialtyType[];

  healthAuthorities!: HealthAuthorities[];

  @IsString()
  @Length(1, 255)
  @IsOptional()
  additionalComments?: string;
}

export interface SpecialtyType {
  value: string;
  label: string;
  subspecialties?: SubspecialtyType[];
}

export interface SubspecialtyType {
  value: string;
  label: string;
}
