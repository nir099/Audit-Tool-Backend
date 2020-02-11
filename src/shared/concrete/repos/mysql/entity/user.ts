import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Organization } from './organization';
import { Product } from './product';
import { Question } from './question';
import { Evidence } from './evidence';
@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  FirstName!: string;
  @Column()
  LastName!: string;
  @Column()
  Email!: string;
  @Column()
  PhoneNumber!: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate!: Date;

  @ManyToOne(
    () => Organization,
    organization => organization.users,
  )
  organization!: Organization;

  @OneToMany(
    () => Product,
    product => product.user,
  )
  products!: Product[];

  @OneToMany(
    () => Question,
    question => question.user,
  )
  questions!: Question[];

  @OneToMany(
    () => Evidence,
    evidence => evidence.user,
  )
  evidences!: Evidence[];
}
