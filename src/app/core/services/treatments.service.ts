import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Treatment } from 'src/app/models/treatment.model';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  private readonly treatmentsSubject = new BehaviorSubject<Treatment[]>([]);
  readonly treatments$ = this.treatmentsSubject.asObservable();

  get treatments(): Treatment[] {
    return this.treatmentsSubject.value;
  }

  set treatments(value: Treatment[]) {
    this.treatmentsSubject.next(value);
  }

  constructor(private http: HttpClient) {
    //Esegue la GET per i trattamenti appena il service viene creato
    this.getTreatments().subscribe((_) => {});
  }

  //addTrattamento
  addTreatment(obj): Observable<Treatment> {
    return this.http.post<Treatment>(
      environment.API_URL + '/admin/nuovoTrattamento',
      obj
    );
  }

  //getTrattamento
  getTreatments(): Observable<Treatment[]> {
    return this.http
      .get<Treatment[]>(environment.API_URL + '/public/getTrattamenti')
      .pipe(tap((response) => (this.treatments = response)));
  }

  //deleteTrattamento
  deleteTreatment(id: Treatment['id']): Observable<any> {
    return this.http.delete(
      environment.API_URL + '/admin/eliminaTrattamento/' + id
    );
  }

  //modifyTrattamento
  modifyTreatment(obj): Observable<Treatment> {
    return this.http.patch<Treatment>(
      environment.API_URL + '/admin/modificaTrattamento',
      obj
    );
  }
}
