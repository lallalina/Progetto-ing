import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly productSubject = new BehaviorSubject<Array<Product>>([]);
  readonly products$ = this.productSubject.asObservable();

  get products(): Array<Product> {
    return this.productSubject.value;
  }

  set products(value: Array<Product>) {
    this.productSubject.next(value);
  }

  constructor(private http: HttpClient) {
    //Esegue la GET per i trattamenti appena il service viene creato
    this.getProducts().subscribe((_) => { });
  }

  //addProdotto
  addProdotto(obj): Observable<any> {
    return this.http.post(environment.API_URL + '/admin/nuovoProdotto', obj);
  }
  //getProdotto
  getProducts(): Observable<any> {
    return this.http.get<Product[]>(
      environment.API_URL + '/public/getProdotti'
    );
  }
  //deleteProdotto
  deleteProdotto(id: Product['id']): Observable<any> {
    return this.http.delete(environment.API_URL + '/admin/eliminaProdotto/' + id);
  }

  //modifyProdotto
  modifyProdotto(obj): Observable<any> {
    return this.http.post(environment.API_URL + 'admin/modificaProdotto', obj);
  }
}
