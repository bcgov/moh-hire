import { Controller, Get, Res } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { Response } from 'express';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get('/')
  async generateCaptcha(@Res() res: Response) {
    const captcha = await this.captchaService.generateChallenge();
    return res.send(captcha);
  }
}
