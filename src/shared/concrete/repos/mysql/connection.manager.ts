import { createConnection, getConnectionManager } from 'typeorm';
import { dbConfig } from '../../../config/database';
import 'mysql';
import { User } from './entity/user';
import { Organization } from './entity/organization';
import { Domain } from './entity/domain';
import { Evidence } from './entity/evidence';
import { KnowledgeArea } from './entity/knowledgeArea';
import { Phase } from './entity/phase';
import { Product } from './entity/product';
import { Product_Phase } from './entity/product_phase';
import { Question } from './entity/question';
import { Revision } from './entity/revision';

export async function initMysql() {
  try {
    const con = await createConnection({
      type: 'mysql',
      host: dbConfig.host,
      port: Number(dbConfig.port),
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      entities: [
        User,
        Organization,
        Domain,
        Evidence,
        KnowledgeArea,
        Phase,
        Product,
        Product_Phase,
        Question,
        Revision,
      ],
      synchronize: false,
      logging: false,
    });
    return con;
  } catch (err) {
    if (err) {
      console.log(err);
      const existentConn = getConnectionManager().get('default');
      return existentConn;
    }
  }
}
