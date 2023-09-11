import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InviteUserDTO } from '@ehpr/common';
import { AppLogger } from '../common/logger.service';
import { MailOptions } from '../mail/types/mail-options';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AdminService {
  constructor(
    @Inject(Logger) private readonly logger: AppLogger,
    @Inject(MailService)
    private readonly mailService: MailService,
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  async invite(payload: InviteUserDTO) {
    const domain = process.env.DOMAIN;
    const url = domain ? `https://${domain}/login` : 'http://localhost:3000/login';
    const loginLink = `<a href='${url}' />${url}</a>`;

    const mailOptions: MailOptions = {
      body: `<br><div style="text-align: center;">You have been invited to access the <b>Emergency Health Provider Registry (EHPR).</b><br><br>
       Please click the link below to complete your registration.<br>In future you may access the registry login at ${loginLink}.<br><br></div>`,
      from: process.env.MAIL_FROM ?? 'EHPRDoNotReply@dev.ehpr.freshworks.club',
      subject: 'Invitation to EHPR',
      to: [payload.email],
    };

    try {
      await this.mailService.sendMailWithSES(mailOptions);
      return this.userService.createUser(payload);
    } catch (e) {
      this.logger.error(e);
      throw new InternalServerErrorException('failed to invite a user');
    }
  }
}
