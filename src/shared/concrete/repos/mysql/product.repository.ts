import { Product } from './../../../models/product';
import { IProductRepository } from '../../../abstract/repos/product.repository.interface';
import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { Product_Phase } from './entity/product_phase';
import { Product as ProductEntity } from './entity/product';
import { mapDbItems, productMapper } from './dbMapper';

@injectable()
export class MySQLProductRepository implements IProductRepository {
  // return the product of a product_phase_id
  async getProductByProductPhaseId(productPhaseId: number): Promise<Product[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(Product_Phase)
        .createQueryBuilder('product_phase')
        .innerJoinAndSelect('product_phase.product', 'products')
        .select('products')
        .where('product_phase.Id = :productPhaseId', { productPhaseId })
        .getRawMany();
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  // get product by user id
  async getProductsByUser(userId: number): Promise<Product[]> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductEntity)
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.user', 'user')
        .where('user.Id = :userId', { userId })
        .getRawMany();
      console.log(result);
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  async getProductById(productId: number): Promise<Product> {
    let connection: any;
    try {
      connection = await initMysql();
      const result = await connection
        .getRepository(ProductEntity)
        .createQueryBuilder('product')
        .where('product.Id = :productId', { productId })
        .getRawMany();
      return mapDbItems(result, productMapper);
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): Product {
    throw new Error('Method not implemented.');
  }
  add(_item: import('../../../models/product').Product) {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: import('../../../models/product').Product) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
