import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseInterceptors,
} from '@nestjs/common';
import { ExportDTO, FormExportColumns, FormExportColumnHeaders } from '@ehpr/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmptyResponse } from 'src/common/ro/empty-response.ro';
import { CsvService } from './csv.service';
import { FormService } from 'src/form/form.service';

@Controller('export')
@ApiTags('Export')
export class CsvController {
  constructor(private readonly csvService: CsvService, private readonly formService: FormService) {}

  @ApiOperation({
    summary: 'Export Data',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({ status: HttpStatus.CREATED, type: EmptyResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async exportAll(@Body() body: ExportDTO) {
    if (body.passCode === process.env.EXPORT_SECRET) {
      // TODO: Needs to be paginated
      const allForms = await this.formService.getForms();
      const flattenedData = await this.formService.flattenAndTransformFormData(allForms);
      const columns =  (Object.entries(FormExportColumnHeaders).map(([key, header]) => ({key, header })));
      await this.csvService.generateCsvFromData<FormExportColumns>(columns, flattenedData);
    } else {
      throw new UnauthorizedException();
    }
  }
}
