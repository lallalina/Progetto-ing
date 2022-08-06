import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Treatment } from 'src/app/models/treatment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  private readonly treatmentsSubject = new BehaviorSubject<Array<Treatment>>(
    []
  );
  readonly treatments$ = this.treatmentsSubject.asObservable();

  get treatments(): Array<Treatment> {
    return this.treatmentsSubject.value;
  }

  set treatments(value: Array<Treatment>) {
    this.treatmentsSubject.next(value);
  }

  constructor(private http: HttpClient) {
    //Esegue la GET per i trattamenti appena il service viene creato
    this.getTreatments().subscribe((_) => {});
  }

  //addTrattamento
  addTreatment(obj): Observable<any> {
    return this.http.post(environment.API_URL + '/nuovoTrattamento', obj);
  }

  //getTrattamento
  getTreatments(): Observable<any> {
    return this.http
      .get(environment.API_URL + '/public/getTrattamenti')
      .pipe(tap((response) => (this.treatments = response)));
  }

  //deleteTrattamento
  deleteTreatment(obj): Observable<any> {
    return this.http.post(environment.API_URL + '/eliminaTrattamento', obj);
  }
}