import {
  EmploymentTypes,
  RegistrationStatus,
  HealthAuthorities,
  NotEmployedReasons,
} from '../interfaces';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { IsArrayOfSpecialties } from './is-array-of-specialties.decorator';
import { StreamId, validStreamIds } from '../helper';

export class SkillInformationDTO {
  constructor(base?: SkillInformationDTO) {
    if (base) {
      this.stream = base.stream;
      this.registrationNumber = base.registrationNumber;
      this.registrationStatus = base.registrationStatus;
      this.specialties = base.specialties?.map(specialty => new SpecialtyDTO(specialty));
      this.currentEmployment = base.currentEmployment;
      this.notEmployedReason = base.notEmployedReason;
      this.additionalComments = base.additionalComments;
    }
  }

  @IsIn(validStreamIds, { message: 'Invalid stream type selection' })
  @IsString({ message: 'Stream Type is required' })
  stream!: StreamId;

  @IsIn(Object.values(RegistrationStatus), { message: 'Invalid registration status selection' })
  @IsString({ message: 'Registration status is required' })
  registrationStatus!: RegistrationStatus;

  @IsString({ message: 'Invalid value' })
  @IsOptional()
  registrationNumber!: string;

  @IsIn(Object.values(EmploymentTypes), { message: 'Invalid employment type selection' })
  @IsString({ message: 'Current employment selection is required' })
  currentEmployment!: EmploymentTypes;

  @ValidateIf(o => !!o.stream)
  @Validate(IsArrayOfSpecialties)
  specialties!: SpecialtyDTO[];

  @ValidateIf(o =>
    [EmploymentTypes.HEALTH_SECTOR_EMPLOYED, EmploymentTypes.HEALTH_SECTORY_RESIDENCY].includes(
      o.currentEmployment,
    ),
  )
  @IsArray({ message: 'Health authority selection is required' })
  @ArrayMinSize(1, { message: 'Health authority selection is required' })
  @ArrayMaxSize(Object.values(HealthAuthorities).length, {
    message: 'Invalid health authority selection',
  })
  healthAuthorities!: HealthAuthorities[];

  @ValidateIf(o => EmploymentTypes.NOT_HEALTH_SECTOR_EMPLOYED === o.currentEmployment)
  @IsIn(Object.values(NotEmployedReasons), { message: 'Invalid <question> selection' })
  @IsString({ message: '<question> selection is required' })
  notEmployedReason!: NotEmployedReasons;

  @IsString()
  @Length(0, 50)
  @IsOptional()
  additionalComments?: string;
}

export class SpecialtyDTO {
  constructor(base?: SpecialtyDTO) {
    if (base) {
      this.name = base.name;
      this.subspecialties = base.subspecialties?.map(
        subspecialty => new SubspecialtyDTO(subspecialty),
      );
    }
  }

  @IsString({ message: 'Specialty is required' })
  @Length(5, 255, { message: 'Specialty must be between 1 and 255 characters' })
  name!: string;

  @IsArray({ message: 'Health authority selection is required' })
  @ArrayMinSize(1, { message: 'Health authority selection is required' })
  @ArrayMaxSize(5, {
    message: 'Invalid subspecialty selection',
  })
  @ValidateNested()
  subspecialties?: SubspecialtyDTO[];
}

export class SubspecialtyDTO {
  constructor(base?: SubspecialtyDTO) {
    if (base) {
      this.name = base.name;
    }
  }

  @IsString({ message: 'Specialty is required' })
  name!: string;
}
