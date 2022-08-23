export class Product {
  constructor(
    public id: number,
    public nome: string,
    public descrizione: string,
    public prezzo: number,
    public count: number, //numero quantità di selezione del prodotto
    public foto: string
  ) {}
}
