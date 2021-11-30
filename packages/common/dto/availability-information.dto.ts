import { DeploymentDurations, HealthAuthorities } from '@ehpr/common/form-payload';
import { IsBoolean, IsIn, IsNumber, Length, ValidateNested } from 'class-validator';
import { PlacementPreferencesDTO } from './placement-preferences.dto';

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
