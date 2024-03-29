import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Barber } from 'src/app/models/barber.model';

@Injectable({
  providedIn: 'root',
})
export class BarbersService {
  private readonly barbersSubject = new BehaviorSubject<Barber[]>([]);
  readonly barbers$ = this.barbersSubject.asObservable();

  constructor(private http: HttpClient) {
    //Il service farà la GET automaticamente per ottenere la lista di barbieri
    this.getBarbers().subscribe((_) => {});
  }

  get barbers(): Barber[] {
    return this.barbersSubject.value;
  }

  set barbers(value: Barber[]) {
    this.barbersSubject.next(value);
  }

  //GET totale utenti
  getUsers() {
    return combineLatest([this.barbers$, this.getAdmins()]);
  }

  //GET barbieri
  getBarbers() {
    return this.http
      .get<Barber[]>(`${environment.API_URL}/public/getBarbieri`)
      .pipe(tap((response) => (this.barbers = response)));
  }

  //GET admin
  getAdmins() {
    return this.http.get<Barber[]>(`${environment.API_URL}/admin/getAdmin`);
  }

  //addbarbiere
  nuovoBarbiere(obj): Observable<Barber> {
    return this.http.post<Barber>(
      environment.API_URL + '/admin/nuovoBarbiere',
      obj
    );
  }

  //addAdmin
  nuovoAdmin(obj): Observable<Barber> {
    return this.http.post<Barber>(
      environment.API_URL + '/admin/nuovoAdmin',
      obj
    );
  }

  //deleteBarbieri
  deleteBarber(id: Barber['id']): Observable<any> {
    return this.http.delete(
      environment.API_URL + '/admin/eliminaBarbiere/' + id
    );
  }

  //deleteAdmin
  deleteAdmin(id: Barber['id']): Observable<any> {
    return this.http.delete(environment.API_URL + '/admin/eliminaAdmin/' + id);
  }
}
