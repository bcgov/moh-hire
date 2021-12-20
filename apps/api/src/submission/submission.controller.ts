import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubmissionDTO } from '@ehpr/common';
import { SubmissionService } from './submission.service';
import { EmptyResponse } from 'src/common/ro/empty-response.ro';
import { generateConfirmationId } from './id-generator';
import { SubmissionEntity } from './entity/submission.entity';
import { MailService } from 'src/mail/mail.service';

import { Response } from 'express';

import {
  SubmissionExportColumnHeaders,
  SubmissionExportColumns,
} from 'src/common/helper/csv/submissionExport';
import { streamCsvFromData } from 'src/common/helper/csv/transformer';

@Controller('submission')
@ApiTags('Submission')
export class SubmissionController {
  constructor(
    @Inject(SubmissionService) private readonly submissionService: SubmissionService,
    @Inject(MailService) private readonly mailService: MailService,
  ) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: EmptyResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async name(@Body() body: SubmissionDTO): Promise<SubmissionEntity> {
    const id = generateConfirmationId();
    return await this.submissionService.saveSubmission(body, id);
  }

  @ApiOperation({
    summary: 'Get record by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: SubmissionEntity })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getSubmisisonById(@Param('id') id: string): Promise<SubmissionEntity> {
    return await this.submissionService.getSubmissionById(id);
  }

  @ApiOperation({
    summary: 'Export Data',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.OK, type: EmptyResponse })
  @HttpCode(HttpStatus.CREATED)
  @Get('/export/:passCode')
  async exportAll(@Param('passCode') passCode: string, @Res() res: Response) {
    // TODO: Add logging

    // TODO: Based on auth roles in the future.
    if (passCode !== process.env.EXPORT_SECRET) {
      throw new UnauthorizedException();
    }

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment;filename=ehrp.csv',
    });

    // NOTE: Could be paginated
    // Current Metric ~ 150K records ~ 3 sec ~ 38 MB
    const allSubmissions = await this.submissionService.getSubmissions();

    // TODO: Support filter and sorting parameters in future.
    const flattenedData = await this.submissionService.flattenAndTransformSubmissionData(
      allSubmissions,
    );

    const columns = Object.entries(SubmissionExportColumnHeaders).map(([key, header]) => ({
      key,
      header,
    }));
    const stringifier = await streamCsvFromData<SubmissionExportColumns>(
      columns,
      flattenedData,
      res,
    );
    stringifier.end();
  }
}
