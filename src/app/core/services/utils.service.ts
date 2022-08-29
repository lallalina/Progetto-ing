import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  //aggiornamento di calendario quando si aggiunge una nuova prenotazione dalla adminPage
  reloadCalendar = new Subject<void>();

  constructor() {}
}
