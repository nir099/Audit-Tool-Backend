import { IOrganizationRepository } from '../../../abstract/repos/organization.repository.interface';
import { Orgnization } from '../../../models/organization';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { User } from '@models/user';
import { Domain as DomainEntity } from '../mysql/entity/domain';
import { mapDbItems, domainMapper } from './dbMapper';

@injectable()
export class MySQLOrganizationRepository implements IOrganizationRepository {
  async getOrganizationIdFromDomain(_domain: string): Promise<User[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('domain.OrganizationId')
        .from(DomainEntity, 'domain')
        .where('domain.domain = :domain', { domain: _domain })
        .getRawMany();
      return mapDbItems(result, domainMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }
  get(_itemId: number): Orgnization {
    throw new Error('Method not implemented.');
  }
  add(_item: Orgnization) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: Orgnization) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
