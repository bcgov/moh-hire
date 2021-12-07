import { IsIn, IsString } from 'class-validator';
import { IsValidForm } from './is-valid-form.decorator';
import { FormPayload } from './form-payload.dto';

export class FormDTO {
  @IsValidForm()
  payload!: FormPayload;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
