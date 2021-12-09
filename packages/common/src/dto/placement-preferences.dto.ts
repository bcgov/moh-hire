import { IsBoolean, IsOptional } from 'class-validator';

export class PlacementPreferencesDTO {
  constructor(base?: PlacementPreferencesDTO) {
    if (base) {
      this.C19ClinicSupport = base.C19ClinicSupport;
      this.C19CommunityCare = base.C19CommunityCare;
      this.C19LowRisk = base.C19LowRisk;
      this.C19PatientCare = base.C19PatientCare;
      this.WildFireOrOther = base.WildFireOrOther;
    }
  }
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
