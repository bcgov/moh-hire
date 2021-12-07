import { IsIn, IsString, ValidateNested } from 'class-validator';
import { ValidateNestedObject } from './custom-decorator';
import { FormClass } from './form-class.dto';
import { Type } from 'class-transformer';

export class FormDTO {
  @ValidateNested()
  @ValidateNestedObject()
  @Type(() => FormClass)
  payload!: FormClass;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
