import { IsIn, IsString } from 'class-validator';
import { IsValidSubmission } from '../validators/is-valid-submission.decorator';
import { SubmissionPayloadDTO } from './submission-payload.dto';

export class SubmissionDTO {
  @IsValidSubmission({ message: 'Invalid payload' })
  payload!: SubmissionPayloadDTO;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
