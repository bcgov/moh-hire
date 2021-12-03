import { FormPayload } from '@ehpr/common';
import { BaseEntity } from 'src/database/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('form')
export class FormEntity extends BaseEntity {
  @Column('jsonb', { nullable: false })
  payload!: FormPayload;

  @Column('varchar', { nullable: false })
  version!: string;
}
