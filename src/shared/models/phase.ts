import { BaseEntity } from './baseEntity';

export class Phase extends BaseEntity {
  phaseId!: number;
  name!: string;
  description!: string;
  score!: number;
}
