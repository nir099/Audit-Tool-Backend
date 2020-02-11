import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { KnowledgeArea } from './knowledgeArea';
import { Revision } from './revision';
import { User } from './user';
import { Evidence } from './evidence';

@Entity('Question')
export class Question {
  @PrimaryGeneratedColumn()
  Id!: number;

  @ManyToOne(
    () => KnowledgeArea,
    knowledgearea => knowledgearea.questions,
  )
  knowledgearea!: KnowledgeArea;

  @ManyToOne(
    () => Revision,
    revision => revision.questions,
  )
  revision!: Revision;

  @ManyToOne(
    () => User,
    user => user.questions,
  )
  user!: User;

  @Column()
  Title!: string;
  @Column()
  Description!: string;
  @Column()
  Version!: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate!: Date;

  @OneToMany(
    () => Evidence,
    evidence => evidence.question,
  )
  evidences!: Evidence[];
}
