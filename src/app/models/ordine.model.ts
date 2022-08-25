import { Address } from './address.model';
import { CartItem } from './cart.model';

export interface Ordine {
  idIndirizzoDestinatario: Address['id'];
  prodotti: string;
}
