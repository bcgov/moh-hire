import { ArrayMaxSize, ArrayMinSize, IsArray, IsBoolean, ValidateIf } from 'class-validator';

import { DeploymentDurations } from '../interfaces';
import { PlacementPreferencesDTO } from '.';
import { LhaId, validLhaIds } from '../helper';

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

  @IsBoolean({ message: 'This field is required' })
  deployAnywhere!: boolean;

  @ValidateIf(o => o.deployAnywhere === false)
  @IsArray({ message: 'Location selection is required' })
  @ArrayMinSize(1, { message: 'Location selection is required' })
  @ArrayMaxSize(validLhaIds.length, {
    message: 'Invalid location selection',
  })
  deploymentLocations!: LhaId[];

  placementPrefs!: PlacementPreferencesDTO;

  isImmunized!: boolean;

  deploymentDuration!: DeploymentDurations;
}
