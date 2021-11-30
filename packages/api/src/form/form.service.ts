import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormDTO } from './dto/form.dto';
import { FormEntity } from './entity/form.entity';

@Injectable()
export class FormService {
  constructor(private readonly formRepository: Repository<FormEntity>) {}
  async saveForm(dto: FormDTO) {
    const newForm = this.formRepository.create(dto);
    return await this.formRepository.save(newForm);
  }
  async getForms(): Promise<FormEntity[]> {
    return await this.formRepository.find();
  }
  async getFormById(id: number): Promise<FormEntity> {
    return (await this.formRepository.findByIds([id]))[0];
  }
}
