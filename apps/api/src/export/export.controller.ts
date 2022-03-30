import { Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from 'src/mail/mail.service';
import { ExportService } from './export.service';

@Controller('export')
@ApiTags('Export')
export class ExportController {
  constructor(
    private readonly exportService: ExportService,
    private readonly mailService: MailService,
  ) {}
  @ApiOperation({
    summary: 'Create a new record',
  })
  @Post()
  async exportSubmissions(@Res() res: any) {
    await this.exportService.exportSubmissions();
    // await this.mailService.sendMailWithChes({
    //   to: 'dbayly@freshworks.io',
    //   from: process.env.CHES_SERVICE_HOST || '',
    //   subject: 'EHPR export for today',
    //   body: '',
    // });
    return res.status(HttpStatus.CREATED).send({});
  }
}
