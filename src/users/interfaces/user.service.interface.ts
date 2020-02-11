import { User } from '@models/user';
import { AzureUser } from '@models/azure.user';

export interface IUserService {
  addUser(user: User): Promise<boolean>;
  addUserFromTrigger(adUser: AzureUser): Promise<number>;
  getOrganizationByUserEmail(email: string): Promise<User[]>;
  getUsersByProjectId(id: number): Promise<User[]>;
}
