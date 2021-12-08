import { IsIn, IsString } from 'class-validator';
import { IsValidForm } from './is-valid-form.decorator';
import { FormPayloadDTO } from './form-payload.dto';

export class FormDTO {
  @IsValidForm()
  payload!: FormPayloadDTO;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
