import { IsIn, IsString, ValidateNested } from 'class-validator';
import { PayloadDTO } from '.';

export class FormDTO {
  @ValidateNested()
  payload!: PayloadDTO;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
