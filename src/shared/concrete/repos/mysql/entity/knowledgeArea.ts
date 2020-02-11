import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Phase } from './phase';
import { Question } from './question';

@Entity('KnowledgeArea')
export class KnowledgeArea {
  @PrimaryGeneratedColumn()
  Id!: number;

  @ManyToOne(
    () => Phase,
    phase => phase.knowledgeareas,
  )
  phase!: Phase;

  @Column()
  Name!: string;
  @Column()
  Description!: string;
  @Column()
  Score!: number;

  @OneToMany(
    () => Question,
    question => question.knowledgearea,
  )
  questions!: Question[];
}
