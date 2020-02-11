import { BaseEntity } from './baseEntity';

export class Orgnization extends BaseEntity {
  name!: string;
  email!: string;
  createdDate!: Date;
  phoneNumber!: string;
}
