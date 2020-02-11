import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Product } from './product';
import { Domain } from './domain';

@Entity('Organization')
export class Organization {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  Name!: string;
  @Column()
  Email!: string;
  @Column()
  PhoneNumber!: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate!: Date;

  @OneToMany(
    () => User,
    user => user.organization,
  )
  users!: User[];

  @OneToMany(
    () => Product,
    product => product.organization,
  )
  products!: Product[];

  @OneToMany(
    () => Domain,
    domain => domain.organization,
  )
  domains!: Domain[];
}
