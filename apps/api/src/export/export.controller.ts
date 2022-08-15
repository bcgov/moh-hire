import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { ExportService } from './export.service';

@Controller('export')
@ApiTags('Export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}
  @ApiOperation({
    summary: '',
  })
  @Post()
  async exportSubmissions(@Res() res: any) {
    await this.exportService.formatSubmission();
    return res.status(HttpStatus.CREATED).send({});
  }
  @ApiOperation({
    summary: 'Decrypt an encrypted xlsx',
  })
  @Post('/decrypt')
  async decryptXLSXFile(@Res() res: any) {
    await this.exportService.decryptFile();
    return res.status(HttpStatus.CREATED).send({});
  }
}
