import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isThisMinute } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { OrderdService } from 'src/app/core/services/orderd.service';
import { Address } from 'src/app/models/address.model';
import { CartItem } from 'src/app/models/cart.model';
import { User } from 'src/app/models/user.model';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() items: CartItem[]; //prende i prodotti
  @Input() indirizzi: Address[]; //prende i nuovi indirizzi
  @Input() user: User[]; //prende gli indirizzi dell'utente

  form;
  public total: number;
  loading: boolean;

  constructor(
    private router: Router,
    private cartService: CartService,
    private auth: AuthService,
    private orderdService: OrderdService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.retrieveIndirizziUser();
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
    this.initForm();
    this.retrieveIndirizziUser();
  }

  //controllo validità sezioni
  initForm() {
    this.form = new FormGroup({
      citta: new FormControl('', Validators.required),
      indirizzo: new FormControl('', Validators.required),
      cap: new FormControl('', [Validators.required, Validators.minLength(5)]),
      numCivico: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  //salvo il carrello nella session
  saveCart() {
    sessionStorage.setItem('carrello', JSON.stringify(this.items));
  }

  //togli elementi dal carrello
  deletElement(id) {
    this.cartService.removeItem(id);
  }

  //pulisci carrello
  public onClearCart(event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.clearCart();
  }

  //pulisci carrello
  public onRemoveItem(event, item: CartItem) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeItem(item);
  }

  //incrementa
  public increaseAmount(item: CartItem) {
    this.cartService.updateItemAmount(item, item.amount + 1);
  }

  //decrementa
  public decreaseAmount(item: CartItem) {
    const newAmount = item.amount - 1;
    if (newAmount === 0) {
      this.cartService.removeItem(item);
    } else {
      this.cartService.updateItemAmount(item, newAmount);
    }
  }

  public checkAmount(item: CartItem) {
    this.cartService.updateItemAmount(
      item,
      item.amount < 1 || !item.amount || isNaN(item.amount) ? 1 : item.amount
    );
  }

  //get indirizzi esisteni
  retrieveIndirizziUser() {
    this.cartService.getIndirizzi(this.user['id']).subscribe((response) => {
      console.log(response);
    });
  }

  //ordina prodotto
  ordina(items = this.items, idnirizzi = this.indirizzi) {
    this.loading = true;
    // manca controllo utente loggato
    this.orderdService.newOrder(items, idnirizzi).subscribe({
      next: (response) => {
        this.toastr.success('Ordine effettuato con successo');
        this.router.navigate(['/']);
        this.form.reset();
      },
      complete: () => (this.loading = false),
    });
  }
}
