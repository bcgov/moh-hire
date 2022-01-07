import { Controller, Get, HttpStatus } from '@nestjs/common';
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
}
