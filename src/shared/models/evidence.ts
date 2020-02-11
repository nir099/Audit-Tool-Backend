import { BaseEntity } from './baseEntity';

export class Evidence extends BaseEntity {
  productId!: string;
  questionId!: string;
  userId!: string;
  content!: string;
  status!: string;
  version!: string;
  createdDate!: string;
}
