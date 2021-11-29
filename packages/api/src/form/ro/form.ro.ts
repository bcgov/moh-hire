import { FormPayload } from '@ehpr/common/form-payload';

export class FormRO {
  constructor() {}
  id!: number;
  version!: number;
  payload!: FormPayload;
}
