import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {

  reloadCalendar = new Subject<void>();

  constructor() { }

}
