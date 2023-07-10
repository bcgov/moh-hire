import { SubmissionPayloadDTO } from '../dto';

export class SubmissionRO {
  id!: number;
  version!: number;
  payload!: SubmissionPayloadDTO;
  confirmationId!: string;
}
