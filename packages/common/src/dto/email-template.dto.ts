import { IsArray, IsOptional, IsString } from 'class-validator';

export class RegistrantDataDTO {
  constructor(base?: RegistrantDataDTO) {
    if (base) {
      this.id = base.id;
      this.email = base.email;
    }
  }
  @IsString()
  id!: string;

  @IsString()
  email!: string;
}

export class EmailTemplateDTO {
  constructor(base?: EmailTemplateDTO) {
    if (base) {
      this.userId = base.userId;
      this.subject = base.subject;
      this.body = base.body;
      this.data = base.data;
    }
  }

  @IsOptional()
  @IsString()
  userId?: string | undefined;

  @IsString()
  subject!: string;

  @IsString()
  body!: string;

  @IsArray()
  data!: RegistrantDataDTO[];
}
