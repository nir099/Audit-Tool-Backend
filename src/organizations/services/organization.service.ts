import { IOrganizationRepository } from '@repos/organization.repository.interface';
import { IOrganizationService } from '../interfaces/organization.service.interface';
import { injectable, inject } from 'inversify';
import { TYPES } from 'shared/constants/Types';
@injectable()
export class OrganizationService implements IOrganizationService {
  protected organizationRepository: IOrganizationRepository;
  constructor(
    @inject(TYPES.OrganizationRepository)
    _organizationRepository: IOrganizationRepository,
  ) {
    this.organizationRepository = _organizationRepository;
  }

  async getOrganizationIdByDomain(_domain: string) {
    return await this.organizationRepository.getOrganizationIdFromDomain(
      _domain,
    );
  }
}
