import { IUserService } from '../interfaces/user.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
import { IUserRepository } from '@repos/user.repository.interface';
import { User } from '@models/user';
import { IOrganizationRepository } from '@repos/organization.repository.interface';
import { AzureUser } from '@models/azure.user';

@injectable()
export class UserService implements IUserService {
  protected userRepository: IUserRepository;
  protected organizationRepository: IOrganizationRepository;
  constructor(
    @inject(TYPES.UserRepository)
    _userRepository: IUserRepository,
    @inject(TYPES.OrganizationRepository)
    _organizationRepository: IOrganizationRepository,
  ) {
    this.userRepository = _userRepository;
    this.organizationRepository = _organizationRepository;
  }

  async addUser(user: User) {
    return await this.userRepository.add(user);
  }

  async addUserFromTrigger(adUser: AzureUser) {
    const splitted = adUser.email.split('@', 2);
    const data = await this.organizationRepository.getOrganizationIdFromDomain(
      splitted[1],
    );
    const user = new User();
    user.organizationId = data[0].organizationId;
    user.email = adUser.email;
    user.firstName = adUser.firstName;
    user.lastName = adUser.lastName;
    user.phoneNumber = '';
    return await this.userRepository.add(user);
  }

  async getOrganizationByUserEmail(email: string) {
    return await this.userRepository.getOrganizationByUserEmail(email);
  }

  async getUsersByProjectId(id: number) {
    return await this.userRepository.getUsersByProjectId(id);
  }
}
