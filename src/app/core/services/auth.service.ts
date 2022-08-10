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
    this.getLoggedUser();
  }

  //login -passo i parametri
  login(obj: FormData) {
    return this.http.post<User>(environment.API_URL + '/login', obj);
  }

  //ottengo l'ultimo valore dell'user
  get user(): User {
    return this.userSubject.value;
  }

  //imposto un valore ad user
  set user(value: User) {
    sessionStorage.setItem('user', JSON.stringify(value));
    this.userSubject.next(value);
  }

  //registrazine utente
  registrazione(param) {
    return this.http.post(
      `${environment.API_URL}/private/nuovoUtente`,
      param,
      {}
    );
  }

  //prendere id nel session storage
  getLoggedUser() {
    let _user = JSON.parse(sessionStorage.getItem('user'));
    if (_user) {
      this.user = _user;
    }
    console.log(_user);
  }
}
