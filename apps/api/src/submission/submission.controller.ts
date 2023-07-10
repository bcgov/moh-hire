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
import { SubmissionEntity } from './entity/submission.entity';
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
  async name(@Body() body: SubmissionDTO): Promise<SubmissionEntity> {
    try {
      return await this.submissionService.saveSubmission(body);
    } catch (e) {
      this.logger.error(e, SubmissionService.name);
      throw new InternalServerErrorException('An unknown error occurred while saving a submission');
    }
  }

  @ApiOperation({
    summary: 'Get a submission record',
  })
  @ApiResponse({ status: HttpStatus.OK, type: SubmissionRO })
  @HttpCode(HttpStatus.OK)
  @Get(':confirmationId')
  async getSubmission(@Param('confirmationId') confirmationId: string) {
    return await this.submissionService.getSubmission(confirmationId);
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
  ): Promise<SubmissionEntity> {
    return await this.submissionService.updateSubmission(confirmationId, body);
  }
}
