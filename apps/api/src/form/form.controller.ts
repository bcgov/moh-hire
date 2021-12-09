import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExportDTO, FormDTO, FormExportColumnHeaders, FormExportColumns } from '@ehpr/common';
import { FormService } from './form.service';
import { EmptyResponse } from 'src/common/ro/empty-response.ro';
import { generateConfirmationId } from './id-generator';
import { FormEntity } from './entity/form.entity';
import { streamCsvFromData } from 'src/helpers/csv';
import { Response } from 'express';

@Controller('form')
@ApiTags('Form')
export class FormController {
  constructor(private readonly formService: FormService) {}

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
  @ApiResponse({ status: HttpStatus.CREATED, type: EmptyResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post('/export')
  async exportAll(@Body() body: ExportDTO, @Res() res: Response) {
    if (body.passCode === process.env.EXPORT_SECRET) {
      res.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment;filename=ehrp.csv',
      });

      // TODO: Needs to be paginated
      const allForms = await this.formService.getForms();

      // TODO: Support filter and sorting parameters in future.
      const flattenedData = await this.formService.flattenAndTransformFormData(allForms);

      const columns = Object.entries(FormExportColumnHeaders).map(([key, header]) => ({
        key,
        header,
      }));
      const stringifier = await streamCsvFromData<FormExportColumns>(columns, flattenedData, res);
      stringifier.end();
    } else {
      throw new UnauthorizedException();
    }
  }
}
