import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { booking } from 'src/app/models/booking';
import { Token } from 'src/app/models/token.model';
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
    //Il service farà la GET automaticamente per ottenere la lista di indirizzi
    this.getIndirizzi().subscribe((_) => {});
  }

  //token
  get jwt(): Token['jwt'] {
    return sessionStorage.getItem('jwt');
  }

  set jwt(value: Token['jwt']) {
    sessionStorage.setItem('jwt', value);
  }

  //login -passo i parametri
  login(obj) {
    console.log(obj);
    return this.http
      .post<Array<Token | User>>(environment.API_URL + '/login', obj)
      .pipe(
        tap((response) => {
          console.log(response);
          this.jwt = (response[0] as Token).jwt;
          this.user = response[1] as User;
        })
      );
  }

  //logout
  logout() {
    this.user = null;
    this.jwt = null;
    sessionStorage.clear();
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

  //registration
  registrazione(obj) {
    return this.http.post(
      `${environment.API_URL}/private/nuovoUtente`,
      obj,
      {}
    );
  }

  //deleteUser
  deleteUser(id: User['id']) {
    return this.http.delete(environment.API_URL + '/user/eliminaUtente/' + id);
  }

  //prendere id nel session storage
  getLoggedUser() {
    let _user = JSON.parse(sessionStorage.getItem('user'));
    if (_user) {
      this.user = _user;
    }
    console.log(_user);
  }

  //prendi indirizzo utente
  getIndirizzi(): Observable<any> {
    return this.http.get(environment.API_URL + '/user/getIndirizziUtente');
  }

  //get Prenotazioni utente
  getPrenotazioni(): Observable<any> {
    return this.http.get(
      environment.API_URL + '/user/getgetOrdiniDestinatario'
    );
  }
}
