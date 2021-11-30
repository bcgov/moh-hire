import { FormPayload } from '@ehpr/common/form-payload';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('form')
export class FormEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('jsonb', { nullable: false })
  payload!: FormPayload;

  @Column('string', {})
  version!: string;
}
