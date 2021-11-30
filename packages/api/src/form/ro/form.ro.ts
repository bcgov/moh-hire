import { FormPayload } from '@ehpr/common/form-payload';

export class FormRO {
  id!: number;
  version!: number;
  payload!: FormPayload;
}
