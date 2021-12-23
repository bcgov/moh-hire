import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubmissionDTO } from '@ehpr/common';
import { SubmissionService } from './submission.service';
import { EmptyResponse } from 'src/common/ro/empty-response.ro';
import { SubmissionEntity } from './entity/submission.entity';

@Controller('submission')
@ApiTags('Submission')
export class SubmissionController {
  constructor(@Inject(SubmissionService) private readonly submissionService: SubmissionService) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: EmptyResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async name(@Body() body: SubmissionDTO): Promise<SubmissionEntity> {
    try {
      return await this.submissionService.saveSubmission(body);
    } catch (e) {
      throw new InternalServerErrorException('An unknown error occured while saving a submission');
    }
  }
}
