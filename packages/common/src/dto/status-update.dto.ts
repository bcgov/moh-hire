import { IsBoolean, IsDateString, IsOptional, ValidateIf } from 'class-validator';

export class StatusUpdateDTO {
  constructor(base?: StatusUpdateDTO) {
    if (base) {
      this.interested = base.interested;
      this.deployed = base.deployed;
      this.startDate = base.startDate;
      this.endDate = base.endDate;
    }
  }

  @IsBoolean()
  interested?: boolean;

  @IsBoolean()
  deployed?: boolean;

  @ValidateIf(o => o.deployed)
  @IsDateString()
  startDate?: string;

  @ValidateIf(o => o.deployed)
  @IsDateString()
  @IsOptional()
  endDate?: string;
}
