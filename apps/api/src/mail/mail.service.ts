import { Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import * as path from 'path';
import axios from 'axios';
import * as fs from 'fs';
import { stringify } from 'qs';
import * as handlebars from 'handlebars';
import { Mailable } from './mailables/mail-base.mailable';
import { MailOptions } from './mail-options.interface';
import { ChesResponse } from './types/ches-response';

@Injectable()
export class MailService {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {
    const templatePath = path.resolve(`${__dirname}/templates/partials/layout.hbs`);
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    handlebars.registerPartial('layout', templateContent);
  }
  /**
   * Sends an email
   *
   * @param mailOptions - Email to be sent
   * @returns A promise for the result of sending the email
   */
  public async sendMailWithChes(mailOptions: MailOptions): Promise<ChesResponse> {
    const emailBody = {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      bodyType: 'html',
      body: mailOptions.body,
    };
    const token = await this.getChesToken();

    try {
      const { data } = await axios.post<ChesResponse>(
        `${process.env.CHES_SERVICE_HOST}/api/v1/email`,
        emailBody,
        {
          headers: {
            authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
          timeout: 20000,
        },
      );
      return data;
    } catch (e) {
      this.logger.error(`Error sending email to CHES`);
      throw e;
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
        stringify({ grant_type: 'client_credentials' }),
        {
          auth: {
            username: process.env.CHES_CLIENT_ID as string,
            password: process.env.CHES_CLIENT_SECRET as string,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          timeout: 5000,
        },
      );
      return token.data.access_token;
    } catch (e) {
      this.logger.error(`Error retrieving access token from CHES`);
      throw e;
    }
  }

  /**
   * Sends an email
   *
   * @param mailable - Email to be sent
   * @returns A promise for the result of sending the email
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async sendMailable(mailable: Mailable<any>): Promise<ChesResponse> {
    const mailOptions: Partial<MailOptions> = {
      from: process.env.MAIL_FROM,
      to: [mailable.recipient.email],
      subject: mailable.subject,
    };

    const templatePath = path.resolve(`${__dirname}/templates/${mailable.template}.hbs`);

    let body;
    try {
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(templateContent, { strict: true });
      body = template(mailable.context);
    } catch (e) {
      this.logger.error(`Error compiling template`);
      throw e;
    }

    return await this.sendMailWithChes({
      ...mailOptions,
      body,
    } as MailOptions);
  }
}
