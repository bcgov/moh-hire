import { Body, Controller, HttpCode, HttpStatus, Inject, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { FormDTO } from '@ehpr/common';
import { FormService } from './form.service';
import { EmptyResponse } from 'src/common/ro/empty-response.ro';

@Controller('form')
@ApiTags('Form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: EmptyResponse })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async name(@Body() body: FormDTO): Promise<void> {
    await this.formService.saveForm(body);
  }
}
