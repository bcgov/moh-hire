import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FormEntity } from 'src/form/entity/form.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
  ) {}

  async sendMail(): Promise<void> {
    //todo
  }
}
