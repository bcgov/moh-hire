import { Mailable } from './mail-base.mailable';
import { MailTemplate } from '../enums/mail-template.enum';
import { Recipient } from '../types/recipient';

export class UpdateConfirmationMailable extends Mailable<Record<string, unknown>> {
  public subject = 'Emergency Health Provider Registry - Registration Update Confirmation';
  public readonly template = MailTemplate.UPDATE_CONFIRMATION;

  constructor(
    public readonly recipient: Recipient,
    public readonly context: Record<string, unknown> | null = null,
  ) {
    super(recipient, context);
  }
}
