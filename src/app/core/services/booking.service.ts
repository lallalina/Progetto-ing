import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { booking } from 'src/app/models/booking';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  prenotazione: booking[] = [];

  //listaOrari
  orari(): Observable<any> {
    return this.http.get(environment.API_URL + '/public/getOrari');
  }

  //deleteBooking
  deleteBooking(id: booking['id']) {
    return this.http.delete(
      environment.API_URL + '/public/eliminaPrenotazione/' + id
    );
  }
}
