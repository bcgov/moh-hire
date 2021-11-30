import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormEntity } from './entity/form.entity';

@Injectable()
export class FormService {
  constructor(private readonly formRepository: Repository<FormEntity>) {}
  async saveForm() {}
  async getForms() {}
  async getFormById() {}
}
