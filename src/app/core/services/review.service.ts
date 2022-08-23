import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/review.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  //ultime 3 recensioni
  recensioni(): Observable<Review[]> {
    return this.http.get<Review[]>(
      environment.API_URL + '/public/getLastThreeRecensioni'
    );
  }

  //recensioni per parrucchieri
  recensioniP(): Observable<Review[]> {
    return this.http.get<Review[]>(
      environment.API_URL + '/public/getRecensioniBarbiere'
    );
  }
}