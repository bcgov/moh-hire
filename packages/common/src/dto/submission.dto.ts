import { IsIn, IsString } from 'class-validator';
import { IsValidSubmission } from './is-valid-submission.decorator';
import { SubmissionPayloadDTO } from './submission-payload.dto';

export class SubmissionDTO {
  @IsValidSubmission()
  payload!: SubmissionPayloadDTO;

  @IsString()
  @IsIn(['v1'])
  version!: string;
}
