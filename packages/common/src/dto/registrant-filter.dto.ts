import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class RegistrantFilterDTO {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsNumberString()
  @IsOptional()
  skip?: number;

  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsOptional()
  anyRegion?: boolean;

  @IsOptional()
  excludeWithdrawn?: boolean;
}
