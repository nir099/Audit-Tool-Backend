import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Question } from './question';
import { Phase } from './phase';

@Entity('Revision')
export class Revision {
  @PrimaryGeneratedColumn()
  Id!: number;

  @ManyToOne(
    () => Phase,
    phase => phase.revisions,
  )
  phase!: Phase;

  @Column()
  Name!: number;
  @Column()
  ReleaseNotes!: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  CreatedDate!: Date;
  @Column()
  Email!: string;
  @Column()
  Version!: number;

  @OneToMany(
    () => Question,
    question => question.revision,
  )
  questions!: Question[];
}
