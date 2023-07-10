import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubmissionDTO, SubmissionRO, UpdateSubmissionDTO } from '@ehpr/common';
import { SubmissionService } from './submission.service';
import { AppLogger } from 'src/common/logger.service';

@Controller('submission')
@ApiTags('Submission')
export class SubmissionController {
  constructor(
    @Inject(Logger) private readonly logger: AppLogger,
    @Inject(SubmissionService) private readonly submissionService: SubmissionService,
  ) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: SubmissionRO })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async name(@Body() body: SubmissionDTO): Promise<SubmissionRO> {
    try {
      const { id, confirmationId } = await this.submissionService.saveSubmission(body);
      return { id, confirmationId };
    } catch (e) {
      this.logger.error(e, SubmissionService.name);
      throw new InternalServerErrorException('An unknown error occurred while saving a submission');
    }
  }

  @ApiOperation({
    summary: 'Update a submission record',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.OK, type: SubmissionRO })
  @HttpCode(HttpStatus.OK)
  @Patch(':confirmationId')
  async updateSubmission(
    @Param('confirmationId') confirmationId: string,
    @Body() body: UpdateSubmissionDTO,
  ): Promise<SubmissionRO> {
    return this.submissionService.updateSubmission(confirmationId, body);
  }
}
