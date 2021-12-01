import { FormPayload } from '@ehpr/common';

export class FormRO {
  id!: number;
  version!: number;
  payload!: FormPayload;
}
