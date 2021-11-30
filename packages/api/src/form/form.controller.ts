import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { FormDTO } from './dto/form.dto';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}
  @Post('')
  async name(@Res() res: any, @Body() body: FormDTO) {
    await this.formService.saveForm(body);
    return res.status(HttpStatus.CREATED).send({ message: 'Success' });
  }
}
