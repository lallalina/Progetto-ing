import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from 'src/app/models/review.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { booking } from 'src/app/models/booking';
import { Barber } from 'src/app/models/barber.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) { }

  //ultime 3 recensioni
  recensioni(): Observable<Review[]> {
    return this.http.get<Review[]>(
      environment.API_URL + '/public/getLastThreeRecensioni'
    );
  }

  //recensioni per parrucchieri
  recensioniP(id: Barber['id']): Observable<Review[]> {
    return this.http.get<Review[]>(
      environment.API_URL + '/public/getRecensioniBarbiere/' + id
    );
  }

  //nuova recensione da parte dell'acquirente
  doReview(review: Review): Observable<Review> {
    return this.http.post<Review>(
      environment.API_URL + '/public/recensionePrenotazione',
      review
    );
  }
}
