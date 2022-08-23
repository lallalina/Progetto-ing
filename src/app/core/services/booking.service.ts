import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { booking } from 'src/app/models/booking';
import { Barber } from 'src/app/models/barber.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  prenotazione: booking[] = [];

  //listaOrari
  orari(id: Barber['id'], giorno: string): Observable<any> {
    return this.http.get(
      environment.API_URL +
        'public/getPrenotazioniLibereBarbierePerGiorno/' +
        id +
        '/' +
        giorno
    );
  }

  //nuova prenotazione
  newBooking(obj): Observable<booking> {
    return this.http.post<booking>(
      environment.API_URL + '/public/nuovaPrenotazione',
      obj
    );
  }

  //deleteBooking
  deleteBooking(id: booking['id']) {
    return this.http.delete(
      environment.API_URL + '/public/eliminaPrenotazione/' + id
    );
  }
}
