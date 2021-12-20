import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsString,
  ValidateIf,
} from 'class-validator';

import { DeploymentDurations, PlacementOptions } from '../interfaces';
import { LhaId, validLhaIds } from '../helper';

export class AvailabilityDTO {
  constructor(base?: AvailabilityDTO) {
    if (base) {
      this.deployAnywhere = base.deployAnywhere;
      this.deploymentLocations = base.deploymentLocations;
      this.placementOptions = base.placementOptions;
      this.hasImmunizationTraining = base.hasImmunizationTraining;
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

  @IsArray({ message: 'Placement options are required' })
  @ArrayMinSize(1, { message: 'Placement options are required' })
  @ArrayMaxSize(Object.values(PlacementOptions).length, {
    message: 'Invalid placement options',
  })
  placementOptions!: PlacementOptions[];

  @IsBoolean({ message: 'This field is required' })
  hasImmunizationTraining!: boolean;

  @IsString({ message: 'Deployment duration is required' })
  @IsIn(Object.values(DeploymentDurations), { message: 'Invalid deployment duration selection' })
  deploymentDuration!: DeploymentDurations;
}
