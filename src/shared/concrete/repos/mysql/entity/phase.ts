import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product_Phase } from './product_phase';
import { KnowledgeArea } from './knowledgeArea';
import { Revision } from './revision';

@Entity('Phase')
export class Phase {
  @PrimaryGeneratedColumn()
  Id!: number;
  @Column()
  Name!: string;
  @Column()
  Description!: string;

  @OneToMany(
    () => Product_Phase,
    productphase => productphase.phase,
  )
  productphases!: Product_Phase[];

  @OneToMany(
    () => KnowledgeArea,
    knowledgearea => knowledgearea.phase,
  )
  knowledgeareas!: KnowledgeArea[];

  @OneToMany(
    () => Revision,
    revision => revision.phase,
  )
  revisions!: Revision[];
}
