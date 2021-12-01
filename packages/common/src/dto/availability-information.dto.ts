import { IsBoolean, IsIn, IsNumber, Length, ValidateNested } from 'class-validator';

import { DeploymentDurations, HealthAuthorities } from '../interfaces';
import { PlacementPreferencesDTO } from '.';

export class AvailabilityDTO {
  @IsBoolean()
  deployAnywhere!: boolean;

  @Length(0, Object.keys(HealthAuthorities).length)
  deploymentLocations!: HealthAuthorities[];

  @ValidateNested()
  placementPrefs!: PlacementPreferencesDTO;

  @IsBoolean()
  isImmunized!: boolean;

  @IsNumber()
  @IsIn(Object.values(DeploymentDurations))
  deploymentDuration!: DeploymentDurations;
}
