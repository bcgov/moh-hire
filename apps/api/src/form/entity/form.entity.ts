import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database/base.entity';
import { FormPayloadDTO } from '@ehpr/common';

@Entity('form')
export class FormEntity extends BaseEntity {
  @Exclude()
  @Column('jsonb', { nullable: false })
  payload!: FormPayloadDTO;

  @Column('varchar', { nullable: true })
  confirmationId!: string;

  @Exclude()
  @Column('varchar', { nullable: true })
  chesTransactionId?: string;

  @Exclude()
  @Column('varchar', { nullable: false })
  version!: string;
}
