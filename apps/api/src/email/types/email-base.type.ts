/**
 * NotificationType
 * The base class that notification types extend
 */

import { EmailTemplate } from '../enums/email-template.enum';
import { FormEntity } from 'src/form/entity/form.entity';

export abstract class EmailType<Context = Record<string, unknown>> {
  // Notification Subject
  public abstract subject: string;

  // For now, because all of our notifications are mail, we have a mandatory MailTemplate
  // We may want to extend this type if we have different notifications
  public abstract template: EmailTemplate;

  constructor(public readonly user: FormEntity, public readonly context: Context | null = null) {}
}
