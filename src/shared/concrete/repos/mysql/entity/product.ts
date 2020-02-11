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
import { User } from './user';
import { Product_Phase } from './product_phase';
import { Evidence } from './evidence';

@Entity('Product')
export class Product {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  Name!: string;
  @Column()
  Email!: string;
  @Column()
  Description!: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate!: Date;

  @ManyToOne(
    () => Organization,
    organization => organization.products,
  )
  organization!: Organization;

  @ManyToOne(
    () => User,
    user => user.products,
  )
  user!: User;

  @OneToMany(
    () => Product_Phase,
    productphase => productphase.product,
  )
  productphases!: Product_Phase[];

  @OneToMany(
    () => Evidence,
    evidence => evidence.product,
  )
  evidences!: Evidence[];

  @ManyToMany(() => User)
  @JoinTable()
  users!: User[];
}
