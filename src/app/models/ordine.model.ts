import { Address } from './address.model';

export interface Ordine {
  idIndirizzoDestinatario: Address['id'];
  prodotti: string;
}
