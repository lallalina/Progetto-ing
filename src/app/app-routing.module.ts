import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { CustomerGuard } from './core/guards/customer.guard';
import { ResponsibleGuard } from './core/guards/responsible.guard';
import { CustomerPageComponent } from './pages/customer-page/customer-page.component';
import { LoginComponent } from './pages/login-page/login.component';
import { CartComponent } from './pages/cart-page/cart.component';
import { RegistrationComponent } from './pages/registration-page/registration.component';

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
    //canActivate: [AdminGuard],
    loadChildren: () =>
      import('./pages/admin-page/admin-page.module').then(
        (m) => m.AdminPageModule
      ),
  },
  {
    //barbiere page route
    path: 'responsible',
    // canActivate: [ResponsibleGuard],
    loadChildren: () =>
      import('./pages/responsible-page/responsible-page.module').then(
        (m) => m.ResponsiblePageModule
      ),
  },
  {
    //customer page route
    path: 'customer',
    // canActivate: [CustomerGuard],
    loadChildren: () =>
      import('./pages/customer-page/customer-page.module').then(
        (m) => m.CustomerPageModule
      ),
  },
  {
    //prova per il customer page
    path: 'shop',
    component: CustomerPageComponent,
  },
  {
    //prova per il carrello page
    path: 'cart',
    component: CartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
