import { Controller, Get, Res } from '@nestjs/common';
import { CaptchaService } from './captcha.service';
import { Response } from 'express';

@Controller('captcha')
export class CaptchaController {
  constructor(private readonly captchaService: CaptchaService) {}

  @Get('/')
  generateCaptcha(@Res() res: Response) {
    const captcha = this.captchaService.generateChallenge();
    return res.send(captcha);
  }
}
