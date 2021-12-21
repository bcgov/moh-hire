import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/database/base.entity';
import { SubmissionPayloadDTO } from '@ehpr/common';

@Entity('submission')
export class SubmissionEntity extends BaseEntity {
  @Exclude()
  @Column('jsonb', { nullable: false })
  payload!: SubmissionPayloadDTO;

  @Column('varchar', { nullable: true })
  confirmationId!: string;

  @Exclude()
  @Column('varchar', { nullable: true })
  chesId?: string;

  @Exclude()
  @Column('varchar', { nullable: false })
  version!: string;
}
