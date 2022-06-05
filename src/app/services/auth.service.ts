import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
}
