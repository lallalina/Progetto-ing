import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Barber } from 'src/app/models/barber.model';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  constructor(private http: HttpClient) {}

  //ranking barbieri
  ranking(barber: Barber[]): Observable<boolean> {
    return this.http.patch<boolean>(
      environment.API_URL + '/admin/toggleRanking',
      barber
    );
  }
}
