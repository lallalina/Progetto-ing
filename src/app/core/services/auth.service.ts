import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.getLoggedUser();
  }

  //login -passo i parametri
  login(obj: FormData): Observable<any> {
    return this.http.post(environment.API_URL + '/login', obj);
  }

  //ottengo l'ultimo valore dell'user
  get user(): User {
    return this.userSubject.value;
  }

  //imposto un valore ad user
  set user(value: User) {
    this.userSubject.next(value);
  }

  registrazione(param) {
    return this.http.post(
      `${environment.API_URL}/private/nuovoUtente`,
      param,
      {}
    );
  }

  /*
  //prendere id nel session storage
  getLoggedUser() {
    let _id = parseInt(sessionStorage.getItem('id'));
    let _user = find((user) => user.id === _id);
    this.user = _user;
  }*/
}
