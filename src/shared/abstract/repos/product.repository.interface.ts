import { IRepository } from './repository.interface';
import { Product } from '../../models/product';

export interface IProductRepository extends IRepository<Product> {
  getProductByProductPhaseId(productPhaseId: number): Promise<Product[]>;
  getProductsByUser(userId: number): Promise<Product[]>;
  getProductById(productId: number): Promise<Product>;
}
