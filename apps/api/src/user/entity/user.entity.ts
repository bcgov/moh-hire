import { Column, Entity } from 'typeorm';
import { Role, User } from '@ehpr/common';
import { BaseEntity } from '../../database/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity implements User {
  @Column('varchar', { nullable: true })
  name!: string;

  @Column({ type: 'enum', enum: Role, default: Role.Pending })
  role!: Role;
}
