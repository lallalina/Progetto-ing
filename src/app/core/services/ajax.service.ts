import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AjaxService {
  baseUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  //ultime 3 recensioni
  recensioni(): Observable<any> {
    return this.http.get(this.baseUrl + '/public/getLastThreeRecensioni');
  }

  //addProdotto
  addProdotto(obj): Observable<any> {
    return this.http.post(this.baseUrl + '/nuovoProdotto', obj);
  }
  //getProdotto
  prodotti(): Observable<any> {
    return this.http.get(this.baseUrl + '/public/getProdotti');
  }
  //deleteProdotto
  deleteProdotto(obj): Observable<any> {
    return this.http.post(this.baseUrl + '/eliminaProdotto', obj);
  }

  //addTrattamento
  addTrattamento(obj): Observable<any> {
    return this.http.post(this.baseUrl + '/nuovoTrattamento', obj);
  } //getTrattamento
  trattamenti(): Observable<any> {
    return this.http.get(this.baseUrl + '/public/getTrattamenti');
  }
  //deleteTrattamento
  deleteTrattamento(obj): Observable<any> {
    return this.http.post(this.baseUrl + '/eliminaTrattamento', obj);
  }

  //addAdmin
  nuovoAdmin(obj): Observable<any> {
    return this.http.post(this.baseUrl + '/admin/nuovoAdmin', obj);
  }
  //nuovobarbiere
  nuovoBarbiere(obj): Observable<any> {
    return this.http.post(this.baseUrl + '/admin/nuovoBarbiere', obj);
  }

  //login
  login(obj): Observable<any> {
    return this.http.post(this.baseUrl + '/login', obj);
  }
}
