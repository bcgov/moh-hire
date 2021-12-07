import { IsIn, IsString } from 'class-validator';
import { ValidateNestedObject } from './validate-nested.decorator';
import { FormPayload } from './form-class.dto';

export class FormDTO {
  @ValidateNestedObject()
  payload!: FormPayload;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
