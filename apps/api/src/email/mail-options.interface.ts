/**
 * MailOptions
 * Interface for what to pass into Sendgrids sendMail
 */

import { EmailTemplate } from './enums/email-template.enum';

export interface MailOptions {
  readonly to: string | string[];

  readonly from: string;

  readonly subject: string;

  readonly template: EmailTemplate;

  // Any template variables that need to added
  readonly context?: Record<string, unknown>;
}
