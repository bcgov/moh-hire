import { IsArray, IsString } from 'class-validator';

export class EmailTemplateDTO {
  constructor(base?: EmailTemplateDTO) {
    if (base) {
      this.subject = base.subject;
      this.body = base.body;
      this.emails = base.emails;
    }
  }

  @IsString()
  subject!: string;

  @IsString()
  body!: string;

  @IsArray()
  emails!: string[];
}
