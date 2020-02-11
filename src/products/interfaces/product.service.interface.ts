import { Product } from '@models/product';
import { Phase } from '@models/phase';

export interface IProductService {
  getProductsByUser(userId: number): Promise<Product[]>;

  getProductByProductPhaseId(productPhaseId: number): Promise<Product>;

  getPhases(productId: number): Promise<Phase[]>;

  getProductById(productId: number): Promise<Product>;
}
