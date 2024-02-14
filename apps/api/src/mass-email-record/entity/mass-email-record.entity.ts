import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/entity/user.entity';
import { GenericError } from 'src/common/generic-exception';

@Entity('mass_email_record')
export class MassEmailRecordEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid', nullable: false })
  userId!: string;

  @Column({ type: 'jsonb', nullable: false })
  recipients!: string[];

  @Column({ type: 'jsonb', default: null })
  errors?: GenericError[];

  @CreateDateColumn()
  @Exclude()
  createdDate!: Date;

  @ManyToOne(() => UserEntity, user => user.id)
  user!: UserEntity;
}
