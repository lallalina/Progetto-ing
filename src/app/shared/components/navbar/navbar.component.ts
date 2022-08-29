import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

import { CartItem } from 'src/app/models/cart.model';
import { User, UserRole } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  /*variabili*/
  public items: CartItem[];
  public total: number;
  badgeCounter: number = 0;
  user: User;
  isAdmin: boolean;
  isBarber: boolean;
  isUser: boolean;
  readonly UserRole = UserRole;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
    this.auth.user$.subscribe((user) => {
      /*controllo dei ruoli per*/
      if (user) {
        this.user = user;
        switch (this.user.role) {
          case UserRole.ADMIN: {
            this.isAdmin = true;
            break;
          }
          case UserRole.BARBER: {
            this.isBarber = true;
            break;
          }
          case UserRole.CUSTOMER: {
            this.isUser = true;
            break;
          }
          default: {
            this.isUser = true;
            break;
          }
        }
      }
    });
  }

  //esci dalla pagina
  logout() {
    this.user = null;
    this.auth.logout();
    this.toastr.warning('Uscito dal sito');
    this.router.navigate(['']);
  }
}
