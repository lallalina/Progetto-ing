import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart.model';
import { Ordine } from 'src/app/models/ordine.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderdService {
  private readonly orderSubject = new BehaviorSubject<Ordine[]>([]);
  readonly order$ = this.orderSubject.asObservable();

  constructor(private http: HttpClient) {}

  get order(): Ordine[] {
    return this.orderSubject.value;
  }

  set order(value: Ordine[]) {
    this.orderSubject.next(value);
  }

  //nuovo ordine
  newOrder(items, indirizzi): Observable<CartItem> {
    return this.http
      .get<CartItem>(environment.API_URL + '/user/getOrdiniDestinatario')
      .subscribe((CartItem) => {
        let cart: CartItem = {
          items: CartItem.product,
          indirizzi: CartItem.indirizzoDestinatario,
        };
        return cart;
      });
  }

  //getOrdini pagina admin
  getOrders(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(environment.API_URL + '/admin/getOrdini');
  }

  //get ordini per utente
  getOrdiniUtente(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(
      environment.API_URL + '/user/getOrdiniDestinatario'
    );
  }
}
