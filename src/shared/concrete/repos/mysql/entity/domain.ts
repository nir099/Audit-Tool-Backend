import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Organization } from './organization';

@Entity('Domain')
export class Domain {
  @PrimaryGeneratedColumn()
  Id!: number;

  @ManyToOne(
    () => Organization,
    organization => organization.users,
  )
  organization!: Organization;

  @Column()
  Domain!: string;
}
