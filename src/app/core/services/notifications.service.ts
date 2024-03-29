import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  //disabilita notifiche per utenti
  notifyDisable(id: User['id']): Observable<boolean> {
    return this.http.patch<boolean>(
      environment.API_URL + '/user/toggleNotifiche',
      { idUtente: id }
    );
  }
}
