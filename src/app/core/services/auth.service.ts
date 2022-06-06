import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../models/user.model';
import { MockedUsers } from '../../__mocks__/users.mock';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  get user(): User {
    return this.userSubject.value;
  }

  set user(value: User) {
    this.userSubject.next(value);
  }

  registrazione(param) {
    return this.http.post(`${environment.API_URL}/private/nuovoUtente`, param, {
      headers: { 'Content-Type': 'application/json' },
    }); //manda uan richiesta, obj-> lo mandiamo al server
  }

  //chiamata al server per il login
  login(username, password) {
    return this.http.get(`${environment.API_URL}/admin`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(username + ':' + password),
      }),
    });
  }

  mockLogin(username: User['username'], password: User['password']) {
    let user = MockedUsers.find(
      (item) => item.username === username && item.password === password
    );
    console.log(user);
    this.user = user;
  }
}
