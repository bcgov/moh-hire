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
import { FormDTO } from '@ehpr/common';
import { FormService } from './form.service';
import { EmptyResponse } from 'src/common/ro/empty-response.ro';
import { generateConfirmationId } from './id-generator';
import { FormEntity } from './entity/form.entity';
import { MailService } from 'src/mail/mail.service';

import { Response } from 'express';

import { FormExportColumnHeaders, FormExportColumns } from 'src/common/helper/csv/formExport';
import { streamCsvFromData } from 'src/common/helper/csv/transformer';

@Controller('form')
@ApiTags('Form')
export class FormController {
  constructor(
    @Inject(FormService) private readonly formService: FormService,
    @Inject(MailService) private readonly mailService: MailService,
  ) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: EmptyResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async name(@Body() body: FormDTO): Promise<FormEntity> {
    const id = generateConfirmationId();
    return await this.formService.saveForm(body, id);
  }

  @ApiOperation({
    summary: 'Get record by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: FormEntity })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async getFormById(@Param('id') id: string): Promise<FormEntity> {
    return await this.formService.getFormById(id);
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
    const allForms = await this.formService.getForms();

    // TODO: Support filter and sorting parameters in future.
    const flattenedData = await this.formService.flattenAndTransformFormData(allForms);

    const columns = Object.entries(FormExportColumnHeaders).map(([key, header]) => ({
      key,
      header,
    }));
    const stringifier = await streamCsvFromData<FormExportColumns>(columns, flattenedData, res);
    stringifier.end();
  }
}
