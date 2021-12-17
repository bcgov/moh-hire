import { IsArray, IsBoolean, IsIn, IsNumber, ValidateNested } from 'class-validator';

import { DeploymentDurations, HealthAuthorities } from '../interfaces';
import { PlacementPreferencesDTO } from '.';

export class AvailabilityDTO {
  constructor(base?: AvailabilityDTO) {
    if (base) {
      this.deployAnywhere = base.deployAnywhere;
      this.deploymentLocations = base.deploymentLocations;
      this.placementPrefs = new PlacementPreferencesDTO(base.placementPrefs);
      this.isImmunized = base.isImmunized;
      this.deploymentDuration = base.deploymentDuration;
    }
  }

  @IsBoolean()
  deployAnywhere!: boolean;

  @IsArray()
  deploymentLocations!: string[];

  @ValidateNested()
  placementPrefs!: PlacementPreferencesDTO;

  @IsBoolean()
  isImmunized!: boolean;

  @IsNumber()
  @IsIn(Object.values(DeploymentDurations))
  deploymentDuration!: DeploymentDurations;
}
