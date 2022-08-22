import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
  ordina(obj): Observable<Ordine> {
    return this.http.post<Ordine>(
      environment.API_URL + '/user/nuovoOrdine',
      obj
    );
  }
}
