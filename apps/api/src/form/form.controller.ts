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
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { FormDTO } from '@ehpr/common';
import { FormService } from './form.service';
import { SwaggerSchema } from './swagger';
import { EmptyResponse } from 'src/common/ro/empty-response.ro';
import { generateConfirmationId } from './id-generator';
import { FormEntity } from './entity/form.entity';

@Controller('form')
@ApiTags('Form')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @ApiBody({
    schema: SwaggerSchema,
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
}
