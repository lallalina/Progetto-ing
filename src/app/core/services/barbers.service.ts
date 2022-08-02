import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Barber } from 'src/app/models/barber.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BarbersService {
  private readonly barbersSubject = new BehaviorSubject<Array<Barber>>([]);
  readonly barbers$ = this.barbersSubject.asObservable();

  constructor(private http: HttpClient) {
    //Il service farà la GET automaticamente per ottenere la lista di barbieri
    this.getBarbers();
  }

  get barbers(): Array<Barber> {
    return this.barbersSubject.value;
  }

  set barbers(value: Array<Barber>) {
    this.barbersSubject.next(value);
  }

  //GET barbieri
  getBarbers() {
    this.http
      .get<Array<Barber>>(`${environment.API_URL}/public/getBarbieri`)
      .subscribe((response) => (this.barbers = response));
  }

  //nuovobarbiere
  nuovoBarbiere(obj): Observable<any> {
    return this.http.post(environment.API_URL + '/admin/nuovoBarbiere', obj);
  }
}
