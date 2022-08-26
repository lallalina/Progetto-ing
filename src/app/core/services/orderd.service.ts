import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ordine } from 'src/app/models/ordine.model';
import { User } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderdService {
  private readonly orderSubject = new BehaviorSubject<Ordine[]>([]);
  readonly order$ = this.orderSubject.asObservable();

  constructor(private http: HttpClient) { }

  get order(): Ordine[] {
    return this.orderSubject.value;
  }

  set order(value: Ordine[]) {
    this.orderSubject.next(value);
  }

  //nuovo ordine
  newOrder(order: Ordine): Observable<Ordine> {
    return this.http.post<Ordine>(
      `${environment.API_URL}/user/nuovoOrdine`,
      order
    );
  }

  //getOrdini pagina admin
  getOrders(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(environment.API_URL + '/admin/getOrdini');
  }

  //get ordini per utente
  getOrdiniUtente(id: User['id']): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(
      environment.API_URL + '/user/getOrdiniDestinatario/' + id
    );
  }
}
