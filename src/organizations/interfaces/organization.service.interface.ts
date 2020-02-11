import { User } from '@models/user';

export interface IOrganizationService {
  getOrganizationIdByDomain(domain: string): Promise<User[]>;
}
