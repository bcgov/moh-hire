import { Controller, Get, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get current application version',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('/version')
  getVersion(): object {
    return this.appService.getVersionInfo();
  }

  @ApiOperation({
    summary: 'Trigger a sample error',
  })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR })
  @Get('/error')
  getError(): object {
    throw new InternalServerErrorException('This is a sample internal server error');
  }
}
