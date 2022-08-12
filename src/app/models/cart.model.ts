import { Product } from './product.model';

export interface Cart {
  prodotto: Product[];
  prezzoTot: number;
  countTot: number;
}
