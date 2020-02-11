import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product';
import { Phase } from './phase';

@Entity('Product_Phase')
// tslint:disable-next-line: class-name
export class Product_Phase {
  @PrimaryGeneratedColumn()
  Id!: number;

  @ManyToOne(
    () => Product,
    product => product.productphases,
  )
  product!: Product;

  @ManyToOne(
    () => Phase,
    phase => phase.productphases,
  )
  phase!: Phase;

  @Column()
  Score!: number;
}
