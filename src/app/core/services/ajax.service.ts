import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reviews } from 'src/app/models/review.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AjaxService {
  constructor(private http: HttpClient) {}

  //ultime 3 recensioni
  recensioni(): Observable<reviews> {
    return this.http.get<reviews>(
      environment.API_URL + '/public/getLastThreeRecensioni'
    );
  }

  //recensioni per parrucchieri
  recensioniP(): Observable<reviews> {
    return this.http.get<reviews>(
      environment.API_URL + '/public/getRecensioniBarbiere'
    );
  }

  //listaOrari
  orari(): Observable<any> {
    return this.http.get(environment.API_URL + '/public/getOrari');
  }
}
