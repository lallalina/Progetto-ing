import { Injectable } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { BehaviorSubject, combineLatest, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartSubject = new BehaviorSubject<Cart[]>([]);
  readonly cart$ = this.cartSubject.asObservable();

  constructor() {}
}
