import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FormEntity } from './entity/form.entity';
import { FormDTO } from '@ehpr/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
  ) {}
  async saveForm(dto: FormDTO, confirmationId: string) {
    const newForm = this.formRepository.create({ ...dto, confirmationId });
    return await this.formRepository.save(newForm);
  }
  async getForms(): Promise<FormEntity[]> {
    return await this.formRepository.find();
  }
  async getFormById(id: string): Promise<FormEntity> {
    return await this.formRepository.findOneOrFail({
      confirmationId: id,
    });
  }
}
