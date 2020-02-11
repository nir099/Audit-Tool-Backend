import { Phase } from './../../../models/phase';
import { IPhaseRepository } from '../../../abstract/repos/phase.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { mapDbItems, phasesMapper } from './dbMapper';
import { Product_Phase } from './entity/product_phase';

@injectable()
export class MYSQLPhaseRepository implements IPhaseRepository {
  async getPhases(productId: number): Promise<Phase[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(Product_Phase)
        .createQueryBuilder('product_phase')
        .leftJoinAndSelect('product_phase.phase', 'phases')
        .select('product_phase')
        .addSelect('phases')
        .where('product_phase.ProductId = :productId', { productId })
        .getRawMany();
      return mapDbItems(result, phasesMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Phase {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/phase').Phase) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: import('../../../models/phase').Phase) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
