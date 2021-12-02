import { Body, Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { FormDTO } from '@ehpr/common';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(
    @Inject(FormService)
    private readonly formService: FormService,
  ) {}
  @Post('')
  async name(@Res() res: any, @Body() body: FormDTO) {
    await this.formService.saveForm(body);
    return res.status(HttpStatus.CREATED).send({ message: 'Success' });
  }
}
