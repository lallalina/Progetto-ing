import { Address } from 'cluster';
import { CartItem } from './cart.model';

export interface Ordine {
  cart: CartItem[];
  indirizzo: Address[];
}
