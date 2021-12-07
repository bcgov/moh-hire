import { IsIn, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PayloadDTO } from '.';

export class FormDTO {
  @ValidateNested()
  @IsNotEmpty()
  @Type(() => PayloadDTO)
  payload!: PayloadDTO;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
