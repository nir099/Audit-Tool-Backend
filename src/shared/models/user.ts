import { BaseEntity } from './baseEntity';

export class User extends BaseEntity {
  organizationId!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  createdDate!: Date;
  phoneNumber!: string;
}
