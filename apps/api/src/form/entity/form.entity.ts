import { FormPayload } from '@ehpr/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('form')
export class FormEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('jsonb', { nullable: false })
  payload!: FormPayload;

  @Column('text', {})
  version!: string;
}
