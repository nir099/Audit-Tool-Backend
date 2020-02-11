import { IKnowledgeAreaRepository } from '../../../abstract/repos/knowledge-area.repository';
import { initMysql } from './connection.manager';
import { mapDbItems, knowledgeAreaMapper } from './dbMapper';
import { KnowledgeArea } from '../../../models/knowledge-area';
import { injectable } from 'inversify';
import { Phase as PhaseEntity } from './entity/phase';

@injectable()
export class MySQLKnowledgeAreaRepository implements IKnowledgeAreaRepository {
  async getKnowledgeAreasByProductPhaseId(
    _productPhaseId: number,
  ): Promise<KnowledgeArea[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const results = await connection
        .getRepository(PhaseEntity)
        .createQueryBuilder('phase')
        .leftJoinAndSelect('phase.productphases', 'productphase')
        .leftJoinAndSelect('phase.knowledgeareas', 'knowledgearea')
        .where('productphase.Id = :Id', { Id: _productPhaseId })
        .getRawMany();
      return mapDbItems(results, knowledgeAreaMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }
  get(_itemId: number): import('../../../models/knowledge-area').KnowledgeArea {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/knowledge-area').KnowledgeArea) {
    throw new Error('Method not implemented.');
  }
  update(
    _itemId: number,
    _item: import('../../../models/knowledge-area').KnowledgeArea,
  ) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
