import { IEvidenceRepository } from '../../../abstract/repos/evidence.repository';
import { initMysql } from './connection.manager';
import { mapDbItems, evidenceMapper } from './dbMapper';
import { Evidence } from '@models/evidence';
import { Evidence as EvidenceEntity } from './entity/evidence';
import { injectable } from 'inversify';

@injectable()
export class MySQLEvidenceRepository implements IEvidenceRepository {
  async getEvidenceByProjectIdAndQuestionId(
    _productId: number,
    _questionId: number,
  ): Promise<Evidence[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .createQueryBuilder()
        .select('evidence')
        .from(EvidenceEntity, 'evidence')
        .where('evidence.productId = :productId', { productId: _productId })
        .andWhere('evidence.questionId = :questionId', {
          questionId: _questionId,
        })
        .getRawMany();
      return mapDbItems(result, evidenceMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async addEvidenceByQuestionId(
    _questionId: number,
    _evidence: Evidence,
  ): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      const { productId, userId, content, status, version } = _evidence;
      await connection
        .createQueryBuilder()
        .insert(_evidence)
        .into(Evidence)
        .values({
          ProductId: productId,
          UserId: userId,
          QuestionId: _questionId,
          Content: content,
          Status: status,
          Version: version,
        })
        .execute();
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async updateStatus(_evidenceId: number, _status: string): Promise<boolean> {
    let connection: any;
    try {
      connection = await initMysql();
      await connection
        .createQueryBuilder()
        .update(Evidence)
        .set({
          Status: _status,
        })
        .where('Id = :id', { id: _evidenceId })
        .execute();
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Evidence {
    throw new Error('Method not implemented.');
  }
  add(_item: Evidence) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: Evidence) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
