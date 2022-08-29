import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { CustomerGuard } from './core/guards/customer.guard';
import { ResponsibleGuard } from './core/guards/responsible.guard';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { LoginComponent } from './pages/login-page/login.component';
import { CartComponent } from './pages/cart-page/cart.component';
import { RegistrationComponent } from './pages/registration-page/registration.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { DeleteBookingPageComponent } from './pages/delete-booking-page/delete-booking-page.component';
import { EditBookingPageComponent } from './pages/edit-booking-page/edit-booking-page.component';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    //home page route
    path: '',
    loadChildren: () =>
      import('./pages/main-page/main-page.module').then(
        (m) => m.MainPageModule
      ),
  },
  {
    //login page route
    path: 'login',
    component: LoginComponent,
  },
  {
    //registrazione page route
    path: 'sign-up',
    component: RegistrationComponent,
  },
  {
    //admin page route
    path: 'admin',
    canActivate: [AuthenticatedGuard, AdminGuard],
    loadChildren: () =>
      import('./pages/admin-page/admin-page.module').then(
        (m) => m.AdminPageModule
      ),
  },
  {
    //barbiere page route
    path: 'responsible',
    canActivate: [AuthenticatedGuard, ResponsibleGuard],
    loadChildren: () =>
      import('./pages/responsible-page/responsible-page.module').then(
        (m) => m.ResponsiblePageModule
      ),
  },
  {
    //customer page route
    path: 'shop',
    loadChildren: () =>
      import('./pages/customer-page/customer-page.module').then(
        (m) => m.CustomerPageModule
      ),
  },
  {
    //carrello page
    path: 'cart',
    component: CartComponent,
  },
  {
    //user page
    path: 'user',
    canActivate: [AuthenticatedGuard],
    component: UserPageComponent,
  },
  {
    //recensioni page
    path: 'recensioni/:idPrenotazione',
    component: ReviewsComponent,
  },
  {
    //deleteBooking page
    path: 'cancellaPrenotazione/:idPrenotazione',
    component: DeleteBookingPageComponent,
  },
  {
    //edit booking page
    path: 'modificaPrenotazione/:idPrenotazione',
    component: EditBookingPageComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
