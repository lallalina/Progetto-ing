//servizi
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UtilsService } from './core/services/utils.service';

//pagine
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login-page/login.component';
import { RegistrationComponent } from './pages/registration-page/registration.component';
import { CartComponent } from './pages/cart-page/cart.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { DeleteBookingPageComponent } from './pages/delete-booking-page/delete-booking-page.component';
import { DialogComponent } from './pages/user-page/dialog/dialog.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { DialogDeleteUserComponent } from './pages/user-page/dialog-delete-user/dialog-delete-user.component';
import { EditBookingPageComponent } from './pages/edit-booking-page/edit-booking-page.component';

//elementi
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    RegistrationComponent,
    UserPageComponent,
    DialogComponent,
    ReviewsComponent,
    DeleteBookingPageComponent,
    DialogDeleteUserComponent,
    EditBookingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //per la navigazione delle pagine
    CommonModule,
    FormsModule, //per i forms
    ReactiveFormsModule,
    HttpClientModule, //chiamate http
    BrowserAnimationsModule, //angular material
    SharedModule,
    ToastrModule.forRoot(),
    CalendarModule.forRoot({
      //calendar
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    UtilsService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
