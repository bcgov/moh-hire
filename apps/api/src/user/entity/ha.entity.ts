import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('health_authorities')
export class HealthAuthoritiesEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('varchar')
  name!: string;
}
