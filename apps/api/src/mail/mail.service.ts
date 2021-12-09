import { Inject, Injectable, Logger, Optional } from '@nestjs/common';
import * as path from 'path';
import axios from 'axios';
import * as fs from 'fs';
import { MailerService } from '@nestjs-modules/mailer';
import * as handlebars from 'handlebars';
import { Mailable } from './mailables/mail-base.mailable';
import { MailOptions } from './mail-options.interface';
import { GenericException } from 'src/common/generic-exception';
import { MailError } from './mail.error';

@Injectable()
export class MailService {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    @Optional()
    private readonly mailerService: MailerService,
  ) {}
  /**
   * Sends an email
   *
   * @param mailOptions - Email to be sent
   * @returns A promise for the result of sending the email
   */
  public async sendMailWithChes(mailOptions: MailOptions): Promise<void> {
    const emailBody = {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      bodyType: 'html',
      body: mailOptions.template,
      contexts: mailOptions.context,
    };
    const token = await this.getChesToken();
    try {
      await axios.post(`${process.env.CHES_SERVICE_HOST}/api/v1/email`, emailBody, {
        headers: {
          authorization: `bearer ${token}`,
          host: (process.env.CHES_SERVICE_HOST as string).replace('https://', ''),
          'content-type': 'application/json',
        },
      });
    } catch (e) {
      throw new GenericException(MailError.FAILED_TO_SEND_EMAIL, e);
    }
  }

  /**
   * Auxiliary function to get access token from CHES
   *
   */
  private async getChesToken() {
    try {
      const token = await axios.post(
        process.env.CHES_AUTH_URL as string,
        new URLSearchParams({ grant_type: 'client_credentials' }),
        {
          auth: {
            username: process.env.CHES_CLIENT_ID as string,
            password: process.env.CHES_CLIENT_SECRET as string,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Host: (process.env.CHES_AUTH_URL as string).replace('https://', ''),
          },
        },
      );
      return token.data.access_token;
    } catch (e) {
      throw new GenericException(MailError.FAILED_TO_GET_CHES_TOKEN, e);
    }
  }

  /**
   * Sends an email
   *
   * @param mailable - Email to be sent
   * @returns A promise for the result of sending the email
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async sendMailable(mailable: Mailable<any>): Promise<void> {
    const mailOptions: Partial<MailOptions> = {
      from: process.env.MAIL_FROM,
      to: mailable.recipient.email,
      subject: mailable.subject,
      template: mailable.template,
      context: mailable.context,
    };

    if (process.env.USE_MAILTRAP === 'true') {
      return await this.mailerService.sendMail({
        ...mailOptions,
        template: mailable.template,
      } as MailOptions);
    } else {
      const templatePath = path.resolve(`${__dirname}/templates/${mailable.template}.hbs`);
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(templateContent, { strict: true });
      const body = template(mailable.context);

      return await this.sendMailWithChes({
        ...mailOptions,
        body,
      } as MailOptions);
    }
  }
}
