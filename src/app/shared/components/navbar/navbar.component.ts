import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User, UserRole } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/models/cart.model';
import { element } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
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
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getTotal();
    this.cartService.cart$.subscribe((items: CartItem[]) => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
    this.auth.user$.subscribe((user) => {
      if (user) {
        console.log(user);
        this.user = user;

        //controllo ruolo admin
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

  logout() {
    this.user = null;
    this.auth.logout();
    this.router.navigate(['']);
  }
}
