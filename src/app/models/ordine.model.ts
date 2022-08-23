import { Address } from './address.model';
import { CartItem } from './cart.model';

export interface Ordine {
  cart: CartItem[];
  indirizzo: Address[];
}
