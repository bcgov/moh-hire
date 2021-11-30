import { Controller, Post } from '@nestjs/common';
import { FormService } from './form.service';

@Controller('form')
export class FormController {
  constructor(private readonly formService: FormService) {}
  @Post('')
  async name() {}
}
