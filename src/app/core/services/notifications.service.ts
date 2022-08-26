import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private http: HttpClient) {}

  //disabilita notifiche per utenti
  notifyDisable(user: User): Observable<User> {
    return this.http.patch<User>(
      environment.API_URL + '/user/toggleNotifiche',
      user
    );
  }
}
