import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { booking } from 'src/app/models/booking';
import { Barber } from 'src/app/models/barber.model';
import { CalendarEvent } from 'angular-calendar';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  prenotazione: booking[] = [];

  //listaOrari
  orari(id: Barber['id'], giorno: string): Observable<Array<string[]>> {
    return this.http
      .get<Array<string[]>>(
        environment.API_URL +
          '/public/getPrenotazioniLibereBarbierePerGiorno/' +
          id +
          '/' +
          giorno
      )
      .pipe(
        map((orari) =>
          orari.map((periodo) =>
            periodo.map((timeString) =>
              timeString.substring(0, timeString.length - 3)
            )
          )
        )
      );
  }

  //nuova prenotazione
  newBooking(obj: booking): Observable<booking> {
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

  //get appuntamenti
  getBookings(): Observable<CalendarEvent[]> {
    return this.http
      .get<booking[]>(environment.API_URL + '/public/getPrenotazioni')
      .pipe(
        map((bookings) => {
          const events: CalendarEvent[] = [];
          bookings.map((elem) => {
            events.push({
              start: elem.startTime,
              end: elem.endTime,
              title: elem.nome,
            });
          });
          return events;
        })
      );
  }
}
