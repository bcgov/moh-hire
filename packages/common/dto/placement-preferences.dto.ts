import { IsBoolean, IsOptional } from 'class-validator';

export class PlacementPreferencesDTO {
  @IsBoolean()
  @IsOptional()
  C19PatientCare!: boolean;
  @IsBoolean()
  @IsOptional()
  C19CommunityCare!: boolean;
  @IsBoolean()
  @IsOptional()
  C19LowRisk!: boolean;
  @IsBoolean()
  @IsOptional()
  C19ClinicSupport!: boolean;
  @IsBoolean()
  @IsOptional()
  WildFireOrOther!: boolean;
}
