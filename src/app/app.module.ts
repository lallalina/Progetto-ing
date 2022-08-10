import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { UtilsService } from './core/services/utils.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login-page/login.component';
import { PrenotazioneComponent } from './pages/main-page/components/prenotazione/prenotazione.component';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from './shared/shared.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CartComponent } from './pages/cart-page/cart.component';
import { RegistrationComponent } from './pages/registration-page/registration.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CartComponent,
    RegistrationComponent,
    PrenotazioneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //per la navigazione delle pagine
    CommonModule,
    FormsModule, //per i forms
    ReactiveFormsModule,
    HttpClientModule, //chiamate http
    MatFormFieldModule, //calendar
    MatDatepickerModule, //calendar
    BrowserAnimationsModule, //angular material
    MatIconModule, //per le icone
    SharedModule,
    CalendarModule.forRoot({
      //calendar
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [UtilsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
