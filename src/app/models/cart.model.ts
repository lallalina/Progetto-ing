import { Product } from './product.model';

export class CartItem {
  public product: Product;
  public amount: number;
  constructor(
    product: Product,
    amount: number //productNumber
  ) {
    this.product = product;
    this.amount = amount;
  }
}
