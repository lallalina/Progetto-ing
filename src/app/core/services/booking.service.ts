import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  //listaOrari
  orari(): Observable<any> {
    return this.http.get(environment.API_URL + '/public/getOrari');
  }
}
