import { FormPayload } from '@ehpr/common/form-payload';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('form')
export class FormDTO {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('jsonb', { nullable: false })
  payload!: FormPayload;

  @Column('number', {})
  version!: number;

  toResponseObject() {
    return {};
  }
}
