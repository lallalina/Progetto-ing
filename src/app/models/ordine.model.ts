import { CartItem } from './cart.model';

export interface Ordine {
  cart: CartItem[];
  indirizzo: string;
}
