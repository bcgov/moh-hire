import { EmailType } from './email-base.type';
import { EmailTemplate } from '../enums/email-template.enum';
import { FormEntity } from 'src/form/entity/form.entity';

export class SubmissionEmailType extends EmailType<Record<string, unknown>> {
  public subject = 'Submission Successful';
  public readonly template = EmailTemplate.SUCCESSFUL_SUBMISSION;

  constructor(
    public readonly user: FormEntity,
    public readonly context: Record<string, unknown> | null = null,
    subject: string,
  ) {
    super(user, context);
    this.subject = subject;
  }
}
