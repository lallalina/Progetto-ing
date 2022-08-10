import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AjaxService {
  constructor(private http: HttpClient) {}

  //ultime 3 recensioni
  recensioni(): Observable<any> {
    return this.http.get(
      environment.API_URL + '/public/getLastThreeRecensioni'
    );
  }

  //listaOrari
  orari(): Observable<any> {
    return this.http.get(environment.API_URL + '/public/getOrari');
  }
}
