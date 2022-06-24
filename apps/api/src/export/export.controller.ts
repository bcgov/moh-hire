import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { ExportService } from './export.service';

@Controller('export')
@ApiTags('Export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}
  @ApiOperation({
    summary: 'Create a new record',
  })
  @Post()
  async exportSubmissions(@Res() res: any) {
    await this.exportService.formatSubmission();
    return res.status(HttpStatus.CREATED).send({});
  }
}
