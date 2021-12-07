import { PayloadDTO } from '@ehpr/common';
import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database/base.entity';

@Entity('form')
export class FormEntity extends BaseEntity {
  @Column('jsonb', { nullable: false })
  payload!: PayloadDTO;

  @Column('varchar', { nullable: true })
  confirmationId!: string;

  @Exclude()
  @Column('timestamp', { nullable: true })
  timestamp?: Date;

  @Exclude()
  @Column('varchar', { nullable: false })
  version!: string;
}
