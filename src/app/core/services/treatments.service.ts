import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Treatment } from 'src/app/models/treatment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  private readonly treatmentsSubject = new BehaviorSubject<Treatment[]>(
    []
  );
  readonly treatments$ = this.treatmentsSubject.asObservable();

  get treatments(): Treatment[] {
    return this.treatmentsSubject.value;
  }

  set treatments(value: Treatment[]) {
    this.treatmentsSubject.next(value);
  }

  constructor(private http: HttpClient) {
    //Esegue la GET per i trattamenti appena il service viene creato
    this.getTreatments().subscribe((_) => { });
  }

  //addTrattamento
  addTreatment(obj): Observable<any> {
    return this.http.post(environment.API_URL + '/admin/nuovoTrattamento', obj);
  }

  //getTrattamento
  getTreatments(): Observable<any> {
    return this.http
      .get(environment.API_URL + '/public/getTrattamenti')
      .pipe(tap((response) => (this.treatments = response)));
  }

  //deleteTrattamento
  deleteTreatment(id: Treatment['id']): Observable<any> {
    return this.http.delete(environment.API_URL + '/admin/eliminaTrattamento/' + id);
  }

  //modifyTrattamento
  modifyTreatment(obj): Observable<any> {
    return this.http.post(environment.API_URL + '/admin/modificaTrattamento', obj);
  }
}
