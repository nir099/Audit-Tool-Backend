import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Question } from './question';
import { Product } from './product';

@Entity('Evidence')
export class Evidence {
  @PrimaryGeneratedColumn()
  Id!: number;

  @ManyToOne(
    () => Product,
    product => product.evidences,
  )
  product!: Product;

  @ManyToOne(
    () => Question,
    question => question.evidences,
  )
  question!: Question;

  @ManyToOne(
    () => User,
    user => user.evidences,
  )
  user!: User;

  @Column()
  Content!: string;
  @Column()
  Status!: string;
  @Column()
  Version!: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate!: Date;
}
